'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import MusicPlayer from '@/components/MusicPlayer'

export default function Home() {
  const [hoveredPage, setHoveredPage] = useState<string | null>(null);

  return (
    <main className="min-h-screen flex flex-col overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-16 py-12 bg-white/80 backdrop-blur-lg">
        <div className="flex gap-16">
          <Link href="/about" className="nav-link text-lg">About</Link>
          <Link href="/projects" className="nav-link text-lg">Projects</Link>
          <Link href="/experience" className="nav-link text-lg">Experience</Link>
        </div>
        <div className="flex gap-16">
          <Link href="/" className="nav-link text-lg">Home</Link>
          <Link href="/contact" className="nav-link text-lg">Contact</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center transform -translate-y-20">
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-20 sm:mb-24 md:mb-28 -translate-y-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-black">MATTHEW</span> <span className="font-light">Kim.</span>
        </motion.h1>

        {/* Interactive Folder Container */}
        <motion.div 
          className="relative w-[200px] sm:w-[250px] md:w-[300px] h-[200px] sm:h-[250px] md:h-[300px] -mt-8"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Click Me Image */}
          <div className="absolute -bottom-12 -left-0 z-40">
            <Image 
              src="/click me.png" 
              alt="Click me arrow" 
              width={125} 
              height={125}
              className="w-24 sm:w-28 md:w-32 h-auto"
            />
          </div>

          {/* Folder Back */}
          <div className="absolute top-[-32px] bottom-14 left-8 right-8 folder-back rounded-3xl rounded-t-1.5g"/>

          {/* Interactive Pages Container */}
          <div className="absolute inset-0 flex items-end justify-center z-10 pb-12">
            {/* About Page - Leftmost (top layer) */}
            <Link 
              href="/about" 
              className="absolute w-[140px] sm:w-[170px] md:w-[200px] h-[140px] sm:h-[170px] md:h-[200px] transform-gpu -translate-y-20 z-[40] -translate-x-[45px] -translate-y-[65px] cursor-pointer" 
              style={{ transform: 'rotate(-4deg)' }}
              onMouseEnter={() => setHoveredPage('about')}
              onMouseLeave={() => setHoveredPage(null)}
            >
              <motion.div
                className="nested-page-square w-full h-full relative"
                animate={{
                  y: hoveredPage === 'about' ? -40 : 0,
                  rotate: -4,
                  scale: hoveredPage === 'about' ? 1.05 : 1
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="w-full h-full flex items-start justify-end pt-3 pr-4">
                  <motion.span 
                    className="text-sm font-medium z-50 uppercase tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredPage === 'about' ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    About
                  </motion.span>
                </div>
              </motion.div>
            </Link>

            {/* Projects Page - Center Left */}
            <div 
              className="absolute w-[140px] sm:w-[170px] md:w-[200px] h-[140px] sm:h-[170px] md:h-[200px] transform-gpu -translate-y-20 z-[30] -translate-x-[15px] -translate-y-[70px] cursor-pointer" 
              style={{ transform: 'rotate(-1deg)' }}
              onMouseEnter={() => setHoveredPage('projects')}
              onMouseLeave={() => setHoveredPage(null)}
            >
              <motion.div
                className="nested-page-square w-full h-full relative"
                animate={{
                  y: hoveredPage === 'projects' ? -40 : 0,
                  rotate: -1,
                  scale: hoveredPage === 'projects' ? 1.05 : 1
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Link href="/projects" className="w-full h-full flex items-start justify-end pt-3 pr-4">
                  <motion.span 
                    className="text-sm font-medium z-50 uppercase tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredPage === 'projects' ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    Projects
                  </motion.span>
                </Link>
              </motion.div>
            </div>

            {/* Experience Page - Center Right */}
            <div 
              className="absolute w-[140px] sm:w-[170px] md:w-[200px] h-[140px] sm:h-[170px] md:h-[200px] transform-gpu -translate-y-20 z-[20] translate-x-[15px] -translate-y-[75px] cursor-pointer" 
              style={{ transform: 'rotate(2deg)' }}
              onMouseEnter={() => setHoveredPage('experience')}
              onMouseLeave={() => setHoveredPage(null)}
            >
              <motion.div
                className="nested-page-square w-full h-full relative"
                animate={{
                  y: hoveredPage === 'experience' ? -40 : 0,
                  rotate: 2,
                  scale: hoveredPage === 'experience' ? 1.05 : 1
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Link href="/experience" className="w-full h-full flex items-start justify-end pt-3 pr-4">
                  <motion.span 
                    className="text-sm font-medium z-50 uppercase tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredPage === 'experience' ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    Experience
                  </motion.span>
                </Link>
              </motion.div>
            </div>

            {/* Contact Page - Rightmost (bottom layer) */}
            <div 
              className="absolute w-[140px] sm:w-[170px] md:w-[200px] h-[140px] sm:h-[170px] md:h-[200px] transform-gpu -translate-y-20 z-[10] translate-x-[45px] -translate-y-[75px] cursor-pointer" 
              style={{ transform: 'rotate(5deg)' }}
              onMouseEnter={() => setHoveredPage('contact')}
              onMouseLeave={() => setHoveredPage(null)}
            >
              <motion.div
                className="nested-page-square w-full h-full relative"
                animate={{
                  y: hoveredPage === 'contact' ? -40 : 0,
                  rotate: 5,
                  scale: hoveredPage === 'contact' ? 1.05 : 1
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Link href="/contact" className="w-full h-full flex items-start justify-end pt-3 pr-4">
                  <motion.span 
                    className="text-sm font-medium z-50 uppercase tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredPage === 'contact' ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    Contact
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Folder Cover (shorter at top) */}
          <div className="absolute inset-x-0 top-6 bottom-12 folder-cover rounded-3xl rounded-t-lg z-20 pointer-events-none">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              {/* Left angled line */}
              <line 
                x1="40%" 
                y1="0" 
                x2="60%" 
                y2="15%" 
                stroke="rgba(0, 0, 0, 0.15)" 
                strokeWidth="1"
              />
              {/* Horizontal line */}
              <line 
                x1="60%" 
                y1="15%" 
                x2="100%" 
                y2="15%" 
                stroke="rgba(0, 0, 0, 0.15)" 
                strokeWidth="1"
              />
            </svg>
            <div className="gradient-overlay-1" />
            <div className="gradient-overlay-2" />
          </div>
        </motion.div>
      </div>

      {/* Contact Info */}
      <div className="fixed bottom-8 left-8 text-sm opacity-70">
        <p>@irish_poatato_ (instagram)</p>
        <p>email@gmail.com</p>
      </div>

      {/* Music Player */}
      <MusicPlayer />
    </main>
  )
} 