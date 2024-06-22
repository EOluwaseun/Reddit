import { updateSubDescription } from '@/app/actions';
import { SubDescriptionForm } from '@/app/components/SubDescriptionForm';
import { SaveButton, SubmitButton } from '@/app/components/SubmitButton';
import prisma from '@/app/lib/db';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Cake } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

async function getData(name: string) {
  const data = await prisma.subreddit.findUnique({
    where: {
      name: name,
    },
    select: {
      name: true,
      createdAt: true,
      description: true,
      userId: true,
    },
  });
  return data;
}

export default async function SubredditRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4">
      <div className="w-[65%] flex flex-col gap-y-5">
        <h1>Hello</h1>
      </div>
      <div className="w-[35%]">
        <Card>
          <div className="bg-muted font-semibold p-4">About Community</div>
          <div className="p-4">
            <div className="flex items-center gap-x-3">
              <Image
                src={`https://avatar.vercel.sh/${data?.name}`}
                alt="subreddit image"
                width={60}
                height={60}
                className="rounded-full"
              />
              <Link href={`/r/${data?.name}`} className="font-medium">
                r/{data?.name}
              </Link>
            </div>
            {user?.id === data?.userId ? (
              <div className="mt-4">
                {/* form */}
                <SubDescriptionForm
                  description={data?.description}
                  subName={params.id}
                />
              </div>
            ) : (
              <div>
                <p className="text-sm font-normal text-secondary-foreground mt-2">
                  {data?.description}
                </p>
              </div>
            )}
            <div className="flex items-center gap-x-2 mt-4">
              <Cake className="h-5 w-5 text-muted-foreground" />
              <p className="font-medium text-muted-foregroung">
                Created:{''}
                {new Date(data?.createdAt as Date).toLocaleDateString('en-us', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
            <Separator className="my-5" />
            <Button asChild className="rounded-full w-full">
              <Link
                href={user?.id ? `/r/${data?.name}/create` : '/api/auth/login'}
              >
                Create Post
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
