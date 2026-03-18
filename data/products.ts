export interface Product {
  id: string
  name: string
  slug: string
  oneLiner: string
  whyILikeIt: string
  price: number // cents
  currency: string
  link: string
  category: string
  image: string
  tags: string[]
  signalSource?: string // which data source surfaced this
  type: 'dropship' | 'affiliate'
  recommendedBecause: string // editorial: why the algorithm surfaced it and whether Dom agrees
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
    link: 'https://aeropress.com/products/aeropress-original',
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1572286258217-40142c1c2554?w=400&h=400&fit=crop',
    tags: ['daily-use', 'travel'],
    signalSource: 'inventory-scan',
    type: 'affiliate',
    recommendedBecause: 'Inventory scan flagged this as the most-used kitchen item by frequency. The algorithm is correct -- I use it every day. No notes.',
  },
  {
    id: '2',
    name: 'Sony WH-1000XM5',
    slug: 'sony-xm5',
    oneLiner: 'Noise cancelling that actually works.',
    whyILikeIt: 'I wear these 8+ hours a day. The noise cancelling turns any space into a studio. Comfortable enough to forget you are wearing them. Battery lasts days.',
    price: 39900,
    currency: 'AUD',
    link: 'https://store.sony.com.au/product/wh-1000xm5',
    category: 'tech',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop',
    tags: ['daily-use', 'work'],
    signalSource: 'spotify-listening-hours',
    type: 'affiliate',
    recommendedBecause: 'Spotify data shows 6+ hours of daily listening. The algorithm surfaced headphone upgrades. I already own these -- they are the reason the listening hours are so high.',
  },
  {
    id: '3',
    name: 'Bellroy Slim Wallet',
    slug: 'bellroy-slim',
    oneLiner: 'Wallet that forces you to carry less.',
    whyILikeIt: 'Holds 4 cards and some cash. That is all you need. Australian-made, ages beautifully, and you stop sitting on a brick.',
    price: 9900,
    currency: 'AUD',
    link: 'https://bellroy.com/products/slim-sleeve-wallet',
    category: 'edc',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
    tags: ['daily-use', 'australian'],
    signalSource: 'inventory-scan',
    type: 'affiliate',
    recommendedBecause: 'Inventory scan tagged the old wallet as worn-out. The algorithm recommended Bellroy based on Australian brand preference and minimalist pattern. Correct call -- bought it, kept it.',
  },
  {
    id: '4',
    name: 'Timemore C2 Grinder',
    slug: 'timemore-c2',
    oneLiner: 'Hand grinder that does not suck.',
    whyILikeIt: 'Fresh ground coffee for under $100. Consistent grind, fast, quiet enough for early mornings. Pairs perfectly with the Aeropress.',
    price: 8900,
    currency: 'AUD',
    link: 'https://www.timemore.com/products/chestnut-c2',
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
    tags: ['daily-use', 'travel'],
    signalSource: 'inventory-scan',
    type: 'affiliate',
    recommendedBecause: 'The algorithm paired this with the Aeropress usage. Technically correct -- if you use one daily, the grinder is obvious. I already owned it before the algorithm existed.',
  },
  {
    id: '5',
    name: 'Kindle Paperwhite',
    slug: 'kindle-paperwhite',
    oneLiner: 'Read more books. Carry zero books.',
    whyILikeIt: 'Waterproof, weeks of battery, no notifications. The single best device for actually reading instead of scrolling. The backlight is perfect at night.',
    price: 23900,
    currency: 'AUD',
    link: 'https://www.amazon.com.au/Kindle-Paperwhite-16-adjustable-Lockscreen/dp/B09TMN58KL',
    category: 'reads',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=400&fit=crop',
    tags: ['daily-use', 'travel'],
    signalSource: 'reading-history',
    type: 'affiliate',
    recommendedBecause: 'Reading history shows 30+ books/year. The algorithm recommended a Kindle upgrade. I was already on my second Paperwhite by then. The data confirmed the habit, not the other way around.',
  },
  {
    id: '6',
    name: 'Theragun Mini',
    slug: 'theragun-mini',
    oneLiner: 'Pocket-sized recovery.',
    whyILikeIt: 'Fits in a gym bag, works on everything from neck tension to leg day soreness. 3 speed settings, USB-C charging. I use it more than the full-size version.',
    price: 29900,
    currency: 'AUD',
    link: 'https://www.therabody.com/au/en-au/theragun-mini.html',
    category: 'fitness',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
    tags: ['recovery', 'travel'],
    signalSource: 'strava-activity',
    type: 'affiliate',
    recommendedBecause: 'Strava data showed increased running volume. The algorithm surfaced recovery tools. This one was a genuine discovery -- I would not have found it without the recommendation.',
  },
  {
    id: '7',
    name: 'Muji Gel Pen 0.38',
    slug: 'muji-gel-pen',
    oneLiner: 'The pen that ended the pen search.',
    whyILikeIt: 'Smooth, precise, cheap enough to buy in bulk. I keep one in every bag, every desk, every pocket. Nothing else comes close at this price.',
    price: 250,
    currency: 'AUD',
    link: 'https://www.muji.com/au/products/cmdty/detail/4550344275023',
    category: 'edc',
    image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&h=400&fit=crop',
    tags: ['daily-use', 'cheap'],
    signalSource: 'inventory-scan',
    type: 'affiliate',
    recommendedBecause: 'Inventory scan found 12 of these across different locations. The algorithm correctly identified it as a bulk-buy essential. Agreed -- I reorder every 3 months.',
  },
  {
    id: '8',
    name: 'Uniqlo Airism Tee',
    slug: 'uniqlo-airism',
    oneLiner: 'The invisible base layer.',
    whyILikeIt: 'Lightweight, moisture-wicking, no visible branding. I own 7 of them. They work in Australian heat, under a jacket, or at the gym. $15 each.',
    price: 1490,
    currency: 'AUD',
    link: 'https://www.uniqlo.com/au/en/products/E423525-000',
    category: 'edc',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    tags: ['daily-use', 'cheap'],
    signalSource: 'inventory-scan',
    type: 'affiliate',
    recommendedBecause: 'The algorithm flagged 7 identical items in the inventory. Pattern: buy cheap basics in bulk, replace annually. It also recommended Uniqlo U tees -- I said no, the Airism is better for heat.',
  },
  {
    id: '9',
    name: 'Standing Desk Converter',
    slug: 'standing-desk',
    oneLiner: 'Stand without buying a new desk.',
    whyILikeIt: 'Sits on top of any desk, lifts your screen and keyboard to standing height in 3 seconds. No motors, no installation, works immediately.',
    price: 19900,
    currency: 'AUD',
    link: 'https://www.officeworks.com.au/shop/officeworks/c/sit-stand-desk-converters/q/desk+converter',
    category: 'home',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop',
    tags: ['work', 'health'],
    signalSource: 'screen-time-data',
    type: 'affiliate',
    recommendedBecause: 'Screen time data showed 10+ hours seated daily. The algorithm recommended ergonomic gear. It also suggested a Herman Miller -- technically correct but I do not spend $2k on a chair. The converter was the right call.',
  },
  {
    id: '10',
    name: 'Atomic Habits',
    slug: 'atomic-habits',
    oneLiner: 'The systems book, not the motivation book.',
    whyILikeIt: 'Read it twice. The 1% improvement framework changed how I build products and habits. Skip the summaries, read the actual book.',
    price: 2200,
    currency: 'AUD',
    link: 'https://www.booktopia.com.au/atomic-habits-james-clear/book/9781847941831.html',
    category: 'reads',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
    tags: ['book', 'productivity'],
    signalSource: 'reading-history',
    type: 'affiliate',
    recommendedBecause: 'Claude conversation history showed repeated references to habit systems. The algorithm surfaced this. I had already read it twice -- but it confirmed the book genuinely stuck, not just performative reading.',
  },
]

export function getProductBySlug(slug: string) {
  return products.find(p => p.slug === slug)
}

export function getProductsByCategory(category: string) {
  if (category === 'all') return products
  return products.filter(p => p.category === category)
}
