import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const response = NextResponse.next()

    // Set CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*') // Adjust to required origin
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    return response
}

// Apply the middleware to all API routes
export const config = {
    matcher: '/api/:path*', // This ensures middleware runs on all routes under /api
}
