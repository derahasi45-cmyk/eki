/*
  # Create transactions table

  1. New Tables
    - `transactions`
      - `id` (text, primary key)
      - `vendor_id` (text)
      - `date` (date)
      - `description` (text)
      - `amount` (numeric)
      - `type` (text, Pemasukan or Pengeluaran)
      - `project_id` (text, optional)
      - `category` (text)
      - `method` (text)
      - `pocket_id` (text, optional)
      - `card_id` (text, optional)
      - `printing_item_id` (text, optional)
      - `vendor_signature` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `transactions` table
    - Add policies for vendor access
*/

CREATE TABLE IF NOT EXISTS transactions (
  id text PRIMARY KEY,
  vendor_id text NOT NULL,
  date date NOT NULL,
  description text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  type text NOT NULL CHECK (type IN ('Pemasukan', 'Pengeluaran')),
  project_id text,
  category text NOT NULL,
  method text NOT NULL DEFAULT 'Transfer Bank' CHECK (method IN ('Transfer Bank', 'Tunai', 'E-Wallet', 'Sistem', 'Kartu')),
  pocket_id text,
  card_id text,
  printing_item_id text,
  vendor_signature text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage vendor transactions"
  ON transactions
  FOR ALL
  TO authenticated
  USING (vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()));