-- ── SEARCH ALERTS ──
-- Run in: https://supabase.com/dashboard/project/ubrsnymjvgasneeuqewv/sql

CREATE TABLE IF NOT EXISTS search_alerts (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category    text NOT NULL,
  subcategory text,
  custom_text text,
  city        text,
  min_rating  numeric DEFAULT 0,
  min_reviews int     DEFAULT 0,
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE search_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sa_all" ON search_alerts
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- RPC: called after a new service is inserted; notifies matching alert owners
CREATE OR REPLACE FUNCTION notify_search_alerts(p_service_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  svc_name      text;
  svc_desc      text;
  svc_cat       text;
  svc_location  text;
  svc_user_id   uuid;
  svc_owner     text;
  alert_rec     RECORD;
BEGIN
  SELECT s.name, s.description, s.category, p.location, s.user_id, p.name
    INTO svc_name, svc_desc, svc_cat, svc_location, svc_user_id, svc_owner
    FROM services s
    JOIN profiles p ON p.id = s.user_id
   WHERE s.id = p_service_id;

  IF NOT FOUND THEN RETURN; END IF;

  FOR alert_rec IN
    SELECT * FROM search_alerts
    WHERE user_id  != svc_user_id
      AND category  = svc_cat
  LOOP
    -- subcategory filter
    IF alert_rec.subcategory IS NOT NULL AND alert_rec.subcategory != '' THEN
      IF lower(svc_name) NOT LIKE '%' || lower(alert_rec.subcategory) || '%'
         AND lower(coalesce(svc_desc,'')) NOT LIKE '%' || lower(alert_rec.subcategory) || '%'
      THEN CONTINUE; END IF;
    END IF;

    -- custom keyword filter
    IF alert_rec.custom_text IS NOT NULL AND alert_rec.custom_text != '' THEN
      IF lower(svc_name) NOT LIKE '%' || lower(alert_rec.custom_text) || '%'
         AND lower(coalesce(svc_desc,'')) NOT LIKE '%' || lower(alert_rec.custom_text) || '%'
      THEN CONTINUE; END IF;
    END IF;

    -- city filter
    IF alert_rec.city IS NOT NULL AND alert_rec.city != '' THEN
      IF lower(coalesce(svc_location,'')) NOT LIKE '%' || lower(alert_rec.city) || '%'
      THEN CONTINUE; END IF;
    END IF;

    INSERT INTO notifications (user_id, type, title, body, data)
    VALUES (
      alert_rec.user_id,
      'search_alert_match',
      '🔔 New ' || svc_cat || ' skill found!',
      svc_owner || ' offers: ' || svc_name,
      jsonb_build_object('user_id', svc_user_id::text, 'service_id', p_service_id::text)
    );
  END LOOP;
END;
$$;
