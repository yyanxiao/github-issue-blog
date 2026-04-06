import { Metadata } from 'next';
import Actions from '@/components/Post/Actions';
import Title from '@/components/Post/Title';
import MarkdownWrapper from '@/components/Post/MarkdownWrapper';
import { getPost } from '@/utils/post';
import { isAuthor } from '@/utils/auth';

export async function generateMetadata({
  params,
}: {
  params: { number: string };
}): Promise<Metadata> {
  const number = parseInt(params.number, 10);
  const post = await getPost(number);

  return {
    title: `${post.title} | ${process.env.BLOG_TITLE}`,
  };
}

export default async function Post({ params }: { params: { number: string } }) {
  const number = parseInt(params.number, 10);
  const post = await getPost(number);

  return (
    <div className="mx-auto grid max-w-[65ch] gap-6">
      <Title 
        title={post.title} 
        createdAt={post.created_at} 
        labels={post.labels} // 核心新增
      />
      {(await isAuthor()) ? <Actions number={number} /> : null}
      {/* 优化了 prose 的移动端响应式字号 */}
      <div className="prose prose-sm md:prose-base dark:prose-invert prose-pre:bg-[#282c34] mx-auto w-full">
        <MarkdownWrapper>{post.body}</MarkdownWrapper>
        {/* 物理切除了 <hr /> 分割线和 <CommentsSection /> 评论组件，彻底保持研报纯净 */}
      </div>
    </div>
  );
}
