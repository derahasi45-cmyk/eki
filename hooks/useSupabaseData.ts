import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { 
  User, Profile, Client, Package, AddOn, Project, Transaction, Lead, 
  TeamMember, Card, FinancialPocket, TeamProjectPayment, TeamPaymentRecord, 
  RewardLedgerEntry, Asset, Contract, ClientFeedback, Notification, 
  SocialMediaPost, PromoCode, SOP 
} from '../types';

export const useSupabaseData = (isAuthenticated: boolean = false) => {
  // State for all data
  const [users, setUsers] = useState<User[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [pockets, setPockets] = useState<FinancialPocket[]>([]);
  const [teamProjectPayments, setTeamProjectPayments] = useState<TeamProjectPayment[]>([]);
  const [teamPaymentRecords, setTeamPaymentRecords] = useState<TeamPaymentRecord[]>([]);
  const [rewardLedgerEntries, setRewardLedgerEntries] = useState<RewardLedgerEntry[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [clientFeedback, setClientFeedback] = useState<ClientFeedback[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [socialMediaPosts, setSocialMediaPosts] = useState<SocialMediaPost[]>([]);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [sops, setSops] = useState<SOP[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all data on mount
  useEffect(() => {
    // Only load data if user is authenticated
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load all data in parallel
        const [
          usersData,
          profileData,
          clientsData,
          packagesData,
          addOnsData,
          projectsData,
          transactionsData,
          leadsData,
          teamMembersData,
          cardsData,
          pocketsData,
          teamProjectPaymentsData,
          teamPaymentRecordsData,
          rewardLedgerEntriesData,
          assetsData,
          contractsData,
          clientFeedbackData,
          notificationsData,
          socialMediaPostsData,
          promoCodesData,
          sopsData,
        ] = await Promise.all([
          api.getUsers(),
          api.getProfile(),
          api.getClients(),
          api.getPackages(),
          api.getAddOns(),
          api.getProjects(),
          api.getTransactions(),
          api.getLeads(),
          api.getTeamMembers(),
          api.getCards(),
          api.getFinancialPockets(),
          api.getTeamProjectPayments(),
          api.getTeamPaymentRecords(),
          api.getRewardLedgerEntries(),
          api.getAssets(),
          api.getContracts(),
          api.getClientFeedback(),
          api.getNotifications(),
          api.getSocialMediaPosts(),
          api.getPromoCodes(),
          api.getSOPs(),
        ]);

        setUsers(usersData);
        setProfile(profileData);
        setClients(clientsData);
        setPackages(packagesData);
        setAddOns(addOnsData);
        setProjects(projectsData);
        setTransactions(transactionsData);
        setLeads(leadsData);
        setTeamMembers(teamMembersData);
        setCards(cardsData);
        setPockets(pocketsData);
        setTeamProjectPayments(teamProjectPaymentsData);
        setTeamPaymentRecords(teamPaymentRecordsData);
        setRewardLedgerEntries(rewardLedgerEntriesData);
        setAssets(assetsData);
        setContracts(contractsData);
        setClientFeedback(clientFeedbackData);
        setNotifications(notificationsData);
        setSocialMediaPosts(socialMediaPostsData);
        setPromoCodes(promoCodesData);
        setSops(sopsData);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isAuthenticated]);

  // CRUD operations with optimistic updates
  const createClient = async (client: Client) => {
    try {
      const newClient = await api.createClient(client);
      setClients(prev => [newClient, ...prev]);
      return newClient;
    } catch (err) {
      console.error('Error creating client:', err);
      throw err;
    }
  };

  const updateClient = async (id: string, updates: Partial<Client>) => {
    try {
      const updatedClient = await api.updateClient(id, updates);
      setClients(prev => prev.map(c => c.id === id ? updatedClient : c));
      return updatedClient;
    } catch (err) {
      console.error('Error updating client:', err);
      throw err;
    }
  };

  const deleteClient = async (id: string) => {
    try {
      await api.deleteClient(id);
      setClients(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error deleting client:', err);
      throw err;
    }
  };

  const createProject = async (project: Project) => {
    try {
      const newProject = await api.createProject(project);
      setProjects(prev => [newProject, ...prev]);
      return newProject;
    } catch (err) {
      console.error('Error creating project:', err);
      throw err;
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const updatedProject = await api.updateProject(id, updates);
      setProjects(prev => prev.map(p => p.id === id ? updatedProject : p));
      return updatedProject;
    } catch (err) {
      console.error('Error updating project:', err);
      throw err;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await api.deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
      throw err;
    }
  };

  const createTransaction = async (transaction: Transaction) => {
    try {
      const newTransaction = await api.createTransaction(transaction);
      setTransactions(prev => [newTransaction, ...prev.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())]);
      return newTransaction;
    } catch (err) {
      console.error('Error creating transaction:', err);
      throw err;
    }
  };

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    try {
      const updatedTransaction = await api.updateTransaction(id, updates);
      setTransactions(prev => prev.map(t => t.id === id ? updatedTransaction : t));
      return updatedTransaction;
    } catch (err) {
      console.error('Error updating transaction:', err);
      throw err;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await api.deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error deleting transaction:', err);
      throw err;
    }
  };

  const createLead = async (lead: Lead) => {
    try {
      const newLead = await api.createLead(lead);
      setLeads(prev => [newLead, ...prev]);
      return newLead;
    } catch (err) {
      console.error('Error creating lead:', err);
      throw err;
    }
  };

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    try {
      const updatedLead = await api.updateLead(id, updates);
      setLeads(prev => prev.map(l => l.id === id ? updatedLead : l));
      return updatedLead;
    } catch (err) {
      console.error('Error updating lead:', err);
      throw err;
    }
  };

  const deleteLead = async (id: string) => {
    try {
      await api.deleteLead(id);
      setLeads(prev => prev.filter(l => l.id !== id));
    } catch (err) {
      console.error('Error deleting lead:', err);
      throw err;
    }
  };

  const createTeamMember = async (member: TeamMember) => {
    try {
      const newMember = await api.createTeamMember(member);
      setTeamMembers(prev => [newMember, ...prev]);
      return newMember;
    } catch (err) {
      console.error('Error creating team member:', err);
      throw err;
    }
  };

  const updateTeamMember = async (id: string, updates: Partial<TeamMember>) => {
    try {
      const updatedMember = await api.updateTeamMember(id, updates);
      setTeamMembers(prev => prev.map(m => m.id === id ? updatedMember : m));
      return updatedMember;
    } catch (err) {
      console.error('Error updating team member:', err);
      throw err;
    }
  };

  const deleteTeamMember = async (id: string) => {
    try {
      await api.deleteTeamMember(id);
      setTeamMembers(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error('Error deleting team member:', err);
      throw err;
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      const updatedProfile = await api.updateProfile(updates);
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err) {
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  // Add similar CRUD functions for other entities...
  const createPackage = async (pkg: Package) => {
    try {
      const newPackage = await api.createPackage(pkg);
      setPackages(prev => [newPackage, ...prev]);
      return newPackage;
    } catch (err) {
      console.error('Error creating package:', err);
      throw err;
    }
  };

  const updatePackage = async (id: string, updates: Partial<Package>) => {
    try {
      const updatedPackage = await api.updatePackage(id, updates);
      setPackages(prev => prev.map(p => p.id === id ? updatedPackage : p));
      return updatedPackage;
    } catch (err) {
      console.error('Error updating package:', err);
      throw err;
    }
  };

  const deletePackage = async (id: string) => {
    try {
      await api.deletePackage(id);
      setPackages(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting package:', err);
      throw err;
    }
  };

  const createAddOn = async (addOn: AddOn) => {
    try {
      const newAddOn = await api.createAddOn(addOn);
      setAddOns(prev => [newAddOn, ...prev]);
      return newAddOn;
    } catch (err) {
      console.error('Error creating add-on:', err);
      throw err;
    }
  };

  const updateAddOn = async (id: string, updates: Partial<AddOn>) => {
    try {
      const updatedAddOn = await api.updateAddOn(id, updates);
      setAddOns(prev => prev.map(a => a.id === id ? updatedAddOn : a));
      return updatedAddOn;
    } catch (err) {
      console.error('Error updating add-on:', err);
      throw err;
    }
  };

  const deleteAddOn = async (id: string) => {
    try {
      await api.deleteAddOn(id);
      setAddOns(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error('Error deleting add-on:', err);
      throw err;
    }
  };

  const createCard = async (card: Card) => {
    try {
      const newCard = await api.createCard(card);
      setCards(prev => [newCard, ...prev]);
      return newCard;
    } catch (err) {
      console.error('Error creating card:', err);
      throw err;
    }
  };

  const updateCard = async (id: string, updates: Partial<Card>) => {
    try {
      const updatedCard = await api.updateCard(id, updates);
      setCards(prev => prev.map(c => c.id === id ? updatedCard : c));
      return updatedCard;
    } catch (err) {
      console.error('Error updating card:', err);
      throw err;
    }
  };

  const deleteCard = async (id: string) => {
    try {
      await api.deleteCard(id);
      setCards(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error deleting card:', err);
      throw err;
    }
  };

  const createFinancialPocket = async (pocket: FinancialPocket) => {
    try {
      const newPocket = await api.createFinancialPocket(pocket);
      setPockets(prev => [newPocket, ...prev]);
      return newPocket;
    } catch (err) {
      console.error('Error creating financial pocket:', err);
      throw err;
    }
  };

  const updateFinancialPocket = async (id: string, updates: Partial<FinancialPocket>) => {
    try {
      const updatedPocket = await api.updateFinancialPocket(id, updates);
      setPockets(prev => prev.map(p => p.id === id ? updatedPocket : p));
      return updatedPocket;
    } catch (err) {
      console.error('Error updating financial pocket:', err);
      throw err;
    }
  };

  const deleteFinancialPocket = async (id: string) => {
    try {
      await api.deleteFinancialPocket(id);
      setPockets(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting financial pocket:', err);
      throw err;
    }
  };

  const createAsset = async (asset: Asset) => {
    try {
      const newAsset = await api.createAsset(asset);
      setAssets(prev => [newAsset, ...prev]);
      return newAsset;
    } catch (err) {
      console.error('Error creating asset:', err);
      throw err;
    }
  };

  const updateAsset = async (id: string, updates: Partial<Asset>) => {
    try {
      const updatedAsset = await api.updateAsset(id, updates);
      setAssets(prev => prev.map(a => a.id === id ? updatedAsset : a));
      return updatedAsset;
    } catch (err) {
      console.error('Error updating asset:', err);
      throw err;
    }
  };

  const deleteAsset = async (id: string) => {
    try {
      await api.deleteAsset(id);
      setAssets(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error('Error deleting asset:', err);
      throw err;
    }
  };

  const createContract = async (contract: Contract) => {
    try {
      const newContract = await api.createContract(contract);
      setContracts(prev => [newContract, ...prev]);
      return newContract;
    } catch (err) {
      console.error('Error creating contract:', err);
      throw err;
    }
  };

  const updateContract = async (id: string, updates: Partial<Contract>) => {
    try {
      const updatedContract = await api.updateContract(id, updates);
      setContracts(prev => prev.map(c => c.id === id ? updatedContract : c));
      return updatedContract;
    } catch (err) {
      console.error('Error updating contract:', err);
      throw err;
    }
  };

  const deleteContract = async (id: string) => {
    try {
      await api.deleteContract(id);
      setContracts(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error deleting contract:', err);
      throw err;
    }
  };

  const createClientFeedback = async (feedback: ClientFeedback) => {
    try {
      const newFeedback = await api.createClientFeedback(feedback);
      setClientFeedback(prev => [newFeedback, ...prev.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())]);
      return newFeedback;
    } catch (err) {
      console.error('Error creating client feedback:', err);
      throw err;
    }
  };

  const createNotification = async (notification: Notification) => {
    try {
      const newNotification = await api.createNotification(notification);
      setNotifications(prev => [newNotification, ...prev]);
      return newNotification;
    } catch (err) {
      console.error('Error creating notification:', err);
      throw err;
    }
  };

  const updateNotification = async (id: string, updates: Partial<Notification>) => {
    try {
      const updatedNotification = await api.updateNotification(id, updates);
      setNotifications(prev => prev.map(n => n.id === id ? updatedNotification : n));
      return updatedNotification;
    } catch (err) {
      console.error('Error updating notification:', err);
      throw err;
    }
  };

  const createSocialMediaPost = async (post: SocialMediaPost) => {
    try {
      const newPost = await api.createSocialMediaPost(post);
      setSocialMediaPosts(prev => [newPost, ...prev]);
      return newPost;
    } catch (err) {
      console.error('Error creating social media post:', err);
      throw err;
    }
  };

  const updateSocialMediaPost = async (id: string, updates: Partial<SocialMediaPost>) => {
    try {
      const updatedPost = await api.updateSocialMediaPost(id, updates);
      setSocialMediaPosts(prev => prev.map(p => p.id === id ? updatedPost : p));
      return updatedPost;
    } catch (err) {
      console.error('Error updating social media post:', err);
      throw err;
    }
  };

  const deleteSocialMediaPost = async (id: string) => {
    try {
      await api.deleteSocialMediaPost(id);
      setSocialMediaPosts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting social media post:', err);
      throw err;
    }
  };

  const createPromoCode = async (code: PromoCode) => {
    try {
      const newCode = await api.createPromoCode(code);
      setPromoCodes(prev => [newCode, ...prev]);
      return newCode;
    } catch (err) {
      console.error('Error creating promo code:', err);
      throw err;
    }
  };

  const updatePromoCode = async (id: string, updates: Partial<PromoCode>) => {
    try {
      const updatedCode = await api.updatePromoCode(id, updates);
      setPromoCodes(prev => prev.map(c => c.id === id ? updatedCode : c));
      return updatedCode;
    } catch (err) {
      console.error('Error updating promo code:', err);
      throw err;
    }
  };

  const deletePromoCode = async (id: string) => {
    try {
      await api.deletePromoCode(id);
      setPromoCodes(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error deleting promo code:', err);
      throw err;
    }
  };

  const createSOP = async (sop: SOP) => {
    try {
      const newSOP = await api.createSOP(sop);
      setSops(prev => [...prev, newSOP].sort((a, b) => a.title.localeCompare(b.title)));
      return newSOP;
    } catch (err) {
      console.error('Error creating SOP:', err);
      throw err;
    }
  };

  const updateSOP = async (id: string, updates: Partial<SOP>) => {
    try {
      const updatedSOP = await api.updateSOP(id, updates);
      setSops(prev => prev.map(s => s.id === id ? updatedSOP : s));
      return updatedSOP;
    } catch (err) {
      console.error('Error updating SOP:', err);
      throw err;
    }
  };

  const deleteSOP = async (id: string) => {
    try {
      await api.deleteSOP(id);
      setSops(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error('Error deleting SOP:', err);
      throw err;
    }
  };

  return {
    // Data
    users,
    profile,
    clients,
    packages,
    addOns,
    projects,
    transactions,
    leads,
    teamMembers,
    cards,
    pockets,
    teamProjectPayments,
    teamPaymentRecords,
    rewardLedgerEntries,
    assets,
    contracts,
    clientFeedback,
    notifications,
    socialMediaPosts,
    promoCodes,
    sops,
    
    // State
    loading,
    error,
    
    // CRUD operations
    createClient,
    updateClient,
    deleteClient,
    createProject,
    updateProject,
    deleteProject,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    createLead,
    updateLead,
    deleteLead,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
    updateProfile,
    createPackage,
    updatePackage,
    deletePackage,
    createAddOn,
    updateAddOn,
    deleteAddOn,
    createCard,
    updateCard,
    deleteCard,
    createFinancialPocket,
    updateFinancialPocket,
    deleteFinancialPocket,
    createAsset,
    updateAsset,
    deleteAsset,
    createContract,
    updateContract,
    deleteContract,
    createClientFeedback,
    createNotification,
    updateNotification,
    createSocialMediaPost,
    updateSocialMediaPost,
    deleteSocialMediaPost,
    createPromoCode,
    updatePromoCode,
    deletePromoCode,
    createSOP,
    updateSOP,
    deleteSOP,
    
    // Setters for direct state updates (for complex operations)
    setUsers,
    setProfile,
    setClients,
    setPackages,
    setAddOns,
    setProjects,
    setTransactions,
    setLeads,
    setTeamMembers,
    setCards,
    setPockets,
    setTeamProjectPayments,
    setTeamPaymentRecords,
    setRewardLedgerEntries,
    setAssets,
    setContracts,
    setClientFeedback,
    setNotifications,
    setSocialMediaPosts,
    setPromoCodes,
    setSops,
  };
};