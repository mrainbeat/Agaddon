import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // 1. 패키지 import 추가

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. 테일윈드 플러그인 추가
  ],
  server: {
    port: 3000,
  },
});
