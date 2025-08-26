/*
  # Create leads table

  1. New Tables
    - `leads`
      - `id` (text, primary key)
      - `vendor_id` (text)
      - `name` (text)
      - `contact_channel` (text)
      - `location` (text)
      - `status` (text)
      - `date` (date)
      - `notes` (text, optional)
      - `whatsapp` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `leads` table
    - Add policies for vendor access
*/

CREATE TABLE IF NOT EXISTS leads (
  id text PRIMARY KEY,
  vendor_id text NOT NULL,
  name text NOT NULL,
  contact_channel text NOT NULL CHECK (contact_channel IN ('WhatsApp', 'Instagram', 'Website', 'Telepon', 'Referensi', 'Form Saran', 'Lainnya')),
  location text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'Sedang Diskusi' CHECK (status IN ('Sedang Diskusi', 'Menunggu Follow Up', 'Dikonversi', 'Ditolak')),
  date date NOT NULL,
  notes text,
  whatsapp text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage vendor leads"
  ON leads
  FOR ALL
  TO authenticated
  USING (vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()));