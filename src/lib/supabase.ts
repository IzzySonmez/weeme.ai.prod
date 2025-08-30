// Supabase client configuration
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only create client if both URL and key are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false
      },
      db: {
        schema: 'public'
      },
      global: {
        headers: {
          'X-Client-Info': 'weeme-ai@1.0.0'
        }
      }
    })
  : null;

// Safe Supabase operations
export const safeSupabaseOperation = async (operation: () => Promise<any>) => {
  if (!supabase) {
    console.log('[SUPABASE] Client not available, skipping operation');
    return { data: null, error: { message: 'Supabase not configured' } };
  }
  
  try {
    return await operation();
  } catch (error) {
    console.error('[SUPABASE] Operation failed:', error);
    return { data: null, error: { message: error.message || 'Supabase operation failed' } };
  }
};

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          email: string;
          membership_type: 'Free' | 'Pro' | 'Advanced';
          credits: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          username: string;
          email: string;
          membership_type?: 'Free' | 'Pro' | 'Advanced';
          credits?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          email?: string;
          membership_type?: 'Free' | 'Pro' | 'Advanced';
          credits?: number;
          updated_at?: string;
        };
      };
      seo_reports: {
        Row: {
          id: string;
          user_id: string;
          website_url: string;
          score: number;
          positives: string[];
          negatives: string[];
          suggestions: string[];
          report_data: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          website_url: string;
          score: number;
          positives: string[];
          negatives: string[];
          suggestions: string[];
          report_data?: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          website_url?: string;
          score?: number;
          positives?: string[];
          negatives?: string[];
          suggestions?: string[];
          report_data?: any;
        };
      };
      tracking_codes: {
        Row: {
          id: string;
          user_id: string;
          website_url: string;
          code: string;
          is_active: boolean;
          scan_frequency: 'weekly' | 'biweekly' | 'monthly';
          last_scan: string;
          next_scan: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          website_url: string;
          code: string;
          is_active?: boolean;
          scan_frequency?: 'weekly' | 'biweekly' | 'monthly';
          last_scan?: string;
          next_scan?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          website_url?: string;
          code?: string;
          is_active?: boolean;
          scan_frequency?: 'weekly' | 'biweekly' | 'monthly';
          last_scan?: string;
          next_scan?: string;
        };
      };
      ai_content: {
        Row: {
          id: string;
          user_id: string;
          platform: 'linkedin' | 'instagram' | 'twitter' | 'facebook';
          prompt: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          platform: 'linkedin' | 'instagram' | 'twitter' | 'facebook';
          prompt: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          platform?: 'linkedin' | 'instagram' | 'twitter' | 'facebook';
          prompt?: string;
          content?: string;
        };
      };
    };
  };
}