'use client';

import { usePrivy } from '@privy-io/react-auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { shortenAddress } from '@/lib/utils';
import { Copy, IdCard, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function UserDropdown() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  const router = useRouter();

  if (!ready) return null;

  if (!authenticated) {
    return (
      <Button onClick={login} variant='default'>
        Connect Wallet
      </Button>
    );
  }

  const address = user?.smartWallet?.address ?? 'Loading...';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm'>
          {shortenAddress(address)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(address)}
        >
          <Copy />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/apply')}>
          <IdCard />
          Apply as Professional
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          <LogOut /> Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
