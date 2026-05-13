-- Migration: notifications table

create table if not exists notifications (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references profiles(id) on delete cascade not null,
  type        text not null,
  title       text not null,
  body        text default '',
  is_read     boolean default false,
  created_at  timestamptz default now()
);

alter table notifications enable row level security;

create policy "notifs_select" on notifications for select using (auth.uid() = user_id);
create policy "notifs_insert" on notifications for insert with check (true);
create policy "notifs_update" on notifications for update using (auth.uid() = user_id);
create policy "notifs_delete" on notifications for delete using (auth.uid() = user_id);
