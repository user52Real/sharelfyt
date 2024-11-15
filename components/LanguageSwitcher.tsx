// components/LanguageSwitcher.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'EN' },
  { code: 'nl', name: 'NL' }
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLocale = document.cookie.match('NEXT_LOCALE=([^;]+)')?.[1] || 'en';
    setCurrentLanguage(savedLocale);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'nl' : 'en';
    setCurrentLanguage(newLanguage);
    document.cookie = `NEXT_LOCALE=${newLanguage};path=/`;
    router.refresh();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-sm font-medium"
    >
      <Globe className="h-4 w-4" />
      {currentLanguage.toUpperCase()}
    </Button>
  );
}