'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '../ui/shadcn-io/spinner';
import {
  getListingUpdateSchema,
  type ListingUpdateForm,
} from '@/schema/marketplace';

interface ListingUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (newPrice: number, newRemaining: number) => void;
  isUpdating?: boolean;
  currentRemaining: number;
}

export function ListingUpdateDialog({
  open,
  onOpenChange,
  onConfirm,
  isUpdating = false,
  currentRemaining,
}: ListingUpdateDialogProps) {
  const form = useForm<ListingUpdateForm>({
    resolver: zodResolver(getListingUpdateSchema(currentRemaining)),
    defaultValues: {
      price: 0,
      withdrawAmount: 0,
    },
  });

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onOpenChange(false);
    form.reset();
  };

  const onSubmit = (data: { price: number; withdrawAmount: number }) => {
    const newRemaining = currentRemaining - data.withdrawAmount;
    if (newRemaining <= 0) {
      form.setError('withdrawAmount', {
        message: 'You must leave at least 1 credit listed',
      });
      return;
    }
    onConfirm(data.price, newRemaining);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Listing</DialogTitle>
          <DialogDescription>
            Update your price or withdraw some credits from the listing.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* Show current remaining */}
            <div className='text-sm text-muted-foreground'>
              Current Remaining: <strong>{currentRemaining}</strong>
            </div>

            {/* Price field */}
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Per Unit (CELO)</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Withdraw amount */}
            <FormField
              control={form.control}
              name='withdrawAmount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Withdraw Credits</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                variant='destructive'
                onClick={handleCancel}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isUpdating}>
                {isUpdating ? (
                  <span className='inline-flex gap-1 items-center'>
                    <Spinner variant='circle' /> Updating...
                  </span>
                ) : (
                  'Confirm'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
