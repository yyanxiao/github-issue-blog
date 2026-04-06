import { Cinzel } from 'next/font/google';
import { Link } from "@heroui/link";
// 1. 核心恢复：重新引入控制左右布局的 NavbarContent 和 NavbarItem
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";

import ThemeSwitcher from './ThemeSwitcher';

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
      {/* 左侧：纯粹的品牌锚点 */}
      <NavbarBrand>
        <Link 
          href="/" 
          className={`text-lg md:text-xl font-bold tracking-wider ${cinzelFont.className}`}
        >
          {process.env.BLOG_TITLE}
        </Link>
      </NavbarBrand>

      {/* 2. 右侧：功能导航区，使用 justify="end" 将其推至屏幕最右 */}
      <NavbarContent justify="end" className="gap-5">
        <NavbarItem className="flex items-center">
          {/* 3. 标签入口：增加了 text-foreground 确保其颜色在明暗模式下都自然匹配 */}
          <Link 
            href="/tags" 
            className="text-sm font-medium text-foreground opacity-60 transition-opacity hover:opacity-100"
          >
            Tags
          </Link>
        </NavbarItem>
        <NavbarItem className="flex items-center">
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}