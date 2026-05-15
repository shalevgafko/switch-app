# How to Enable the Daily Report

## Deploy the function (one-time, do now)

```bash
supabase functions deploy daily-report
```

Or via Supabase Dashboard → Edge Functions → Deploy.

---

## Test manually (before enabling the cron)

```bash
curl -X POST https://ubrsnymjvgasneeuqewv.supabase.co/functions/v1/daily-report \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVicnNueW1qdmdhc25lZXVxZXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MTQxMjQsImV4cCI6MjA5NDE5MDEyNH0.lsX9FHS_buvEUq7T8q4Vrq3tLFbiQJHxRFgssdVICEs"
```

You should receive an email at shalevgafko@gmail.com within ~10 seconds.

---

## Enable the cron (run this when app launches)

Go to Supabase Dashboard → SQL Editor, and run:

```sql
-- Every day at 08:00 Israel time (= 05:00 UTC in winter, 06:00 UTC in summer)
select cron.schedule(
  'daily-switch-report',
  '0 6 * * *',
  $$
  select net.http_post(
    url := 'https://ubrsnymjvgasneeuqewv.supabase.co/functions/v1/daily-report',
    headers := '{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVicnNueW1qdmdhc25lZXVxZXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MTQxMjQsImV4cCI6MjA5NDE5MDEyNH0.lsX9FHS_buvEUq7T8q4Vrq3tLFbiQJHxRFgssdVICEs"}'::jsonb
  ) as request_id;
  $$
);
```

---

## Disable the cron (if needed)

```sql
select cron.unschedule('daily-switch-report');
```

---

## Change the time

Edit `'0 6 * * *'` — format is `minute hour * * *` in UTC.
- 08:00 Israel winter (UTC+2) = 06:00 UTC → `0 6 * * *`
- 08:00 Israel summer (UTC+3) = 05:00 UTC → `0 5 * * *`
