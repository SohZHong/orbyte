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
  CreditTransferSchema,
  type CreditTransferForm,
} from '@/schema/marketplace';

interface CreditTransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (address: string, quantity: number) => void;
  isTransferring?: boolean;
}

export function CreditTransferDialog({
  open,
  onOpenChange,
  onConfirm,
  isTransferring = false,
}: CreditTransferDialogProps) {
  const form = useForm<CreditTransferForm>({
    resolver: zodResolver(CreditTransferSchema),
    defaultValues: {
      to: '',
      amount: 0,
    },
  });

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onOpenChange(false);
    form.reset();
  };

  const onSubmit = (data: CreditTransferForm) => {
    if (!data.to || !data.amount) return;
    onConfirm(data.to, data.amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Credit Transfer</DialogTitle>
          <DialogDescription>
            Please enter the recipient address and amount to receive. Do note
            this action is irreversible.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='to'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Address</FormLabel>
                  <FormControl>
                    <Input placeholder='0x12345...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='amount'
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
            <DialogFooter>
              <Button
                variant='destructive'
                onClick={handleCancel}
                disabled={isTransferring}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isTransferring}>
                {isTransferring ? (
                  <span className='inline-flex gap-1 items-center'>
                    <Spinner variant='circle' /> Transferring...
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
