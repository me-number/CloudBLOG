/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js');

// 使用JavaScript注释替代TypeScript类型注释
const config = {
  env: {},
  // 可以添加其他Next.js配置选项
};

export default config;