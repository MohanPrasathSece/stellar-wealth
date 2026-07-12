import { put, list } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    const { action, email, name, phone, countryCode } = body;

    // As per Knowledge Item: we must use access: "private" with token: process.env.BLOB_TOKEN (or standard Vercel ENV)
    const token = process.env.BLOB_READ_WRITE_TOKEN; 

    if (action === 'signup') {
      // Check if user exists
      const { blobs } = await list({ prefix: `users/${email}.json`, token });
      
      if (blobs.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Write user JSON
      await put(`users/${email}.json`, JSON.stringify({ email, name, phone, countryCode: countryCode || 'CH', created_at: new Date().toISOString() }), {
        access: 'private',
        token,
        contentType: 'application/json'
      });

      // Create session
      const sessionId = crypto.randomUUID();
      await put(`sessions/${sessionId}.json`, JSON.stringify({ email, created_at: new Date().toISOString() }), {
        access: 'private',
        token,
        contentType: 'application/json'
      });

      try {
        const url = (typeof process !== 'undefined' && process.env && process.env.VITE_DASHBOARD_URL) || "https://lead-dashboard-orcin.vercel.app/api/increment";
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ website: "Maison Bloc", type: "signup", name: name || "Unknown", email: email })
        }).catch(() => {});
      } catch(e) {}

      return res.status(200).json({ success: true, sessionId });
    } else if (action === 'login') {
      // Check if user exists
      const { blobs } = await list({ prefix: `users/${email}.json`, token });
      
      if (blobs.length === 0) {
        return res.status(401).json({ error: 'User not found. Please sign up.' });
      }

      // Issue session
      const sessionId = crypto.randomUUID();
      await put(`sessions/${sessionId}.json`, JSON.stringify({ email, created_at: new Date().toISOString() }), {
        access: 'private',
        token,
        contentType: 'application/json'
      });

      return res.status(200).json({ success: true, sessionId });
    }

    return res.status(400).json({ error: 'Invalid action' });

  } catch (error) {
    console.error('Blob Auth Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
