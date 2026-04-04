export default function Footer() {
  return (
    // 1. 物理压缩：移除固定的 h-32，改为响应式的上下内边距 py-8 (即 32px)，让高度由内容自然撑开
    // 2. 边框弱化：将 border-t-secondary 改为 border-t-secondary/50，让分割线更隐蔽
    <footer className="mt-auto flex flex-col justify-center border-t border-t-secondary/50 py-8 text-center">
      {/* 3. 视觉降噪：添加 opacity-60 (降低透明度)，打造 Bloomberg 终端般的低调质感 */}
      <div className="text-sm opacity-60">
        &copy; {new Date().getFullYear()} {process.env.AUTHOR_NAME}. All rights
        reserved.
      </div>
    </footer>
  );
}
