import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function AppLogo({ className }: { className?: string }) {
  const { theme, systemTheme } = useTheme();
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
