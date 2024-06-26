'use client';

import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export function SubmitButton({ text }: { text: string }) {
  // get pending state
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit">{text}</Button>
      )}
    </>
  );
}
export function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button className="mt-2 w-full" disabled size={'sm'}>
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button size="sm" className="mt-2 w-full" type="submit">
          Save
        </Button>
      )}
    </>
  );
}

export function UpdateButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          className="mt-2 w-full"
          disabled
          size={'icon'}
          variant={'outline'}
        >
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
        </Button>
      ) : (
        <Button variant={'outline'} size={'sm'} type="submit">
          <ArrowUp className="w-4 h-4" />
        </Button>
      )}
    </>
  );
}

export function DownButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          className="mt-2 w-full"
          disabled
          size={'icon'}
          variant={'outline'}
        >
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
        </Button>
      ) : (
        <Button variant={'outline'} size={'sm'} type="submit">
          <ArrowDown className="w-4 h-4" />
        </Button>
      )}
    </>
  );
}
