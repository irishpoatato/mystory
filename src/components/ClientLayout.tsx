'use client';

import { MusicProvider } from '../context/MusicContext'
import { AnimatePresence } from 'framer-motion'
import PageTransition from './PageTransition'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MusicProvider>
      <AnimatePresence mode="wait">
        <PageTransition>
          {children}
        </PageTransition>
      </AnimatePresence>
    </MusicProvider>
  )
} 