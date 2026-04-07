import './globals.css'

export const metadata = {
  title: 'VOLTX — Unleash The Energy',
  description: 'Next-generation extreme energy drink. 300mg caffeine. Zero sugar. Three legendary flavors.',
  keywords: 'energy drink, voltx, extreme energy, caffeine, sugar free',
}

export const viewport = { width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="theme-color" content="#dc2626" />
      </head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}