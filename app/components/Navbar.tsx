'use client';

import { useState, useEffect, useRef } from "react";
import WalletButton from './WalletButton';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Navbar({ currentPage, onPageChange }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // 点击外部区域时关闭移动端菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // 点击菜单项时关闭移动端菜单
  const handleMenuItemClick = (page?: string) => {
    setIsMobileMenuOpen(false);
    if (page) {
      onPageChange(page);
    }
  };

  // 处理导航点击
  const handleNavClick = (page: string) => {
    onPageChange(page);
  };

  // 获取导航项样式
  const getNavItemStyle = (page: string) => {
    return currentPage === page 
      ? 'text-green-600 dark:text-green-400 font-medium' 
      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100';
  };

  // 获取移动端导航项样式
  const getMobileNavItemStyle = (page: string) => {
    return currentPage === page
      ? 'text-green-600 dark:text-green-400 bg-green-100/90 dark:bg-green-900/30 font-medium'
      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/90 dark:hover:bg-gray-800/90';
  };

  return (
    <nav className="bg-white/85 dark:bg-gray-800/85 backdrop-blur-md shadow-sm border-b border-white/30 dark:border-gray-700/30 fixed top-0 left-0 right-0 z-50" ref={mobileMenuRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16 relative">
          {/* 左侧区域 - 汉堡菜单和Logo */}
          <div className="absolute left-0 flex items-center space-x-3">
            {/* 汉堡菜单按钮 - 仅在移动端显示，放在最左边 */}
            <button 
              className="md:hidden text-gray-700 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-200/70 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Logo */}
            <div className="flex items-center cursor-pointer space-x-2" onClick={() => handleNavClick('home')}>
              <Logo size={32} src="/logo.png" className="flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">Yue Voice</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">by YueLabs</span>
              </div>
            </div>
          </div>

          {/* 导航菜单 - 桌面端居中显示 */}
          <div className="hidden md:flex items-center space-x-8">
            <span 
              className={`cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 ${getNavItemStyle('input')} ${currentPage === 'input' ? 'bg-green-100/90 dark:bg-green-900/30 backdrop-blur-sm' : 'hover:bg-gray-200/70 dark:hover:bg-gray-800/70'}`}
              onClick={() => handleNavClick('input')}
            >
              录入
            </span>
            <span 
              className={`cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 ${getNavItemStyle('review')} ${currentPage === 'review' ? 'bg-green-100/90 dark:bg-green-900/30 backdrop-blur-sm' : 'hover:bg-gray-200/70 dark:hover:bg-gray-800/70'}`}
              onClick={() => handleNavClick('review')}
            >
              审核
            </span>
            <span 
              className={`cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 ${getNavItemStyle('download')} ${currentPage === 'download' ? 'bg-green-100/90 dark:bg-green-900/30 backdrop-blur-sm' : 'hover:bg-gray-200/70 dark:hover:bg-gray-800/70'}`}
              onClick={() => handleNavClick('download')}
            >
              下载
            </span>
            <span 
              className={`cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 ${getNavItemStyle('about')} ${currentPage === 'about' ? 'bg-green-100/90 dark:bg-green-900/30 backdrop-blur-sm' : 'hover:bg-gray-200/70 dark:hover:bg-gray-800/70'}`}
              onClick={() => handleNavClick('about')}
            >
              关于我们
            </span>
          </div>

          {/* 右侧按钮 - 绝对定位到右侧，移动端优化 */}
          <div className="absolute right-0 flex items-center space-x-2 sm:space-x-3">
            {/* 主题切换按钮 */}
            <ThemeToggle />
            {/* 确保在移动端有足够的右边距 */}
            <div className="pr-1 sm:pr-0">
              <WalletButton />
            </div>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/40 dark:border-gray-700/40 dark:border-b dark:border-green-500/50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div 
                className={`px-3 py-2 cursor-pointer rounded-md transition-all duration-200 backdrop-blur-sm ${getMobileNavItemStyle('input')}`}
                onClick={() => handleMenuItemClick('input')}
              >
                录入
              </div>
              <div 
                className={`px-3 py-2 cursor-pointer rounded-md transition-all duration-200 backdrop-blur-sm ${getMobileNavItemStyle('review')}`}
                onClick={() => handleMenuItemClick('review')}
              >
                审核
              </div>
              <div 
                className={`px-3 py-2 cursor-pointer rounded-md transition-all duration-200 backdrop-blur-sm ${getMobileNavItemStyle('download')}`}
                onClick={() => handleMenuItemClick('download')}
              >
                下载
              </div>
              <div 
                className={`px-3 py-2 cursor-pointer rounded-md transition-all duration-200 backdrop-blur-sm ${getMobileNavItemStyle('about')}`}
                onClick={() => handleMenuItemClick('about')}
              >
                关于我们
              </div>
              
              {/* 移动端钱包按钮 */}
              <div className="px-3 py-2">
                <WalletButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}