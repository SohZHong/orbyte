'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useEnsName } from 'wagmi';
import { shortenAddress } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ChevronsUpDown, Copy, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { ModeToggle } from '../mode-toggle';

export default function NavUser() {
  const { user, login, logout } = usePrivy();

  const walletAddress = user?.smartWallet?.address ?? null;

  const { data: ensName } = useEnsName({
    address: walletAddress as `0x${string}` | undefined,
    chainId: 1,
  });

  const displayName =
    ensName || (walletAddress ? shortenAddress(walletAddress) : 'Sign in');

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='flex items-center gap-2'>
                <Avatar className='h-6 w-6'>
                  <AvatarFallback>
                    {displayName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className='truncate max-w-[120px]'>{displayName}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='min-w-56 rounded-lg'
            side='bottom'
            align='end'
            sideOffset={4}
          >
            {walletAddress ? (
              <div className='p-2'>
                <div className='flex justify-between items-center'>
                  <p className='text-sm text-muted-foreground'>Connected as</p>
                  <ModeToggle />
                </div>
                <p className='font-medium my-1'>{displayName}</p>
                <div className='flex flex-col gap-3'>
                  <Button
                    variant='secondary'
                    onClick={() => navigator.clipboard.writeText(walletAddress)}
                  >
                    <Copy />
                    Copy Address
                  </Button>
                  <Button onClick={logout} variant='destructive'>
                    <LogOut />
                    Disconnect
                  </Button>
                </div>
              </div>
            ) : (
              <div className='p-2'>
                <Button
                  onClick={login}
                  className='w-full rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90'
                >
                  Connect Wallet
                </Button>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
