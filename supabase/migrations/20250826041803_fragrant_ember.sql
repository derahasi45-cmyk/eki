/*
  # Create profiles table

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `vendor_id` (text, unique)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `company_name` (text)
      - `website` (text)
      - `address` (text)
      - `bank_account` (text)
      - `authorized_signer` (text)
      - `id_number` (text, optional)
      - `bio` (text)
      - `income_categories` (jsonb)
      - `expense_categories` (jsonb)
      - `project_types` (jsonb)
      - `event_types` (jsonb)
      - `asset_categories` (jsonb)
      - `sop_categories` (jsonb)
      - `package_categories` (jsonb)
      - `project_status_config` (jsonb)
      - `notification_settings` (jsonb)
      - `security_settings` (jsonb)
      - `briefing_template` (text)
      - `terms_and_conditions` (text)
      - `contract_template` (text)
      - `logo_base64` (text)
      - `brand_color` (text)
      - `public_page_config` (jsonb)
      - `package_share_template` (text)
      - `booking_form_template` (text)
      - `chat_templates` (jsonb)
      - `current_plan_id` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `profiles` table
    - Add policies for vendor access
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id text UNIQUE NOT NULL,
  full_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  company_name text NOT NULL DEFAULT '',
  website text DEFAULT '',
  address text DEFAULT '',
  bank_account text DEFAULT '',
  authorized_signer text DEFAULT '',
  id_number text,
  bio text DEFAULT '',
  income_categories jsonb DEFAULT '[]'::jsonb,
  expense_categories jsonb DEFAULT '[]'::jsonb,
  project_types jsonb DEFAULT '[]'::jsonb,
  event_types jsonb DEFAULT '[]'::jsonb,
  asset_categories jsonb DEFAULT '[]'::jsonb,
  sop_categories jsonb DEFAULT '[]'::jsonb,
  package_categories jsonb DEFAULT '[]'::jsonb,
  project_status_config jsonb DEFAULT '[]'::jsonb,
  notification_settings jsonb DEFAULT '{}'::jsonb,
  security_settings jsonb DEFAULT '{}'::jsonb,
  briefing_template text DEFAULT '',
  terms_and_conditions text,
  contract_template text,
  logo_base64 text,
  brand_color text DEFAULT '#3b82f6',
  public_page_config jsonb DEFAULT '{}'::jsonb,
  package_share_template text,
  booking_form_template text,
  chat_templates jsonb DEFAULT '[]'::jsonb,
  current_plan_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own vendor profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can update own vendor profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Admins can manage vendor profile"
  ON profiles
  FOR ALL
  TO authenticated
  USING (
    vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()) AND
    (SELECT role FROM users WHERE id = auth.uid()) = 'Admin'
  );