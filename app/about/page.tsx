import Link from 'next/link'

export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 md:py-24">
      <header className="mb-12">
        <Link href="/" className="text-[11px] font-mono text-muted hover:text-primary transition-colors">
          &larr; back
        </Link>
        <h1 className="text-2xl font-medium tracking-tight mt-6">about</h1>
      </header>

      <div className="space-y-6 text-sm text-subtle leading-relaxed">
        <p>
          Honestly, this started as me just playing around with Claude Code. I wanted to
          see what it could build. I had no brief, no plan, no audience in mind. I just
          thought: what if I turned my own data into a store?
        </p>

        <p>
          So I photographed everything I own. Clothes, tech, kitchen stuff, books, gym
          gear -- everything. I catalogued it all: what it is, how long I have had it,
          how often I use it, whether I would buy it again. Then I started feeding in
          other data. My Spotify listening history. My Strava runs. My Claude
          conversations -- every product I have ever researched, compared, or rejected.
          Browser bookmarks. Email receipts. Instagram saves.
        </p>

        <p>
          The idea was to build an algorithm that understands one person -- me -- and
          recommends things based purely on how I actually live. Not what I click on.
          Not what an ad told me I wanted. Not what everyone else is buying. Just:
          given everything you know about how this person spends their time, money,
          and attention, what would genuinely fit their life?
        </p>

        <p>
          It is the exact same process that every ad platform runs. They collect your
          data, build a model of your behaviour, and use it to sell you things. The
          only difference is who benefits. On Instagram, Meta uses your signal to
          sell ad space to brands who want your attention. Here, I am using my own
          signal to curate things for myself. Same engine, opposite direction.
        </p>

        <p>
          The manifesto version: most people&#39;s data is being used to sell them things
          by someone else. You are using your own data to curate things for yourself.
        </p>

        <p>
          In a marketing sense, this is pretty useless. The store caters to exactly
          one person. But that is the point. Hyper-personalisation taken to its logical
          extreme is a store of one. And if the tools exist to build that -- and they
          do now, Claude Code made this in a weekend -- then the question is not
          whether this is scalable. The question is: what would yours look like?
        </p>

        <p>
          The algorithm is not perfect. It recommended a standing desk mat based on
          screen time data (technically correct -- I stand too long at my desk). It
          also recommended a bread maker based on my purchase of flour three times
          in two months (I was making pizza dough). The interesting part is not when
          it gets it right. It is the editorial layer: the algorithm recommended this,
          here is why it is technically correct, and here is why I still said no.
          That gap between data and taste is the whole point.
        </p>

        <p>
          The code is open source. Not because I think everyone should build one of
          these -- most people will not -- but because the idea should be free. If
          you want to see what your own algorithm would recommend, the repo is there.
          Fork it, point it at your life, and see what comes out. The guide walks
          you through every step, including how to export your data from the
          platforms that are currently using it without your input.
        </p>

        <p>
          This is not a product. It is a proof of concept. The proof is: you can
          run the same process that sells you things and use it to understand yourself
          instead. The concept is: what if personalisation served the person?
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-border flex gap-4 text-[11px] font-mono text-muted">
        <Link href="/" className="hover:text-primary transition-colors">home</Link>
        <Link href="/guide" className="hover:text-primary transition-colors">build your own</Link>
        <a href="https://github.com/dominicbuckland-del/domshop" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">github</a>
      </div>
    </div>
  )
}
