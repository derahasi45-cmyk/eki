/*
  # Create team_members table

  1. New Tables
    - `team_members`
      - `id` (text, primary key)
      - `vendor_id` (text)
      - `name` (text)
      - `role` (text)
      - `email` (text)
      - `phone` (text)
      - `standard_fee` (numeric)
      - `no_rek` (text, optional)
      - `reward_balance` (numeric)
      - `rating` (numeric, 1-5)
      - `performance_notes` (jsonb)
      - `portal_access_id` (text, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `team_members` table
    - Add policies for vendor access
*/

CREATE TABLE IF NOT EXISTS team_members (
  id text PRIMARY KEY,
  vendor_id text NOT NULL,
  name text NOT NULL,
  role text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  standard_fee numeric NOT NULL DEFAULT 0,
  no_rek text,
  reward_balance numeric NOT NULL DEFAULT 0,
  rating numeric NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  performance_notes jsonb DEFAULT '[]'::jsonb,
  portal_access_id text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage vendor team_members"
  ON team_members
  FOR ALL
  TO authenticated
  USING (vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()));