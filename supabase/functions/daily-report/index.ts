import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_KEY   = Deno.env.get('RESEND_API_KEY') ?? ''
const SB_URL       = Deno.env.get('SUPABASE_URL') ?? ''
const SB_KEY       = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
const REPORT_EMAIL = 'shalevgafko@gmail.com'

serve(async () => {
  const sb  = createClient(SB_URL, SB_KEY)
  const now = new Date()
  const h24 = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const h7d = new Date(now.getTime() - 7  * 24 * 60 * 60 * 1000)

  const [
    { count: newUsers },
    { count: totalUsers },
    { count: newDeals },
    { count: completedDeals },
    { count: openReports },
    { count: activeUsers },
  ] = await Promise.all([
    sb.from('profiles').select('*', { count: 'exact', head: true }).gte('created_at', h24.toISOString()),
    sb.from('profiles').select('*', { count: 'exact', head: true }),
    sb.from('deals')  .select('*', { count: 'exact', head: true }).gte('created_at', h24.toISOString()),
    sb.from('deals')  .select('*', { count: 'exact', head: true }).eq('status', 'completed').gte('updated_at', h24.toISOString()),
    sb.from('reports').select('*', { count: 'exact', head: true }),
    sb.from('messages').select('sender_id', { count: 'exact', head: true }).gte('created_at', h7d.toISOString()),
  ])

  const dateStr = now.toLocaleDateString('he-IL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const n = (v: number | null) => v ?? 0

  const reportsBlock = n(openReports) > 0
    ? `<div style="background:#FEF2F2;border:1px solid #FCA5A5;border-radius:12px;padding:16px;margin-top:12px;display:flex;justify-content:space-between;align-items:center">
        <div><div style="font-size:14px;font-weight:700;color:#DC2626">⚠️ דיווחים פתוחים</div><div style="font-size:12px;color:#EF4444">מחכים לטיפול</div></div>
        <div style="font-size:32px;font-weight:800;color:#DC2626">${n(openReports)}</div>
       </div>`
    : `<div style="background:#F0FAF5;border-radius:12px;padding:14px;margin-top:12px;text-align:center;color:#1D9E75;font-size:14px;font-weight:600">✓ אין דיווחים פתוחים</div>`

  const html = `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:20px;background:#F7F6F2;font-family:'Helvetica Neue',Arial,sans-serif;direction:rtl">
<div style="max-width:480px;margin:0 auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">

  <div style="background:linear-gradient(135deg,#1D9E75,#085041);padding:28px;text-align:center">
    <div style="font-size:30px;font-weight:800;color:#fff;letter-spacing:-1px">switch</div>
    <div style="color:rgba(255,255,255,0.75);font-size:13px;margin-top:4px">דוח בוקר — ${dateStr}</div>
  </div>

  <div style="padding:24px">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">

      <div style="background:#F0FAF5;border-radius:14px;padding:18px;text-align:center">
        <div style="font-size:36px;font-weight:800;color:#1D9E75;line-height:1">${n(newUsers)}</div>
        <div style="font-size:13px;font-weight:600;color:#18181A;margin-top:4px">הרשמות חדשות</div>
        <div style="font-size:11px;color:#A0A09A">24 שעות אחרונות</div>
      </div>

      <div style="background:#F7F6F2;border-radius:14px;padding:18px;text-align:center">
        <div style="font-size:36px;font-weight:800;color:#18181A;line-height:1">${n(totalUsers)}</div>
        <div style="font-size:13px;font-weight:600;color:#18181A;margin-top:4px">סה״כ משתמשים</div>
        <div style="font-size:11px;color:#A0A09A">מצטבר</div>
      </div>

      <div style="background:#F7F6F2;border-radius:14px;padding:18px;text-align:center">
        <div style="font-size:36px;font-weight:800;color:#18181A;line-height:1">${n(newDeals)}</div>
        <div style="font-size:13px;font-weight:600;color:#18181A;margin-top:4px">דילים חדשים</div>
        <div style="font-size:11px;color:#A0A09A">24 שעות אחרונות</div>
      </div>

      <div style="background:#F0FAF5;border-radius:14px;padding:18px;text-align:center">
        <div style="font-size:36px;font-weight:800;color:#1D9E75;line-height:1">${n(completedDeals)}</div>
        <div style="font-size:13px;font-weight:600;color:#18181A;margin-top:4px">דילים הושלמו</div>
        <div style="font-size:11px;color:#A0A09A">24 שעות אחרונות</div>
      </div>

    </div>

    <div style="background:#F7F6F2;border-radius:14px;padding:16px;margin-top:12px;display:flex;justify-content:space-between;align-items:center">
      <div>
        <div style="font-size:14px;font-weight:600;color:#18181A">משתמשים פעילים</div>
        <div style="font-size:12px;color:#A0A09A">שלחו הודעה ב-7 ימים האחרונים</div>
      </div>
      <div style="font-size:32px;font-weight:800;color:#18181A">${n(activeUsers)}</div>
    </div>

    ${reportsBlock}
  </div>

  <div style="background:#F7F6F2;padding:16px 24px;text-align:center;border-top:1px solid rgba(0,0,0,0.06)">
    <a href="https://supabase.com/dashboard/project/ubrsnymjvgasneeuqewv/editor" style="color:#1D9E75;font-size:13px;text-decoration:none;font-weight:500">פתח Supabase Dashboard →</a>
  </div>

</div>
</body>
</html>`

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_KEY}` },
    body: JSON.stringify({
      from: 'switch <hello@switch-app.co>',
      to: REPORT_EMAIL,
      subject: `switch ☀️ ${now.toLocaleDateString('he-IL')} — ${n(newUsers)} הרשמות, ${n(newDeals)} דילים${n(openReports) > 0 ? ` ⚠️ ${n(openReports)} דיווחים` : ''}`,
      html,
    }),
  })

  return new Response(JSON.stringify({ ok: true, sent_to: REPORT_EMAIL }), { status: 200 })
})
