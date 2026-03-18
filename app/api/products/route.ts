import { NextResponse } from 'next/server'
import { products } from '@/data/products'

/**
 * API route stub for future product CRUD.
 *
 * Currently returns the static product list.
 * When Supabase is configured, this will:
 *   - GET: Fetch user-specific products from Supabase
 *   - POST: Create a new product for the authenticated user
 *   - PUT: Update a product
 *   - DELETE: Remove a product
 *
 * To enable multi-tenant product storage:
 * 1. Create a `products` table in Supabase with a `user_id` column
 * 2. Set up RLS policies so users can only access their own products
 * 3. Replace the static import with Supabase queries
 */

export async function GET() {
  // TODO: When Supabase is configured, query user-specific products
  // const supabase = createServerClient()
  // const { data: { user } } = await supabase.auth.getUser()
  // if (user) {
  //   const { data } = await supabase.from('products').select('*').eq('user_id', user.id)
  //   return NextResponse.json(data)
  // }

  return NextResponse.json(products)
}

export async function POST() {
  // TODO: Create a new product for the authenticated user
  return NextResponse.json(
    { error: 'Not implemented. Configure Supabase to enable product creation.' },
    { status: 501 }
  )
}
