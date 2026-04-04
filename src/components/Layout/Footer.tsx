export default function Footer() {
  return (
    // 1. 移除了多余的 flex 排版
    // 2. 将 py-8 压缩为 py-4 (手机端 16px 间距)，电脑端保留 md:py-6
    // 3. 将边框颜色从 /50 进一步弱化为 /30，让这根线若隐若现
    <footer className="mt-auto border-t border-t-secondary/30 py-4 md:py-6 text-center">
      {/* 4. 透明度降至 50%，进一步压低视觉权重 */}
      <div className="text-sm opacity-50">
        &copy; {new Date().getFullYear()} {process.env.AUTHOR_NAME}. All rights
        reserved.
      </div>
    </footer>
  );
}
