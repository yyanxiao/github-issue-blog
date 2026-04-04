// 1. 第三方/官方模块引入区（置于最顶层）
import { Cinzel } from 'next/font/google';
import { Link } from "@heroui/link";
import {
  Navbar,
  NavbarBrand,
} from "@heroui/navbar";

// 2. 本地相对路径引入区（置于底层）
import ThemeSwitcher from './ThemeSwitcher';

// 3. 变量初始化区
const cinzelFont = Cinzel({ 
  subsets: ['latin'], 
  weight: ['700', '900'] 
});

// 4. 组件渲染区
export default async function NavbarWrapper() {
  return (
    <Navbar
      classNames={{
        base: 'backdrop-blur-sm border-b border-b-secondary',
      }}
    >
      <NavbarBrand className="gap-5">
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
