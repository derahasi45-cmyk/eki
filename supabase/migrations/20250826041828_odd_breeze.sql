/*
  # Create projects table

  1. New Tables
    - `projects`
      - `id` (text, primary key)
      - `vendor_id` (text)
      - `project_name` (text)
      - `client_name` (text)
      - `client_id` (text)
      - `project_type` (text)
      - `package_name` (text)
      - `package_id` (text)
      - `add_ons` (jsonb)
      - `date` (date)
      - `deadline_date` (date, optional)
      - `location` (text)
      - `progress` (integer, 0-100)
      - `status` (text)
      - `active_sub_statuses` (jsonb, optional)
      - `total_cost` (numeric)
      - `amount_paid` (numeric)
      - `payment_status` (text)
      - `team` (jsonb)
      - `notes` (text, optional)
      - `accommodation` (text, optional)
      - `drive_link` (text, optional)
      - `client_drive_link` (text, optional)
      - `final_drive_link` (text, optional)
      - `start_time` (text, optional)
      - `end_time` (text, optional)
      - `image` (text, optional)
      - `revisions` (jsonb, optional)
      - `promo_code_id` (text, optional)
      - `discount_amount` (numeric, optional)
      - `shipping_details` (text, optional)
      - `dp_proof_url` (text, optional)
      - `printing_details` (jsonb, optional)
      - `printing_cost` (numeric, optional)
      - `transport_cost` (numeric, optional)
      - `booking_status` (text, optional)
      - `rejection_reason` (text, optional)
      - `chat_history` (jsonb, optional)
      - `invoice_signature` (text, optional)
      - Various confirmation fields (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `projects` table
    - Add policies for vendor access
*/

CREATE TABLE IF NOT EXISTS projects (
  id text PRIMARY KEY,
  vendor_id text NOT NULL,
  project_name text NOT NULL,
  client_name text NOT NULL,
  client_id text NOT NULL,
  project_type text NOT NULL,
  package_name text NOT NULL,
  package_id text NOT NULL,
  add_ons jsonb DEFAULT '[]'::jsonb,
  date date NOT NULL,
  deadline_date date,
  location text NOT NULL DEFAULT '',
  progress integer NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  status text NOT NULL DEFAULT 'Dikonfirmasi',
  active_sub_statuses jsonb DEFAULT '[]'::jsonb,
  total_cost numeric NOT NULL DEFAULT 0,
  amount_paid numeric NOT NULL DEFAULT 0,
  payment_status text NOT NULL DEFAULT 'Belum Bayar' CHECK (payment_status IN ('Lunas', 'DP Terbayar', 'Belum Bayar')),
  team jsonb DEFAULT '[]'::jsonb,
  notes text,
  accommodation text,
  drive_link text,
  client_drive_link text,
  final_drive_link text,
  start_time text,
  end_time text,
  image text,
  revisions jsonb DEFAULT '[]'::jsonb,
  promo_code_id text,
  discount_amount numeric DEFAULT 0,
  shipping_details text,
  dp_proof_url text,
  printing_details jsonb DEFAULT '[]'::jsonb,
  printing_cost numeric DEFAULT 0,
  transport_cost numeric DEFAULT 0,
  booking_status text CHECK (booking_status IN ('Baru', 'Terkonfirmasi', 'Ditolak')),
  rejection_reason text,
  chat_history jsonb DEFAULT '[]'::jsonb,
  invoice_signature text,
  is_editing_confirmed_by_client boolean DEFAULT false,
  is_printing_confirmed_by_client boolean DEFAULT false,
  is_delivery_confirmed_by_client boolean DEFAULT false,
  confirmed_sub_statuses jsonb DEFAULT '[]'::jsonb,
  client_sub_status_notes jsonb DEFAULT '{}'::jsonb,
  sub_status_confirmation_sent_at jsonb DEFAULT '{}'::jsonb,
  completed_digital_items jsonb DEFAULT '[]'::jsonb,
  custom_sub_statuses jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage vendor projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()));