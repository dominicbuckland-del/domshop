export interface Product {
  id: string
  name: string
  slug: string
  oneLiner: string
  whyILikeIt: string
  price: number // cents
  currency: string
  link: string // affiliate or direct link to buy
  category: string
  image?: string
  tags: string[]
}

export const categories = [
  'all',
  'tech',
  'coffee',
  'edc',
  'fitness',
  'home',
  'reads',
] as const

export type Category = typeof categories[number]

export const products: Product[] = [
  {
    id: '1',
    name: 'Aeropress',
    slug: 'aeropress',
    oneLiner: 'The only coffee maker that travels with me.',
    whyILikeIt: 'Makes better coffee than machines 10x the price. Unbreakable, fits in a bag, and takes 60 seconds. I have used this every single morning for 3 years.',
    price: 5495,
    currency: 'AUD',
    link: '#',
    category: 'coffee',
    tags: ['daily-use', 'travel'],
  },
  {
    id: '2',
    name: 'Sony WH-1000XM5',
    slug: 'sony-xm5',
    oneLiner: 'Noise cancelling that actually works.',
    whyILikeIt: 'I wear these 8+ hours a day. The noise cancelling turns any space into a studio. Comfortable enough to forget you are wearing them. Battery lasts days.',
    price: 39900,
    currency: 'AUD',
    link: '#',
    category: 'tech',
    tags: ['daily-use', 'work'],
  },
  {
    id: '3',
    name: 'Bellroy Slim Wallet',
    slug: 'bellroy-slim',
    oneLiner: 'Wallet that forces you to carry less.',
    whyILikeIt: 'Holds 4 cards and some cash. That is all you need. Australian-made, ages beautifully, and you stop sitting on a brick.',
    price: 9900,
    currency: 'AUD',
    link: '#',
    category: 'edc',
    tags: ['daily-use', 'australian'],
  },
  {
    id: '4',
    name: 'Timemore C2 Grinder',
    slug: 'timemore-c2',
    oneLiner: 'Hand grinder that does not suck.',
    whyILikeIt: 'Fresh ground coffee for under $100. Consistent grind, fast, quiet enough for early mornings. Pairs perfectly with the Aeropress.',
    price: 8900,
    currency: 'AUD',
    link: '#',
    category: 'coffee',
    tags: ['daily-use', 'travel'],
  },
  {
    id: '5',
    name: 'Kindle Paperwhite',
    slug: 'kindle-paperwhite',
    oneLiner: 'Read more books. Carry zero books.',
    whyILikeIt: 'Waterproof, weeks of battery, no notifications. The single best device for actually reading instead of scrolling. The backlight is perfect at night.',
    price: 23900,
    currency: 'AUD',
    link: '#',
    category: 'reads',
    tags: ['daily-use', 'travel'],
  },
  {
    id: '6',
    name: 'Theragun Mini',
    slug: 'theragun-mini',
    oneLiner: 'Pocket-sized recovery.',
    whyILikeIt: 'Fits in a gym bag, works on everything from neck tension to leg day soreness. 3 speed settings, USB-C charging. I use it more than the full-size version.',
    price: 29900,
    currency: 'AUD',
    link: '#',
    category: 'fitness',
    tags: ['recovery', 'travel'],
  },
  {
    id: '7',
    name: 'Muji Gel Pen 0.38',
    slug: 'muji-gel-pen',
    oneLiner: 'The pen that ended the pen search.',
    whyILikeIt: 'Smooth, precise, cheap enough to buy in bulk. I keep one in every bag, every desk, every pocket. Nothing else comes close at this price.',
    price: 250,
    currency: 'AUD',
    link: '#',
    category: 'edc',
    tags: ['daily-use', 'cheap'],
  },
  {
    id: '8',
    name: 'Uniqlo Airism Tee',
    slug: 'uniqlo-airism',
    oneLiner: 'The invisible base layer.',
    whyILikeIt: 'Lightweight, moisture-wicking, no visible branding. I own 7 of them. They work in Australian heat, under a jacket, or at the gym. $15 each.',
    price: 1490,
    currency: 'AUD',
    link: '#',
    category: 'edc',
    tags: ['daily-use', 'cheap'],
  },
  {
    id: '9',
    name: 'Standing Desk Converter',
    slug: 'standing-desk',
    oneLiner: 'Stand without buying a new desk.',
    whyILikeIt: 'Sits on top of any desk, lifts your screen and keyboard to standing height in 3 seconds. No motors, no installation, works immediately.',
    price: 19900,
    currency: 'AUD',
    link: '#',
    category: 'home',
    tags: ['work', 'health'],
  },
  {
    id: '10',
    name: 'Atomic Habits',
    slug: 'atomic-habits',
    oneLiner: 'The systems book, not the motivation book.',
    whyILikeIt: 'Read it twice. The 1% improvement framework changed how I build products and habits. Skip the summaries, read the actual book.',
    price: 2200,
    currency: 'AUD',
    link: '#',
    category: 'reads',
    tags: ['book', 'productivity'],
  },
]

export function getProductBySlug(slug: string) {
  return products.find(p => p.slug === slug)
}

export function getProductsByCategory(category: string) {
  if (category === 'all') return products
  return products.filter(p => p.category === category)
}
