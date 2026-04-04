import { Link } from "@heroui/link";
import {
  Navbar,
  NavbarBrand,
} from "@heroui/navbar";
import ThemeSwitcher from './ThemeSwitcher';

export default async function NavbarWrapper() {
  return (
    <Navbar
      classNames={{
        base: 'backdrop-blur-sm border-b border-b-secondary',
      }}
    >
      <NavbarBrand className="gap-5">
        <Link href="/" className="text-lg md:text-xl font-bold tracking-wider">
          {process.env.BLOG_TITLE}
        </Link>
        <ThemeSwitcher />
      </NavbarBrand>
    </Navbar>
  );
}
