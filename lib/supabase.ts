import { createClient, SupabaseClient } from '@supabase/supabase-js'

/**
 * Supabase client for browser-side usage.
 *
 * Set these environment variables in .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
 *
 * If not configured, createBrowserClient() returns null and the app
 * gracefully degrades to showing the store without authentication.
 */

let client: SupabaseClient | null = null

export function createBrowserClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Gracefully degrade -- no Supabase config means no auth
  if (!url || !key) return null

  if (!client) {
    client = createClient(url, key)
  }

  return client
}
