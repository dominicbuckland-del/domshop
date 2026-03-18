import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { PWARegister } from './pwa-register'

const sfPro = localFont({
  src: [
    { path: './fonts/SFProDisplay-Regular.otf', weight: '400', style: 'normal' },
    { path: './fonts/SFProDisplay-Medium.otf', weight: '500', style: 'normal' },
    { path: './fonts/SFProDisplay-Bold.otf', weight: '700', style: 'normal' },
  ],
  variable: '--font-sf-pro',
  display: 'swap',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://identity.shop'),
  title: 'iDentity',
  description: 'Your data. Your algorithm. Your store. An inversion of the global advertising model.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'iDentity',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sfPro.variable} ${geistMono.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="min-h-screen bg-black text-white antialiased font-sans">
        {children}
        <PWARegister />
      </body>
    </html>
  )
}
