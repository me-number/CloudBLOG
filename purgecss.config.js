module.exports = {
  content: ['_site/**/*.html'], // 扫描构建后的所有 HTML 文件
  css: ['_site/css/main.css'],  // 扫描构建后的 CSS 文件
  output: '_site/css/main.css', // 将精简后的代码覆盖原文件
  safelist: {
    standard: [/^dark-mode/, /^dark/], // 确保深色模式相关的类不被删掉
    deep: [/post/, /syntax/]           // 保护文章页和代码高亮样式
  }
}
