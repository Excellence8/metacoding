// 自动化测试脚本
const testMetaCoding = () => {
  console.log('🚀 开始 MetaCoding 自动化测试');
  
  const tests = [
    {
      name: '导航测试',
      test: () => {
        const navItems = document.querySelectorAll('[data-testid="nav-item"]');
        return navItems.length >= 5;
      },
      message: '应该有至少5个导航项目'
    },
    {
      name: '模板库测试',
      test: () => {
        const templates = document.querySelectorAll('[data-testid="template-card"]');
        return templates.length > 0;
      },
      message: '模板库应该显示模板卡片'
    },
    {
      name: '生成器测试',
      test: () => {
        const generatorInput = document.querySelector('[data-testid="project-name-input"]');
        const generateButton = document.querySelector('[data-testid="generate-button"]');
        return generatorInput && generateButton;
      },
      message: '生成器页面应该有输入框和生成按钮'
    },
    {
      name: '设置测试',
      test: () => {
        const themeButtons = document.querySelectorAll('[data-testid="theme-button"]');
        return themeButtons.length >= 4;
      },
      message: '设置页面应该有至少4个主题按钮'
    }
  ];
  
  let passed = 0;
  let failed = 0;
  
  tests.forEach(test => {
    try {
      const result = test.test();
      if (result) {
        console.log(`✅ ${test.name}: 通过 - ${test.message}`);
        passed++;
      } else {
        console.log(`❌ ${test.name}: 失败 - ${test.message}`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${test.name}: 错误 - ${error.message}`);
      failed++;
    }
  });
  
  console.log(`📊 测试结果: ${passed} 通过, ${failed} 失败`);
  console.log(failed === 0 ? '🎉 所有测试通过！' : '⚠️ 有测试失败，请检查');
  
  return failed === 0;
};

// 添加到全局对象
window.testMetaCoding = testMetaCoding;
console.log('🔧 测试脚本已加载，在控制台输入 testMetaCoding() 运行测试');
