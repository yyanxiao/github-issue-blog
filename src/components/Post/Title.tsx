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

  // ================= 核心升级：数据清洗与重排引擎 =================
  const processedLabels = labels
    // 1. 提取真实的标签名称
    .map(label => typeof label === 'string' ? label : label.name)
    // 2. 物理过滤：排除空值，并强行隐藏 'blog' 标签（忽略大小写）
    .filter(name => name && name.toLowerCase() !== 'blog')
    // 3. 强制排序规则
    .sort((a, b) => {
      // 定义最高优先级的标签字典
      const priorityTags = ['日报', '周报'];
      const aIsPriority = priorityTags.includes(a as string);
      const bIsPriority = priorityTags.includes(b as string);
      
      // 如果 a 是日报/周报，b 不是，a 排前面 (-1)
      if (aIsPriority && !bIsPriority) return -1;
      // 如果 b 是日报/周报，a 不是，b 排前面 (1)
      if (!aIsPriority && bIsPriority) return 1;
      // 如果都不是，或者都是，则按默认字母表顺序排列
      return (a as string).localeCompare(b as string);
    }) as string[]; // 断言为字符串数组以消除 TS 警告
  // ==============================================================

  return (
    <div className="grid gap-2">
      <h1 className="text-xl sm:text-2xl md:text-[1.7rem] font-bold leading-tight">{title}</h1>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-primary-500">
        <time>{new Date(createdAt).toDateString()}</time>
        
        {processedLabels.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {processedLabels.map((labelName) => (
              <Chip 
                key={labelName} 
                size="sm" 
                variant="light" 
                color="secondary"
                className="opacity-80 border-secondary/40"
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
