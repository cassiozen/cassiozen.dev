import { companies, email, highlights, links, me } from './data'
import { hint, s, styled } from './styles'

const commands = {
  'help()': 'this list',
  'about()': 'who is this guy',
  'work()': 'where he has worked',
  'highlights()': 'things worth mentioning',
  'links()': 'find him elsewhere',
  'contact()': 'drop a line',
  'photo()': 'put a face to the name',
}

export const help = () => {
  console.log(...styled(['Commands', s.h], [' - call any of these:', s.body]))
  console.table(commands)
  hint('pro tip: console.clear() wipes the slate')
}

export const about = () => {
  console.group(...styled([me.name, s.title], [`  ${me.title}`, s.dim]))
  console.log(...styled([me.bio, s.body]))
  console.log(...styled(['Recent roles: ', s.body], [companies.map((c) => c.company).join(', '), s.strong]))
  console.log(...styled([`"${me.socialBio}"`, s.subtitle]))
  console.groupEnd()
  hint('next: work(), highlights(), links()')
}

export const work = () => {
  console.log(...styled(['Work', s.h], [' - most recent first', s.dim]))
  console.table(companies)
  hint('the fun stuff is in highlights()')
}

export const highlightsCmd = () => {
  console.group(...styled(['Worth mentioning', s.h]))
  for (const h of highlights) {
    console.log(...styled(['▸ ', s.bullet], [h.what, s.strong], ['  ' + h.detail, s.body]))
    if (h.url) console.log(...styled(['    ' + h.url, s.link]))
  }
  console.groupEnd()
  hint('want to say hi? contact()')
}

export const linksCmd = () => {
  console.log(...styled(['Elsewhere', s.h]))
  console.table(links, ['network', 'handle', 'url'])
  hint('links are plain text on purpose: cmd/ctrl-click them in most consoles')
}

export const contact = () => {
  const addr = email()
  console.info(...styled(['✉ ', s.body], [addr, s.code], ['  (yes, gmail. some things are timeless)', s.dim]))
  console.log(...styled(['Or any of these: ', s.body], [links.map((l) => l.network).join(' · '), s.strong]))
  console.assert(navigator.onLine, 'you appear to be offline, which makes emailing tricky')
  hint('replies not guaranteed to be pragmatic, but the code will be')
}
