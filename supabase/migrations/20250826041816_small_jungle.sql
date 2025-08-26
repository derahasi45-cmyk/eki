/*
  # Create clients table

  1. New Tables
    - `clients`
      - `id` (text, primary key)
      - `vendor_id` (text)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `whatsapp` (text, optional)
      - `instagram` (text, optional)
      - `client_type` (text)
      - `since` (date)
      - `status` (text)
      - `last_contact` (timestamp)
      - `portal_access_id` (text, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `clients` table
    - Add policies for vendor access
*/

CREATE TABLE IF NOT EXISTS clients (
  id text PRIMARY KEY,
  vendor_id text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  whatsapp text,
  instagram text,
  client_type text NOT NULL DEFAULT 'Langsung' CHECK (client_type IN ('Langsung', 'Vendor')),
  since date NOT NULL DEFAULT CURRENT_DATE,
  status text NOT NULL DEFAULT 'Aktif' CHECK (status IN ('Prospek', 'Aktif', 'Tidak Aktif', 'Hilang')),
  last_contact timestamptz NOT NULL DEFAULT now(),
  portal_access_id text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage vendor clients"
  ON clients
  FOR ALL
  TO authenticated
  USING (vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()));