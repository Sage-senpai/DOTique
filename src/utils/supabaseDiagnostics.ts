// src/utils/supabaseDiagnostics.ts
/**
 * Run this to diagnose Supabase connection issues
 * Usage: import and call `runDiagnostics()` from console or a test screen
 */

import { supabase } from '../services/supabase';

export async function runDiagnostics() {
  console.log('🔍 Starting Supabase Diagnostics...\n');
  
  const results = {
    connectionTest: false,
    authTest: false,
    profilesTableTest: false,
    rpcTest: false,
    errors: [] as string[]
  };

  // Test 1: Basic Connection
  console.log('1️⃣ Testing basic connection...');
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      results.errors.push(`Connection: ${error.message}`);
    } else {
      console.log('✅ Connection successful');
      results.connectionTest = true;
    }
  } catch (err: any) {
    console.error('❌ Connection exception:', err.message);
    results.errors.push(`Connection exception: ${err.message}`);
  }

  // Test 2: Auth Service
  console.log('\n2️⃣ Testing auth service...');
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('❌ Auth service error:', error.message);
      results.errors.push(`Auth: ${error.message}`);
    } else {
      console.log('✅ Auth service accessible');
      console.log('Current session:', data.session ? 'Active' : 'None');
      results.authTest = true;
    }
  } catch (err: any) {
    console.error('❌ Auth exception:', err.message);
    results.errors.push(`Auth exception: ${err.message}`);
  }

  // Test 3: Profiles Table Access
  console.log('\n3️⃣ Testing profiles table...');
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, auth_uid, email, username')
      .limit(1);
    
    if (error) {
      console.error('❌ Profiles table error:', error.message);
      results.errors.push(`Profiles: ${error.message}`);
    } else {
      console.log('✅ Profiles table accessible');
      console.log('Sample data:', data);
      results.profilesTableTest = true;
    }
  } catch (err: any) {
    console.error('❌ Profiles exception:', err.message);
    results.errors.push(`Profiles exception: ${err.message}`);
  }

  // Test 4: Check Supabase Config
  console.log('\n4️⃣ Checking Supabase configuration...');
  try {
    // @ts-ignore - accessing internal config
    const supabaseUrl = supabase.supabaseUrl;
    // @ts-ignore
    const supabaseKey = supabase.supabaseKey;
    
    console.log('Supabase URL:', supabaseUrl || 'NOT SET');
    console.log('Supabase Key:', supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'NOT SET');
    
    if (!supabaseUrl || !supabaseKey) {
      results.errors.push('Supabase URL or Key not configured');
    }
  } catch (err: any) {
    console.warn('⚠️ Could not check config:', err.message);
  }

  // Summary
  console.log('\n📊 DIAGNOSTIC SUMMARY');
  console.log('='.repeat(50));
  console.log('Connection Test:', results.connectionTest ? '✅' : '❌');
  console.log('Auth Test:', results.authTest ? '✅' : '❌');
  console.log('Profiles Table:', results.profilesTableTest ? '✅' : '❌');
  
  if (results.errors.length > 0) {
    console.log('\n❌ ERRORS FOUND:');
    results.errors.forEach((err, i) => {
      console.log(`${i + 1}. ${err}`);
    });
  } else {
    console.log('\n✅ All tests passed!');
  }

  return results;
}

// Quick check function for Supabase config
export function checkSupabaseConfig() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  console.log('🔧 Supabase Configuration Check:');
  console.log('URL:', url || '❌ NOT SET');
  console.log('Key:', key ? `✅ ${key.substring(0, 20)}...` : '❌ NOT SET');
  
  if (!url || !key) {
    console.error('\n❌ CRITICAL: Supabase credentials not configured!');
    console.log('Please check your .env file has:');
    console.log('VITE_SUPABASE_URL=your_project_url');
    console.log('VITE_SUPABASE_ANON_KEY=your_anon_key');
    return false;
  }
  
  if (!url.startsWith('https://')) {
    console.error('❌ Supabase URL must start with https://');
    return false;
  }
  
  return true;
}