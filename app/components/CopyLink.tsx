'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Share } from 'lucide-react';

export function CopyLink({ id }: { id: string }) {
  const { toast } = useToast();
  async function copyClipboard() {
    await navigator.clipboard.writeText(`${location.origin}/post/${id}`);
    toast({
      title: 'success',
      description: 'Your link is copied in your clipboard',
    });
  }
  return (
    <Button
      variant={'outline'}
      className="flex items-center gap-2"
      onClick={copyClipboard}
    >
      <Share className="h-4 w-4 text-muted-foregorund" />
      <p className="text-sm text-muted-foreground">Share</p>
    </Button>
  );
}
