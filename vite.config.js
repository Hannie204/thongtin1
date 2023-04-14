import { defineConfig } from 'vite';

export default defineConfig({
  base: '/ten-repo/', // Đặt tên cho repository của bạn ở đây
  build: {
    outDir: 'docs' // Đặt tên cho folder lưu trữ trang web ở đây
  }
})