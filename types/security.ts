export type Nonce = string | undefined;

export interface SecurityHeaders {
  nonce: Nonce;
}

// Helper function to handle nonce
export function getNonce(headers: Headers): Nonce {
  return headers.get('x-nonce') || undefined;
}