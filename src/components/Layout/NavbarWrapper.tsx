import { Link } from "@heroui/link";
import {
  Navbar,
  NavbarBrand,
} from "@heroui/navbar";
import ThemeSwitcher from './ThemeSwitcher';

// 1. 从 Next.js 内置的高性能 Google 字体模块中引入 Cinzel
import { Cinzel } from 'next/font/google';

// 2. 初始化字体：加载拉丁字符集，并指定 700(加粗) 和 900(超粗) 字重以适配 Logo 需求
const cinzelFont = Cinzel({ 
  subsets: ['latin'], 
  weight: ['700', '900'] 
});

export default async function NavbarWrapper() {
  return (
    <Navbar
      classNames={{
        base: 'backdrop-blur-sm border-b border-b-secondary',
      }}
    >
      <NavbarBrand className="gap-5">
        {/* 3. 使用模板字符串（反引号）将 Cinzel 的类名无缝拼接到 Tailwind 的原生样式中 */}
        <Link 
          href="/" 
          className={`text-lg md:text-xl font-bold tracking-wider ${cinzelFont.className}`}
        >
          {process.env.BLOG_TITLE}
        </Link>
        <ThemeSwitcher />
      </NavbarBrand>
    </Navbar>
  );
}
