import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'

import NextTopLoader from 'nextjs-toploader';

import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import ContextProvider from '@/components/context';
import classNames from 'classnames';

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata: Metadata = {
  title: 'Kahramanmaraş Sigorta',
  description: 'Kahramanmaraş Sigorta açıklama',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={classNames(`bg-white`, poppins.className)}>
        <ContextProvider>
          <NextTopLoader />
          <Header />
          {children}
          <Footer />
        </ContextProvider>
      </body>
    </html>
  )
}
