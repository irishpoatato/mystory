'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Folder from '@/components/Folder';
import MusicPlayer from '@/components/MusicPlayer';

interface Project {
  name: string;
  description: string;
  link: string;
}

const projects: Project[] = [
  {
    name: 'This Website!',
    description: 'A creative expression of who I am. ',
    link: '/projects/portfolio'
  },
  {
    name: 'rmbr.co',
    description: 'A passion project turned clothing brand.',
    link: '/projects/rmbr'
  },
  {
    name: 'Elevastore',
    description: 'An experimental e-commerce brand.',
    link: '/projects/elevastore'
  },
  {
    name: 'Notify',
    description: 'A minimalist desktop notepad.',
    link: '/projects/notify'
  },
  {
    name: 'genesis.',
    description: 'My first self-directed short film.',
    link: '/projects/genesis'
  },
  {
    name: 'CoBridge',
    description: 'An university project for AI communication',
    link: '/projects/cobridge'
  },
  {
    name: '100-Day SM Challenge',
    description: '100 days of content-creation and posting on social media.',
    link: '/projects/100-day'
  },
  {
    name: 'ANTCMedia',
    description: 'Real estate branding and marketing agency startup.',
    link: '/projects/antcmedia'
  }
];

export default function Projects() {
  return (
    <motion.main 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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

      {/* Back Button */}
      <div className="fixed top-32 left-0 z-40 px-16 py-8">
        <Link href="/" className="flex items-center gap-2 text-lg hover:opacity-70 transition-opacity w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
          </svg>
          Home
        </Link>
      </div>

      {/* Main Content */}
      <div className="min-h-screen w-full py-24 px-8 md:px-16 pt-40">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">Projects</h1>
          
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
              {projects.map((project, index) => (
                <Folder
                  key={project.name}
                  name={project.name}
                  description={project.description}
                  link={project.link}
                  index={index}
                />
              ))}
            </div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Contact Info */}
      <div className="fixed bottom-8 left-8 text-sm opacity-70">
        <p>@irish_poatato_ (instagram)</p>
        <p>email@gmail.com</p>
      </div>

      {/* Music Player */}
      <MusicPlayer />
    </motion.main>
  );
} 