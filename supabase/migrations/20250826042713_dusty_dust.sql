/*
  # Insert mock data for Vena Pictures

  1. Mock Data Insertion
    - Insert sample users (admin and member)
    - Insert sample profile data
    - Insert sample clients
    - Insert sample packages and add-ons
    - Insert sample projects
    - Insert sample team members
    - Insert sample transactions
    - Insert sample leads
    - Insert sample cards and financial pockets
    - Insert sample assets
    - Insert sample contracts
    - Insert sample client feedback
    - Insert sample notifications
    - Insert sample social media posts
    - Insert sample promo codes
    - Insert sample SOPs
  2. Data Relationships
    - Ensure all foreign keys are properly linked
    - Maintain data consistency across tables
*/

-- Insert Users
INSERT INTO users (id, email, password, full_name, company_name, role, permissions, vendor_id) VALUES
('user-admin-001', 'admin@vena.pictures', 'admin', 'Nina Vena', 'Vena Pictures', 'Admin', '[]', 'VEN001'),
('user-member-001', 'member@vena.pictures', 'member', 'Andi Pratama', 'Vena Pictures', 'Member', '["Manajemen Klien", "Proyek", "Freelancer"]', 'VEN001');

-- Insert Profile
INSERT INTO profiles (
  vendor_id, full_name, email, phone, company_name, website, address, bank_account, 
  authorized_signer, bio, income_categories, expense_categories, project_types, 
  event_types, asset_categories, sop_categories, package_categories, 
  project_status_config, notification_settings, security_settings, 
  briefing_template, brand_color, public_page_config, chat_templates
) VALUES (
  'VEN001',
  'Nina Vena',
  'admin@vena.pictures',
  '085693762240',
  'Vena Pictures',
  'https://venapictures.com',
  'Jl. Raya Bogor No. 123, Jakarta Timur',
  'BCA 1234567890 a.n. Nina Vena',
  'Nina Vena',
  'Fotografer profesional dengan pengalaman 5+ tahun dalam dokumentasi pernikahan dan acara korporat.',
  '["DP Proyek", "Pelunasan Proyek", "Penjualan Produk", "Konsultasi", "Lainnya"]',
  '["Peralatan", "Transport", "Akomodasi", "Printing", "Marketing", "Operasional", "Lainnya"]',
  '["Pernikahan", "Lamaran", "Prewedding", "Korporat", "Ulang Tahun", "Produk", "Keluarga"]',
  '["Meeting Klien", "Survey Lokasi", "Libur", "Workshop", "Lainnya"]',
  '["Kamera", "Lensa", "Lighting", "Audio", "Drone", "Aksesoris", "Komputer", "Software"]',
  '["Fotografi", "Videografi", "Editing", "Administrasi", "Marketing"]',
  '["Pernikahan", "Lamaran", "Prewedding", "Korporat", "Ulang Tahun", "Produk", "Keluarga"]',
  '[
    {"id": "1", "name": "Dikonfirmasi", "color": "#10b981", "subStatuses": [], "note": "Proyek telah dikonfirmasi dan siap dimulai"},
    {"id": "2", "name": "Persiapan", "color": "#3b82f6", "subStatuses": [{"name": "Survey Lokasi", "note": "Kunjungi dan evaluasi lokasi acara"}, {"name": "Briefing Tim", "note": "Koordinasi dengan tim fotografer dan videografer"}], "note": "Tahap persiapan sebelum pelaksanaan"},
    {"id": "3", "name": "Pelaksanaan", "color": "#8b5cf6", "subStatuses": [{"name": "Setup Peralatan", "note": "Persiapan dan pengaturan peralatan di lokasi"}, {"name": "Dokumentasi", "note": "Proses pengambilan foto dan video"}], "note": "Hari pelaksanaan acara"},
    {"id": "4", "name": "Editing", "color": "#f97316", "subStatuses": [{"name": "Seleksi Foto", "note": "Pemilihan foto terbaik untuk diedit"}, {"name": "Color Grading", "note": "Penyesuaian warna dan tone foto"}, {"name": "Video Editing", "note": "Penyuntingan video dan penambahan musik"}], "note": "Proses editing dan post-production"},
    {"id": "5", "name": "Review", "color": "#06b6d4", "subStatuses": [{"name": "Preview Klien", "note": "Klien meninjau hasil sementara"}, {"name": "Revisi", "note": "Perbaikan berdasarkan masukan klien"}], "note": "Tahap review dan revisi dengan klien"},
    {"id": "6", "name": "Printing", "color": "#eab308", "subStatuses": [{"name": "Persiapan File", "note": "Persiapan file untuk cetak"}, {"name": "Proses Cetak", "note": "Pencetakan album dan foto"}], "note": "Proses pencetakan produk fisik"},
    {"id": "7", "name": "Dikirim", "color": "#6366f1", "subStatuses": [{"name": "Packaging", "note": "Pengemasan produk untuk pengiriman"}, {"name": "Pengiriman", "note": "Proses pengiriman ke klien"}], "note": "Pengiriman hasil akhir ke klien"},
    {"id": "8", "name": "Selesai", "color": "#10b981", "subStatuses": [], "note": "Proyek telah selesai dan diserahkan"},
    {"id": "9", "name": "Dibatalkan", "color": "#ef4444", "subStatuses": [], "note": "Proyek dibatalkan"}
  ]',
  '{"newProject": true, "paymentConfirmation": true, "deadlineReminder": true}',
  '{"twoFactorEnabled": false}',
  'Halo {clientName}! Terima kasih telah mempercayakan {projectName} kepada Vena Pictures. Berikut adalah brief lengkap untuk proyek Anda...',
  '#3b82f6',
  '{"template": "modern", "title": "Paket Fotografi & Videografi Terbaik", "introduction": "Abadikan momen berharga Anda dengan layanan fotografi profesional kami.", "galleryImages": []}',
  '[
    {"id": "greeting", "title": "Salam Pembuka", "template": "Halo {clientName}! Terima kasih telah menghubungi {companyName}. Kami siap membantu mewujudkan dokumentasi terbaik untuk {projectName} Anda."},
    {"id": "follow-up", "title": "Follow Up", "template": "Halo {clientName}, bagaimana kabar persiapan {projectName}? Ada yang bisa kami bantu lebih lanjut?"},
    {"id": "reminder", "title": "Pengingat", "template": "Halo {clientName}, ini pengingat untuk {projectName} yang akan dilaksanakan segera. Pastikan semua persiapan sudah siap ya!"},
    {"id": "completion", "title": "Proyek Selesai", "template": "Halo {clientName}! {projectName} telah selesai. Terima kasih telah mempercayakan momen berharga Anda kepada {companyName}!"}
  ]'
);

-- Insert Clients
INSERT INTO clients (id, vendor_id, name, email, phone, whatsapp, instagram, client_type, since, status, last_contact, portal_access_id) VALUES
('CLI001', 'VEN001', 'Budi & Sari', 'budi.sari@email.com', '081234567890', '081234567890', '@budisari_wedding', 'Langsung', '2024-01-15', 'Aktif', '2024-01-20T10:00:00Z', 'portal-cli001'),
('CLI002', 'VEN001', 'PT. Teknologi Maju', 'info@teknologimaju.com', '021-12345678', '081987654321', '@teknologi_maju', 'Vendor', '2024-02-01', 'Aktif', '2024-02-05T14:30:00Z', 'portal-cli002'),
('CLI003', 'VEN001', 'Andi Pratama', 'andi.pratama@email.com', '082345678901', '082345678901', '@andi_pratama', 'Langsung', '2024-03-10', 'Aktif', '2024-03-15T09:15:00Z', 'portal-cli003');

-- Insert Packages
INSERT INTO packages (id, vendor_id, name, price, category, physical_items, digital_items, processing_time, photographers, videographers, cover_image) VALUES
('PKG001', 'VEN001', 'Wedding Premium', 15000000, 'Pernikahan', '[{"name": "Album 30x30 cm (50 halaman)", "price": 2000000}, {"name": "Flashdisk Custom", "price": 500000}]', '["300+ Foto High Resolution", "Video Highlight 5-7 menit", "Video Raw Ceremony"]', '30 hari kerja', '2 Fotografer', '1 Videografer', null),
('PKG002', 'VEN001', 'Engagement Package', 8000000, 'Lamaran', '[{"name": "Album 20x20 cm (30 halaman)", "price": 1500000}]', '["200+ Foto High Resolution", "Video Highlight 3-5 menit"]', '21 hari kerja', '1 Fotografer', '1 Videografer', null),
('PKG003', 'VEN001', 'Prewedding Outdoor', 5000000, 'Prewedding', '[{"name": "Cetak Foto 4R (20 lembar)", "price": 300000}]', '["150+ Foto High Resolution", "Video Cinematic 2-3 menit"]', '14 hari kerja', '1 Fotografer', '1 Videografer', null),
('PKG004', 'VEN001', 'Corporate Event', 12000000, 'Korporat', '[{"name": "USB Drive Custom", "price": 400000}]', '["500+ Foto High Resolution", "Video Dokumentasi 10-15 menit"]', '21 hari kerja', '2 Fotografer', '1 Videografer', null);

-- Insert Add-ons
INSERT INTO add_ons (id, vendor_id, name, price) VALUES
('ADD001', 'VEN001', 'Drone Photography', 2000000),
('ADD002', 'VEN001', 'Make Up Artist', 1500000),
('ADD003', 'VEN001', 'Extra Photographer', 2500000),
('ADD004', 'VEN001', 'Same Day Edit Video', 3000000),
('ADD005', 'VEN001', 'Live Streaming', 4000000);

-- Insert Team Members
INSERT INTO team_members (id, vendor_id, name, role, email, phone, standard_fee, no_rek, reward_balance, rating, performance_notes, portal_access_id) VALUES
('TM001', 'VEN001', 'Reza Photographer', 'Fotografer', 'reza@email.com', '081111111111', 1500000, 'BCA 9876543210', 500000, 4.8, '[{"id": "note1", "date": "2024-01-15", "note": "Excellent work on the Budi & Sari wedding project", "type": "Pujian"}]', 'freelancer-tm001'),
('TM002', 'VEN001', 'Maya Videographer', 'Videografer', 'maya@email.com', '082222222222', 2000000, 'Mandiri 1122334455', 750000, 4.9, '[{"id": "note2", "date": "2024-02-01", "note": "Creative video editing skills", "type": "Pujian"}]', 'freelancer-tm002'),
('TM003', 'VEN001', 'Doni Editor', 'Editor', 'doni@email.com', '083333333333', 1000000, 'BNI 5566778899', 300000, 4.7, '[{"id": "note3", "date": "2024-02-15", "note": "Fast turnaround time", "type": "Pujian"}]', 'freelancer-tm003');

-- Insert Projects
INSERT INTO projects (
  id, vendor_id, project_name, client_name, client_id, project_type, package_name, package_id, 
  add_ons, date, location, progress, status, total_cost, amount_paid, payment_status, 
  team, notes, booking_status
) VALUES
('PRJ001', 'VEN001', 'Wedding Budi & Sari', 'Budi & Sari', 'CLI001', 'Pernikahan', 'Wedding Premium', 'PKG001', 
 '[{"id": "ADD001", "name": "Drone Photography", "price": 2000000}]', '2024-06-15', 'Gedung Balai Kartini, Jakarta', 
 75, 'Editing', 17000000, 8500000, 'DP Terbayar', 
 '[{"memberId": "TM001", "name": "Reza Photographer", "role": "Fotografer", "fee": 1500000, "reward": 200000}, {"memberId": "TM002", "name": "Maya Videographer", "role": "Videografer", "fee": 2000000, "reward": 300000}]', 
 'Klien menginginkan tema vintage untuk foto dan video', 'Terkonfirmasi'),
('PRJ002', 'VEN001', 'Engagement Andi & Lisa', 'Andi Pratama', 'CLI003', 'Lamaran', 'Engagement Package', 'PKG002', 
 '[]', '2024-07-20', 'Resto Sky Lounge, Jakarta', 
 100, 'Selesai', 8000000, 8000000, 'Lunas', 
 '[{"memberId": "TM001", "name": "Reza Photographer", "role": "Fotografer", "fee": 1200000, "reward": 150000}]', 
 'Acara intimate dengan 50 tamu', 'Terkonfirmasi'),
('PRJ003', 'VEN001', 'Corporate PT. Teknologi Maju', 'PT. Teknologi Maju', 'CLI002', 'Korporat', 'Corporate Event', 'PKG004', 
 '[{"id": "ADD005", "name": "Live Streaming", "price": 4000000}]', '2024-08-10', 'Hotel Grand Indonesia, Jakarta', 
 50, 'Persiapan', 16000000, 4800000, 'DP Terbayar', 
 '[{"memberId": "TM001", "name": "Reza Photographer", "role": "Fotografer", "fee": 2000000, "reward": 250000}, {"memberId": "TM002", "name": "Maya Videographer", "role": "Videografer", "fee": 2500000, "reward": 350000}]', 
 'Event launching produk baru dengan 200 peserta', 'Terkonfirmasi');

-- Insert Transactions
INSERT INTO transactions (id, vendor_id, date, description, amount, type, project_id, category, method, card_id) VALUES
('TRN001', 'VEN001', '2024-01-20', 'DP Wedding Budi & Sari', 8500000, 'Pemasukan', 'PRJ001', 'DP Proyek', 'Transfer Bank', 'CARD001'),
('TRN002', 'VEN001', '2024-02-01', 'Pembelian Lensa Canon 85mm', 12000000, 'Pengeluaran', null, 'Peralatan', 'Transfer Bank', 'CARD001'),
('TRN003', 'VEN001', 'Pelunasan Engagement Andi & Lisa', 4000000, 'Pemasukan', 'PRJ002', 'Pelunasan Proyek', 'Transfer Bank', 'CARD001'),
('TRN004', 'VEN001', '2024-03-01', 'DP Corporate PT. Teknologi Maju', 4800000, 'Pemasukan', 'PRJ003', 'DP Proyek', 'Transfer Bank', 'CARD001'),
('TRN005', 'VEN001', '2024-03-05', 'Biaya Transport ke Bandung', 500000, 'Pengeluaran', null, 'Transport', 'Tunai', 'CARD_CASH');

-- Insert Leads
INSERT INTO leads (id, vendor_id, name, contact_channel, location, status, date, notes, whatsapp) VALUES
('LEAD001', 'VEN001', 'Dina & Fajar', 'Instagram', 'Bandung', 'Sedang Diskusi', '2024-03-20', 'Tertarik paket prewedding outdoor, budget sekitar 5-7 juta', '081555666777'),
('LEAD002', 'VEN001', 'CV. Kreatif Media', 'Website', 'Jakarta', 'Menunggu Follow Up', '2024-03-18', 'Butuh dokumentasi event launching produk, tanggal masih fleksibel', '021-87654321'),
('LEAD003', 'VEN001', 'Keluarga Wijaya', 'WhatsApp', 'Depok', 'Sedang Diskusi', '2024-03-22', 'Ulang tahun ke-50, ingin dokumentasi keluarga besar', '082777888999'),
('LEAD004', 'VEN001', 'Sinta & Bimo', 'Referensi', 'Jakarta', 'Dikonversi', '2024-02-28', 'Referensi dari Budi & Sari, sudah booking untuk Juli 2024', '081444555666');

-- Insert Cards
INSERT INTO cards (id, vendor_id, card_holder_name, bank_name, card_type, last_four_digits, expiry_date, balance, color_gradient) VALUES
('CARD001', 'VEN001', 'Nina Vena', 'BCA', 'Debit', '7890', '12/26', 45000000, 'from-blue-500 to-sky-400'),
('CARD002', 'VEN001', 'Nina Vena', 'Mandiri', 'Kredit', '1234', '08/25', 15000000, 'from-purple-500 to-pink-400'),
('CARD_CASH', 'VEN001', 'Cash', 'Tunai', 'Tunai', 'CASH', null, 2500000, 'from-slate-600 to-slate-400');

-- Insert Financial Pockets
INSERT INTO financial_pockets (id, vendor_id, name, description, icon, type, amount, goal_amount, source_card_id) VALUES
('POCKET001', 'VEN001', 'Dana Darurat', 'Tabungan untuk keperluan mendesak', 'piggy-bank', 'Nabung & Bayar', 10000000, 20000000, 'CARD001'),
('POCKET002', 'VEN001', 'Upgrade Peralatan', 'Anggaran untuk pembelian peralatan baru', 'clipboard-list', 'Anggaran Pengeluaran', 5000000, 15000000, 'CARD001'),
('POCKET003', 'VEN001', 'Bonus Tim', 'Pool hadiah untuk freelancer berprestasi', 'star', 'Tabungan Hadiah Freelancer', 2000000, null, 'CARD002');

-- Insert Team Project Payments
INSERT INTO team_project_payments (id, vendor_id, project_id, team_member_name, team_member_id, date, status, fee, reward) VALUES
('TPP001', 'VEN001', 'PRJ001', 'Reza Photographer', 'TM001', '2024-01-20', 'Paid', 1500000, 200000),
('TPP002', 'VEN001', 'PRJ001', 'Maya Videographer', 'TM002', '2024-01-20', 'Paid', 2000000, 300000),
('TPP003', 'VEN001', 'PRJ002', 'Reza Photographer', 'TM001', '2024-02-25', 'Paid', 1200000, 150000),
('TPP004', 'VEN001', 'PRJ003', 'Reza Photographer', 'TM001', '2024-03-15', 'Unpaid', 2000000, 250000),
('TPP005', 'VEN001', 'PRJ003', 'Maya Videographer', 'TM002', '2024-03-15', 'Unpaid', 2500000, 350000);

-- Insert Team Payment Records
INSERT INTO team_payment_records (id, vendor_id, record_number, team_member_id, date, project_payment_ids, total_amount, vendor_signature) VALUES
('TPR001', 'VEN001', 'PAY/2024/001', 'TM001', '2024-02-01', '["TPP001", "TPP003"]', 2700000, null),
('TPR002', 'VEN001', 'PAY/2024/002', 'TM002', '2024-02-01', '["TPP002"]', 2000000, null);

-- Insert Reward Ledger Entries
INSERT INTO reward_ledger_entries (id, vendor_id, team_member_id, date, description, amount, project_id) VALUES
('RLE001', 'VEN001', 'TM001', '2024-01-20', 'Bonus Wedding Budi & Sari', 200000, 'PRJ001'),
('RLE002', 'VEN001', 'TM002', '2024-01-20', 'Bonus Wedding Budi & Sari', 300000, 'PRJ001'),
('RLE003', 'VEN001', 'TM001', '2024-02-25', 'Bonus Engagement Andi & Lisa', 150000, 'PRJ002'),
('RLE004', 'VEN001', 'TM001', '2024-02-05', 'Penarikan bonus untuk keperluan pribadi', -100000, null);

-- Insert Assets
INSERT INTO assets (id, vendor_id, name, category, purchase_date, purchase_price, serial_number, status, notes) VALUES
('AST001', 'VEN001', 'Canon EOS R5', 'Kamera', '2023-06-15', 65000000, 'CR5001234567', 'Tersedia', 'Kamera utama untuk wedding'),
('AST002', 'VEN001', 'Sony FX3', 'Kamera', '2023-08-20', 45000000, 'FX3987654321', 'Digunakan', 'Kamera video untuk cinematic'),
('AST003', 'VEN001', 'DJI Mini 3 Pro', 'Drone', '2024-01-10', 12000000, 'DJI123456789', 'Tersedia', 'Drone untuk aerial photography'),
('AST004', 'VEN001', 'Godox AD600Pro', 'Lighting', '2023-09-05', 8000000, 'GDX600001', 'Perbaikan', 'Flash studio, sedang service'),
('AST005', 'VEN001', 'MacBook Pro M2', 'Komputer', '2023-07-12', 35000000, 'MBP2023001', 'Tersedia', 'Laptop editing utama');

-- Insert Contracts
INSERT INTO contracts (
  id, vendor_id, contract_number, client_id, project_id, signing_date, signing_location,
  client_name1, client_address1, client_phone1, client_name2, client_address2, client_phone2,
  shooting_duration, guaranteed_photos, album_details, digital_files_format, other_items,
  personnel_count, delivery_timeframe, dp_date, final_payment_date, cancellation_policy, jurisdiction
) VALUES
('CTR001', 'VEN001', 'VP/CTR/2024/001', 'CLI001', 'PRJ001', '2024-01-15', 'Kantor Vena Pictures',
 'Budi Santoso', 'Jl. Mawar No. 15, Jakarta Selatan', '081234567890', 'Sari Dewi', 'Jl. Mawar No. 15, Jakarta Selatan', '081234567890',
 '8 jam (akad + resepsi)', '300+ foto edited', 'Album 30x30 cm, 50 halaman, hardcover', 'JPG High-Resolution', 'Video highlight, flashdisk custom',
 '2 Fotografer, 1 Videografer', '30 hari kerja', '2024-01-20', '2024-06-10', 'DP yang sudah dibayarkan tidak dapat dikembalikan.\nJika pembatalan dilakukan H-7 sebelum hari pelaksanaan, PIHAK KEDUA wajib membayar 50% dari total biaya.', 'Jakarta'),
('CTR002', 'VEN001', 'VP/CTR/2024/002', 'CLI003', 'PRJ002', '2024-02-20', 'Kantor Vena Pictures',
 'Andi Pratama', 'Jl. Melati No. 8, Depok', '082345678901', '', '', '',
 '4 jam (acara lamaran)', '200+ foto edited', 'Album 20x20 cm, 30 halaman', 'JPG High-Resolution', 'Video highlight 3-5 menit',
 '1 Fotografer, 1 Videografer', '21 hari kerja', '2024-02-25', '2024-07-15', 'DP yang sudah dibayarkan tidak dapat dikembalikan.\nJika pembatalan dilakukan H-7 sebelum hari pelaksanaan, PIHAK KEDUA wajib membayar 50% dari total biaya.', 'Depok');

-- Insert Client Feedback
INSERT INTO client_feedback (id, vendor_id, client_name, satisfaction, rating, feedback, date) VALUES
('FB001', 'VEN001', 'Budi & Sari', 'Sangat Puas', 5, 'Pelayanan sangat memuaskan! Hasil foto dan video melebihi ekspektasi. Tim sangat profesional dan ramah. Terima kasih Vena Pictures!', '2024-02-15'),
('FB002', 'VEN001', 'Andi Pratama', 'Puas', 4, 'Hasil bagus, tim profesional. Hanya saja pengiriman album sedikit terlambat dari jadwal yang dijanjikan.', '2024-03-10'),
('FB003', 'VEN001', 'PT. Teknologi Maju', 'Sangat Puas', 5, 'Dokumentasi event launching sangat berkualitas. Video yang dihasilkan sangat membantu untuk keperluan marketing kami.', '2024-03-01');

-- Insert Notifications
INSERT INTO notifications (id, vendor_id, title, message, timestamp, is_read, icon, link) VALUES
('NOT001', 'VEN001', 'Prospek Baru!', 'Dina & Fajar tertarik dengan paket prewedding. Segera follow up!', '2024-03-20T10:30:00Z', false, 'lead', '{"view": "Prospek"}'),
('NOT002', 'VEN001', 'Deadline Mendekat', 'Proyek Wedding Budi & Sari deadline editing dalam 3 hari', '2024-03-18T09:00:00Z', false, 'deadline', '{"view": "Proyek", "action": {"type": "VIEW_PROJECT_DETAILS", "id": "PRJ001"}}'),
('NOT003', 'VEN001', 'Pembayaran Diterima', 'DP Corporate PT. Teknologi Maju sebesar Rp 4.800.000 telah diterima', '2024-03-01T14:20:00Z', true, 'payment', '{"view": "Keuangan"}'),
('NOT004', 'VEN001', 'Feedback Baru', 'Anda menerima feedback 5 bintang dari Budi & Sari', '2024-02-15T16:45:00Z', true, 'feedback', '{"view": "Laporan Klien"}');

-- Insert Social Media Posts
INSERT INTO social_media_posts (id, vendor_id, project_id, client_name, post_type, platform, scheduled_date, caption, status, notes) VALUES
('SMP001', 'VEN001', 'PRJ001', 'Budi & Sari', 'Instagram Feed', 'Instagram', '2024-02-20', 'Behind the scenes dari wedding Budi & Sari yang magical ✨ #VenaPictures #WeddingPhotography #BehindTheScenes', 'Diposting', 'Post mendapat 150+ likes'),
('SMP002', 'VEN001', 'PRJ002', 'Andi Pratama', 'Instagram Story', 'Instagram', '2024-03-15', 'Sneak peek engagement session Andi & Lisa 💕 Swipe untuk lihat keseruan mereka!', 'Terjadwal', 'Akan diposting setelah klien approve'),
('SMP003', 'VEN001', 'PRJ003', 'PT. Teknologi Maju', 'Instagram Reels', 'Instagram', '2024-03-25', 'Corporate event yang penuh inovasi! 🚀 Terima kasih PT. Teknologi Maju atas kepercayaannya', 'Draf', 'Menunggu approval dari klien');

-- Insert Promo Codes
INSERT INTO promo_codes (id, vendor_id, code, discount_type, discount_value, is_active, usage_count, max_usage, expiry_date) VALUES
('PROMO001', 'VEN001', 'NEWCLIENT2024', 'percentage', 10, true, 2, 50, '2024-12-31'),
('PROMO002', 'VEN001', 'WEDDING500K', 'fixed', 500000, true, 1, 20, '2024-06-30'),
('PROMO003', 'VEN001', 'EARLYBIRD', 'percentage', 15, true, 0, 30, '2024-05-31'),
('PROMO004', 'VEN001', 'EXPIRED2023', 'percentage', 20, false, 5, 10, '2023-12-31');

-- Insert SOPs
INSERT INTO sops (id, vendor_id, title, category, content, last_updated) VALUES
('SOP001', 'VEN001', 'Persiapan Hari H Wedding', 'Fotografi', 
'# Persiapan Hari H Wedding

## Checklist Peralatan
- [ ] Kamera utama + backup
- [ ] Lensa 24-70mm, 85mm, 16-35mm
- [ ] Flash eksternal + diffuser
- [ ] Tripod + monopod
- [ ] Memory card + backup
- [ ] Baterai cadangan (minimal 4 buah)
- [ ] Charger portable

## Timeline Standar
- H-1: Charge semua peralatan, cek memory card
- H-0 (2 jam sebelum): Tiba di lokasi, setup peralatan
- Akad: Fokus pada momen sakral, hindari flash berlebihan
- Resepsi: Dokumentasi tamu, dekorasi, dan momen penting

## Tips Penting
- Selalu komunikasi dengan WO/koordinator acara
- Backup foto setiap 2 jam sekali
- Jaga etika dan sopan santun
- Dokumentasikan detail kecil (cincin, bunga, dekorasi)', 
'2024-03-01T10:00:00Z'),

('SOP002', 'VEN001', 'Workflow Editing Foto Wedding', 'Editing', 
'# Workflow Editing Foto Wedding

## Tahap 1: Import & Backup
1. Import semua foto ke Lightroom
2. Backup raw files ke external drive
3. Buat folder struktur: RAW / EDITED / FINAL

## Tahap 2: Seleksi Foto
1. Tandai foto terbaik dengan rating 5 bintang
2. Hapus foto blur/gagal
3. Target: 300-500 foto untuk editing

## Tahap 3: Basic Editing
1. Koreksi exposure dan white balance
2. Crop dan straighten jika perlu
3. Noise reduction untuk foto ISO tinggi

## Tahap 4: Creative Editing
1. Color grading sesuai mood
2. Skin retouching natural
3. Background cleanup jika perlu

## Tahap 5: Export & Delivery
1. Export JPG high quality (sRGB)
2. Resize untuk web jika perlu
3. Upload ke Google Drive client', 
'2024-03-01T10:00:00Z'),

('SOP003', 'VEN001', 'Komunikasi dengan Klien', 'Administrasi', 
'# Komunikasi dengan Klien

## Prinsip Dasar
- Selalu responsif (maksimal 2 jam untuk membalas)
- Gunakan bahasa yang sopan dan profesional
- Berikan update progres secara berkala

## Template Pesan
### Konfirmasi Booking
"Terima kasih telah mempercayakan [nama acara] kepada Vena Pictures. Kami akan memberikan yang terbaik untuk Anda."

### Update Progres
"Halo [nama klien], update progres [nama proyek]: [status saat ini]. Estimasi selesai: [tanggal]."

### Pengiriman Hasil
"Hasil [nama proyek] sudah siap! Silakan cek link berikut: [link]. Terima kasih atas kepercayaannya."

## Escalation
- Jika ada komplain, segera koordinasi dengan admin
- Dokumentasikan semua komunikasi penting
- Jangan membuat janji yang tidak bisa ditepati', 
'2024-03-01T10:00:00Z');

-- Update team members with proper performance notes structure
UPDATE team_members SET performance_notes = '[
  {
    "id": "note1",
    "date": "2024-01-15",
    "note": "Excellent work on the Budi & Sari wedding project. Very professional and creative shots.",
    "type": "Pujian"
  },
  {
    "id": "note2", 
    "date": "2024-02-20",
    "note": "Always delivers on time and maintains high quality standards.",
    "type": "Pujian"
  }
]' WHERE id = 'TM001';

UPDATE team_members SET performance_notes = '[
  {
    "id": "note3",
    "date": "2024-02-01", 
    "note": "Creative video editing skills, especially in color grading and transitions.",
    "type": "Pujian"
  },
  {
    "id": "note4",
    "date": "2024-02-28",
    "note": "Great collaboration with photography team during shoots.",
    "type": "Pujian"
  }
]' WHERE id = 'TM002';

UPDATE team_members SET performance_notes = '[
  {
    "id": "note5",
    "date": "2024-02-15",
    "note": "Fast turnaround time on editing projects. Very reliable.",
    "type": "Pujian"
  }
]' WHERE id = 'TM003';

-- Update projects with proper team structure and revisions
UPDATE projects SET 
  team = '[
    {
      "memberId": "TM001",
      "name": "Reza Photographer", 
      "role": "Fotografer",
      "fee": 1500000,
      "reward": 200000,
      "subJob": "Main Photographer"
    },
    {
      "memberId": "TM002",
      "name": "Maya Videographer",
      "role": "Videografer", 
      "fee": 2000000,
      "reward": 300000,
      "subJob": "Cinematic Video"
    }
  ]',
  revisions = '[
    {
      "id": "REV001",
      "date": "2024-02-01T10:00:00Z",
      "adminNotes": "Klien request tambahan foto detail cincin dan bunga. Tolong edit ulang dengan fokus pada detail tersebut.",
      "deadline": "2024-02-05",
      "freelancerId": "TM003",
      "status": "Revisi Selesai",
      "freelancerNotes": "Sudah ditambahkan 15 foto detail sesuai request",
      "driveLink": "https://drive.google.com/revised-photos-budi-sari",
      "completedDate": "2024-02-04T15:30:00Z"
    }
  ]',
  active_sub_statuses = '["Seleksi Foto", "Color Grading"]',
  confirmed_sub_statuses = '["Survey Lokasi", "Briefing Tim"]',
  client_sub_status_notes = '{"Survey Lokasi": "Lokasi sudah dikonfirmasi, akses mudah", "Briefing Tim": "Tim sudah paham konsep vintage yang diinginkan"}',
  drive_link = 'https://drive.google.com/wedding-budi-sari-brief',
  client_drive_link = 'https://drive.google.com/wedding-budi-sari-preview',
  start_time = '08:00',
  end_time = '22:00'
WHERE id = 'PRJ001';

UPDATE projects SET 
  team = '[
    {
      "memberId": "TM001",
      "name": "Reza Photographer",
      "role": "Fotografer", 
      "fee": 1200000,
      "reward": 150000,
      "subJob": "Portrait & Candid"
    }
  ]',
  drive_link = 'https://drive.google.com/engagement-andi-lisa-brief',
  final_drive_link = 'https://drive.google.com/engagement-andi-lisa-final',
  start_time = '17:00',
  end_time = '21:00'
WHERE id = 'PRJ002';

UPDATE projects SET 
  team = '[
    {
      "memberId": "TM001", 
      "name": "Reza Photographer",
      "role": "Fotografer",
      "fee": 2000000,
      "reward": 250000,
      "subJob": "Event Documentation"
    },
    {
      "memberId": "TM002",
      "name": "Maya Videographer", 
      "role": "Videografer",
      "fee": 2500000,
      "reward": 350000,
      "subJob": "Live Streaming & Recording"
    }
  ]',
  revisions = '[
    {
      "id": "REV002",
      "date": "2024-03-10T14:00:00Z", 
      "adminNotes": "Client request edit ulang opening video, kurangi durasi jadi 30 detik dan tambahkan logo company di akhir.",
      "deadline": "2024-03-15",
      "freelancerId": "TM002", 
      "status": "Menunggu Revisi",
      "freelancerNotes": "",
      "driveLink": "",
      "completedDate": null
    }
  ]',
  active_sub_statuses = '["Survey Lokasi", "Briefing Tim"]',
  drive_link = 'https://drive.google.com/corporate-teknologi-maju-brief',
  start_time = '09:00',
  end_time = '17:00'
WHERE id = 'PRJ003';