import Link from 'next/link';
import { Button } from "@heroui/react";
import Posts from '@/components/Posts';
import { getPosts } from '@/utils/post';
import { isAuthor } from '@/utils/auth';

// 👇 核心核爆指令：强制打破永久数据缓存，设定 60 秒为数据的最长保质期
export const revalidate = 3600;

export default async function Home() {
  const data = await getPosts(1);

  return (
    <div className="mx-auto flex h-full max-w-[65ch] flex-col justify-center gap-10">
      {(await isAuthor()) ? (
        <Button as={Link} href="/post/new" radius="sm" color="primary">
          New Post
        </Button>
      ) : null}
      <Posts data={data} />
    </div>
  );
}
