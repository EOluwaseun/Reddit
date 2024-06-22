import { Card } from '@/components/ui/card';
import Image from 'next/image';
import redditImg from '../../public/reddit_mobile.webp';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export function CreatePostCard() {
  return (
    <Card className="p-4 py-2 flex items-content gap-x-4">
      <Image src={redditImg} alt={'pfp'} className="w-fit h-12" />
      <Link href={'/r/community-1/create'} className="w-full">
        <Input placeholder="Create your post" />
      </Link>
    </Card>
  );
}
