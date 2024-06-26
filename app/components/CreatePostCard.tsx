import { Card } from '@/components/ui/card';
import Image from 'next/image';
import redditImg from '../../public/reddit_mobile.webp';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ImageDown, Link2 } from 'lucide-react';

export function CreatePostCard() {
  return (
    <Card className="px-4 py-2 flex items-content gap-x-4">
      <Image src={redditImg} alt={'pfp'} className="w-fit h-12" />
      <Link href={'/r/community-1/create'} className="w-full">
        <Input placeholder="Create your post" className="outline-none" />
      </Link>
      <div className="flex items-center gap-x-4">
        <Button variant={'outline'} size={'icon'} asChild className="p-2">
          <Link href={'/r/community-1/create'} className="w-full">
            <ImageDown className="w-6 h-6" />
          </Link>
        </Button>
        <Button variant={'outline'} size={'icon'} className="p-2">
          <Link href={'/r/community-1/create'}>
            <Link2 className="w-6 h-6" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
