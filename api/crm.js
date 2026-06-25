export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    const { first_name, last_name, email, phone, description } = body;

    const payload = {
      country_name: "cy",
      description: description || "",
      phone: phone,
      email: email,
      first_name: first_name,
      last_name: last_name || "",
      custom_fields: {
        Source_ID: "Website",
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

    if (!crmResponse.ok) {
      const errorText = await crmResponse.text();
      // Handle the 500 error for account exists as per KI
      if (crmResponse.status === 500 && errorText.includes("Account already exist")) {
         return res.status(200).json({ success: true, message: "Account already exists" });
      }
      console.error("CRM Error:", errorText);
      return res.status(crmResponse.status).json({ error: "Failed to submit to CRM" });
    }

    const data = await crmResponse.json();
    return res.status(200).json({ success: true, data });

  } catch (error) {
    console.error("CRM API Error:", error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
