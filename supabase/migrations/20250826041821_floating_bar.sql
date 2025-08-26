/*
  # Create packages and add_ons tables

  1. New Tables
    - `packages`
      - `id` (text, primary key)
      - `vendor_id` (text)
      - `name` (text)
      - `price` (numeric)
      - `category` (text)
      - `physical_items` (jsonb)
      - `digital_items` (jsonb)
      - `processing_time` (text)
      - `photographers` (text, optional)
      - `videographers` (text, optional)
      - `cover_image` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `add_ons`
      - `id` (text, primary key)
      - `vendor_id` (text)
      - `name` (text)
      - `price` (numeric)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on both tables
    - Add policies for vendor access
*/

CREATE TABLE IF NOT EXISTS packages (
  id text PRIMARY KEY,
  vendor_id text NOT NULL,
  name text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  category text NOT NULL DEFAULT '',
  physical_items jsonb DEFAULT '[]'::jsonb,
  digital_items jsonb DEFAULT '[]'::jsonb,
  processing_time text DEFAULT '',
  photographers text,
  videographers text,
  cover_image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS add_ons (
  id text PRIMARY KEY,
  vendor_id text NOT NULL,
  name text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE add_ons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage vendor packages"
  ON packages
  FOR ALL
  TO authenticated
  USING (vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage vendor add_ons"
  ON add_ons
  FOR ALL
  TO authenticated
  USING (vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()));