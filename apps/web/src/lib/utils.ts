import { ipfsGateway } from '@/constants';
import type { TokenMetadata } from '@/types/metadata';
import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(address?: string, chars = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function getTimeFromBlockchainTimestamp(timestamp: string): Date {
  return new Date(Number(timestamp) * 1000);
}

export function toBlockchainTimestamp(value: string): number {
  return Math.floor(new Date(value).getTime() / 1000);
}

// Fetch token metadata for image
export async function fetchTokenMetadata(
  tokenURI: string
): Promise<TokenMetadata | null> {
  try {
    const url = ipfsGateway + '/' + tokenURI;
    const res = await axios.get<TokenMetadata>(url, { baseURL: undefined });
    return res.data;
  } catch (err) {
    console.error('Error fetching token metadata', err);
    return null;
  }
}
