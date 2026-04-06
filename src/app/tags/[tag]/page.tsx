import { getPosts } from '@/utils/post';
import Posts from '@/components/Posts'; // 引入强大的无限下拉列表组件

export async function generateMetadata({ params }: { params: { tag: string } }) {
  return { title: `${decodeURIComponent(params.tag)} | ${process.env.BLOG_TITLE}` };
}

export default async function SingleTagPage({ params }: { params: { tag: string } }) {
  const decodedTag = decodeURIComponent(params.tag);
  // 获取该标签下的第一页数据（初始弹药）
  const initialPosts = await getPosts(1, decodedTag);

  return (
    <div className="mx-auto grid max-w-[65ch] gap-8 pt-10">
      <h1 className="mb-6 text-2xl font-bold border-b border-secondary/30 pb-4">
        #{decodedTag}
      </h1>
      
      {initialPosts.length === 0 ? (
        <p className="opacity-60 text-sm">该标签下暂无文章。</p>
      ) : (
        /* 核心升级：将初始数据和 tag 标签同时交给 Posts 组件，激活无限下拉引擎！ */
        <Posts data={initialPosts} tag={decodedTag} />
      )}
    </div>
  );
}