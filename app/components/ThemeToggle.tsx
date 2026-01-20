'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // 防止 hydration 不匹配
  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR 时显示默认图标
  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg transition-colors duration-200 
          text-gray-700 hover:text-gray-900 hover:bg-gray-200/70
          dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700/70
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
          dark:focus:ring-offset-gray-800"
        aria-label="切换主题"
      >
        <Moon className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-colors duration-200 
        text-gray-700 hover:text-gray-900 hover:bg-gray-200/70
        dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700/70
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-800"
      aria-label={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}
