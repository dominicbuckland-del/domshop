import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://iusedmyowndatatoadvertisetomyself.com'),
  title: 'i used my own data to advertise to myself',
  description: 'Every platform captures your data and sells it back to you as ads. I ran the same process in reverse. An algorithm trained on one person, recommending things for that person only. Open source.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-bg text-primary antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
