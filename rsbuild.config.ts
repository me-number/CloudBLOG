/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { defineConfig } from '@rsbuild/core';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
      babelLoaderOptions(opts) {
        opts.plugins?.unshift('babel-plugin-react-compiler');
      },
    }),
  ],
  html: {
    title: '张文涛',
    // 强制注入 HTML 标签属性（2025年 Rsbuild 最稳妥方案）
    tags: [
      {
        tag: 'html',
        attrs: { lang: 'zh-CN' },
      },
    ],
    meta: {
      description: "一位正在努力钻研技术的全栈开发者，在 0 与 1 之间构建梦想!",
    },
  },
  output: {
    // 提醒：如果您部署在 zhang-wentao.tech，此处为 '/' 是正确的。
    // 如果部署在 https://<username>.github.io/CloudBLOG/，请务必改为 '/CloudBLOG/'
    assetPrefix: '/',
  },
});

