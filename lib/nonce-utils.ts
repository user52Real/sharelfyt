import { headers } from 'next/headers';

export function getNonce() {
  // Try to get the nonce from headers first
  const nonce = headers().get('x-nonce');
  
  // If no nonce in headers, generate a new one
  if (!nonce) {
    // Generate a cryptographically secure nonce
    if (typeof window === 'undefined') {
      // Server-side
      return crypto.randomUUID();
    } else {
      // Client-side
      return window.__NONCE__;
    }
  }
  
  return nonce;
}

// Add the type declaration
declare global {
  interface Window {
    __NONCE__: string;
  }
}