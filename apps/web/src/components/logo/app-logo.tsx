import Image from 'next/image';

export default function AppLogo({ className }: { className?: string }) {
  return (
    <Image
      src='/logo.png'
      alt='App Logo'
      width={40}
      height={42}
      className={className}
    />
  );
}
