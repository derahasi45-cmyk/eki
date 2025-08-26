/*
  # Create financial tables

  1. New Tables
    - `cards`
      - `id` (text, primary key)
      - `vendor_id` (text)
      - `card_holder_name` (text)
      - `bank_name` (text)
      - `card_type` (text)
      - `last_four_digits` (text)
      - `expiry_date` (text, optional)
      - `balance` (numeric)
      - `color_gradient` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `financial_pockets`
      - `id` (text, primary key)
      - `vendor_id` (text)
      - `name` (text)
      - `description` (text)
      - `icon` (text)
      - `type` (text)
      - `amount` (numeric)
      - `goal_amount` (numeric, optional)
      - `lock_end_date` (date, optional)
      - `members` (jsonb, optional)
      - `source_card_id` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on both tables
    - Add policies for vendor access
*/

CREATE TABLE IF NOT EXISTS cards (
  id text PRIMARY KEY,
  vendor_id text NOT NULL,
  card_holder_name text NOT NULL,
  bank_name text NOT NULL,
  card_type text NOT NULL CHECK (card_type IN ('Prabayar', 'Kredit', 'Debit', 'Tunai')),
  last_four_digits text NOT NULL,
  expiry_date text,
  balance numeric NOT NULL DEFAULT 0,
  color_gradient text NOT NULL DEFAULT 'from-blue-500 to-sky-400',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS financial_pockets (
  id text PRIMARY KEY,
  vendor_id text NOT NULL,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT 'piggy-bank' CHECK (icon IN ('piggy-bank', 'lock', 'users', 'clipboard-list', 'star')),
  type text NOT NULL CHECK (type IN ('Nabung & Bayar', 'Terkunci', 'Bersama', 'Anggaran Pengeluaran', 'Tabungan Hadiah Freelancer')),
  amount numeric NOT NULL DEFAULT 0,
  goal_amount numeric,
  lock_end_date date,
  members jsonb DEFAULT '[]'::jsonb,
  source_card_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_pockets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage vendor cards"
  ON cards
  FOR ALL
  TO authenticated
  USING (vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage vendor financial_pockets"
  ON financial_pockets
  FOR ALL
  TO authenticated
  USING (vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()));