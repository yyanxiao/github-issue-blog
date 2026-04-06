import { useState } from 'react';
import { getPosts } from '@/utils/post';
import { Issues } from '@/types';

const perPage = 10;

// 1. 核心升级：入参增加一个可选的 tag 参数
export default function usePosts(initPosts: Issues = [], tag?: string) {
  const [posts, setPosts] = useState<Issues>(initPosts);
  const [page, setPage] = useState(initPosts.length < perPage ? 1 : 2);
  const [noMorePosts, setNoMorePosts] = useState(initPosts.length < perPage);

  async function loadMore() {
    // 2. 核心升级：在发起接力请求时，把 tag 一并传给底层函数
    const morePosts = await getPosts(page, tag);
    
    setPosts([...posts, ...morePosts]);
    setPage(page + 1);

    if (morePosts.length < perPage) {
      setNoMorePosts(true);
    }
  }

  return {
    posts,
    noMorePosts,
    loadMore,
  };
}