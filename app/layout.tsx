import './globals.css'
import Header from '@/components/Header/Header'
import React from 'react'
import Footer from '@/components/Footer/Footer'
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider'
import { Metadata } from 'next'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '500', '800'],
  variable: '--font-roboto',
  display: 'swap',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Create, edit, and manage notes easily with NoteHub',
  openGraph: {
    title: 'NoteHub',
    description: 'Create, edit, and manage notes easily with NoteHub',
    url: 'https://08-zustand-iota-two.vercel.app/notes',
    images: [
      { url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' },
    ],
  },
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal?: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  )
}
