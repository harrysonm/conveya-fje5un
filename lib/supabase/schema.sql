-- Enable RLS
alter table forms enable row level security;
alter table responses enable row level security;

-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create forms table
create table forms (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  title text not null,
  description text,
  fields jsonb not null default '[]'::jsonb,
  theme_settings jsonb,
  button_settings jsonb,
  responses_count integer default 0,
  deleted_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create responses table
create table responses (
  id uuid default uuid_generate_v4() primary key,
  form_id uuid references forms not null,
  data jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create RLS policies
create policy "Users can view own profile"
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

create policy "Users can view own forms"
  on forms for select
  using ( auth.uid() = user_id );

create policy "Users can create forms"
  on forms for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own forms"
  on forms for update
  using ( auth.uid() = user_id );

create policy "Users can delete own forms"
  on forms for delete
  using ( auth.uid() = user_id );

create policy "Users can view responses to their forms"
  on responses for select
  using (
    exists (
      select 1 from forms
      where forms.id = responses.form_id
      and forms.user_id = auth.uid()
    )
  );

create policy "Users can create responses to forms"
  on responses for insert
  with check (
    exists (
      select 1 from forms
      where forms.id = responses.form_id
      and forms.user_id = auth.uid()
    )
  );

-- Create functions
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

-- Create triggers
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();