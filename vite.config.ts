
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // base 设置为 './' 可以让打包后的资源使用相对路径，
  // 这样无论你的仓库名是什么，部署到 GitHub Pages 都能正常加载。
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
