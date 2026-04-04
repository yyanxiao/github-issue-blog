'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Skeleton } from "@heroui/react";
import { Moon, Sun } from '../Icons';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Skeleton className="h-7 w-7 rounded-md" />;

  return (
    <button
      type="button"
      // 引入响应式尺寸：手机端 text-lg，电脑端 text-xl，与 Logo 尺寸完美对应
      className="fill-primary text-lg md:text-xl transition-opacity hover:opacity-70"
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
}
