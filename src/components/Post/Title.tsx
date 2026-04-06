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
  return (
    <div className="grid gap-2">
      <h1 className="text-xl sm:text-2xl md:text-[1.7rem] font-bold leading-tight">{title}</h1>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-primary-500">
        <time>{new Date(createdAt).toDateString()}</time>
        
        {labels.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {/* 核心修复：移除了 index 参数 */}
            {labels.map((label) => {
              const labelName = typeof label === 'string' ? label : label.name;
              
              if (!labelName) return null; 
              
              return (
                <Chip 
                  key={labelName} // 核心修复：利用 GitHub 标签命名的绝对唯一性，直接使用 labelName 作为 key
                  size="sm" 
                  variant="flat" 
                  color="secondary"
                  className="opacity-80"
                >
                  {labelName}
                </Chip>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
