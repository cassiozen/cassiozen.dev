// Palette tuned to stay legible on both light and dark devtools themes:
// mid-saturation foregrounds, or padded backgrounds with fixed text color.
const mono = 'font-family: ui-monospace, Menlo, Consolas, monospace;'

export const s = {
  banner: [
    'font-size: 28px;',
    'font-weight: 800;',
    'letter-spacing: 2px;',
    'color: #fff;',
    'background: linear-gradient(90deg, #7c3aed, #db2777, #f59e0b);',
    'padding: 10px 18px;',
    'border-radius: 8px;',
    'text-shadow: 0 1px 2px rgba(0,0,0,.4);',
  ].join(''),
  title: 'font-size: 15px; font-weight: 700; color: #a855f7;',
  subtitle: 'font-size: 13px; font-style: italic; color: #ec4899;',
  h: 'font-size: 13px; font-weight: 700; color: #f59e0b;',
  body: 'font-size: 13px; color: inherit;',
  strong: 'font-size: 13px; font-weight: 700; color: #22c55e;',
  dim: 'color: #888; font-style: italic;',
  code: `${mono} background: #7c3aed; color: #fff; padding: 1px 6px; border-radius: 4px;`,
  link: 'color: #3b82f6; text-decoration: underline;',
  bullet: 'color: #f59e0b; font-weight: 700;',
}

// Builds a `%c` format string plus its style args from [text, style] pairs,
// so callers can spread the result straight into console.log.
export const styled = (...parts: [string, string][]): string[] => {
  const fmt = parts.map(([t]) => `%c${t}`).join('')
  return [fmt, ...parts.map(([, st]) => st)]
}

export const hint = (text: string) => console.log(...styled([`  ${text}`, s.dim]))
