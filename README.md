<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 智能护肤管家 (GlowGuide)

一个基于 React + Vite + Gemini AI 的智能护肤应用。

View your app in AI Studio: https://ai.studio/apps/drive/1WG9gWPgtgyTGGDm-VXO0NBX2pXtX5NRP

## 本地运行

**前置要求:** Node.js

1. 安装依赖:
   ```bash
   npm install
   ```
2. 在 `.env.local` 文件中设置 `GEMINI_API_KEY` 为你的 Gemini API 密钥
3. 运行应用:
   ```bash
   npm run dev
   ```

## 部署到 GitHub Pages

项目已配置 GitHub Actions 自动部署到 GitHub Pages。

### 首次推送代码

1. 确保你已经登录 GitHub 并拥有仓库权限
2. 推送代码到 GitHub:
   ```bash
   git push -u origin main
   ```
   如果遇到认证问题，可以使用以下方式之一：
   - 使用 Personal Access Token (推荐)
   - 使用 SSH 方式连接

### 启用 GitHub Pages

1. 前往 GitHub 仓库: https://github.com/fzg675094459/hufu
2. 进入 **Settings** → **Pages**
3. 在 **Source** 部分，选择 **GitHub Actions** 作为部署源
4. 保存设置

### 自动部署

- 每次推送到 `main` 分支时，GitHub Actions 会自动构建并部署应用
- 部署完成后，你的应用将在以下地址可访问:
  ```
  https://fzg675094459.github.io/hufu/
  ```
- 你也可以在仓库的 **Actions** 标签页查看部署状态

### 手动触发部署

如果需要手动触发部署，可以：
1. 前往仓库的 **Actions** 标签页
2. 选择 **Deploy to GitHub Pages** workflow
3. 点击 **Run workflow** 按钮
