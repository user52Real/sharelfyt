import { NextResponse } from 'next/server'

export async function cors(
  request: Request,
  response: NextResponse,
  allowedMethods: string[],
  allowedOrigins: string[]
) {
  const origin = request.headers.get('origin')
  
  // Check if the origin is allowed
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 403,
      statusText: 'Forbidden',
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      headers: {
        'Access-Control-Allow-Origin': origin ?? '*',
        'Access-Control-Allow-Methods': allowedMethods.join(', '),
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  // Set CORS headers for the actual response
  response.headers.set('Access-Control-Allow-Origin', origin ?? '*')
  return null
}