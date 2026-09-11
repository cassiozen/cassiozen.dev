import { accent } from './styles'

// A console for devices that don't have one. Every console.* call is teed
// into a bottom panel drawn after devtools, and a prompt runs the same
// commands. Built eagerly so the intro is captured before anyone opens it.

const css = [
  `.console{position:fixed;inset:auto 0 0 0;height:min(60vh,100%);display:flex;flex-direction:column;background:Canvas;color:CanvasText;font:12px/1.5 ui-monospace,Menlo,Consolas,monospace;border-top:1px solid color-mix(in srgb,CanvasText 20%,Canvas);box-shadow:0 -8px 24px rgb(0 0 0/.15);transform:translateY(100%);transition:transform .35s ease-out}`,
  '.console.show{transform:none}',
  '.console header{display:flex;align-items:center;gap:8px;padding:6px 10px;border-bottom:1px solid color-mix(in srgb,CanvasText 15%,Canvas);font-size:11px}',
  `.console header b{font-weight:600;border-bottom:2px solid ${accent};padding:2px 0}`,
  '.console header button{margin-left:auto;background:none;border:0;color:inherit;font-size:18px;line-height:1;cursor:pointer;padding:0 4px}',
  '.console .out{flex:1;overflow:auto;overscroll-behavior:contain}',
  '.console .row{padding:3px 10px;border-bottom:1px solid color-mix(in srgb,CanvasText 8%,Canvas);white-space:pre-wrap;overflow-wrap:anywhere}',
  '.console .debug{opacity:.65}',
  '.console .warn{background:color-mix(in srgb,#f5c400 14%,Canvas)}',
  '.console .error{color:#d93025;background:color-mix(in srgb,#d93025 10%,Canvas)}',
  `.console .input{color:color-mix(in srgb,CanvasText 60%,Canvas)}.console .input::before{content:"› ";color:${accent}}`,
  '.console details>:not(summary){margin-left:14px}.console summary{cursor:pointer;padding:3px 10px}',
  '.console table{border-collapse:collapse;margin:2px 0}.console th,.console td{border:1px solid color-mix(in srgb,CanvasText 15%,Canvas);padding:2px 8px;text-align:left}.console th{font-weight:600}',
  `.console form{display:flex;align-items:center;gap:6px;padding:6px 10px;border-top:1px solid color-mix(in srgb,CanvasText 15%,Canvas)}.console form span{color:${accent}}.console form input{flex:1;min-width:0;background:none;border:0;color:inherit;font:inherit;outline:0}`,
].join('')

type Args = unknown[]
type Kind = 'log' | 'info' | 'warn' | 'debug' | 'error' | 'input'

const root = document.createElement('aside')
root.className = 'console'
const out = document.createElement('div')
out.className = 'out'
let cursor: HTMLElement = out
const groups: HTMLElement[] = []

const row = (kind: Kind) => {
  const el = document.createElement('div')
  el.className = `row ${kind}`
  cursor.append(el)
  // content lands after this returns, so scroll once it has
  queueMicrotask(() => out.scrollTo(0, out.scrollHeight))
  return el
}

const inspect = (v: unknown): string => (typeof v === 'string' ? v : (JSON.stringify(v) ?? String(v)))

// Mirrors console's format-string rules closely enough: %c starts a span with
// that style, %o/%s/%d substitute, leftover args are appended.
const format = (args: Args): DocumentFragment => {
  const frag = document.createDocumentFragment()
  const [fmt, ...rest] = args
  if (typeof fmt !== 'string') {
    args.forEach((a, i) => frag.append(i ? ' ' : '', inspect(a)))
    return frag
  }
  let span = document.createElement('span')
  frag.append(span)
  let i = 0
  while (i < fmt.length) {
    const at = fmt.indexOf('%', i)
    if (at < 0 || at === fmt.length - 1) {
      span.append(fmt.slice(i))
      break
    }
    span.append(fmt.slice(i, at))
    const spec = fmt[at + 1]
    if (spec === 'c') {
      span = document.createElement('span')
      span.style.cssText = String(rest.shift() ?? '')
      frag.append(span)
    } else if ('oOsdif'.includes(spec)) span.append(inspect(rest.shift()))
    else span.append(fmt.slice(at, at + 2))
    i = at + 2
  }
  rest.forEach((a) => frag.append(' ', inspect(a)))
  return frag
}

const table = (data: unknown, columns?: string[]) => {
  if (typeof data !== 'object' || data === null) {
    row('log').append(inspect(data))
    return
  }
  const entries = Object.entries(data as Record<string, unknown>)
  const cell = (v: unknown) => (v === undefined ? '' : inspect(v))
  const cols = columns ?? [
    ...new Set(entries.flatMap(([, v]) => (typeof v === 'object' && v !== null ? Object.keys(v) : []))),
  ]
  const t = document.createElement('table')
  const head = t.insertRow()
  for (const h of ['(index)', ...(cols.length ? cols : ['Value'])]) {
    const th = document.createElement('th')
    th.textContent = h
    head.append(th)
  }
  for (const [key, v] of entries) {
    const tr = t.insertRow()
    tr.insertCell().textContent = key
    if (cols.length) for (const c of cols) tr.insertCell().textContent = cell((v as Record<string, unknown>)[c])
    else tr.insertCell().textContent = cell(v)
  }
  row('log').append(t)
}

const group = (expanded: boolean, args: Args) => {
  const details = document.createElement('details')
  details.open = expanded
  const summary = document.createElement('summary')
  summary.append(format(args))
  details.append(summary)
  cursor.append(details)
  groups.push(cursor)
  cursor = details
}

const timers = new Map<string, number>()

const tee = (name: keyof Console, handle: (args: Args) => void) => {
  const original = console[name] as (...args: Args) => void
  ;(console as unknown as Record<string, (...args: Args) => void>)[name] = (...args) => {
    original.apply(console, args)
    handle(args)
  }
}

tee('log', (a) => row('log').append(format(a)))
tee('info', (a) => row('info').append(format(a)))
tee('debug', (a) => row('debug').append(format(a)))
tee('warn', (a) => row('warn').append(format(a)))
tee('error', (a) => row('error').append(format(a)))
tee('group', (a) => group(true, a))
tee('groupCollapsed', (a) => group(false, a))
tee('groupEnd', () => {
  cursor = groups.pop() ?? out
})
tee('table', ([data, cols]) => table(data, Array.isArray(cols) ? cols.map(String) : undefined))
tee('time', ([label = 'default']) => timers.set(String(label), performance.now()))
tee('timeEnd', ([label = 'default']) => {
  const started = timers.get(String(label))
  if (started !== undefined) row('log').append(`${String(label)}: ${(performance.now() - started).toFixed(2)} ms`)
})
tee('assert', ([condition, ...message]) => {
  if (!condition) row('error').append('Assertion failed: ', format(message))
})

type Commands = Record<string, () => void>

const run = (commands: Commands, src: string) => {
  row('input').append(src)
  const call = /^\s*(\w+)\s*(\(\s*\))?\s*;?\s*$/.exec(src)
  const name = call?.[1] ?? ''
  if (name === 'clear' && call?.[2]) {
    out.replaceChildren()
    groups.length = 0
    cursor = out
  } else if (name in commands && !call?.[2]) row('error').append(`needs parentheses: ${name}()`)
  else if (name in commands) commands[name]?.()
  else row('error').append(`${src.trim()} is not a command. try help()`)
}

export const installPanel = (commands: Commands) => {
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(css)
  document.adoptedStyleSheets.push(sheet)

  const header = document.createElement('header')
  const tab = document.createElement('b')
  tab.textContent = 'Console'
  const close = document.createElement('button')
  close.textContent = '×'
  close.setAttribute('aria-label', 'close')
  close.onclick = () => root.classList.remove('show')
  header.append(tab, close)

  const form = document.createElement('form')
  const prompt = document.createElement('span')
  prompt.textContent = '›'
  const input = document.createElement('input')
  Object.assign(input, {
    autocapitalize: 'off',
    autocomplete: 'off',
    spellcheck: false,
    enterKeyHint: 'go',
    placeholder: 'help()',
  })
  form.append(prompt, input)
  form.onsubmit = (e) => {
    e.preventDefault()
    if (input.value.trim()) run(commands, input.value)
    input.value = ''
  }

  root.append(header, out, form)
  document.body.append(root)
}

export const showPanel = () => {
  root.classList.add('show')
  out.scrollTop = out.scrollHeight
}
