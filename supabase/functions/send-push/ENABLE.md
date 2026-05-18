# How to Enable Push Notifications

## Step 1 — Run the SQL migration

Go to [Supabase SQL Editor](https://supabase.com/dashboard/project/ubrsnymjvgasneeuqewv/sql) and run the contents of:
`supabase/migrations/003_push_subscriptions.sql`

## Step 2 — Add the VAPID private key secret

Go to [Supabase Edge Function Secrets](https://supabase.com/dashboard/project/ubrsnymjvgasneeuqewv/settings/vault) and add:

| Name | Value |
|------|-------|
| `VAPID_PRIVATE_KEY` | `h3inQCcyn_gldo4ElluoQ7YeCbE4S9sKpOGDVw1BlPg` |

## Step 3 — Deploy the Edge Function

```bash
cd C:\Users\User\Desktop\switch-app
supabase functions deploy send-push
```

Or paste `index.ts` contents manually in [Supabase Dashboard → Edge Functions](https://supabase.com/dashboard/project/ubrsnymjvgasneeuqewv/functions).

## Step 4 — Test

Open the app on your phone (must be installed as PWA). You should see a "Allow notifications" prompt. Accept it.

Then trigger a notification from another account (e.g., send a request). The push should arrive on the phone even when the app is closed.

---

## VAPID Keys (keep private key secret!)

- **Public**: `BL60BjCz_9AsBdRVlvT_ncmf5LbNmGiB55j1a2TLrS8slcNlrCVVlwIAhWQy_JV79z8t2o-NPF9lBaDq_eohzVA`
- **Private**: stored in Supabase Vault only — never commit to git
