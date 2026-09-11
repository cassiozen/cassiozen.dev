import { defineConfig } from 'vite-plus'

// https://viteplus.dev/config/
export default defineConfig({
  build: {
    reportCompressedSize: false,
  },
  lint: {
    ignorePatterns: ['dist/**'],
  },
  fmt: {
    semi: false,
    singleQuote: true,
    ignorePatterns: ['.claude/**', 'pnpm-lock.yaml'],
  },
})
