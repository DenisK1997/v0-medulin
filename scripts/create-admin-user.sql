-- Create admin user in Supabase Auth
-- Email: admin@majstoric.com
-- Password: admin123

-- Insert the admin user into auth.users
-- Note: This script should be run in the Supabase SQL Editor
-- The password will be hashed automatically by Supabase

INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token,
  recovery_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@majstoric.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"role":"admin"}',
  false,
  '',
  ''
);

-- Alternatively, you can create the user via the setup page at /admin/setup
