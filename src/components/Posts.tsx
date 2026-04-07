/* eslint-disable react/require-default-props */
'use client';

import { InView } from 'react-intersection-observer';
import { Link } from "@heroui/link";
import { Spinner } from "@heroui/spinner";
import Title from '@/components/Post/Title';
import usePosts from '@/hooks/usePosts';
import { Issues } from '@/types';

export default function Posts({ data, tag }: { data: Issues; tag?: string }) {
  const { posts, noMorePosts, loadMore } = usePosts(data, tag);

  return (
    // 核心修改：大幅削减列表项之间的垂直间距 (从 gap-8 md:gap-12 物理压缩至 gap-5 md:gap-7)
    <div className="flex flex-col gap-5 md:gap-7">
      {posts.map((post) => (
        <Link key={post.id} href={`/post/${post.number}`}>
          <Title title={post.title} createdAt={post.created_at} labels={post.labels} />
        </Link>
      ))}
      <InView
        onChange={(inView: boolean) => {
          if (!inView) return;
          loadMore();
        }}
      >
        {({ ref }) =>
          noMorePosts ? null : (
            <Spinner ref={ref} color="primary" role="status" className="mt-4" />
          )
        }
      </InView>
    </div>
  );
}
