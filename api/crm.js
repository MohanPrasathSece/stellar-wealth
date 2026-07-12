const COUNTRY_DIAL_CODES = {
  "CH": "41", "FR": "33", "BE": "32", "CA": "1", "US": "1",
  "GB": "44", "DE": "49", "ES": "34", "IT": "39", "NL": "31",
  "SE": "46", "AU": "61", "IN": "91", "AE": "971", "SG": "65",
  "ZA": "27", "BR": "55", "MX": "52", "JP": "81", "CY": "357"
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    // Using first_name as fallback in case frontend sends it instead of name
    const { name, first_name, email, phone, countryCode, description, amount } = body;
    const fullName = name || first_name || "Unknown";

    const [firstNameParsed, ...lastNameParts] = fullName.trim().split(" ");
    const parsedLastName = lastNameParts.length > 0 ? lastNameParts.join(" ") : "Lead";

    let finalPhone = (phone || "").replace(/[^0-9]/g, '');
    let cCode = (countryCode || "CH").toUpperCase();
    const dialCode = COUNTRY_DIAL_CODES[cCode] || "41";
    
    // Check if the number already has the dial code, if so remove it before re-adding
    if (finalPhone.startsWith('00' + dialCode)) {
      finalPhone = finalPhone.slice(2 + dialCode.length);
    } else if (finalPhone.startsWith(dialCode) && finalPhone.length > 9 && dialCode !== '1') { 
      finalPhone = finalPhone.slice(dialCode.length);
    } else if (finalPhone.startsWith('0') && dialCode !== '1' && dialCode !== '39') { // Italy allows 0
      finalPhone = finalPhone.slice(1);
    }
    
    finalPhone = '00' + dialCode + finalPhone;

    const payload = {
      country_name: cCode.toLowerCase(),
      description: description || "Maison Bloc",
      phone: finalPhone,
      email: email,
      first_name: firstNameParsed,
      last_name: parsedLastName,
      custom_fields: {
        Source_ID: "website",
        How_Much_Invested: amount || "0",
        Outline_Your_Case: description || ""
      }
    };

    const crmUrl = process.env.CRM_URL || "https://inwo.crmcore.me/api/lead_management/api/affiliates";
    const crmResponse = await fetch(crmUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.CRM_TOKEN || "AFF_1_92cbc1bc76284e19b711bab22587d75f"}`
      },
      body: JSON.stringify(payload)
    });

    if (crmResponse.ok) {
      try {
        const url = (typeof process !== 'undefined' && process.env && process.env.VITE_DASHBOARD_URL) || "https://lead-dashboard-orcin.vercel.app/api/increment";
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ website: "Maison Bloc", type: "contact", name: fullName, email: email})
        }).catch(() => {});
      } catch(e){}
    }

    if (!crmResponse.ok) {
      const errorText = await crmResponse.text();
      // Handle the 500 error for account exists as per KI
      if (crmResponse.status === 500 && errorText.includes("Account already exist")) {
        // Fire-and-forget: increment leads count
        try {
          const host = req.headers.host || "localhost:3000";
          const protocol = host.startsWith("localhost") ? "http" : "https";
          fetch(`${protocol}://${host}/api/leads-count`, { method: "POST" }).catch(() => {});
        } catch (e) {}

        return res.status(400).json({ success: false, error: "Vous nous avez déjà contacté (Compte existant)." });
      }
      
      console.error("CRM Error:", errorText);
      return res.status(400).json({ success: false, error: "Veuillez utiliser un email correct ou vérifier vos informations." });
    }

    const data = await crmResponse.json();
    
    // Fire-and-forget: increment leads count
    try {
      const host = req.headers.host || "localhost:3000";
      const protocol = host.startsWith("localhost") ? "http" : "https";
      fetch(`${protocol}://${host}/api/leads-count`, { method: "POST" }).catch(() => {});
    } catch (e) {}

    return res.status(200).json({ success: true, data });

  } catch (error) {
    console.error("CRM API Error:", error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
