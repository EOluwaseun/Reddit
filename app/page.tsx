import { Card } from '@/components/ui/card';
import Image from 'next/image';
import redditImg from '../public/reddit_mobile.webp';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CreatePostCard } from './components/CreatePostCard';
import prisma from './lib/db';
import { PostCard } from './components/PostCard';

async function getData() {
  const data = await prisma.post.findMany({
    select: {
      title: true,
      createdAt: true,
      textContent: true,
      id: true,
      imageString: true,
      User: {
        select: {
          userName: true,
        },
      },
      Vote: true,
      subName: true,
    },
    // get new post at the top
    orderBy: {
      createdAt: 'desc',
    },
  });

  return data;
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4">
      <div className="w-[65%] flex flex-col gap-y-5">
        <CreatePostCard />
        {data.map((post) => {
          return (
            <PostCard
              key={post.id}
              id={post.id}
              jsonContent={post.textContent}
              title={post.title}
              userName={post.User?.userName as string}
              subName={post.subName as string}
              imageString={post.imageString}
              voteCount={post.Vote.reduce(
                (acc: number, vote: { voteType: string }) => {
                  if (vote.voteType === 'UP') return acc + 1;
                  if (vote.voteType === 'DOWN') return acc - 1;
                  return acc;
                },
                0
              )}
            />
          );
        })}
      </div>
      <div className="w-[35%]">
        <Card>
          <div className="w-full h-[60px] bg-primary"></div>
          <div className="p-2">
            <div className="flex items-center">
              <Image
                src={redditImg}
                alt={'reddit'}
                className="w-fit h-[60px] -mt-6"
              />
              <h1 className="font-medium pl-4">Home</h1>
            </div>
            <p className="text-sm text-muted-foreground pt-2">
              Your Home FrontPage. Come here to check in with your favorite
              communities{' '}
            </p>
            <Separator className="my-5" />

            <div className="flex flex-col gap-y-4">
              <Button asChild variant={'secondary'}>
                <Link href={'/r/coummunity-1/create'}>Create Post</Link>
              </Button>
              <Button asChild>
                <Link href={'/r/create'}>Create Community</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
