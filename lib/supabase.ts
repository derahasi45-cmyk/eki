import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to get current user's vendor_id
export const getCurrentVendorId = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');
  
  const { data: userData, error } = await supabase
    .from('users')
    .select('vendor_id')
    .eq('id', user.id)
    .single();
    
  if (error) throw error;
  return userData.vendor_id;
};

// Auth helpers
export const signUp = async (email: string, password: string, userData: {
  fullName: string;
  companyName: string;
  vendorId: string;
  role: 'Admin' | 'Member';
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  if (data.user) {
    // Insert user data
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: data.user.id,
        email,
        password, // In production, this should be hashed
        full_name: userData.fullName,
        company_name: userData.companyName,
        vendor_id: userData.vendorId,
        role: userData.role,
      });

    if (userError) throw userError;
  }

  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};