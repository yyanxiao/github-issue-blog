import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// 1. 核心引入：导入 GitHub 扩展语法解析器
import remarkGfm from 'remark-gfm';

export default async function MarkdownWrapper({
  children,
}: {
  children: string | null | undefined;
}) {
  return (
    <Markdown
      // 2. 核心注入：将插件外挂至渲染引擎，瞬间解锁表格、删除线、任务列表等能力
      remarkPlugins={[remarkGfm]}
      components={{
        // eslint-disable-next-line react/no-unstable-nested-components
        code(props) {
          const { children: c, className } = props;
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <div className="max-w-[80vw] w-full text-xs md:text-sm">
              <SyntaxHighlighter
                PreTag="div"
                language={match[1]}
                style={oneDark}
              >
                {String(c).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className={className}>{c}</code>
          );
        },
      }}
    >
      {children}
    </Markdown>
  );
}
