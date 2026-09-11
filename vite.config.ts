import { defineConfig, type Plugin } from 'vite-plus'

// Moves the built entry chunk into index.html as an inline <script>. The page
// renders that script's own text, so it has to be in the document, not a file.
const inlineEntry = (): Plugin => ({
  name: 'inline-entry',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler(html, { bundle }) {
      if (!bundle) return html
      let inline = ''
      // Vite hoists the entry tag into <head>; it has to sit in <body> to render.
      html = html.replace(/\s*<script type="module"[^>]*src="\/?([^"]+)"><\/script>/, (tag, file: string) => {
        const chunk = bundle[file]
        if (chunk?.type !== 'chunk') return tag
        delete bundle[file]
        inline = `<script type="module">\n${chunk.code.replace(/<\/script/g, '<\\/script')}</script>`
        return ''
      })
      return html.replace('</body>', `${inline}\n</body>`)
    },
  },
})

// https://viteplus.dev/config/
export default defineConfig({
  plugins: [inlineEntry()],
  build: {
    reportCompressedSize: false,
    modulePreload: { polyfill: false },
  },
  lint: {
    ignorePatterns: ['dist/**'],
  },
  fmt: {
    semi: false,
    singleQuote: true,
    ignorePatterns: ['.claude/**', '.playwright-mcp/**', 'pnpm-lock.yaml'],
  },
})
