import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { config } from '../config/env';

/**
 * Supabase client with validated configuration
 * Best Practice 2025: Type-safe, validated environment variables
 */
export const supabase = createClient<Database>(config.supabase.url, config.supabase.anonKey);
