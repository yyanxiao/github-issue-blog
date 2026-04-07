import { Link } from "@heroui/link";
import { Chip } from "@heroui/react";
import { getTags } from '@/utils/post';

export const metadata = {
  title: `Tags | ${process.env.BLOG_TITLE}`,
};

// ================= 核心升级：打破永久缓存 =================
// 告诉 Vercel 服务器：这个页面的缓存最多保留 60 秒。
// 60 秒后如果有用户访问，后台会自动去 GitHub 拉取最新标签并静默更新。
// （如果你觉得 60 秒太频繁，可以改为 3600 即 1 小时）
export const revalidate = 3600;
// =========================================================

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <div className="mx-auto max-w-[65ch] pt-10">
      <h1 className="mb-8 text-2xl font-bold tracking-wider">🏷️ 所有分类</h1>
      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <Link key={tag.name} href={`/tags/${tag.name}`}>
            <Chip 
              size="lg" 
              variant="light" 
              color="secondary" 
              className="cursor-pointer transition-transform hover:scale-105 border-secondary/40 hover:border-secondary/80"
            >
              {tag.name}
            </Chip>
          </Link>
        ))}
        {tags.length === 0 && <p className="opacity-50">暂无标签分类</p>}
      </div>
    </div>
  );
}
