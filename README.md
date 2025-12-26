# 🚀 CloudBLOG - 极简视频博客主题

CloudBLOG 是一款专为 [Jekyll](jekyllrb.com) 打造的极简、高性能博客主题，特别针对**视频内容创作者**和创意博主设计。它极致轻量，完美支持移动端阅读。

---

## 📖 目录
- [Jekyll 简介](#-jekyll-简介)
- [核心功能](#-核心功能)
- [适用场景](#-适用场景)
- [快速部署教程](#-快速部署教程)
- [内容发布指南](#-内容发布指南)

---

## 🛠 Jekyll 简介

Jekyll 是一个基于 Ruby 语言开发的开源静态站点生成器（SSG）。
- **专注内容**：支持 Markdown 编写，自动转化为美观的 HTML。
- **Liquid 引擎**：强大的模板语言，灵活渲染动态内容。
- **无缝集成**：与 GitHub Pages 深度绑定，一键部署。
- **高性能**：纯静态文件，极速加载，安全无隐患。

## ✨ 核心功能

- 📹 **原生视频支持**：内置 YouTube/Vimeo 无缝集成，页面顶部自动生成响应式视频播放区。
- 🌓 **双色模式切换**：支持深色（Dark）和浅色（Light）模式，适配 2025 年主流视觉偏好。
- ⚡ **极致速度**：移除冗余脚本，精简代码结构，对 SEO 极其友好。
- 📂 **GitHub Pages 优化**：无需配置 CI/CD，推送到 GitHub 即可自动上线。

## 🎯 适用场景

- **创意视频博客**：适合视频博主同步发布内容，积累文字权重。
- **个人作品集**：展示动态 Demo 或摄影/剪辑作品。
- **极简主义者**：追求极致干净的界面，聚焦内容本身。

---

## 🚀 快速部署教程

### 1. 导入仓库
1. 登录 GitHub，点击右上角 **+**，选择 **Import repository**。
2. 在 "Clone URL" 输入：`github.com`。
3. 命名仓库（如 `my-blog`），设为 **Public**，点击 **Begin import**。

### 2. 配置站点信息
在仓库根目录找到 `_data/settings.yml` 并编辑：
- **url**: 修改为 `https://<你的用户名>.github.io`
- **baseurl**: 若仓库名为 `my-blog`，则填 `"/my-blog"`；若仓库名就是 `<用户名>.github.io`，则保持为空 `""`。
- 提交修改（Commit changes）。

### 3. 激活 GitHub Actions 部署
1. 进入仓库的 **Settings > Pages**。
2. 在 **Build and deployment > Source** 下，将选项改为 **GitHub Actions**。
3. 点击页面出现的 **Configure**（针对 Jekyll 的工作流）。
4. 在打开的 `.yml` 配置页面直接点击右上角 **Commit changes**。

### 4. 查看上线状态
1. 点击顶部的 **Actions** 选项卡，确认任务变绿（Success）。
2. 回到 **Settings > Pages**，点击生成的链接即可访问。

---

## 📝 内容发布指南

你无需下载代码，可直接在 GitHub 网页端操作：

1. 进入 `_posts` 文件夹。
2. 点击 **Add file > Create new file**。
3. 文件名务必遵循格式：`2025-12-27-hello-world.md`。
4. **文章头信息示例**：
   ```markdown
   ---
   layout: post
   title: "我的第一篇视频博客"
   video_id: "视频ID"
   video_type: "youtube"
   ---
   这里写你的文章正文内容。
