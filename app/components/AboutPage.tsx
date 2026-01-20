export default function AboutPage() {

  const features = [
    { 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
        </svg>
      ), 
      title: '数据质量', 
      description: '采用多级审核机制，确保语音数据的准确性和清晰度，为研究与应用提供可靠的数据基础' 
    },
    { 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ), 
      title: '社区驱动', 
      description: '由全球粤语使用者共同参与贡献，构建多样化、代表性的语音数据集' 
    },
    { 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <circle cx="12" cy="16" r="1"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ), 
      title: '隐私保护', 
      description: '严格遵循数据隐私保护规范，采用去标识化处理，确保贡献者个人信息安全' 
    },
    { 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      ), 
      title: '开源开放', 
      description: '采用 CC0 许可协议，数据集完全开放，支持学术研究、商业应用和技术创新' 
    },
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 标题区域 */}
      <div className="mb-12 text-center">
        <div className="w-16 h-1 bg-green-500 mb-6 mx-auto"></div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">关于 Yue Voice</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Yue Voice 是一个开放的粤语语音数据集项目，致力于构建高质量、多样化的粤语语音语料库，推动粤语语音识别与合成技术的发展，传承和弘扬粤语文化。
        </p>
      </div>

      {/* 项目介绍 */}
      <div className="bg-white border border-green-500/50 dark:bg-gray-800 dark:border dark:border-green-500/50 rounded-lg shadow-sm dark:shadow-gray-900/50 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">项目简介</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Yue Voice 是一个社区驱动的开源项目，旨在构建高质量的粤语语音数据集。随着人工智能技术的快速发展，粤语作为重要的汉语方言之一，
              在语音识别、语音合成等领域的应用需求日益增长。然而，高质量的粤语语音数据仍然相对稀缺，这限制了相关技术的发展。
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              本项目通过众包的方式，汇聚来自粤港澳大湾区及全球各地的粤语使用者，共同贡献语音数据。我们采用严格的质量控制标准，
              确保数据集的准确性和多样性，涵盖不同年龄、性别、口音和语境的粤语语音样本。
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              所有收集的语音数据将采用 CC0 许可协议公开发布，供研究机构、开发者和企业免费使用，以推动粤语语音技术的创新与发展，
              为粤语在数字时代的传承与传播贡献力量。
            </p>
          </div>
          <div className="flex items-center justify-center">
            <svg className="w-24 h-24 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </div>
        </div>
      </div>

      {/* 核心特性 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">项目特点</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white border border-green-500/50 dark:bg-gray-800 dark:border dark:border-green-500/50 rounded-lg shadow-sm dark:shadow-gray-900/50 p-6 text-center border-gray-100 dark:border-gray-700">
              <div className="text-green-500 mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 技术架构 */}
      <div className="bg-white border border-green-500/50 dark:bg-gray-800 dark:border dark:border-green-500/50 rounded-lg shadow-sm dark:shadow-gray-900/50 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">技术架构</h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Yue Voice 平台基于现代化的 Web 技术栈构建，采用 Next.js 框架实现前后端一体化开发，确保良好的用户体验和系统性能。
            语音数据通过区块链技术进行去中心化存储和验证，利用智能合约确保数据贡献的透明性和可追溯性。
          </p>
          <p>
            平台集成了先进的语音处理算法，支持实时录音、音频质量检测、自动标注等功能。所有上传的语音数据经过严格的质量审核流程，
            包括音频清晰度检测、文本匹配验证、背景噪音评估等多个环节，确保最终数据集的可靠性。
          </p>
          <p>
            数据集采用标准化的格式存储，支持多种语音识别和合成系统的训练需求。我们定期发布数据集更新版本，并持续优化数据质量，
            为粤语语音技术的发展提供坚实的数据支撑。
          </p>
        </div>
      </div>

      {/* 数据使用 */}
      <div className="bg-white border border-green-500/50 dark:bg-gray-800 dark:border dark:border-green-500/50 rounded-lg shadow-sm dark:shadow-gray-900/50 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">数据使用</h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Yue Voice 数据集采用 CC0（Creative Commons Zero）许可协议，这意味着数据集进入公有领域，可以自由使用、修改和分发，
            无需署名或获得许可。这使得数据集可以广泛应用于学术研究、商业产品和技术开发。
          </p>
          <p className="font-medium text-gray-900 dark:text-gray-100">数据集可用于以下场景：</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>粤语语音识别系统的训练与优化</li>
            <li>粤语语音合成（TTS）技术的开发</li>
            <li>粤语方言识别与分类研究</li>
            <li>语音情感分析和语音生物识别</li>
            <li>粤语自然语言处理相关应用</li>
          </ul>
          <p className="mt-4">
            我们鼓励研究机构、开发者和企业使用本数据集进行创新研究和技术开发。如在使用过程中有任何问题或建议，欢迎通过邮件联系我们。
          </p>
        </div>
      </div>

      {/* 联系信息 */}
      <div className="bg-gradient-to-r from-green-50 to-yellow-50 dark:from-gray-800 dark:to-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">联系我们</h2>
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-700 dark:text-gray-300 text-center mb-6 leading-relaxed">
            如果您对 Yue Voice 项目有任何疑问、建议或合作意向，欢迎通过以下方式与我们联系。我们期待与您共同推动粤语语音技术的发展。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border border-green-500/50 dark:bg-gray-800 dark:border dark:border-green-500/50 rounded-lg p-6 text-center shadow-sm dark:shadow-gray-900/50">
              <div className="text-green-500 mb-3 flex justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="font-semibold text-gray-900 dark:text-gray-100 mb-2">电子邮箱</div>
              <a href="mailto:workbzw@gmail.com" className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 hover:underline">
                workbzw@gmail.com
              </a>
            </div>
            <div className="bg-white border border-green-500/50 dark:bg-gray-800 dark:border dark:border-green-500/50 rounded-lg p-6 text-center shadow-sm dark:shadow-gray-900/50">
              <div className="text-green-500 mb-3 flex justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div className="font-semibold text-gray-900 dark:text-gray-100 mb-2">项目网站</div>
              <a href="https://yue-voice.helloworld.today" target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 hover:underline">
                yue-voice.helloworld.today
              </a>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>我们会在 2-3 个工作日内回复您的邮件。感谢您对 Yue Voice 项目的关注与支持。</p>
          </div>
        </div>
      </div>
    </div>
  );
}