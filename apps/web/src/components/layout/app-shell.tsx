import { SidebarProvider } from '@/components/ui/sidebar';

export default function AppShell({
  variant = 'sidebar',
  sidebarOpen,
  children,
}: {
  variant?: 'header' | 'sidebar';
  sidebarOpen?: boolean;
  children: React.ReactNode;
}) {
  if (variant === 'header') {
    return <div className='flex min-h-screen w-full flex-col'>{children}</div>;
  }

  return (
    <SidebarProvider defaultOpen={sidebarOpen}>{children}</SidebarProvider>
  );
}
