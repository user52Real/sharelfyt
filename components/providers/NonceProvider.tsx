'use client';

import React, { createContext, useContext } from 'react';

const NonceContext = createContext<string>('');

export function useNonce() {
  return useContext(NonceContext);
}

export function NonceProvider({ 
  children, 
  nonce 
}: { 
  children: React.ReactNode; 
  nonce: string;
}) {
  return (
    <NonceContext.Provider value={nonce}>
      {children}
    </NonceContext.Provider>
  );
}