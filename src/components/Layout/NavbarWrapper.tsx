import { Link } from "@heroui/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { getUser } from '@/utils/auth';
import AvatarWrapper from './AvatarWrapper';
import ThemeSwitcher from './ThemeSwitcher';

export default async function NavbarWrapper() {
  const user = await getUser();

  return (
    <Navbar
      classNames={{
        base: 'backdrop-blur-sm border-b border-b-secondary',
      }}
    >
      <NavbarBrand className="gap-5">
        {/* 1. 响应式瘦身：手机端使用 text-lg，电脑端恢复 text-xl 或更大 */}
        <Link href="/" className="text-lg md:text-xl font-bold tracking-wider">
          {process.env.BLOG_TITLE}
        </Link>
        <ThemeSwitcher />
      </NavbarBrand>
      
      {/* 2. 物理切除：已经彻底删除了 <NavbarContent> 和 <AvatarWrapper> 包含的登录按钮 */}
      
    </Navbar>
  );
}
