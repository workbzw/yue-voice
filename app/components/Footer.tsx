'use client';

export default function Footer() {
  return (
    <footer className="w-full py-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Yue Voice. All rights reserved.</p>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <a 
              href="https://beian.miit.gov.cn/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              京ICP备2022031958号-5
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
