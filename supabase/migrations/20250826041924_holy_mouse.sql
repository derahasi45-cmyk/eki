/*
  # Create additional tables

  1. New Tables
    - `assets`
      - `id` (text, primary key)
      - `vendor_id` (text)
      - `name` (text)
      - `category` (text)
      - `purchase_date` (date)
      - `purchase_price` (numeric)
      - `serial_number` (text, optional)
      - `status` (text)
      - `notes` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `contracts`
      - `id` (text, primary key)
      - `vendor_id` (text)
      - `contract_number` (text)
      - `client_id` (text)
      - `project_id` (text)
      - Contract details and signatures
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `client_feedback`
      - `id` (text, primary key)
      - `vendor_id` (text)
      - `client_name` (text)
      - `satisfaction` (text)
      - `rating` (integer, 1-5)
      - `feedback` (text)
      - `date` (date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `notifications`
      - `id` (text, primary key)
      - `vendor_id` (text)
      - `title` (text)
      - `message` (text)
      - `timestamp` (timestamp)
      - `is_read` (boolean)
      - `icon` (text)
      - `link` (jsonb, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `social_media_posts`
      - `id` (text, primary key)
      - `vendor_id` (text)
      - `project_id` (text)
      - `client_name` (text)
      - `post_type` (text)
      - `platform` (text)
      - `scheduled_date` (date)
      - `caption` (text)
      - `media_url` (text, optional)
      - `status` (text)
      - `notes` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `promo_codes`
      - `id` (text, primary key)
      - `vendor_id` (text)
      - `code` (text)
      - `discount_type` (text)
      - `discount_value` (numeric)
      - `is_active` (boolean)
      - `usage_count` (integer)
      - `max_usage` (integer, optional)
      - `expiry_date` (date, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `sops`
      - `id` (text, primary key)
      - `vendor_id` (text)
      - `title` (text)
      - `category` (text)
      - `content` (text)
      - `last_updated` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on all tables
    - Add policies for vendor access
*/

CREATE TABLE IF NOT EXISTS assets (
  id text PRIMARY KEY,
  vendor_id text NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  purchase_date date NOT NULL,
  purchase_price numeric NOT NULL DEFAULT 0,
  serial_number text,
  status text NOT NULL DEFAULT 'Tersedia' CHECK (status IN ('Tersedia', 'Digunakan', 'Perbaikan')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contracts (
  id text PRIMARY KEY,
  vendor_id text NOT NULL,
  contract_number text NOT NULL,
  client_id text NOT NULL,
  project_id text NOT NULL,
  signing_date date NOT NULL,
  signing_location text NOT NULL DEFAULT '',
  client_name1 text NOT NULL,
  client_address1 text NOT NULL DEFAULT '',
  client_phone1 text NOT NULL DEFAULT '',
  client_name2 text DEFAULT '',
  client_address2 text DEFAULT '',
  client_phone2 text DEFAULT '',
  shooting_duration text NOT NULL DEFAULT '',
  guaranteed_photos text NOT NULL DEFAULT '',
  album_details text NOT NULL DEFAULT '',
  digital_files_format text NOT NULL DEFAULT 'JPG High-Resolution',
  other_items text NOT NULL DEFAULT '',
  personnel_count text NOT NULL DEFAULT '',
  delivery_timeframe text NOT NULL DEFAULT '30 hari kerja',
  dp_date date,
  final_payment_date date,
  cancellation_policy text NOT NULL DEFAULT '',
  jurisdiction text NOT NULL DEFAULT '',
  vendor_signature text,
  client_signature text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS client_feedback (
  id text PRIMARY KEY,
  vendor_id text NOT NULL,
  client_name text NOT NULL,
  satisfaction text NOT NULL CHECK (satisfaction IN ('Sangat Puas', 'Puas', 'Biasa Saja', 'Tidak Puas')),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback text NOT NULL,
  date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notifications (
  id text PRIMARY KEY,
  vendor_id text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  timestamp timestamptz NOT NULL DEFAULT now(),
  is_read boolean NOT NULL DEFAULT false,
  icon text NOT NULL CHECK (icon IN ('lead', 'deadline', 'revision', 'feedback', 'payment', 'completed', 'comment')),
  link jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS social_media_posts (
  id text PRIMARY KEY,
  vendor_id text NOT NULL,
  project_id text NOT NULL,
  client_name text NOT NULL,
  post_type text NOT NULL CHECK (post_type IN ('Instagram Feed', 'Instagram Story', 'Instagram Reels', 'TikTok Video', 'Artikel Blog')),
  platform text NOT NULL CHECK (platform IN ('Instagram', 'TikTok', 'Website')),
  scheduled_date date NOT NULL,
  caption text NOT NULL DEFAULT '',
  media_url text,
  status text NOT NULL DEFAULT 'Draf' CHECK (status IN ('Draf', 'Terjadwal', 'Diposting', 'Dibatalkan')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS promo_codes (
  id text PRIMARY KEY,
  vendor_id text NOT NULL,
  code text NOT NULL,
  discount_type text NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value numeric NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  usage_count integer NOT NULL DEFAULT 0,
  max_usage integer,
  expiry_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sops (
  id text PRIMARY KEY,
  vendor_id text NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  content text NOT NULL,
  last_updated timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_media_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sops ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage vendor assets"
  ON assets
  FOR ALL
  TO authenticated
  USING (vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage vendor contracts"
  ON contracts
  FOR ALL
  TO authenticated
  USING (vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage vendor client_feedback"
  ON client_feedback
  FOR ALL
  TO authenticated
  USING (vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage vendor notifications"
  ON notifications
  FOR ALL
  TO authenticated
  USING (vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage vendor social_media_posts"
  ON social_media_posts
  FOR ALL
  TO authenticated
  USING (vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage vendor promo_codes"
  ON promo_codes
  FOR ALL
  TO authenticated
  USING (vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage vendor sops"
  ON sops
  FOR ALL
  TO authenticated
  USING (vendor_id = (SELECT vendor_id FROM users WHERE id = auth.uid()));