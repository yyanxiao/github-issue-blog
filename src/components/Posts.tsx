'use client';

/* eslint-disable react/require-default-props */

import { InView } from 'react-intersection-observer';
import { Link } from "@heroui/link";
import { Spinner } from "@heroui/spinner";
import Title from '@/components/Post/Title';
import usePosts from '@/hooks/usePosts';
import { Issues } from '@/types';

export default function Posts({ data, tag }: { data: Issues; tag?: string }) {
  const { posts, noMorePosts, loadMore } = usePosts(data, tag);

  return (
    <div className="flex flex-col gap-8 md:gap-12">
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
            <Spinner ref={ref} color="primary" role="status" />
          )
        }
      </InView>
    </div>
  );
}
