-- ── PUSH SUBSCRIPTIONS ──
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/ubrsnymjvgasneeuqewv/sql

CREATE TABLE IF NOT EXISTS push_subscriptions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint    text NOT NULL,
  subscription jsonb NOT NULL,
  created_at  timestamptz DEFAULT now(),
  UNIQUE (user_id, endpoint)
);

ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ps_select" ON push_subscriptions FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "ps_insert" ON push_subscriptions FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "ps_update" ON push_subscriptions FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "ps_delete" ON push_subscriptions FOR DELETE USING (user_id = auth.uid());
