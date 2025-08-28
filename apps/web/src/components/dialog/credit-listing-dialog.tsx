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
  CreditListingSchema,
  type CreditListingForm,
} from '@/schema/marketplace';

interface CreditListingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (
    quantity: number,
    price: number,
    startTime: string,
    endTime: string
  ) => void;
  isListing?: boolean;
}

export function CreditListingDialog({
  open,
  onOpenChange,
  onConfirm,
  isListing = false,
}: CreditListingDialogProps) {
  const form = useForm<CreditListingForm>({
    resolver: zodResolver(CreditListingSchema),
    defaultValues: {
      quantity: 0,
      price: 0,
      startTime: new Date().toLocaleString(),
      endTime: new Date().toLocaleString(),
    },
  });

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onOpenChange(false);
    form.reset();
  };

  const onSubmit = (data: CreditListingForm) => {
    if (!data.price || !data.quantity || !data.startTime || !data.endTime)
      return;
    onConfirm(data.quantity, data.price, data.startTime, data.endTime);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Credit Listing</DialogTitle>
          <DialogDescription>
            Please enter the price, amount of credits being sold and the
            duration of which the listing lasts
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='quantity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='0.01' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Per Unit (CELO)</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='0.01' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='startTime'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input type='datetime-local' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='endTime'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input type='datetime-local' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant='destructive'
                onClick={handleCancel}
                disabled={isListing}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isListing}>
                {isListing ? (
                  <span className='inline-flex gap-1 items-center'>
                    <Spinner variant='circle' /> Listing...
                  </span>
                ) : (
                  <span>Confirm</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
