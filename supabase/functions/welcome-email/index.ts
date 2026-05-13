import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
const FROM_EMAIL = 'switch <hello@switch-app.co>'

serve(async (req) => {
  const { type, record } = await req.json()
  if (type !== 'INSERT') return new Response('ok', { status: 200 })

  const email = record.email
  const name  = record.raw_user_meta_data?.full_name || email.split('@')[0]
  const firstName = name.split(' ')[0]

  const html = `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F7F6F2;font-family:'Helvetica Neue',Arial,sans-serif;direction:rtl">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F6F2;padding:40px 20px">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
        <tr>
          <td style="background:linear-gradient(135deg,#1D9E75,#085041);padding:36px 32px;text-align:center">
            <div style="font-size:36px;font-weight:800;color:#fff;letter-spacing:-2px">switch</div>
            <div style="font-size:14px;color:rgba(255,255,255,0.8);margin-top:4px">swap skills, not cash</div>
          </td>
        </tr>
        <tr>
          <td style="padding:32px">
            <div style="font-size:40px;text-align:center;margin-bottom:16px">🎉</div>
            <h1 style="font-size:22px;font-weight:700;color:#18181A;margin:0 0 8px;text-align:center">ברוך הבא, ${firstName}!</h1>
            <p style="font-size:15px;color:#52524E;line-height:1.7;text-align:center;margin:0 0 28px">
              אתה עכשיו חלק מקהילת switch — פלטפורמת החלפת השירותים הראשונה בישראל.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
              <tr><td style="padding:6px 0"><table width="100%" style="background:#F7F6F2;border-radius:12px"><tr>
                <td style="padding:12px 16px;font-size:22px;width:44px">🤝</td>
                <td style="padding:12px 16px 12px 0"><div style="font-size:14px;font-weight:700;color:#18181A;margin-bottom:2px">החלף שירותים</div><div style="font-size:12px;color:#52524E">הצע מה שאתה יודע ותקבל בחזרה מה שאתה צריך</div></td>
              </tr></table></td></tr>
              <tr><td style="padding:6px 0"><table width="100%" style="background:#F7F6F2;border-radius:12px"><tr>
                <td style="padding:12px 16px;font-size:22px;width:44px">💚</td>
                <td style="padding:12px 16px 12px 0"><div style="font-size:14px;font-weight:700;color:#18181A;margin-bottom:2px">בלי כסף</div><div style="font-size:12px;color:#52524E">כל עסקה מתבצעת בחליפין — ערך תמורת ערך</div></td>
              </tr></table></td></tr>
              <tr><td style="padding:6px 0"><table width="100%" style="background:#F7F6F2;border-radius:12px"><tr>
                <td style="padding:12px 16px;font-size:22px;width:44px">📍</td>
                <td style="padding:12px 16px 12px 0"><div style="font-size:14px;font-weight:700;color:#18181A;margin-bottom:2px">קהילה מקומית</div><div style="font-size:12px;color:#52524E">מצא אנשים קרובים אליך</div></td>
              </tr></table></td></tr>
            </table>
            <div style="text-align:center;margin-bottom:24px">
              <a href="https://your-switch-app-url.com" style="display:inline-block;background:linear-gradient(135deg,#1D9E75,#085041);color:#fff;text-decoration:none;padding:16px 40px;border-radius:14px;font-size:16px;font-weight:700">
                פתח את switch →
              </a>
            </div>
            <p style="font-size:13px;color:#A0A09A;text-align:center;margin:0">בהצלחה, <strong>צוות switch</strong></p>
          </td>
        </tr>
        <tr>
          <td style="background:#F7F6F2;padding:20px 32px;text-align:center">
            <p style="font-size:12px;color:#A0A09A;margin:0">© 2025 switch — swap skills, not cash</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_KEY}` },
    body: JSON.stringify({ from: FROM_EMAIL, to: email, subject: `ברוך הבא ל-switch, ${firstName}! 🎉`, html }),
  })

  return new Response(JSON.stringify({ sent: true }), { status: 200 })
})
