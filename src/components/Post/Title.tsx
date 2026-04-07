/* eslint-disable react/require-default-props */
import { Chip } from "@heroui/react";

type GitHubLabel = string | { name?: string; color?: string | null; [key: string]: any };

export default function Title({
  title,
  createdAt,
  labels = [], 
}: {
  title: string;
  createdAt: string;
  labels?: GitHubLabel[];
}) {

  const processedLabels = labels
    .map(label => typeof label === 'string' ? label : label.name)
    .filter(name => name && name.toLowerCase() !== 'blog')
    .sort((a, b) => {
      const priorityTags = ['日报', '周报'];
      const aIsPriority = priorityTags.includes(a as string);
      const bIsPriority = priorityTags.includes(b as string);
      
      if (aIsPriority && !bIsPriority) return -1;
      if (!aIsPriority && bIsPriority) return 1;
      return (a as string).localeCompare(b as string);
    }) as string[];

  return (
    // 1. 微观收紧：缩小标题与下方标签行的垂直间距 (gap-2 -> gap-1.5)
    <div className="grid gap-1.5">
      
      {/* 2. 字号降维：移除巨型 1.7rem，改为更克制的 text-lg 和 text-xl，并增加轻微的不透明度渐变提升质感 */}
      <h1 className="text-lg md:text-xl font-bold leading-tight opacity-90 transition-opacity hover:opacity-100">
        {title}
      </h1>
      
      {/* 3. 辅助信息弱化：缩小日期字体至 text-xs，收紧日期与标签的横向间距 (gap-4 -> gap-3) */}
      <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-primary-500/70">
        <time>{new Date(createdAt).toDateString()}</time>
        
        {processedLabels.length > 0 && (
          // 4. 收紧标签组内部的横向间距 (gap-2 -> gap-1.5)
          <div className="flex flex-wrap gap-1.5">
            {processedLabels.map((labelName) => (
              <Chip 
                key={labelName} 
                size="sm" 
                variant="bordered" 
                color="secondary"
                // 5. 标签深度压缩：降低边框存在感，极限压缩标签内的 padding
                className="opacity-70 border-secondary/30 h-6 text-[11px] px-1"
              >
                {labelName}
              </Chip>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
