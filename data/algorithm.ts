export interface DataSource {
  name: string
  icon: string
  description: string
  signalType: string
  dataPoints: string
  status: 'live' | 'batch' | 'manual'
}

export interface AlgorithmLevel {
  level: number
  title: string
  subtitle: string
  description: string
  sources: DataSource[]
}

export const algorithmLevels: AlgorithmLevel[] = [
  {
    level: 1,
    title: 'Manual imports',
    subtitle: 'The foundation -- static data you export once and update periodically',
    description: 'This is where everyone starts. You export your data from the platforms you already use, format it, and feed it to the model. No APIs, no live connections, just files. The quality of recommendations depends entirely on how honest and complete these exports are.',
    sources: [
      {
        name: 'Claude conversation history',
        icon: 'brain',
        description: 'Every product research conversation, comparison, and decision exported from Claude. The model learns what you research, what you buy, and what you reject -- building a preference model over time.',
        signalType: 'Purchase intent & research patterns',
        dataPoints: 'Research topics, comparisons, decisions, rejections',
        status: 'manual',
      },
      {
        name: 'Browser bookmarks',
        icon: 'bookmark',
        description: 'Saved product pages, wishlists, comparison tabs. Bookmarked items that persist for 7+ days get flagged as high-intent. Items saved and forgotten get deprioritised.',
        signalType: 'Intent signals & wishlist behaviour',
        dataPoints: 'Saved URLs, dwell time, return visits',
        status: 'manual',
      },
      {
        name: 'Spotify export',
        icon: 'music',
        description: 'Listening hours, genres, contexts (work vs gym vs travel). High headphone usage triggers audio gear recommendations. Playlist patterns inform mood-based product surfacing.',
        signalType: 'Audio consumption & context',
        dataPoints: 'Hours/day, top genres, listening context, device',
        status: 'manual',
      },
      {
        name: 'Strava export',
        icon: 'run',
        description: 'Running routes, distances, frequency, gear wear patterns. When mileage increases, the algorithm surfaces recovery tools and shoe replacements.',
        signalType: 'Activity & fitness patterns',
        dataPoints: 'Routes, pace, distance, frequency, gear log',
        status: 'manual',
      },
      {
        name: 'Instagram saves',
        icon: 'camera',
        description: 'Saved posts, product tags in followed accounts, ad interactions. The algorithm reads visual preference patterns -- minimalist vs maximal, colour preferences, brand affinity.',
        signalType: 'Visual preference & brand exposure',
        dataPoints: 'Saved posts, ad clicks, followed brands',
        status: 'manual',
      },
      {
        name: 'Email purchase receipts',
        icon: 'mail',
        description: 'Purchase receipts parsed for product names, prices, frequency, and reorder timing. Consumables get auto-tracked for restock predictions.',
        signalType: 'Purchase history & reorder timing',
        dataPoints: 'Order confirmations, shipping notifications, returns',
        status: 'manual',
      },
    ],
  },
  {
    level: 2,
    title: 'Live integrations',
    subtitle: 'Real-time connections that keep the model current without manual effort',
    description: 'Once the manual foundation exists, you connect live feeds. These update the model continuously so recommendations stay relevant to how you live right now, not how you lived six months ago when you last did an export.',
    sources: [
      {
        name: 'Chrome extension',
        icon: 'browser',
        description: 'Passive browsing signal -- what you research, how long you dwell, what tabs stay open. No keylogging, just URL patterns and time spent. Runs locally.',
        signalType: 'Real-time browsing behaviour',
        dataPoints: 'URLs visited, dwell time, tab patterns, search queries',
        status: 'live',
      },
      {
        name: 'Claude API',
        icon: 'brain',
        description: 'Direct connection to Claude conversations via API. Every product question, comparison, and decision streams into the model in real time instead of waiting for a manual export.',
        signalType: 'Live purchase intent & research',
        dataPoints: 'Real-time research topics, comparisons, decisions',
        status: 'live',
      },
      {
        name: 'Zapier / Make',
        icon: 'zap',
        description: 'Automation layer connecting any app to the model. New Strava activity, new Spotify listening session, new email receipt -- each triggers an update without you touching anything.',
        signalType: 'Cross-platform automation',
        dataPoints: 'Event triggers from connected apps',
        status: 'live',
      },
      {
        name: 'Readwise',
        icon: 'book',
        description: 'Reading highlights and annotations synced automatically. What you underline reveals what ideas stick -- and what products or tools those ideas point toward.',
        signalType: 'Reading patterns & highlight analysis',
        dataPoints: 'Highlights, annotations, book completion rates',
        status: 'live',
      },
    ],
  },
  {
    level: 3,
    title: 'The taste graph',
    subtitle: 'Where the data becomes a model of who you are',
    description: 'This is the end state. All your data -- manual and live -- gets embedded into a vector space. Every product you own, every product you rejected, every signal from every source becomes a point in a preference map. New products are scored against this map automatically. The algorithm stops being a list of rules and starts being a model of your taste.',
    sources: [
      {
        name: 'Embedding model',
        icon: 'neural',
        description: 'All data sources get converted into vector embeddings. Products, preferences, and behaviours exist as points in a high-dimensional space. Similar items cluster together. Gaps in the map suggest products you would like but have not discovered yet.',
        signalType: 'Semantic understanding of preference',
        dataPoints: 'Vector embeddings across all data sources',
        status: 'batch',
      },
      {
        name: 'Preference vector',
        icon: 'compass',
        description: 'A single vector that represents your taste across all dimensions -- price sensitivity, brand affinity, quality threshold, aesthetic preference, functionality bias. Updated with every new data point.',
        signalType: 'Unified taste representation',
        dataPoints: 'Multi-dimensional preference profile',
        status: 'live',
      },
      {
        name: 'Auto-scoring',
        icon: 'score',
        description: 'New products are automatically scored against your preference vector. Above 70% confidence, they surface as recommendations. Below 40%, they are filtered out. The middle ground gets flagged for manual review.',
        signalType: 'Automated recommendation scoring',
        dataPoints: 'Confidence scores, threshold filtering, review queue',
        status: 'live',
      },
    ],
  },
]

// Flatten all sources for backward compatibility
export const dataSources: DataSource[] = algorithmLevels.flatMap(level => level.sources)

export const algorithmStats = {
  totalDataPoints: '2,847',
  liveSources: 6,
  itemsScanned: 147,
  avgConfidence: '87%',
  lastUpdated: '3 hours ago',
}
