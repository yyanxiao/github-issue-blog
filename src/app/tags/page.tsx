import { Link } from "@heroui/link";
import { Chip } from "@heroui/react";
import { getTags } from '@/utils/post';

export const metadata = {
  title: `Tags | ${process.env.BLOG_TITLE}`,
};

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
              variant="flat" 
              color="secondary" 
              className="cursor-pointer transition-transform hover:scale-105"
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