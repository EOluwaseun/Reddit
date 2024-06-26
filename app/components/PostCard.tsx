import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowDown, ArrowUp, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CopyLink } from './CopyLink';
import { handleVote } from '../actions';
import { DownButton, UpdateButton } from './SubmitButton';

interface iAppProps {
  title: string;
  id: string;
  jsonContent: any;
  subName: string;
  userName: string;
  imageString: string | null;
  voteCount: number;
}

export function PostCard({
  title,
  id,
  jsonContent,
  subName,
  userName,
  imageString,
  voteCount,
}: iAppProps) {
  return (
    <Card className="flex relative overflow-hidden">
      <div className="flex flex-col items-center gap-y-2 bg-muted p-2">
        <form action={handleVote}>
          <input type="hidden" name="voteDirection" value={'UP'} />
          <input type="hidden" name="postId" value={id} />
          <UpdateButton />
        </form>
        {voteCount}
        <form action={handleVote}>
          <input type="hidden" name="voteDirection" value={'DOWN'} />
          <input type="hidden" name="postId" value={id} />
          <DownButton />
        </form>
      </div>
      <div>
        <div className="flex ga-x-4 p-2 items-center">
          <Link href={`/r/${subName}`}>r/{subName}</Link>
          <p className="text-muted-foreground text-sm ml-2">
            Posted By: <span className="hover:text-primary">{userName}</span>
          </p>
        </div>
        <div className="px-2">
          <Link href={'/'}>
            <h1>{title}</h1>
          </Link>
        </div>
        <div className="max-h-[300px] overflow-hidden mt-2">
          {imageString && (
            <Image
              src={imageString}
              alt="Post imag4"
              height={300}
              width={600}
              className="w-full h-full"
            />
          )}
        </div>
        <div className="m-3 flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
            <p>21 comments</p>
          </div>
          <CopyLink id={id} />
        </div>
      </div>
    </Card>
  );
}
