import { defineConfig } from 'vite-plus'

// https://viteplus.dev/config/
export default defineConfig({
  build: {
    reportCompressedSize: false,
    rolldownOptions: {
      output: {
        minify: {
          compress: { dropConsole: true, dropDebugger: true },
        },
      },
    },
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
