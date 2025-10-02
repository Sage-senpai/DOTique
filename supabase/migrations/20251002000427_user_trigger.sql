-- Function to auto-insert into public.users when a new auth.users row is created
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (auth_uid, username, email, display_name)
  values (
    new.id,
    split_part(new.email, '@', 1), -- default username = email prefix
    new.email,
    initcap(split_part(new.email, '@', 1)) -- default display name = email prefix
  )
  on conflict (auth_uid) do nothing;
  return new;
end;
$$;

-- Trigger: after a new auth.users row is created
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure handle_new_user();
