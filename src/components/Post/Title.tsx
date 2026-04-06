import { Chip } from "@heroui/react";

// 1. 核心升级：定义兼容 GitHub 原生 API 的联合类型
type GitHubLabel = string | { name?: string; color?: string | null; [key: string]: any };

export default function Title({
  title,
  createdAt,
  labels = [], 
}: {
  title: string;
  createdAt: string;
  // 2. 核心升级：接收更宽泛的标签类型
  labels?: GitHubLabel[];
}) {
  return (
    <div className="grid gap-2">
      <h1 className="text-xl sm:text-2xl md:text-[1.7rem] font-bold leading-tight">{title}</h1>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-primary-500">
        <time>{new Date(createdAt).toDateString()}</time>
        
        {labels.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {labels.map((label, index) => {
              // 3. 智能解析引擎：物理剥离并提取真实的标签名字
              const labelName = typeof label === 'string' ? label : label.name;
              
              // 如果遇到异常的空标签，直接跳过渲染，防止网页崩溃
              if (!labelName) return null; 
              
              return (
                <Chip 
                  key={`${labelName}-${index}`} // 增加 index 防止存在重复同名标签时 React 报错
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
