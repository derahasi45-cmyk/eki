/*
  # Create team payment tables

  1. New Tables
    - `team_project_payments`
      - `id` (text, primary key)
      - `vendor_id` (text)
      - `project_id` (text)
      - `team_member_name` (text)
      - `team_member_id` (text)
      - `date` (date)
      - `status` (text)
      - `fee` (numeric)
      - `reward` (numeric, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `team_payment_records`
      - `id` (text, primary key)
      - `vendor_id` (text)
      - `record_number` (text)
      - `team_member_id` (text)
      - `date` (date)
      - `project_payment_ids` (jsonb)
      - `total_amount` (numeric)
      - `vendor_signature` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `reward_ledger_entries`
      - `id` (text, primary key)
      - `vendor_id` (text)
      - `team_member_id` (text)
      - `date` (date)
      - `description` (text)
      - `amount` (numeric)
      - `project_id` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on all tables
    - Add policies for vendor access
*/

CREATE TABLE IF NOT EXISTS team_project_payments (
  id text PRIMARY KEY,
  vendor_id text NOT NULL,
  project_id text NOT NULL,
  team_member_name text NOT NULL,
  team_member_id text NOT NULL,
  date date NOT NULL,
  status text NOT NULL DEFAULT 'Unpaid' CHECK (status IN ('Paid', 'Unpaid')),
  fee numeric NOT NULL DEFAULT 0,
  reward numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS team_payment_records (
  id text PRIMARY KEY,
  vendor_id text NOT NULL,
  record_number text NOT NULL,
  team_member_id text NOT NULL,
  date date NOT NULL,
  project_payment_ids jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_amount numeric NOT NULL DEFAULT 0,
  vendor_signature text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reward_ledger_entries (
  id text PRIMARY KEY,
  vendor_id text NOT NULL,
  team_member_id text NOT NULL,
  date date NOT NULL,
  description text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  project_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE team_project_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_payment_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_ledger_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage vendor team_project_payments"
  ON team_project_payments
  FOR ALL
  TO authenticated
  USING (vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage vendor team_payment_records"
  ON team_payment_records
  FOR ALL
  TO authenticated
  USING (vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage vendor reward_ledger_entries"
  ON reward_ledger_entries
  FOR ALL
  TO authenticated
  USING (vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()));