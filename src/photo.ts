import me from './me.jpg'
import { hint } from './styles'

const SIZE = 96

// Devtools paints %c backgrounds in its own document, where page-relative URLs
// don't resolve and remote ones are at the mercy of its CSP. data: always works.
const dataUri = fetch(me)
  .then((r) => r.blob())
  .then(
    (blob) =>
      new Promise<string>((done) => {
        const reader = new FileReader()
        reader.onload = () => done(String(reader.result))
        reader.readAsDataURL(blob)
      }),
  )
  .catch(() => '')

export const renderPhoto = async () => {
  const uri = await dataUri
  if (!uri) return
  console.log(
    '%c ',
    [
      `background: url(${uri}) center / contain no-repeat;`,
      `padding: ${SIZE / 2}px;`,
      `line-height: ${SIZE}px;`,
      'border-radius: 8px;',
      'font-size: 0;',
    ].join(''),
  )
}

export const photo = () => {
  void renderPhoto().then(() => hint('no face? this devtools skips background images. LinkedIn has one.'))
}
