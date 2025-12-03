import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    // Test the connection by fetching the current timestamp from Supabase
    const { data, error } = await supabase.rpc('now')
    
    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Successfully connected to Supabase!',
      timestamp: data
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to connect to Supabase' },
      { status: 500 }
    )
  }
}
