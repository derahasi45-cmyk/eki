import { supabase, getCurrentVendorId } from './supabase';
import type { Database } from './database.types';
import type { 
  User, Profile, Client, Package, AddOn, Project, Transaction, Lead, 
  TeamMember, Card, FinancialPocket, TeamProjectPayment, TeamPaymentRecord, 
  RewardLedgerEntry, Asset, Contract, ClientFeedback, Notification, 
  SocialMediaPost, PromoCode, SOP 
} from '../types';

type Tables = Database['public']['Tables'];

// Helper function to convert database row to app type
const convertDatabaseToApp = {
  user: (row: Tables['users']['Row']): User => ({
    id: row.id,
    email: row.email,
    password: row.password,
    fullName: row.full_name,
    companyName: row.company_name || undefined,
    role: row.role as 'Admin' | 'Member',
    permissions: row.permissions as any,
    vendorId: row.vendor_id,
  }),

  profile: (row: Tables['profiles']['Row']): Profile => ({
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    companyName: row.company_name,
    website: row.website,
    address: row.address,
    bankAccount: row.bank_account,
    authorizedSigner: row.authorized_signer,
    idNumber: row.id_number || undefined,
    bio: row.bio,
    incomeCategories: row.income_categories as string[],
    expenseCategories: row.expense_categories as string[],
    projectTypes: row.project_types as string[],
    eventTypes: row.event_types as string[],
    assetCategories: row.asset_categories as string[],
    sopCategories: row.sop_categories as string[],
    packageCategories: row.package_categories as string[],
    projectStatusConfig: row.project_status_config as any,
    notificationSettings: row.notification_settings as any,
    securitySettings: row.security_settings as any,
    briefingTemplate: row.briefing_template,
    termsAndConditions: row.terms_and_conditions || undefined,
    contractTemplate: row.contract_template || undefined,
    logoBase64: row.logo_base64 || undefined,
    brandColor: row.brand_color,
    publicPageConfig: row.public_page_config as any,
    packageShareTemplate: row.package_share_template || undefined,
    bookingFormTemplate: row.booking_form_template || undefined,
    chatTemplates: row.chat_templates as any,
    currentPlanId: row.current_plan_id || undefined,
  }),

  client: (row: Tables['clients']['Row']): Client => ({
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    whatsapp: row.whatsapp || undefined,
    instagram: row.instagram || undefined,
    clientType: row.client_type as any,
    since: row.since,
    status: row.status as any,
    lastContact: row.last_contact,
    portalAccessId: row.portal_access_id,
  }),

  package: (row: Tables['packages']['Row']): Package => ({
    id: row.id,
    name: row.name,
    price: row.price,
    category: row.category,
    physicalItems: row.physical_items as any,
    digitalItems: row.digital_items as string[],
    processingTime: row.processing_time,
    photographers: row.photographers || undefined,
    videographers: row.videographers || undefined,
    coverImage: row.cover_image || undefined,
  }),

  addOn: (row: Tables['add_ons']['Row']): AddOn => ({
    id: row.id,
    name: row.name,
    price: row.price,
  }),

  project: (row: Tables['projects']['Row']): Project => ({
    id: row.id,
    projectName: row.project_name,
    clientName: row.client_name,
    clientId: row.client_id,
    projectType: row.project_type,
    packageName: row.package_name,
    packageId: row.package_id,
    addOns: row.add_ons as AddOn[],
    date: row.date,
    deadlineDate: row.deadline_date || undefined,
    location: row.location,
    progress: row.progress,
    status: row.status,
    activeSubStatuses: row.active_sub_statuses as string[],
    totalCost: row.total_cost,
    amountPaid: row.amount_paid,
    paymentStatus: row.payment_status as any,
    team: row.team as any,
    notes: row.notes || undefined,
    accommodation: row.accommodation || undefined,
    driveLink: row.drive_link || undefined,
    clientDriveLink: row.client_drive_link || undefined,
    finalDriveLink: row.final_drive_link || undefined,
    startTime: row.start_time || undefined,
    endTime: row.end_time || undefined,
    image: row.image || undefined,
    revisions: row.revisions as any,
    promoCodeId: row.promo_code_id || undefined,
    discountAmount: row.discount_amount || undefined,
    shippingDetails: row.shipping_details || undefined,
    dpProofUrl: row.dp_proof_url || undefined,
    printingDetails: row.printing_details as any,
    printingCost: row.printing_cost || undefined,
    transportCost: row.transport_cost || undefined,
    bookingStatus: row.booking_status as any,
    rejectionReason: row.rejection_reason || undefined,
    chatHistory: row.chat_history as any,
    invoiceSignature: row.invoice_signature || undefined,
    isEditingConfirmedByClient: row.is_editing_confirmed_by_client,
    isPrintingConfirmedByClient: row.is_printing_confirmed_by_client,
    isDeliveryConfirmedByClient: row.is_delivery_confirmed_by_client,
    confirmedSubStatuses: row.confirmed_sub_statuses as string[],
    clientSubStatusNotes: row.client_sub_status_notes as any,
    subStatusConfirmationSentAt: row.sub_status_confirmation_sent_at as any,
    completedDigitalItems: row.completed_digital_items as string[],
    customSubStatuses: row.custom_sub_statuses as any,
  }),

  transaction: (row: Tables['transactions']['Row']): Transaction => ({
    id: row.id,
    date: row.date,
    description: row.description,
    amount: row.amount,
    type: row.type as any,
    projectId: row.project_id || undefined,
    category: row.category,
    method: row.method as any,
    pocketId: row.pocket_id || undefined,
    cardId: row.card_id || undefined,
    printingItemId: row.printing_item_id || undefined,
    vendorSignature: row.vendor_signature || undefined,
  }),

  lead: (row: Tables['leads']['Row']): Lead => ({
    id: row.id,
    name: row.name,
    contactChannel: row.contact_channel as any,
    location: row.location,
    status: row.status as any,
    date: row.date,
    notes: row.notes || undefined,
    whatsapp: row.whatsapp || undefined,
  }),

  teamMember: (row: Tables['team_members']['Row']): TeamMember => ({
    id: row.id,
    name: row.name,
    role: row.role,
    email: row.email,
    phone: row.phone,
    standardFee: row.standard_fee,
    noRek: row.no_rek || undefined,
    rewardBalance: row.reward_balance,
    rating: row.rating,
    performanceNotes: row.performance_notes as any,
    portalAccessId: row.portal_access_id,
  }),

  card: (row: Tables['cards']['Row']): Card => ({
    id: row.id,
    cardHolderName: row.card_holder_name,
    bankName: row.bank_name,
    cardType: row.card_type as any,
    lastFourDigits: row.last_four_digits,
    expiryDate: row.expiry_date || undefined,
    balance: row.balance,
    colorGradient: row.color_gradient,
  }),

  financialPocket: (row: Tables['financial_pockets']['Row']): FinancialPocket => ({
    id: row.id,
    name: row.name,
    description: row.description,
    icon: row.icon as any,
    type: row.type as any,
    amount: row.amount,
    goalAmount: row.goal_amount || undefined,
    lockEndDate: row.lock_end_date || undefined,
    members: row.members as any,
    sourceCardId: row.source_card_id || undefined,
  }),

  teamProjectPayment: (row: Tables['team_project_payments']['Row']): TeamProjectPayment => ({
    id: row.id,
    projectId: row.project_id,
    teamMemberName: row.team_member_name,
    teamMemberId: row.team_member_id,
    date: row.date,
    status: row.status as any,
    fee: row.fee,
    reward: row.reward || undefined,
  }),

  teamPaymentRecord: (row: Tables['team_payment_records']['Row']): TeamPaymentRecord => ({
    id: row.id,
    recordNumber: row.record_number,
    teamMemberId: row.team_member_id,
    date: row.date,
    projectPaymentIds: row.project_payment_ids as string[],
    totalAmount: row.total_amount,
    vendorSignature: row.vendor_signature || undefined,
  }),

  rewardLedgerEntry: (row: Tables['reward_ledger_entries']['Row']): RewardLedgerEntry => ({
    id: row.id,
    teamMemberId: row.team_member_id,
    date: row.date,
    description: row.description,
    amount: row.amount,
    projectId: row.project_id || undefined,
  }),

  asset: (row: Tables['assets']['Row']): Asset => ({
    id: row.id,
    name: row.name,
    category: row.category,
    purchaseDate: row.purchase_date,
    purchasePrice: row.purchase_price,
    serialNumber: row.serial_number || undefined,
    status: row.status as any,
    notes: row.notes || undefined,
  }),

  contract: (row: Tables['contracts']['Row']): Contract => ({
    id: row.id,
    contractNumber: row.contract_number,
    clientId: row.client_id,
    projectId: row.project_id,
    signingDate: row.signing_date,
    signingLocation: row.signing_location,
    clientName1: row.client_name1,
    clientAddress1: row.client_address1,
    clientPhone1: row.client_phone1,
    clientName2: row.client_name2,
    clientAddress2: row.client_address2,
    clientPhone2: row.client_phone2,
    shootingDuration: row.shooting_duration,
    guaranteedPhotos: row.guaranteed_photos,
    albumDetails: row.album_details,
    digitalFilesFormat: row.digital_files_format,
    otherItems: row.other_items,
    personnelCount: row.personnel_count,
    deliveryTimeframe: row.delivery_timeframe,
    dpDate: row.dp_date || '',
    finalPaymentDate: row.final_payment_date || '',
    cancellationPolicy: row.cancellation_policy,
    jurisdiction: row.jurisdiction,
    vendorSignature: row.vendor_signature || undefined,
    clientSignature: row.client_signature || undefined,
    createdAt: row.created_at,
  }),

  clientFeedback: (row: Tables['client_feedback']['Row']): ClientFeedback => ({
    id: row.id,
    clientName: row.client_name,
    satisfaction: row.satisfaction as any,
    rating: row.rating,
    feedback: row.feedback,
    date: row.date,
  }),

  notification: (row: Tables['notifications']['Row']): Notification => ({
    id: row.id,
    title: row.title,
    message: row.message,
    timestamp: row.timestamp,
    isRead: row.is_read,
    icon: row.icon as any,
    link: row.link as any,
  }),

  socialMediaPost: (row: Tables['social_media_posts']['Row']): SocialMediaPost => ({
    id: row.id,
    projectId: row.project_id,
    clientName: row.client_name,
    postType: row.post_type as any,
    platform: row.platform as any,
    scheduledDate: row.scheduled_date,
    caption: row.caption,
    mediaUrl: row.media_url || undefined,
    status: row.status as any,
    notes: row.notes || undefined,
  }),

  promoCode: (row: Tables['promo_codes']['Row']): PromoCode => ({
    id: row.id,
    code: row.code,
    discountType: row.discount_type as any,
    discountValue: row.discount_value,
    isActive: row.is_active,
    usageCount: row.usage_count,
    maxUsage: row.max_usage || undefined,
    expiryDate: row.expiry_date || undefined,
    createdAt: row.created_at,
  }),

  sop: (row: Tables['sops']['Row']): SOP => ({
    id: row.id,
    title: row.title,
    category: row.category,
    content: row.content,
    lastUpdated: row.last_updated,
  }),
};

// Helper function to convert app type to database insert
const convertAppToDatabase = {
  user: (user: Omit<User, 'id'> & { id?: string }): Tables['users']['Insert'] => ({
    id: user.id,
    email: user.email,
    password: user.password,
    full_name: user.fullName,
    company_name: user.companyName || null,
    role: user.role,
    permissions: user.permissions || [],
    vendor_id: user.vendorId,
  }),

  profile: (profile: Profile, vendorId: string): Tables['profiles']['Insert'] => ({
    vendor_id: vendorId,
    full_name: profile.fullName,
    email: profile.email,
    phone: profile.phone,
    company_name: profile.companyName,
    website: profile.website,
    address: profile.address,
    bank_account: profile.bankAccount,
    authorized_signer: profile.authorizedSigner,
    id_number: profile.idNumber || null,
    bio: profile.bio,
    income_categories: profile.incomeCategories,
    expense_categories: profile.expenseCategories,
    project_types: profile.projectTypes,
    event_types: profile.eventTypes,
    asset_categories: profile.assetCategories,
    sop_categories: profile.sopCategories,
    package_categories: profile.packageCategories,
    project_status_config: profile.projectStatusConfig,
    notification_settings: profile.notificationSettings,
    security_settings: profile.securitySettings,
    briefing_template: profile.briefingTemplate,
    terms_and_conditions: profile.termsAndConditions || null,
    contract_template: profile.contractTemplate || null,
    logo_base64: profile.logoBase64 || null,
    brand_color: profile.brandColor || '#3b82f6',
    public_page_config: profile.publicPageConfig,
    package_share_template: profile.packageShareTemplate || null,
    booking_form_template: profile.bookingFormTemplate || null,
    chat_templates: profile.chatTemplates || [],
    current_plan_id: profile.currentPlanId || null,
  }),

  client: (client: Client, vendorId: string): Tables['clients']['Insert'] => ({
    id: client.id,
    vendor_id: vendorId,
    name: client.name,
    email: client.email,
    phone: client.phone,
    whatsapp: client.whatsapp || null,
    instagram: client.instagram || null,
    client_type: client.clientType,
    since: client.since,
    status: client.status,
    last_contact: client.lastContact,
    portal_access_id: client.portalAccessId,
  }),

  package: (pkg: Package, vendorId: string): Tables['packages']['Insert'] => ({
    id: pkg.id,
    vendor_id: vendorId,
    name: pkg.name,
    price: pkg.price,
    category: pkg.category,
    physical_items: pkg.physicalItems,
    digital_items: pkg.digitalItems,
    processing_time: pkg.processingTime,
    photographers: pkg.photographers || null,
    videographers: pkg.videographers || null,
    cover_image: pkg.coverImage || null,
  }),

  addOn: (addOn: AddOn, vendorId: string): Tables['add_ons']['Insert'] => ({
    id: addOn.id,
    vendor_id: vendorId,
    name: addOn.name,
    price: addOn.price,
  }),

  project: (project: Project, vendorId: string): Tables['projects']['Insert'] => ({
    id: project.id,
    vendor_id: vendorId,
    project_name: project.projectName,
    client_name: project.clientName,
    client_id: project.clientId,
    project_type: project.projectType,
    package_name: project.packageName,
    package_id: project.packageId,
    add_ons: project.addOns,
    date: project.date,
    deadline_date: project.deadlineDate || null,
    location: project.location,
    progress: project.progress,
    status: project.status,
    active_sub_statuses: project.activeSubStatuses || [],
    total_cost: project.totalCost,
    amount_paid: project.amountPaid,
    payment_status: project.paymentStatus,
    team: project.team,
    notes: project.notes || null,
    accommodation: project.accommodation || null,
    drive_link: project.driveLink || null,
    client_drive_link: project.clientDriveLink || null,
    final_drive_link: project.finalDriveLink || null,
    start_time: project.startTime || null,
    end_time: project.endTime || null,
    image: project.image || null,
    revisions: project.revisions || [],
    promo_code_id: project.promoCodeId || null,
    discount_amount: project.discountAmount || null,
    shipping_details: project.shippingDetails || null,
    dp_proof_url: project.dpProofUrl || null,
    printing_details: project.printingDetails || [],
    printing_cost: project.printingCost || null,
    transport_cost: project.transportCost || null,
    booking_status: project.bookingStatus || null,
    rejection_reason: project.rejectionReason || null,
    chat_history: project.chatHistory || [],
    invoice_signature: project.invoiceSignature || null,
    is_editing_confirmed_by_client: project.isEditingConfirmedByClient || false,
    is_printing_confirmed_by_client: project.isPrintingConfirmedByClient || false,
    is_delivery_confirmed_by_client: project.isDeliveryConfirmedByClient || false,
    confirmed_sub_statuses: project.confirmedSubStatuses || [],
    client_sub_status_notes: project.clientSubStatusNotes || {},
    sub_status_confirmation_sent_at: project.subStatusConfirmationSentAt || {},
    completed_digital_items: project.completedDigitalItems || [],
    custom_sub_statuses: project.customSubStatuses || [],
  }),

  transaction: (transaction: Transaction, vendorId: string): Tables['transactions']['Insert'] => ({
    id: transaction.id,
    vendor_id: vendorId,
    date: transaction.date,
    description: transaction.description,
    amount: transaction.amount,
    type: transaction.type,
    project_id: transaction.projectId || null,
    category: transaction.category,
    method: transaction.method,
    pocket_id: transaction.pocketId || null,
    card_id: transaction.cardId || null,
    printing_item_id: transaction.printingItemId || null,
    vendor_signature: transaction.vendorSignature || null,
  }),

  lead: (lead: Lead, vendorId: string): Tables['leads']['Insert'] => ({
    id: lead.id,
    vendor_id: vendorId,
    name: lead.name,
    contact_channel: lead.contactChannel,
    location: lead.location,
    status: lead.status,
    date: lead.date,
    notes: lead.notes || null,
    whatsapp: lead.whatsapp || null,
  }),

  teamMember: (member: TeamMember, vendorId: string): Tables['team_members']['Insert'] => ({
    id: member.id,
    vendor_id: vendorId,
    name: member.name,
    role: member.role,
    email: member.email,
    phone: member.phone,
    standard_fee: member.standardFee,
    no_rek: member.noRek || null,
    reward_balance: member.rewardBalance,
    rating: member.rating,
    performance_notes: member.performanceNotes,
    portal_access_id: member.portalAccessId,
  }),

  card: (card: Card, vendorId: string): Tables['cards']['Insert'] => ({
    id: card.id,
    vendor_id: vendorId,
    card_holder_name: card.cardHolderName,
    bank_name: card.bankName,
    card_type: card.cardType,
    last_four_digits: card.lastFourDigits,
    expiry_date: card.expiryDate || null,
    balance: card.balance,
    color_gradient: card.colorGradient,
  }),

  financialPocket: (pocket: FinancialPocket, vendorId: string): Tables['financial_pockets']['Insert'] => ({
    id: pocket.id,
    vendor_id: vendorId,
    name: pocket.name,
    description: pocket.description,
    icon: pocket.icon,
    type: pocket.type,
    amount: pocket.amount,
    goal_amount: pocket.goalAmount || null,
    lock_end_date: pocket.lockEndDate || null,
    members: pocket.members || [],
    source_card_id: pocket.sourceCardId || null,
  }),

  teamProjectPayment: (payment: TeamProjectPayment, vendorId: string): Tables['team_project_payments']['Insert'] => ({
    id: payment.id,
    vendor_id: vendorId,
    project_id: payment.projectId,
    team_member_name: payment.teamMemberName,
    team_member_id: payment.teamMemberId,
    date: payment.date,
    status: payment.status,
    fee: payment.fee,
    reward: payment.reward || null,
  }),

  teamPaymentRecord: (record: TeamPaymentRecord, vendorId: string): Tables['team_payment_records']['Insert'] => ({
    id: record.id,
    vendor_id: vendorId,
    record_number: record.recordNumber,
    team_member_id: record.teamMemberId,
    date: record.date,
    project_payment_ids: record.projectPaymentIds,
    total_amount: record.totalAmount,
    vendor_signature: record.vendorSignature || null,
  }),

  rewardLedgerEntry: (entry: RewardLedgerEntry, vendorId: string): Tables['reward_ledger_entries']['Insert'] => ({
    id: entry.id,
    vendor_id: vendorId,
    team_member_id: entry.teamMemberId,
    date: entry.date,
    description: entry.description,
    amount: entry.amount,
    project_id: entry.projectId || null,
  }),

  asset: (asset: Asset, vendorId: string): Tables['assets']['Insert'] => ({
    id: asset.id,
    vendor_id: vendorId,
    name: asset.name,
    category: asset.category,
    purchase_date: asset.purchaseDate,
    purchase_price: asset.purchasePrice,
    serial_number: asset.serialNumber || null,
    status: asset.status,
    notes: asset.notes || null,
  }),

  contract: (contract: Contract, vendorId: string): Tables['contracts']['Insert'] => ({
    id: contract.id,
    vendor_id: vendorId,
    contract_number: contract.contractNumber,
    client_id: contract.clientId,
    project_id: contract.projectId,
    signing_date: contract.signingDate,
    signing_location: contract.signingLocation,
    client_name1: contract.clientName1,
    client_address1: contract.clientAddress1,
    client_phone1: contract.clientPhone1,
    client_name2: contract.clientName2 || '',
    client_address2: contract.clientAddress2 || '',
    client_phone2: contract.clientPhone2 || '',
    shooting_duration: contract.shootingDuration,
    guaranteed_photos: contract.guaranteedPhotos,
    album_details: contract.albumDetails,
    digital_files_format: contract.digitalFilesFormat,
    other_items: contract.otherItems,
    personnel_count: contract.personnelCount,
    delivery_timeframe: contract.deliveryTimeframe,
    dp_date: contract.dpDate || null,
    final_payment_date: contract.finalPaymentDate || null,
    cancellation_policy: contract.cancellationPolicy,
    jurisdiction: contract.jurisdiction,
    vendor_signature: contract.vendorSignature || null,
    client_signature: contract.clientSignature || null,
  }),

  clientFeedback: (feedback: ClientFeedback, vendorId: string): Tables['client_feedback']['Insert'] => ({
    id: feedback.id,
    vendor_id: vendorId,
    client_name: feedback.clientName,
    satisfaction: feedback.satisfaction,
    rating: feedback.rating,
    feedback: feedback.feedback,
    date: feedback.date,
  }),

  notification: (notification: Notification, vendorId: string): Tables['notifications']['Insert'] => ({
    id: notification.id,
    vendor_id: vendorId,
    title: notification.title,
    message: notification.message,
    timestamp: notification.timestamp,
    is_read: notification.isRead,
    icon: notification.icon,
    link: notification.link || null,
  }),

  socialMediaPost: (post: SocialMediaPost, vendorId: string): Tables['social_media_posts']['Insert'] => ({
    id: post.id,
    vendor_id: vendorId,
    project_id: post.projectId,
    client_name: post.clientName,
    post_type: post.postType,
    platform: post.platform,
    scheduled_date: post.scheduledDate,
    caption: post.caption,
    media_url: post.mediaUrl || null,
    status: post.status,
    notes: post.notes || null,
  }),

  promoCode: (code: PromoCode, vendorId: string): Tables['promo_codes']['Insert'] => ({
    id: code.id,
    vendor_id: vendorId,
    code: code.code,
    discount_type: code.discountType,
    discount_value: code.discountValue,
    is_active: code.isActive,
    usage_count: code.usageCount,
    max_usage: code.maxUsage || null,
    expiry_date: code.expiryDate || null,
  }),

  sop: (sop: SOP, vendorId: string): Tables['sops']['Insert'] => ({
    id: sop.id,
    vendor_id: vendorId,
    title: sop.title,
    category: sop.category,
    content: sop.content,
    last_updated: sop.lastUpdated,
  }),
};

// API Functions
export const api = {
  // Users
  async getUsers(): Promise<User[]> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('vendor_id', vendorId);
    
    if (error) throw error;
    return data.map(convertDatabaseToApp.user);
  },

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const vendorId = await getCurrentVendorId();
    const newUser = { ...user, id: crypto.randomUUID(), vendorId };
    const { data, error } = await supabase
      .from('users')
      .insert(convertAppToDatabase.user(newUser))
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.user(data);
  },

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({
        full_name: updates.fullName,
        company_name: updates.companyName || null,
        role: updates.role,
        permissions: updates.permissions || [],
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.user(data);
  },

  async deleteUser(id: string): Promise<void> {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Profile
  async getProfile(): Promise<Profile> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('vendor_id', vendorId)
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.profile(data);
  },

  async updateProfile(updates: Partial<Profile>): Promise<Profile> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('vendor_id', vendorId)
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.profile(data);
  },

  // Clients
  async getClients(): Promise<Client[]> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data.map(convertDatabaseToApp.client);
  },

  async createClient(client: Client): Promise<Client> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('clients')
      .insert(convertAppToDatabase.client(client, vendorId))
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.client(data);
  },

  async updateClient(id: string, updates: Partial<Client>): Promise<Client> {
    const { data, error } = await supabase
      .from('clients')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.client(data);
  },

  async deleteClient(id: string): Promise<void> {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Packages
  async getPackages(): Promise<Package[]> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data.map(convertDatabaseToApp.package);
  },

  async createPackage(pkg: Package): Promise<Package> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('packages')
      .insert(convertAppToDatabase.package(pkg, vendorId))
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.package(data);
  },

  async updatePackage(id: string, updates: Partial<Package>): Promise<Package> {
    const { data, error } = await supabase
      .from('packages')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.package(data);
  },

  async deletePackage(id: string): Promise<void> {
    const { error } = await supabase
      .from('packages')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Add-ons
  async getAddOns(): Promise<AddOn[]> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('add_ons')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data.map(convertDatabaseToApp.addOn);
  },

  async createAddOn(addOn: AddOn): Promise<AddOn> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('add_ons')
      .insert(convertAppToDatabase.addOn(addOn, vendorId))
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.addOn(data);
  },

  async updateAddOn(id: string, updates: Partial<AddOn>): Promise<AddOn> {
    const { data, error } = await supabase
      .from('add_ons')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.addOn(data);
  },

  async deleteAddOn(id: string): Promise<void> {
    const { error } = await supabase
      .from('add_ons')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Projects
  async getProjects(): Promise<Project[]> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data.map(convertDatabaseToApp.project);
  },

  async createProject(project: Project): Promise<Project> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('projects')
      .insert(convertAppToDatabase.project(project, vendorId))
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.project(data);
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.project(data);
  },

  async deleteProject(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Transactions
  async getTransactions(): Promise<Transaction[]> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data.map(convertDatabaseToApp.transaction);
  },

  async createTransaction(transaction: Transaction): Promise<Transaction> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('transactions')
      .insert(convertAppToDatabase.transaction(transaction, vendorId))
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.transaction(data);
  },

  async updateTransaction(id: string, updates: Partial<Transaction>): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.transaction(data);
  },

  async deleteTransaction(id: string): Promise<void> {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Leads
  async getLeads(): Promise<Lead[]> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data.map(convertDatabaseToApp.lead);
  },

  async createLead(lead: Lead): Promise<Lead> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('leads')
      .insert(convertAppToDatabase.lead(lead, vendorId))
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.lead(data);
  },

  async updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
    const { data, error } = await supabase
      .from('leads')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.lead(data);
  },

  async deleteLead(id: string): Promise<void> {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Team Members
  async getTeamMembers(): Promise<TeamMember[]> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data.map(convertDatabaseToApp.teamMember);
  },

  async createTeamMember(member: TeamMember): Promise<TeamMember> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('team_members')
      .insert(convertAppToDatabase.teamMember(member, vendorId))
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.teamMember(data);
  },

  async updateTeamMember(id: string, updates: Partial<TeamMember>): Promise<TeamMember> {
    const { data, error } = await supabase
      .from('team_members')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.teamMember(data);
  },

  async deleteTeamMember(id: string): Promise<void> {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Cards
  async getCards(): Promise<Card[]> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data.map(convertDatabaseToApp.card);
  },

  async createCard(card: Card): Promise<Card> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('cards')
      .insert(convertAppToDatabase.card(card, vendorId))
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.card(data);
  },

  async updateCard(id: string, updates: Partial<Card>): Promise<Card> {
    const { data, error } = await supabase
      .from('cards')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.card(data);
  },

  async deleteCard(id: string): Promise<void> {
    const { error } = await supabase
      .from('cards')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Financial Pockets
  async getFinancialPockets(): Promise<FinancialPocket[]> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('financial_pockets')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data.map(convertDatabaseToApp.financialPocket);
  },

  async createFinancialPocket(pocket: FinancialPocket): Promise<FinancialPocket> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('financial_pockets')
      .insert(convertAppToDatabase.financialPocket(pocket, vendorId))
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.financialPocket(data);
  },

  async updateFinancialPocket(id: string, updates: Partial<FinancialPocket>): Promise<FinancialPocket> {
    const { data, error } = await supabase
      .from('financial_pockets')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.financialPocket(data);
  },

  async deleteFinancialPocket(id: string): Promise<void> {
    const { error } = await supabase
      .from('financial_pockets')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Team Project Payments
  async getTeamProjectPayments(): Promise<TeamProjectPayment[]> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('team_project_payments')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data.map(convertDatabaseToApp.teamProjectPayment);
  },

  async createTeamProjectPayment(payment: TeamProjectPayment): Promise<TeamProjectPayment> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('team_project_payments')
      .insert(convertAppToDatabase.teamProjectPayment(payment, vendorId))
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.teamProjectPayment(data);
  },

  async updateTeamProjectPayment(id: string, updates: Partial<TeamProjectPayment>): Promise<TeamProjectPayment> {
    const { data, error } = await supabase
      .from('team_project_payments')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.teamProjectPayment(data);
  },

  async deleteTeamProjectPayment(id: string): Promise<void> {
    const { error } = await supabase
      .from('team_project_payments')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Team Payment Records
  async getTeamPaymentRecords(): Promise<TeamPaymentRecord[]> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('team_payment_records')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data.map(convertDatabaseToApp.teamPaymentRecord);
  },

  async createTeamPaymentRecord(record: TeamPaymentRecord): Promise<TeamPaymentRecord> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('team_payment_records')
      .insert(convertAppToDatabase.teamPaymentRecord(record, vendorId))
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.teamPaymentRecord(data);
  },

  async updateTeamPaymentRecord(id: string, updates: Partial<TeamPaymentRecord>): Promise<TeamPaymentRecord> {
    const { data, error } = await supabase
      .from('team_payment_records')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.teamPaymentRecord(data);
  },

  async deleteTeamPaymentRecord(id: string): Promise<void> {
    const { error } = await supabase
      .from('team_payment_records')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Reward Ledger Entries
  async getRewardLedgerEntries(): Promise<RewardLedgerEntry[]> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('reward_ledger_entries')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data.map(convertDatabaseToApp.rewardLedgerEntry);
  },

  async createRewardLedgerEntry(entry: RewardLedgerEntry): Promise<RewardLedgerEntry> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('reward_ledger_entries')
      .insert(convertAppToDatabase.rewardLedgerEntry(entry, vendorId))
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.rewardLedgerEntry(data);
  },

  async updateRewardLedgerEntry(id: string, updates: Partial<RewardLedgerEntry>): Promise<RewardLedgerEntry> {
    const { data, error } = await supabase
      .from('reward_ledger_entries')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.rewardLedgerEntry(data);
  },

  async deleteRewardLedgerEntry(id: string): Promise<void> {
    const { error } = await supabase
      .from('reward_ledger_entries')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Assets
  async getAssets(): Promise<Asset[]> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data.map(convertDatabaseToApp.asset);
  },

  async createAsset(asset: Asset): Promise<Asset> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('assets')
      .insert(convertAppToDatabase.asset(asset, vendorId))
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.asset(data);
  },

  async updateAsset(id: string, updates: Partial<Asset>): Promise<Asset> {
    const { data, error } = await supabase
      .from('assets')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.asset(data);
  },

  async deleteAsset(id: string): Promise<void> {
    const { error } = await supabase
      .from('assets')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Contracts
  async getContracts(): Promise<Contract[]> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('contracts')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data.map(convertDatabaseToApp.contract);
  },

  async createContract(contract: Contract): Promise<Contract> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('contracts')
      .insert(convertAppToDatabase.contract(contract, vendorId))
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.contract(data);
  },

  async updateContract(id: string, updates: Partial<Contract>): Promise<Contract> {
    const { data, error } = await supabase
      .from('contracts')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.contract(data);
  },

  async deleteContract(id: string): Promise<void> {
    const { error } = await supabase
      .from('contracts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Client Feedback
  async getClientFeedback(): Promise<ClientFeedback[]> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('client_feedback')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data.map(convertDatabaseToApp.clientFeedback);
  },

  async createClientFeedback(feedback: ClientFeedback): Promise<ClientFeedback> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('client_feedback')
      .insert(convertAppToDatabase.clientFeedback(feedback, vendorId))
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.clientFeedback(data);
  },

  async updateClientFeedback(id: string, updates: Partial<ClientFeedback>): Promise<ClientFeedback> {
    const { data, error } = await supabase
      .from('client_feedback')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.clientFeedback(data);
  },

  async deleteClientFeedback(id: string): Promise<void> {
    const { error } = await supabase
      .from('client_feedback')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Notifications
  async getNotifications(): Promise<Notification[]> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('timestamp', { ascending: false });
    
    if (error) throw error;
    return data.map(convertDatabaseToApp.notification);
  },

  async createNotification(notification: Notification): Promise<Notification> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('notifications')
      .insert(convertAppToDatabase.notification(notification, vendorId))
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.notification(data);
  },

  async updateNotification(id: string, updates: Partial<Notification>): Promise<Notification> {
    const { data, error } = await supabase
      .from('notifications')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.notification(data);
  },

  async deleteNotification(id: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Social Media Posts
  async getSocialMediaPosts(): Promise<SocialMediaPost[]> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('social_media_posts')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('scheduled_date', { ascending: false });
    
    if (error) throw error;
    return data.map(convertDatabaseToApp.socialMediaPost);
  },

  async createSocialMediaPost(post: SocialMediaPost): Promise<SocialMediaPost> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('social_media_posts')
      .insert(convertAppToDatabase.socialMediaPost(post, vendorId))
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.socialMediaPost(data);
  },

  async updateSocialMediaPost(id: string, updates: Partial<SocialMediaPost>): Promise<SocialMediaPost> {
    const { data, error } = await supabase
      .from('social_media_posts')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.socialMediaPost(data);
  },

  async deleteSocialMediaPost(id: string): Promise<void> {
    const { error } = await supabase
      .from('social_media_posts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Promo Codes
  async getPromoCodes(): Promise<PromoCode[]> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data.map(convertDatabaseToApp.promoCode);
  },

  async createPromoCode(code: PromoCode): Promise<PromoCode> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('promo_codes')
      .insert(convertAppToDatabase.promoCode(code, vendorId))
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.promoCode(data);
  },

  async updatePromoCode(id: string, updates: Partial<PromoCode>): Promise<PromoCode> {
    const { data, error } = await supabase
      .from('promo_codes')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.promoCode(data);
  },

  async deletePromoCode(id: string): Promise<void> {
    const { error } = await supabase
      .from('promo_codes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // SOPs
  async getSOPs(): Promise<SOP[]> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('sops')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('title', { ascending: true });
    
    if (error) throw error;
    return data.map(convertDatabaseToApp.sop);
  },

  async createSOP(sop: SOP): Promise<SOP> {
    const vendorId = await getCurrentVendorId();
    const { data, error } = await supabase
      .from('sops')
      .insert(convertAppToDatabase.sop(sop, vendorId))
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.sop(data);
  },

  async updateSOP(id: string, updates: Partial<SOP>): Promise<SOP> {
    const { data, error } = await supabase
      .from('sops')
      .update({
        ...updates,
        last_updated: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return convertDatabaseToApp.sop(data);
  },

  async deleteSOP(id: string): Promise<void> {
    const { error } = await supabase
      .from('sops')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};