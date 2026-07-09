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
    const { name, first_name, email, phone, description, amount } = body;
    const fullName = name || first_name || "Unknown";

    const [firstNameParsed, ...lastNameParts] = fullName.trim().split(" ");
    const parsedLastName = lastNameParts.length > 0 ? lastNameParts.join(" ") : "Lead";

    let formattedPhone = (phone || "").replace(/[^0-9+]/g, '');
    if (formattedPhone) {
      if (formattedPhone.startsWith('+')) {
        formattedPhone = '00' + formattedPhone.slice(1);
      }
      if (formattedPhone.startsWith('41') && formattedPhone.length === 11) {
        formattedPhone = '00' + formattedPhone;
      }
      if (!formattedPhone.startsWith('0041')) {
        if (formattedPhone.startsWith('0') && !formattedPhone.startsWith('00')) {
          formattedPhone = '0041' + formattedPhone.slice(1);
        } else if (!formattedPhone.startsWith('00')) {
          formattedPhone = '0041' + formattedPhone;
        }
      }
    } else {
      formattedPhone = "0000000000";
    }

    
        let finalPhone = (leadData.number || leadData.phone || "").replace(/[^0-9+]/g, '');
        if (finalPhone && finalPhone.startsWith('+')) {
            finalPhone = '00' + finalPhone.slice(1);
        }
        let countryName = leadData.countryCode ? leadData.countryCode.toLowerCase() : "ch";

        const payload = {
      country_name: countryName,
      description: "Maison Bloc",
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
          body: JSON.stringify({ website: "Maison Bloc", type: description && description !== "Signup Lead" ? "contact" : "signup", name: fullName, email: email})
        }).catch(() => {});
      } catch(e){}
    }

    if (!crmResponse.ok) {
      const errorText = await crmResponse.text();
      // Handle the 500 error for account exists as per KI
      if (crmResponse.status === 500 && errorText.includes("Account already exist")) {
         return 
    // Fire-and-forget: increment leads count
    try {
      const host = req.headers.host || "localhost:3000";
      const protocol = host.startsWith("localhost") ? "http" : "https";
      fetch(`${protocol}://${host}/api/leads-count`, { method: "POST" }).catch((err) =>
        console.warn("[leads-count] Failed to increment:", err)
      );
    } catch (e) {
      console.warn("[leads-count] Error triggering increment:", e);
    }

    res.status(200).json({ success: true, message: "Account already exists" });
      }
      console.error("CRM Error:", errorText);
      return res.status(crmResponse.status).json({ error: "Failed to submit to CRM" });
    }

    const data = await crmResponse.json();
    return 
    // Fire-and-forget: increment leads count
    try {
      const host = req.headers.host || "localhost:3000";
      const protocol = host.startsWith("localhost") ? "http" : "https";
      fetch(`${protocol}://${host}/api/leads-count`, { method: "POST" }).catch((err) =>
        console.warn("[leads-count] Failed to increment:", err)
      );
    } catch (e) {
      console.warn("[leads-count] Error triggering increment:", e);
    }

    res.status(200).json({ success: true, data });

  } catch (error) {
    console.error("CRM API Error:", error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
