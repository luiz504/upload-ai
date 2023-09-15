// import 'tailwindcss/tailwind.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '~/styles/global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'upload.ai',
  description: 'Generative text AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
