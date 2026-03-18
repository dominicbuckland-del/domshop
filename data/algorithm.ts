export interface DataSource {
  name: string
  icon: string
  description: string
  signalType: string
  dataPoints: string
  status: 'live' | 'batch' | 'manual'
}

export const dataSources: DataSource[] = [
  {
    name: 'Strava',
    icon: 'run',
    description: 'Running routes, distances, frequency, gear wear patterns. When I increase mileage, the algorithm surfaces recovery tools and shoe replacements.',
    signalType: 'Activity & fitness patterns',
    dataPoints: 'Routes, pace, distance, frequency, gear log',
    status: 'live',
  },
  {
    name: 'Spotify',
    icon: 'music',
    description: 'Listening hours, genres, contexts (work vs gym vs travel). High headphone usage triggers audio gear recommendations. Playlist patterns inform mood-based product surfacing.',
    signalType: 'Audio consumption & context',
    dataPoints: 'Hours/day, top genres, listening context, device',
    status: 'live',
  },
  {
    name: 'Claude / AI Chats',
    icon: 'brain',
    description: 'Every product research conversation, comparison, and decision. The algorithm learns what I research, what I buy, and what I reject -- building a preference model over time.',
    signalType: 'Purchase intent & research patterns',
    dataPoints: 'Research topics, comparisons, decisions, rejections',
    status: 'live',
  },
  {
    name: 'Browser Bookmarks',
    icon: 'bookmark',
    description: 'Saved product pages, wishlists, comparison tabs. Bookmarked items that persist for 7+ days get flagged as high-intent. Items saved and forgotten get deprioritised.',
    signalType: 'Intent signals & wishlist behaviour',
    dataPoints: 'Saved URLs, dwell time, return visits',
    status: 'batch',
  },
  {
    name: 'Instagram',
    icon: 'camera',
    description: 'Saved posts, product tags in followed accounts, ad interactions. The algorithm reads visual preference patterns -- minimalist vs maximal, colour preferences, brand affinity.',
    signalType: 'Visual preference & brand exposure',
    dataPoints: 'Saved posts, ad clicks, followed brands',
    status: 'live',
  },
  {
    name: 'Email / Receipts',
    icon: 'mail',
    description: 'Purchase receipts parsed for product names, prices, frequency, and reorder timing. Consumables get auto-tracked for restock predictions.',
    signalType: 'Purchase history & reorder timing',
    dataPoints: 'Order confirmations, shipping notifications, returns',
    status: 'batch',
  },
  {
    name: 'Inventory Scan',
    icon: 'scan',
    description: 'I photographed everything I own. Each item was catalogued with category, brand, age, condition, and replacement urgency. This is the baseline the algorithm builds on.',
    signalType: 'Owned inventory & replacement cycle',
    dataPoints: '147 items scanned, categorised, condition-rated',
    status: 'manual',
  },
  {
    name: 'Screen Time',
    icon: 'screen',
    description: 'App usage patterns reveal workflow tools, entertainment preferences, and productivity patterns. High usage of specific apps triggers complementary product suggestions.',
    signalType: 'Digital behaviour & tool usage',
    dataPoints: 'App categories, daily hours, usage patterns',
    status: 'live',
  },
  {
    name: 'Location / Weather',
    icon: 'location',
    description: 'Current city, travel frequency, climate data. The algorithm adjusts for seasonal needs -- summer gear in December, travel accessories before trips.',
    signalType: 'Environmental context',
    dataPoints: 'City, travel frequency, temperature, season',
    status: 'live',
  },
  {
    name: 'Past Purchases',
    icon: 'cart',
    description: 'Full purchase history cross-referenced with satisfaction ratings. Products I bought and kept long-term train the quality model. Returns and replacements train the avoidance model.',
    signalType: 'Satisfaction & quality signals',
    dataPoints: 'Purchase date, retention time, satisfaction score',
    status: 'batch',
  },
]

export const algorithmStats = {
  totalDataPoints: '2,847',
  liveSources: 6,
  itemsScanned: 147,
  avgConfidence: '87%',
  lastUpdated: '3 hours ago',
}
