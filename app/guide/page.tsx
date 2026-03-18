import Link from 'next/link'

export default function Guide() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 md:py-24">
      <header className="mb-12">
        <Link href="/" className="text-[11px] font-mono text-muted hover:text-primary transition-colors">
          &larr; back
        </Link>
        <h1 className="text-2xl font-medium tracking-tight mt-6">how to build your own</h1>
        <p className="text-sm text-muted mt-3 leading-relaxed max-w-lg">
          A step-by-step guide for building your own hyper-personal store. You do not
          need to be a developer. You need a computer, some patience, and a willingness
          to look at your own data honestly.
        </p>
      </header>

      {/* Section 1: What this is */}
      <section className="mb-12">
        <h2 className="text-sm font-medium mb-3">What this is</h2>
        <div className="space-y-3 text-sm text-subtle leading-relaxed">
          <p>
            This is a personal recommendation engine. You feed it data about your life --
            what you buy, listen to, read, watch, run, research -- and it builds a model
            of your taste. Then it recommends products that match that model.
          </p>
          <p>
            Every ad platform does this already, but for advertisers. This does it for you.
            Same technology, opposite beneficiary. The result is a store that contains only
            things an algorithm thinks you would like, based on evidence from your actual
            behaviour -- not what a brand paid to put in front of you.
          </p>
          <p>
            It runs as a website. You can share it, keep it private, or just use it as a
            personal reference for what you own and what you might want next.
          </p>
        </div>
      </section>

      {/* Section 2: What you'll need */}
      <section className="mb-12">
        <h2 className="text-sm font-medium mb-3">What you will need</h2>
        <div className="space-y-2">
          <div className="flex gap-3 py-2 border-b border-border">
            <span className="text-[10px] font-mono text-muted w-24 flex-shrink-0">required</span>
            <div>
              <p className="text-xs font-medium">A computer</p>
              <p className="text-[11px] text-muted mt-0.5">Mac, Windows, or Linux. You will be running terminal commands.</p>
            </div>
          </div>
          <div className="flex gap-3 py-2 border-b border-border">
            <span className="text-[10px] font-mono text-muted w-24 flex-shrink-0">required</span>
            <div>
              <p className="text-xs font-medium">Node.js</p>
              <p className="text-[11px] text-muted mt-0.5">Version 18 or later. Download from <code className="bg-bg px-1 py-0.5 rounded border border-border font-mono">nodejs.org</code>.</p>
            </div>
          </div>
          <div className="flex gap-3 py-2 border-b border-border">
            <span className="text-[10px] font-mono text-muted w-24 flex-shrink-0">required</span>
            <div>
              <p className="text-xs font-medium">A GitHub account</p>
              <p className="text-[11px] text-muted mt-0.5">Free. You will fork the repo here.</p>
            </div>
          </div>
          <div className="flex gap-3 py-2 border-b border-border">
            <span className="text-[10px] font-mono text-muted w-24 flex-shrink-0">required</span>
            <div>
              <p className="text-xs font-medium">A Vercel account</p>
              <p className="text-[11px] text-muted mt-0.5">Free. This is where your site gets hosted.</p>
            </div>
          </div>
          <div className="flex gap-3 py-2 border-b border-border">
            <span className="text-[10px] font-mono text-muted w-24 flex-shrink-0">recommended</span>
            <div>
              <p className="text-xs font-medium">Claude Code</p>
              <p className="text-[11px] text-muted mt-0.5">If you want to build conversationally instead of editing files manually. Not required but makes everything easier.</p>
            </div>
          </div>
          <div className="flex gap-3 py-2 border-b border-border">
            <span className="text-[10px] font-mono text-muted w-24 flex-shrink-0">helpful</span>
            <div>
              <p className="text-xs font-medium">2-3 hours</p>
              <p className="text-[11px] text-muted mt-0.5">For the initial setup and data import. Ongoing maintenance is minimal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: How to set it up */}
      <section className="mb-12">
        <h2 className="text-sm font-medium mb-3">How to set it up</h2>
        <div className="space-y-4">
          <Step num="01" title="Fork the repository">
            <p>Go to the GitHub repo and click Fork. This creates your own copy.</p>
            <Code>https://github.com/dominicbuckland-del/domshop</Code>
          </Step>

          <Step num="02" title="Clone it to your computer">
            <p>Open your terminal and run:</p>
            <Code>git clone https://github.com/YOUR-USERNAME/domshop.git{'\n'}cd domshop{'\n'}npm install</Code>
          </Step>

          <Step num="03" title="Start the dev server">
            <Code>npm run dev</Code>
            <p>Open <code className="bg-bg px-1 py-0.5 rounded border border-border font-mono text-[11px]">http://localhost:3000</code> in your browser. You should see the store running with the default products.</p>
          </Step>

          <Step num="04" title="Replace the products with yours">
            <p>Open <code className="bg-bg px-1 py-0.5 rounded border border-border font-mono text-[11px]">data/products.ts</code>. Each product has these fields:</p>
            <Code>{`{
  name: 'Your product name',
  oneLiner: 'One sentence about why',
  whyILikeIt: 'The longer story',
  price: 2999, // in cents
  link: 'https://where-to-buy.com',
  category: 'tech', // or coffee, edc, etc
  image: 'https://your-image-url.jpg',
  type: 'affiliate', // or 'dropship'
  recommendedBecause: 'Why the algorithm surfaced this',
}`}</Code>
            <p>Photograph your stuff, upload images anywhere (Unsplash, Imgur, your own hosting), and paste the URLs.</p>
          </Step>

          <Step num="05" title="Update the algorithm data">
            <p>Open <code className="bg-bg px-1 py-0.5 rounded border border-border font-mono text-[11px]">data/algorithm.ts</code>. Replace the data sources with your own. Start with Level 1 manual imports -- you do not need live integrations to launch.</p>
          </Step>

          <Step num="06" title="Personalise the copy">
            <p>Update the header text, about page, and any copy that refers to &#34;Dom&#34; or specific products. Make it yours.</p>
          </Step>
        </div>
      </section>

      {/* Section 4: How to connect your data sources */}
      <section className="mb-12">
        <h2 className="text-sm font-medium mb-3">How to connect your data sources</h2>
        <p className="text-xs text-subtle leading-relaxed mb-6">
          This is the most important part. The quality of your recommendations depends
          entirely on the quality and honesty of your data. Here is how to export your
          data from each platform.
        </p>

        <div className="space-y-8">
          <DataSourceGuide
            name="Instagram data export"
            steps={[
              'Open Instagram > Settings > Accounts Centre > Your information and permissions',
              'Select "Download your information"',
              'Choose "Some of your information" and select: Saved posts, Following, Liked posts',
              'Choose JSON format (not HTML)',
              'Request the download -- Instagram will email you when it is ready (usually 24-48 hours)',
              'Download the ZIP, extract it, and look for saved_posts.json and liked_posts.json',
              'These files contain every post you saved or liked -- the algorithm uses this to understand your visual and brand preferences',
            ]}
          />

          <DataSourceGuide
            name="Spotify listening history"
            steps={[
              'Go to spotify.com/account > Privacy settings > Download your data',
              'Request "Extended streaming history" (not the basic one -- you want the full history)',
              'Spotify will email you when ready (can take up to 30 days, usually faster)',
              'The download contains JSON files with every song you have ever played, including timestamps and duration',
              'The algorithm uses this to understand: how much you listen (headphone recommendations), what genres (mood patterns), and listening context (work vs gym)',
            ]}
          />

          <DataSourceGuide
            name="Claude conversation export"
            steps={[
              'Go to claude.ai > Settings > Export Data',
              'Download the JSON export of all your conversations',
              'The export contains every conversation including product research, comparisons, and decisions',
              'This is one of the richest data sources because Claude conversations capture your reasoning process -- not just what you clicked, but why you chose or rejected something',
              'Parse the JSON for conversations containing product names, price comparisons, and purchase decisions',
            ]}
          />

          <DataSourceGuide
            name="Browser history and bookmarks"
            steps={[
              'Chrome: Go to chrome://bookmarks > Three dots > Export bookmarks (saves as HTML)',
              'For history: chrome://history then use a Chrome extension like "Export Chrome History" to get a CSV',
              'Safari: File > Export Bookmarks',
              'Firefox: Bookmarks > Manage Bookmarks > Import and Backup > Export Bookmarks to HTML',
              'The algorithm looks for: product pages visited multiple times, wishlists, comparison shopping patterns, and items bookmarked but never purchased',
            ]}
          />

          <DataSourceGuide
            name="Strava activity data"
            steps={[
              'Go to strava.com > Settings > My Account > Download or Delete Your Account',
              'Click "Request Your Archive" under Download',
              'Strava emails you a ZIP file (usually within a few hours)',
              'The archive contains activities.csv with every workout: type, distance, duration, gear used',
              'The algorithm uses this to understand: fitness patterns, gear wear cycles, training volume changes (which trigger recovery product recommendations)',
            ]}
          />

          <DataSourceGuide
            name="Email purchase receipts"
            steps={[
              'In Gmail: search for "order confirmation" or "receipt" or "your order"',
              'Use Google Takeout (takeout.google.com) to export all Gmail data as MBOX format',
              'Alternatively, use a service like Slice or Unroll.me to parse receipts automatically',
              'The key data points: what you bought, when, how much, from where, and whether you reordered',
              'The algorithm uses purchase frequency and reorder patterns to predict when you will need replacements and what consumables to restock',
            ]}
          />
        </div>
      </section>

      {/* Section 5: How to format it */}
      <section className="mb-12">
        <h2 className="text-sm font-medium mb-3">How to format it all for the model</h2>
        <div className="space-y-3 text-sm text-subtle leading-relaxed">
          <p>
            Once you have your raw data exports, you need to convert them into the format
            the algorithm expects. The simplest approach:
          </p>
          <ol className="space-y-2 text-xs text-subtle list-decimal list-inside">
            <li>Create a folder called <code className="bg-bg px-1 py-0.5 rounded border border-border font-mono">data/imports/</code></li>
            <li>Drop all your raw export files in there</li>
            <li>Use Claude to parse them: paste the raw data and ask it to extract products, preferences, and patterns</li>
            <li>Claude will output structured data you can paste directly into <code className="bg-bg px-1 py-0.5 rounded border border-border font-mono">data/products.ts</code></li>
            <li>For the algorithm scoring, describe your data sources in <code className="bg-bg px-1 py-0.5 rounded border border-border font-mono">data/algorithm.ts</code> and let the model weight them</li>
          </ol>
          <p>
            The format does not need to be perfect to start. Begin with manual curation
            (Level 1) and add live integrations (Level 2) later. The taste graph (Level 3)
            is the end state -- you do not need it to launch.
          </p>
        </div>
      </section>

      {/* Section 6: Deploy */}
      <section className="mb-12">
        <h2 className="text-sm font-medium mb-3">One-click deploy</h2>
        <div className="space-y-3 text-sm text-subtle leading-relaxed">
          <p>
            Once your data is in place and the site looks right locally, deploy it:
          </p>
          <Code>npm install -g vercel{'\n'}vercel deploy --prod</Code>
          <p>
            That is it. Vercel gives you free hosting, free SSL, and a URL you can share.
            If you have a custom domain, connect it in the Vercel dashboard.
          </p>
          <p>
            Alternatively, if you are using Claude Code, just say &#34;deploy this to Vercel&#34;
            and it will handle the entire process.
          </p>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-border flex gap-4 text-[11px] font-mono text-muted">
        <Link href="/" className="hover:text-primary transition-colors">home</Link>
        <Link href="/about" className="hover:text-primary transition-colors">about</Link>
        <a href="https://github.com/dominicbuckland-del/domshop" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">github</a>
      </div>
    </div>
  )
}

function Step({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="text-[10px] font-mono text-muted w-8 flex-shrink-0 pt-1">{num}</span>
      <div className="flex-1">
        <p className="text-xs font-medium mb-2">{title}</p>
        <div className="space-y-2 text-[11px] text-muted leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-bg px-3 py-2 rounded border border-border font-mono text-[11px] text-subtle overflow-x-auto my-2">
      {children}
    </pre>
  )
}

function DataSourceGuide({ name, steps }: { name: string; steps: string[] }) {
  return (
    <div className="border border-border rounded-lg p-4 bg-surface">
      <h3 className="text-xs font-medium mb-3">{name}</h3>
      <ol className="space-y-2">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-2 text-[11px] text-subtle leading-relaxed">
            <span className="text-[10px] font-mono text-muted w-5 flex-shrink-0 pt-0.5">{i + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
