import { about, contact, help, highlightsCmd, linksCmd, story, work } from './commands'
import { me } from './data'
import { photo, renderPhoto } from './photo'
import { hint, s, styled } from './styles'

declare global {
  interface Window {
    help: typeof help
    about: typeof about
    work: typeof work
    highlights: typeof highlightsCmd
    links: typeof linksCmd
    contact: typeof contact
    story: typeof story
    photo: typeof photo
  }
}

Object.assign(window, {
  help,
  about,
  work,
  highlights: highlightsCmd,
  links: linksCmd,
  contact,
  story,
  photo,
})

console.time('boot')
renderPhoto()
console.log(...styled([me.name, s.banner]))
console.log(...styled([me.title, s.title], ['  ·  ', s.dim], [me.socialBio, s.subtitle]))
console.log('')
console.log(
  ...styled(
    ['The page is blank on purpose. ', s.body],
    ['Everything', s.strong],
    [' lives here in the console.', s.body],
  ),
)
console.log(...styled(['Start with ', s.body], ['about()', s.code], ['  or  ', s.dim], ['help()', s.code]))
console.log('')
console.groupCollapsed(...styled(['all commands', s.dim]))
help()
console.groupEnd()
console.debug('%o', { builtWith: ['Vite+', 'TypeScript 7'], css: 'none', frameworks: 'none' })
console.timeEnd('boot')
hint('(that timer is the entire page load. no framework was harmed.)')
