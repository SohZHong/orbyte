import { SidebarInset } from '@/components/ui/sidebar';
import clsx from 'clsx';

export default function AppContent({
  variant = 'header',
  className,
  children,
}: {
  variant?: 'header' | 'sidebar';
  className?: string;
  children: React.ReactNode;
}) {
  if (variant === 'sidebar') {
    return <SidebarInset className={clsx(className)}>{children}</SidebarInset>;
  }

  return (
    <main
      className={clsx(
        'mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl',
        className
      )}
    >
      {children}
    </main>
  );
}
