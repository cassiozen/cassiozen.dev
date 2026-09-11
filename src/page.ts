import { Group } from './group'
import { showPanel } from './panel'
import { accent } from './styles'

// The page is this script. The inline <script> is made visible with CSS, and
// three of its own identifiers are wrapped in <mark> and lit up in sequence.

// One rule per line here; joined without newlines so the CSS shows up in the
// wall of text as just another long minified line.
const css = [
  ':root{color-scheme:light dark}',
  'body{margin:0;padding:16px;background:Canvas;color:color-mix(in srgb,CanvasText 32%,Canvas)}',
  'body>script,body>pre{display:block;margin:0;font:11px/1.7 ui-monospace,Menlo,Consolas,monospace;white-space:pre-wrap;overflow-wrap:anywhere}',
  'mark{color:inherit;background:none;transition:color .8s,text-shadow .8s}',
  `mark.lit{color:${accent};text-shadow:0 0 12px ${accent};cursor:help;animation:breathe 2.6s ease-in-out infinite alternate}`,
  `@keyframes breathe{to{text-shadow:0 0 3px ${accent}}}`,
  '@media (prefers-reduced-motion:reduce){mark.lit{animation:none}}',
].join('')

const QUOTES = new Set(['"', "'", '`'])
const isWord = (c = '') => /\w/.test(c)

// Index just past the string literal starting at src[i]. Template holes are
// skipped as code so a quote inside `${}` can't end the literal early.
const skipString = (src: string, i: number): number => {
  const quote = src[i++]
  while (i < src.length && src[i] !== quote) {
    if (src[i] === '\\') i += 2
    else if (quote === '`' && src.startsWith('${', i)) i = skipHole(src, i + 2)
    else i++
  }
  return i + 1
}

const skipHole = (src: string, i: number): number => {
  let depth = 1
  while (i < src.length && depth > 0) {
    const c = src[i]
    if (QUOTES.has(c)) i = skipString(src, i)
    else {
      if (c === '{') depth++
      else if (c === '}') depth--
      i++
    }
  }
  return i
}

// First whole-word `word` in code at or after `from`. String literals are
// skipped, so prose in the data can never match.
const findWord = (src: string, word: string, from: number): number => {
  let i = from
  while (i < src.length) {
    if (QUOTES.has(src[i])) {
      i = skipString(src, i)
      continue
    }
    if (src.startsWith(word, i) && !isWord(src[i - 1]) && !isWord(src[i + word.length])) return i
    i++
  }
  return -1
}

const mark = {
  the(range: Range) {
    const m = document.createElement('mark')
    m.title = 'Cmd+Opt+J / Ctrl+Shift+J / F12'
    m.onclick = showPanel
    range.surroundContents(m)
    return m
  },
}

// Nothing here spells the sentence out. Each word is borrowed from an
// identifier that survives minification: a Group mode, mark.the above, and
// the console namespace's own toStringTag ("[object console]").
const sentence = [Group.Open.name, mark.the.name, Object.prototype.toString.call(console).slice(8, -1)]

export const showSource = () => {
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(css)
  document.adoptedStyleSheets.push(sheet)

  const text = document.querySelector('body > script:not([src])')?.firstChild
  if (!(text instanceof Text)) {
    // dev server loads main.ts by URL, so there is no inline source to show
    const pre = document.createElement('pre')
    pre.textContent = '// source view needs a build: vp build && vp preview'
    document.body.append(pre)
    return
  }

  // Ranges are live: surrounding one splits the text node and the DOM shifts
  // the others along, so all three are located before any wrapping happens.
  const ranges: Range[] = []
  let from = 0
  for (const word of sentence) {
    const at = findWord(text.data, word, from)
    if (at < 0) return
    const range = new Range()
    range.setStart(text, at)
    range.setEnd(text, at + word.length)
    ranges.push(range)
    from = at + word.length
  }
  const marks = ranges.map((range) => mark.the(range))
  marks.forEach((m, i) => setTimeout(() => m.classList.add('lit'), 1200 + i * 650))
  // No devtools on a phone, so once the sentence has been read, bring one.
  if (matchMedia('(pointer: coarse)').matches) setTimeout(showPanel, 1200 + marks.length * 650 + 900)
}
