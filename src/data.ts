export const me = {
  name: 'Cassio Zen',
  title: 'Lead Software Engineer',
  bio: 'Software engineer with a passion for pragmatic solutions & quality code.',
  socialBio: 'Neurodivergent in the ZX Spectrum, Straight but not narrow.',
}

export const companies = [
  { company: 'StackBlitz', note: 'most recent' },
  { company: 'Microsoft', note: '' },
  { company: 'Google', note: '' },
]

export const highlights = [
  {
    what: 'Red-teaming award',
    detail: 'Won a prompt engineering bounty for finding creative AI system vulnerabilities.',
  },
  {
    what: 'Author of "Pro React"',
    detail: 'Apress, 2018. A best-seller in the JavaScript category.',
  },
  {
    what: 'TDungeon',
    detail: "A quirky adventure game playable entirely inside TypeScript's type system.",
    url: 'https://github.com/cassiozen/TDungeon',
  },
]

export const links = [
  { network: 'GitHub', handle: '@cassiozen', url: 'https://github.com/cassiozen' },
  { network: 'LinkedIn', handle: 'cassiozen', url: 'https://www.linkedin.com/in/cassiozen/' },
  { network: 'Bluesky', handle: '@cassiozen.dev', url: 'https://bsky.app/profile/cassiozen.dev' },
]

// Assembled at call time so the address never appears whole in the bundle.
export const email = () => ['cassiozen', '@', 'gmail', '.', 'com'].join('')

export const storyLines = [
  "Oh, hello there! I see you've found this console.",
  "I'm not used to having visitors in this little corner of my website...",
  'Wait. This IS the website. Never mind.',
  'Did you know I once debugged a project while balancing my laptop on the fruit stand of a supermarket?',
  'True story! The interactive installation was having issues right before the opening.',
  'Still here?',
  "Wow, you're really committed to this, aren't you?",
  'My real passion is low-level browser APIs and gnarly architecture problems.',
  'Give me a challenging architecture problem over a CSS animation any day!',
  '...which might explain why this site has no CSS.',
  'Fine. You win. Persistence champion.',
  '...the real treasures were the console messages you read along the way.',
]
