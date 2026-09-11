export const me = {
  name: 'Cassio Zen',
  title: 'Lead Software Engineer',
  bio: 'Software engineer with a passion for pragmatic solutions & quality code.',
  socialBio: 'Neurodivergent in the ZX Spectrum, Straight but not narrow.',
}

export const companies = [
  { company: 'Resend', note: 'most recent' },
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
