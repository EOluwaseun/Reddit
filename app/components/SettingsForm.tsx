'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { updateUserName } from '../actions';
import { SubmitButton } from './SubmitButton';

export function SettingForm({
  username,
}: {
  username: string | null | undefined;
}) {
  return (
    <form action={updateUserName}>
      <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
      <Separator className="mt-4" />
      <Label className="text-lg">Username</Label>
      <p className="text-muted-foreground">
        In this Settings page you can change your username!
      </p>
      <Input
        defaultValue={username ?? undefined}
        name="username"
        required
        className="mt-2"
        min={2}
        maxLength={21}
      />
      <div className="w-full flex justify-end items-center gap-4 mt-4">
        <Button variant={'secondary'} asChild type="button">
          <Link href={'/'}>Cancel</Link>
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
}
