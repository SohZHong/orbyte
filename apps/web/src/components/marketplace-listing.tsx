'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import type { PublicMarketplaceListingsQuery } from '@/generated/graphql';
import { formatEther } from 'viem';
import {
  fetchTokenMetadata,
  getTimeFromBlockchainTimestamp,
} from '@/lib/utils';
import { graphQLStandardMap } from '@/types/proposal';
import { ipfsGateway } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';

interface MarketplaceCardProps {
  listing: PublicMarketplaceListingsQuery['marketplaceListings'][number];
  onBuy: (listingId: string, remaining: number, pricePerUnit: number) => void;
}

export const MarketplaceCard: React.FC<MarketplaceCardProps> = ({
  listing,
  onBuy,
}) => {
  const token = listing.token;
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchTokenMetadata(token.tokenURI).then((metadata) => {
      if (mounted && metadata?.image) {
        setImage(metadata.image.replace('ipfs://', `${ipfsGateway}/`));
      }
    });
    return () => {
      mounted = false;
    };
  }, [token.tokenURI]);

  return (
    <Card className='group hover:shadow-lg transition-shadow duration-200'>
      {/* Image */}
      <div className='h-56 w-full bg-gray-200 flex items-center justify-center overflow-hidden'>
        {image ? (
          <Image
            src={image}
            width={100}
            height={100}
            alt={token.project?.proposal?.name ?? 'Token Image'}
            className='h-full w-full object-cover'
          />
        ) : (
          <div className='prose prose-sm dark:prose-invert text-center text-gray-400'>
            <p className='text-sm'>Image not available</p>
          </div>
        )}
      </div>

      <CardContent>
        <h2 className='text-lg font-semibold line-clamp-2'>
          {token.project?.proposal?.name}
        </h2>
        <p className='text-sm text-muted-foreground mt-1 line-clamp-2'>
          Standard:{' '}
          {token.project?.proposal?.standard
            ? graphQLStandardMap[token.project.proposal.standard]
            : 'Unknown'}
        </p>
        <p className='mt-2 text-sm'>
          Price per unit: {formatEther(listing.pricePerUnit)} | Remaining:{' '}
          {listing.remaining}
        </p>
        <p className='mt-1 text-sm text-gray-500'>
          Ends:{' '}
          {getTimeFromBlockchainTimestamp(listing.endTime).toLocaleString()}
        </p>
      </CardContent>

      <CardFooter className='flex flex-row gap-2'>
        <Button
          size='sm'
          onClick={() =>
            onBuy(listing.id, listing.remaining, listing.pricePerUnit)
          }
        >
          Buy
        </Button>
        <Link href={`/project/${token.project?.id}`}>
          <Button variant='secondary' size='sm'>
            View Project
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
