// Deliberately quiet: one accent, one muted gray, everything else inherits
// the console's own text color so it reads the same on light and dark themes.
const accent = '#8b5cf6'
const muted = '#8a8a8a'
const mono = 'font-family: ui-monospace, Menlo, Consolas, monospace;'

export const s = {
  banner: 'font-size: 20px; font-weight: 700; letter-spacing: 1px;',
  title: 'font-weight: 600;',
  subtitle: `font-style: italic; color: ${muted};`,
  h: `font-weight: 700; color: ${accent};`,
  body: '',
  strong: 'font-weight: 600;',
  dim: `color: ${muted}; font-style: italic;`,
  code: `${mono} color: ${accent};`,
  link: `color: ${accent}; text-decoration: underline;`,
  bullet: `color: ${accent};`,
}

// Builds a `%c` format string plus its style args from [text, style] pairs,
// so callers can spread the result straight into console.log.
export const styled = (...parts: [string, string][]): string[] => {
  const fmt = parts.map(([t]) => `%c${t}`).join('')
  return [fmt, ...parts.map(([, st]) => st)]
}

export const hint = (text: string) => console.log(...styled([`  ${text}`, s.dim]))
