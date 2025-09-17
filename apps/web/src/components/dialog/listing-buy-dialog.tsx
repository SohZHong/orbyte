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
import { getListingBuyForm, type ListingBuyForm } from '@/schema/marketplace';

interface ListingBuyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (quantity: number) => void;
  isBuying?: boolean;
  currentRemaining: number;
  pricePerUnit: number;
}

export function ListingBuyDialog({
  open,
  onOpenChange,
  onConfirm,
  isBuying = false,
  currentRemaining,
  pricePerUnit,
}: ListingBuyDialogProps) {
  const form = useForm({
    resolver: zodResolver(getListingBuyForm(currentRemaining)),
    defaultValues: {
      quantity: 0,
    },
  });

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onOpenChange(false);
    form.reset();
  };

  const onSubmit = (data: ListingBuyForm) => {
    if (data.quantity <= 0) {
      form.setError('quantity', { message: 'You cannot buy 0' });
      return;
    }
    onConfirm(data.quantity);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buy Credit</DialogTitle>
          <DialogDescription>
            Specify the amount you wish to purchase
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='text-sm text-muted-foreground'>
              Current Remaining: <strong>{currentRemaining}</strong>
            </div>

            <FormField
              control={form.control}
              name='quantity'
              render={({ field }) => {
                const quantity = (field.value as number) ?? 0;
                const totalPrice = pricePerUnit * quantity;

                return (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={0}
                        max={currentRemaining}
                        value={field.value as number | undefined}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className='text-sm text-muted-foreground mt-1'>
                      Total Price: {totalPrice}
                    </p>
                  </FormItem>
                );
              }}
            />

            <DialogFooter>
              <Button
                variant='destructive'
                onClick={handleCancel}
                disabled={isBuying}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isBuying}>
                {isBuying ? 'Loading...' : 'Confirm'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
