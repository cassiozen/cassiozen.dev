import me from './me.jpg'
import { hint } from './styles'

const SIZE = 120

// Consoles have no <img>. Chrome renders a background-image on a `%c` span
// whose box is inflated with padding. Firefox ignores url() backgrounds and
// shows an empty line, hence the fallback hint in photo().
export const renderPhoto = () => {
  console.log(
    '%c ',
    [
      `background: url(${me}) center / contain no-repeat;`,
      `padding: ${SIZE / 2}px;`,
      `line-height: ${SIZE}px;`,
      'border-radius: 50%;',
      'font-size: 0;',
    ].join(''),
  )
}

export const photo = () => {
  renderPhoto()
  hint(`no face? your console skips background images. open it directly: ${location.origin}${me}`)
}
