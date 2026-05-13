-- Migration: posts, likes, comments tables

create table if not exists posts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references profiles(id) on delete cascade not null,
  text        text not null,
  created_at  timestamptz default now()
);

create table if not exists post_likes (
  id          uuid primary key default gen_random_uuid(),
  post_id     uuid references posts(id) on delete cascade not null,
  user_id     uuid references profiles(id) on delete cascade not null,
  created_at  timestamptz default now(),
  unique(post_id, user_id)
);

create table if not exists post_comments (
  id          uuid primary key default gen_random_uuid(),
  post_id     uuid references posts(id) on delete cascade not null,
  user_id     uuid references profiles(id) on delete cascade not null,
  text        text not null,
  created_at  timestamptz default now()
);

alter table posts          enable row level security;
alter table post_likes     enable row level security;
alter table post_comments  enable row level security;

create policy "posts_select"   on posts for select using (true);
create policy "posts_insert"   on posts for insert with check (auth.uid() = user_id);
create policy "posts_delete"   on posts for delete using (auth.uid() = user_id);

create policy "likes_select"   on post_likes for select using (true);
create policy "likes_insert"   on post_likes for insert with check (auth.uid() = user_id);
create policy "likes_delete"   on post_likes for delete using (auth.uid() = user_id);

create policy "comments_select" on post_comments for select using (true);
create policy "comments_insert" on post_comments for insert with check (auth.uid() = user_id);
create policy "comments_delete" on post_comments for delete using (auth.uid() = user_id);
