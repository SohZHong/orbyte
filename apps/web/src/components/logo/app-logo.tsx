'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AppLogo({ className }: { className?: string }) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // prevent SSR mismatch

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const src = currentTheme === 'dark' ? '/logo-dark.png' : '/logo-light.png';

  return (
    <Image
      src={src}
      alt='App Logo'
      width={100}
      height={100}
      className={className}
    />
  );
}
