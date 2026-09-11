// Import order is bundle order. page first keeps its lit words near the top
// of the wall, right after Group.Open.
import { showSource } from './page'
import { analyticsBlocked } from './adblock'
import { about, contact, help, highlightsCmd, linksCmd, work } from './commands'
import { me } from './data'
import { Group } from './group'
import { handheld, installPanel, showPanel } from './panel'
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
    photo: typeof photo
  }
}

const commands = {
  help,
  about,
  work,
  highlights: highlightsCmd,
  links: linksCmd,
  contact,
  photo,
}
Object.assign(window, commands)

installPanel(commands)
showSource(handheld ? showPanel : undefined)

console.time('boot')
await renderPhoto()
console.log(...styled([me.name, s.banner]))
console.log(...styled([me.title, s.title], ['  ·  ', s.dim], [me.socialBio, s.subtitle]))
console.log('')
console.log(...styled(['Start with ', s.body], ['about()', s.code], ['  or  ', s.dim], ['help()', s.code]))
console.log('')
Group.Collapsed(...styled(['all commands', s.dim]))
help()
Group.End()
console.debug('%o', { builtWith: ['Vite+', 'TypeScript 7'], frameworks: 'none', css: 'seven rules, for the glow' })
console.timeEnd('boot')
hint('(that timer is the entire page load, photo included. no framework was harmed.)')

if (await analyticsBlocked()) {
  console.log('')
  console.log(
    ...styled(["Oh, I see your ad blocker didn't let my analytics run. ", s.body], ['No hard feelings.', s.dim]),
  )
}
