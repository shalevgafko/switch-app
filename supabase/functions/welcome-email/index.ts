import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
const SB_URL     = Deno.env.get('SUPABASE_URL') ?? ''
const SB_KEY     = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
const FROM_EMAIL = 'switch <onboarding@resend.dev>'

serve(async (req) => {
  const { type, record } = await req.json()
  if (type !== 'INSERT') return new Response('ok', { status: 200 })

  const sb = createClient(SB_URL, SB_KEY)
  const { data: { user } } = await sb.auth.admin.getUserById(record.id)
  if (!user?.email) return new Response('no email', { status: 200 })

  const email = user.email
  const name  = record.name || email.split('@')[0]
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
            <h1 style="font-size:22px;font-weight:700;color:#18181A;margin:0 0 20px;text-align:right">הצטרפת ל-switch, ${firstName}.</h1>
            <p style="font-size:15px;color:#52524E;line-height:1.8;margin:0 0 16px;text-align:right">
              הרעיון פשוט — תציע מה שאתה יודע, תמצא מה שאתה צריך. שניכם יוצאים מרוצים, בלי שקל עובר בין הידיים.
            </p>
            <p style="font-size:15px;color:#52524E;line-height:1.8;margin:0 0 28px;text-align:right">
              תתחיל עם שירות אחד. רק אחד. ותראה לאן זה מגיע.
            </p>
            <div style="text-align:center;margin-bottom:28px">
              <a href="https://shalevgafko.github.io/switch-app" style="display:inline-block;background:linear-gradient(135deg,#1D9E75,#085041);color:#fff;text-decoration:none;padding:16px 40px;border-radius:14px;font-size:16px;font-weight:700">
                בוא נתחיל →
              </a>
            </div>
            <p style="font-size:13px;color:#A0A09A;text-align:center;margin:0">צוות switch</p>
          </td>
        </tr>
        <tr>
          <td style="background:#F7F6F2;padding:20px 32px;text-align:center">
            <p style="font-size:12px;color:#A0A09A;margin:0">© 2026 switch — swap skills, not cash</p>
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
    body: JSON.stringify({ from: FROM_EMAIL, to: email, subject: `הצטרפת ל-switch, ${firstName} 👋`, html }),
  })

  return new Response(JSON.stringify({ sent: true }), { status: 200 })
})
