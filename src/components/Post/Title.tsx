import { Chip } from "@heroui/react";

export default function Title({
  title,
  createdAt,
  labels = [], // 核心新增：接收标签数据
}: {
  title: string;
  createdAt: string;
  labels?: { name: string; color?: string }[];
}) {
  return (
    <div className="grid gap-2">
      {/* 保留了我们之前做的响应式字号优化 */}
      <h1 className="text-xl sm:text-2xl md:text-[1.7rem] font-bold leading-tight">{title}</h1>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-primary-500">
        <time>{new Date(createdAt).toDateString()}</time>
        
        {/* 核心新增：标签渲染引擎 */}
        {labels.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {labels.map((label) => (
              <Chip 
                key={label.name} 
                size="sm" 
                variant="flat" 
                color="secondary"
                className="opacity-80"
              >
                {label.name}
              </Chip>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}