import me from './me.jpg?inline'
import { hint } from './styles'

const SIZE = 96

// Consoles have no <img>. The styled `%c` span renders inside the devtools
// document, so relative/page URLs never resolve: inline as a data URI.
// Box is inflated with padding. Some consoles still drop url() backgrounds,
// hence the fallback hint in photo().
export const renderPhoto = () => {
  console.log(
    '%c ',
    [
      `background: url(${me}) center / contain no-repeat;`,
      `padding: ${SIZE / 2}px;`,
      `line-height: ${SIZE}px;`,
      'border-radius: 8px;',
      'font-size: 0;',
    ].join(''),
  )
}

export const photo = () => {
  renderPhoto()
  hint('no face? your console skips background images. LinkedIn has one.')
}
