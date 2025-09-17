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
  CreditRetireSchema,
  type CreditRetireForm,
} from '@/schema/marketplace';

interface CreditRetireDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (quantity: number, file?: File) => void;
  isRetiring?: boolean;
}

export function CreditRetireDialog({
  open,
  onOpenChange,
  onConfirm,
  isRetiring = false,
}: CreditRetireDialogProps) {
  const form = useForm({
    resolver: zodResolver(CreditRetireSchema),
    defaultValues: {
      quantity: 0,
    },
  });

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onOpenChange(false);
    form.reset();
  };

  const onSubmit = (data: CreditRetireForm) => {
    if (!data.quantity) return;
    onConfirm(data.quantity, data.file);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Credit Retirement</DialogTitle>
          <DialogDescription>
            Please enter the amount to retire. Once retired, a proof of export
            will be downloaded to your device
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
                    <Input
                      type='number'
                      placeholder='0.01'
                      value={field.value as number | undefined}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='file'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Justification Document of Retirement (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant='destructive'
                onClick={handleCancel}
                disabled={isRetiring}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isRetiring}>
                {isRetiring ? (
                  <span className='inline-flex gap-1 items-center'>
                    <Spinner variant='circle' /> Loading...
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
