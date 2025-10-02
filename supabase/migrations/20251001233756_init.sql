-- Users (extends Supabase auth.users)
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  auth_uid uuid references auth.users(id) on delete cascade,
  username varchar(50) unique,
  email varchar(255),
  display_name varchar(100),
  profile_image_url text,
  dotvatar_config jsonb,
  polkadot_address varchar(64),
  user_type varchar(20) default 'user',
  created_at timestamptz default now()
);

-- NFTs table
create table if not exists nfts (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid references users(id) on delete set null,
  token_id varchar(100),
  name varchar(200),
  description text,
  ipfs_hash varchar(255),
  image_url text,
  attributes jsonb,
  mint_date timestamptz default now()
);

-- User NFT ownership
create table if not exists user_nft_ownership (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  nft_id uuid references nfts(id) on delete cascade,
  quantity int default 1,
  acquired_at timestamptz default now(),
  unique(user_id, nft_id)
);

-- Posts (for feed)
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  type varchar(50), -- dotvatar | nft | text
  content text,
  media_url text,
  created_at timestamptz default now()
);

-- Messages (for chat)
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references users(id) on delete cascade,
  recipient_id uuid references users(id) on delete cascade,
  content text,
  created_at timestamptz default now(),
  read_at timestamptz
);

-- Follows (social graph)
create table if not exists follows (
  follower_id uuid references users(id) on delete cascade,
  following_id uuid references users(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (follower_id, following_id)
);

-- Voting sessions
create table if not exists voting_sessions (
  id uuid primary key default gen_random_uuid(),
  category varchar(50),
  start_date timestamptz,
  end_date timestamptz,
  status varchar(20) default 'active'
);

-- Votes
create table if not exists votes (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references voting_sessions(id) on delete cascade,
  voter_id uuid references users(id) on delete cascade,
  nft_id uuid references nfts(id) on delete cascade,
  voting_power numeric(10,2),
  created_at timestamptz default now()
);

-- Enable RLS
alter table users enable row level security;
alter table posts enable row level security;
alter table messages enable row level security;

-- RLS policies
create policy "users can view self" on users
  for select using (auth.uid() = auth_uid);

create policy "users can insert self" on users
  for insert with check (auth.uid() = auth_uid);

create policy "posts are readable by all" on posts
  for select using (true);

create policy "messages are private" on messages
  for select using (
    auth.uid() = sender_id or auth.uid() = recipient_id
  );
