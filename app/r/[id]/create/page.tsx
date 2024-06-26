'use client';

import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import redditImg from '../../../../public/reddit_mobile.webp';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text, Video } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TipTapEditor } from '@/app/components/TipTabEditor';
import { SubmitButton } from '@/app/components/SubmitButton';
import { UploadDropzone } from '@/app/components/Uploadthing';
import { useState } from 'react';
import { createPost } from '@/app/actions';
import { JSONContent } from '@tiptap/react';
// import { UploadDropzone } from '@uploadthing/react';

const rules = [
  {
    id: 1,
    text: 'Remember the human',
  },
  {
    id: 2,
    text: 'Behave like you do in real life',
  },
  {
    id: 3,
    text: 'Look for the original source of content',
  },
  {
    id: 4,
    text: 'Search for duplication before posting',
  },
  {
    id: 5,
    text: 'Read the community guidelines',
  },
];

export default function CreatePostRoute({
  params,
}: {
  params: { id: string };
}) {
  const [imageUrl, setImageUrl] = useState<null | string>(null); //<string | null> this means it either be null or string
  const [json, setJson] = useState<null | JSONContent>(null);
  const [title, setTitle] = useState<null | string>(null);

  const createPostReddit = createPost.bind(null, { jsonContent: json });
  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-8">
      <div className="w-[65%] flex flex-col gap-y-5">
        <h1 className="font-semibold">
          Subreddit:{' '}
          <Link href={`/r/${params.id}`} className="text-primary">
            {params.id}
          </Link>
        </h1>
        <Tabs defaultValue="post" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="post">
              <Text /> Post
            </TabsTrigger>
            <TabsTrigger value="image">
              <Video /> Image
            </TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            <Card>
              <form action={createPostReddit}>
                {/* get image url, make it hidden */}
                <Input
                  required
                  name="imageUrl"
                  value={imageUrl ?? undefined}
                  type="hidden"
                />

                {/* get subName which is params.id , make it hidden */}
                <Input type="hidden" name="subName" value={params.id} />
                <CardHeader>
                  <Label>Title</Label>
                  <Input
                    required
                    name="title"
                    placeholder="Title"
                    value={title ?? ''}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TipTapEditor setJson={setJson} json={json} />
                </CardHeader>
                <CardFooter>
                  <SubmitButton text="Create Post" />
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="image">
            <Card>
              <CardHeader>
                {imageUrl === null ? (
                  <UploadDropzone
                    className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50 ut-label:text-primary ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:after:bg-primary"
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setImageUrl(res[0].url);
                      // Do something with the response
                      console.log('Files: ', res);
                      alert('Upload Completed');
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                ) : (
                  <Image
                    src={imageUrl}
                    alt="upload image"
                    width={500}
                    height={400}
                  />
                )}
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-[35%]">
        <Card className="flex flex-col p-4">
          <div className="flex items-center gap-4">
            <Image src={redditImg} alt="reddit image" className="w-fit h-10" />
            <h1 className="font-medium">Posting to Reddit</h1>
          </div>
          <Separator className="mt-4" />
          <div className="flex flex-col gap-y-5 mt-5">
            {rules.map((item) => {
              return (
                <div key={item.id}>
                  <p className="text-sm font-medium">
                    {item.id}. {item.text}
                  </p>
                  <Separator />
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
