'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { sentenceGuidelinesMarkdown } from './sentenceGuidelines';
import { voiceGuidelinesMarkdown } from './voiceGuidelines';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('voice');
  const [activeSection, setActiveSection] = useState('different-pronunciation');
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToSection = (sectionId: string) => {
    isScrollingRef.current = true;
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 100;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // 滚动完成后重置标志
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  // 解析语音规范 Markdown 内容为章节
  const parseVoiceSections = useMemo(() => {
    const sections: { id: string; title: string; content: string }[] = [];
    const parts = voiceGuidelinesMarkdown.split('---').filter(part => part.trim());
    
    parts.forEach((part, index) => {
      const lines = part.trim().split('\n');
      const titleLine = lines.find(line => line.startsWith('## '));
      if (titleLine) {
        const title = titleLine.replace('## ', '').trim();
        // 将标题转换为 id（与导航项匹配）
        const idMap: Record<string, string> = {
          '不同发音': 'different-pronunciation',
          '冒犯性内容': 'offensive-content',
          '误读': 'misreading',
          '背景噪音': 'background-noise',
          '背景人声': 'background-voices',
          '音量': 'volume',
          '朗读者因素': 'reader-factors',
          '仍有不解之处？': 'still-confused',
        };
        const id = idMap[title] || `section-${index}`;
        const content = part.trim();
        sections.push({ id, title, content });
      }
    });
    
    return sections;
  }, []);

  // 从 Markdown 自动生成导航项（提交语音部分）
  const voiceNavigationItems = useMemo(() => {
    return parseVoiceSections.map(section => ({
      id: section.id,
      label: section.title,
    }));
  }, [parseVoiceSections]);

  // 解析 Markdown 内容为章节
  const parseMarkdownSections = useMemo(() => {
    const sections: { id: string; title: string; content: string }[] = [];
    const parts = sentenceGuidelinesMarkdown.split('---').filter(part => part.trim());
    
    parts.forEach((part, index) => {
      const lines = part.trim().split('\n');
      const titleLine = lines.find(line => line.startsWith('## '));
      if (titleLine) {
        const title = titleLine.replace('## ', '').trim();
        // 将标题转换为 id（与导航项匹配）
        const idMap: Record<string, string> = {
          '公有领域': 'public-domain',
          '引用语句': 'citation',
          '学术参考文献': 'academic-reference',
          '版权提醒': 'copyright-notice',
          '添加语句': 'add-citation',
          '长度': 'length',
          '用字与数字符号': 'symbols-numbers',
          '数字': 'numbers',
          '缩写与缩略语': 'abbreviations',
          '特殊字符与外文文字': 'special-characters',
          '标点符号': 'punctuation',
          '举报性内容': 'report-issues',
        };
        const id = idMap[title] || `section-${index}`;
        const content = part.trim();
        sections.push({ id, title, content });
      }
    });
    
    return sections;
  }, []);

  // 从 Markdown 自动生成导航项（提交语句部分）
  const sentenceNavigationItems = useMemo(() => {
    return parseMarkdownSections.map(section => ({
      id: section.id,
      label: section.title,
    }));
  }, [parseMarkdownSections]);

  // 判断是否为特殊样式项（已移除斜体样式）
  const isSpecialItem = (itemId: string) => {
    return false; // 不再使用斜体样式
  };

  const getCurrentNavigationItems = () => {
    if (activeTab === 'voice') return voiceNavigationItems;
    return sentenceNavigationItems;
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // 从解析的章节中获取第一个章节的 id
    const firstItem = tab === 'sentence' 
      ? (parseMarkdownSections[0]?.id || 'public-domain')
      : (parseVoiceSections[0]?.id || 'different-pronunciation');
    setActiveSection(firstItem);
  };

  // 滚动监听：检测当前可见的章节（使用 Intersection Observer）
  useEffect(() => {
    const currentItems = activeTab === 'voice' ? voiceNavigationItems : sentenceNavigationItems;
    
    if (currentItems.length === 0) {
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-120px 0px -60% 0px', // 顶部偏移120px，底部偏移60%
      threshold: [0, 0.1, 0.5, 0.9] // 多个阈值，更精确地检测
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingRef.current) {
        return;
      }

      const visibleEntries = entries.filter(entry => entry.isIntersecting);

      if (visibleEntries.length > 0) {
        // 找到最接近视口顶部的章节
        let closestEntry = visibleEntries[0];
        for (let i = 1; i < visibleEntries.length; i++) {
          if (visibleEntries[i].boundingClientRect.top < closestEntry.boundingClientRect.top) {
            closestEntry = visibleEntries[i];
          }
        }

        // 增加防抖延迟，避免在相邻章节间频繁切换
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          setActiveSection(prevSection => {
            const newSection = closestEntry.target.id;
            return newSection !== prevSection ? newSection : prevSection;
          });
        }, 150); // 150ms 防抖
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // 观察所有章节元素
    currentItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };
  }, [activeTab, voiceNavigationItems, sentenceNavigationItems]); // 添加导航项作为依赖

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <div className="w-16 h-1 bg-green-500 mb-6"></div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">贡献准则</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          了解如何为 Yue Voice 数据集贡献语句和录音，以及如何验证他人提交的内容
        </p>
      </div>

      <div className="mb-8">
        <div className="flex space-x-8 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => handleTabChange('voice')}
            className={`pb-4 font-medium ${
              activeTab === 'voice'
                ? 'text-gray-900 dark:text-gray-100 border-b-2 border-green-500 dark:border-green-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            aria-label="切换到提交语音标签页"
            aria-selected={activeTab === 'voice'}
          >
            提交语音
          </button>
          <button 
            onClick={() => handleTabChange('sentence')}
            className={`pb-4 font-medium ${
              activeTab === 'sentence' 
                ? 'text-gray-900 dark:text-gray-100 border-b-2 border-green-500 dark:border-green-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            aria-label="切换到提交语句标签页"
            aria-selected={activeTab === 'sentence'}
          >
            提交语句
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto">
            <nav className="space-y-2">
              {getCurrentNavigationItems().map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md font-medium transition-colors ${activeSection === item.id
                      ? 'text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 border border-green-500/50 dark:border dark:border-green-500/50'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border hover:border-green-500/60 dark:hover:border dark:hover:border-green-500/60'
                    } ${isSpecialItem(item.id) ? 'italic' : ''}`}
                  aria-label={`跳转到${item.label}部分`}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white border border-green-500/50 dark:bg-gray-800 dark:border dark:border-green-500/50 rounded-lg shadow-sm dark:shadow-gray-900/50 p-8">
            {activeTab === 'voice' ? (
              <>
                {parseVoiceSections.map((section, index) => (
                  <div key={section.id} id={section.id} className="prose prose-gray max-w-none">
                    <ReactMarkdown
                      className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed"
                      components={{
                        h2: ({ children }) => (
                          <h2 className={`text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 ${index === 0 ? '' : 'mt-12 pt-8 border-t border-gray-200 dark:border-gray-700'}`}>
                            {children}
                          </h2>
                        ),
                        p: ({ children }) => <p className="mb-4">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside space-y-2 ml-4 mb-4">{children}</ul>,
                        li: ({ children }) => <li className="mb-1">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        a: ({ href, children }) => <a href={href} className="text-blue-600 hover:text-blue-800 underline">{children}</a>,
                      }}
                    >
                      {section.content}
                    </ReactMarkdown>
                  </div>
                ))}
              </>
            ) : (
              <>
                {parseMarkdownSections.map((section, index) => (
                  <div key={section.id} id={section.id} className="prose prose-gray max-w-none">
                    <ReactMarkdown
                      className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed"
                      components={{
                        h2: ({ children }) => (
                          <h2 className={`text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 ${index === 0 ? '' : 'mt-12 pt-8 border-t border-gray-200 dark:border-gray-700'}`}>
                            {children}
                          </h2>
                        ),
                        p: ({ children }) => <p className="mb-4">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside space-y-2 ml-4 mb-4">{children}</ul>,
                        li: ({ children }) => <li className="mb-1">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        code: ({ children, className }) => {
                          const isBlock = className?.includes('language');
                          return isBlock ? (
                            <code className="bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded text-sm font-mono block p-4 mb-4 text-gray-900 dark:text-gray-100">{children}</code>
                          ) : (
                            <code className="bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono text-gray-900 dark:text-gray-100">{children}</code>
                          );
                        },
                        a: ({ href, children }) => <a href={href} className="text-blue-600 hover:text-blue-800 underline">{children}</a>,
                      }}
                    >
                      {section.content}
                    </ReactMarkdown>
                    {section.id === 'copyright-notice' && (
                      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-yellow-400 dark:border-yellow-500">
                        <div className="text-left">
                          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">⚠️ 重要提醒</div>
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            如果使用自己写的句子，请确认这个句子确实是你原创的，没有抄袭或改编自其他有版权的作品。如果发现版权问题，我们有权删除相关内容。
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>)
}
