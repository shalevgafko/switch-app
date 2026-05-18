import webpush from 'npm:web-push'
import { createClient } from 'npm:@supabase/supabase-js'

const VAPID_PUBLIC = 'BL60BjCz_9AsBdRVlvT_ncmf5LbNmGiB55j1a2TLrS8slcNlrCVVlwIAhWQy_JV79z8t2o-NPF9lBaDq_eohzVA'
const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' }

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  try {
    const vapidPrivate = Deno.env.get('VAPID_PRIVATE_KEY')
    if (!vapidPrivate) throw new Error('VAPID_PRIVATE_KEY secret not set')

    webpush.setVapidDetails('mailto:shalevgafko@gmail.com', VAPID_PUBLIC, vapidPrivate)

    const { user_id, title, body, url, tag } = await req.json()
    if (!user_id) return new Response(JSON.stringify({ error: 'missing user_id' }), { status: 400, headers: { ...CORS, 'Content-Type': 'application/json' } })

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { data: subs } = await supabase
      .from('push_subscriptions')
      .select('subscription')
      .eq('user_id', user_id)

    if (!subs?.length) return new Response(JSON.stringify({ sent: 0 }), { headers: { ...CORS, 'Content-Type': 'application/json' } })

    const payload = JSON.stringify({
      title: title || 'switch ⇄',
      body: body || '',
      url: url || 'https://shalevgafko.github.io/switch-app/',
      tag: tag || 'switch-notif'
    })

    const results = await Promise.allSettled(
      subs.map((row: { subscription: PushSubscriptionJSON }) =>
        webpush.sendNotification(row.subscription, payload)
      )
    )

    const sent = results.filter(r => r.status === 'fulfilled').length
    return new Response(JSON.stringify({ sent }), { headers: { ...CORS, 'Content-Type': 'application/json' } })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' } })
  }
})
