'use client';

import { usePrivy } from '@privy-io/react-auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { shortenAddress } from '@/lib/utils';
import { Copy, IdCard, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';

export function UserDropdown() {
  const { ready, authenticated, user: privyUser, login, logout } = usePrivy();
  const address = privyUser?.smartWallet?.address ?? '';

  const { data: user, isLoading } = useUser(address);
  const role = user?.role;

  const router = useRouter();

  if (!ready) return null;

  if (!authenticated) {
    return (
      <Button onClick={login} variant='default'>
        Connect Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isLoading ? (
          <Skeleton className='h-8 w-24 rounded-md' />
        ) : (
          <Button variant='ghost' size='sm'>
            {shortenAddress(address)}
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(address)}
        >
          <Copy className='mr-2 h-4 w-4' />
          Copy Address
        </DropdownMenuItem>

        {/* only show if user has no role OR is Public, once loaded */}
        {!isLoading && (!role || role === 'Public') && (
          <DropdownMenuItem onClick={() => router.push('/apply')}>
            <IdCard className='mr-2 h-4 w-4' />
            Apply as Professional
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={logout}>
          <LogOut className='mr-2 h-4 w-4' />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
