'use client';

import { Textarea } from '@/components/ui/textarea';
import { updateSubDescription } from '../actions';
import { SaveButton } from './SubmitButton';
import { useFormState } from 'react-dom';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';

interface iAppProps {
  subName: string;
  description: string | null | undefined;
}

const initialState = {
  message: '',
  status: '',
};

export function SubDescriptionForm({ description, subName }: iAppProps) {
  const [state, formAction] = useFormState(updateSubDescription, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.status === 'green') {
      toast({
        title: 'Successful',
        description: state.message,
      });
    } else {
      if (state?.status === 'error') {
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast]);
  return (
    <form action={formAction}>
      {/* use get value from data */}
      <input type="hidden" name="subName" value={subName} />
      <Textarea
        placeholder="Create your custom description"
        maxLength={100}
        name="description"
        defaultValue={description ?? undefined}
      />
      <SaveButton />
    </form>
  );
}
