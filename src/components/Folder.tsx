'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Modal from './Modal';
import Image from 'next/image';

interface FolderProps {
  name: string;
  description: string;
  link: string;
  index: number;
}

export default function Folder({ name, description, link, index }: FolderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          onClick={() => setIsModalOpen(true)}
          className="block cursor-pointer"
        >
          <motion.div 
            className="relative"
            animate={{
              scale: isHovered ? 1.02 : 1,
              y: isHovered ? -5 : 0
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Folder Back Shadow */}
            <motion.div 
              className="folder-back absolute inset-0 translate-y-2 rounded-2xl"
              animate={{
                translateY: isHovered ? 4 : 2,
                opacity: isHovered ? 0.8 : 1
              }}
            />
            
            {/* Folder Front */}
            <motion.div 
              className="folder-cover relative p-3 min-h-[150px] flex flex-col justify-center"
              animate={{
                translateY: isHovered ? -2 : 0
              }}
            >
              {/* Decorative Lines */}
              <div className="angled-line-left"></div>
              <div className="angled-line-right"></div>
              
              {/* Gradient Overlays */}
              <motion.div 
                className="gradient-overlay-1"
                animate={{
                  opacity: isHovered ? 0.7 : 1
                }}
              />
              <motion.div 
                className="gradient-overlay-2"
                animate={{
                  opacity: isHovered ? 0.7 : 1
                }}
              />
              
              <div className="relative z-10 pb-1">
                <h2 className="text-base font-semibold mb-1.5 line-clamp-1">{name}</h2>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 opacity-80">{description}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={name}
      >
        <div className="divide-y divide-gray-100">
          {/* Project Header */}
          <div className="p-10 pb-12">
            <div className="aspect-video w-full bg-gray-50 rounded-xl overflow-hidden relative mb-10">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-400 text-lg">Project Preview</p>
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-6">{name}</h2>
            <p className="text-xl text-gray-600 leading-relaxed">{description}</p>
          </div>

          {/* Project Details */}
          <div className="p-10 grid grid-cols-2 gap-16">
            <div>
              <h3 className="text-xl font-semibold mb-6">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-gray-100 rounded-full text-base">React</span>
                <span className="px-4 py-2 bg-gray-100 rounded-full text-base">Next.js</span>
                <span className="px-4 py-2 bg-gray-100 rounded-full text-base">TypeScript</span>
                <span className="px-4 py-2 bg-gray-100 rounded-full text-base">Tailwind CSS</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Timeline</h3>
              <p className="text-lg text-gray-600">Started: January 2024</p>
              <p className="text-lg text-gray-600">Completed: March 2024</p>
            </div>
          </div>

          {/* Project Content */}
          <div className="p-10">
            <h3 className="text-xl font-semibold mb-6">About the Project</h3>
            <div className="prose prose-gray max-w-none">
              <p className="text-lg mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-lg mb-8">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <h4 className="text-lg font-semibold mt-8 mb-4">Key Features</h4>
              <ul className="list-disc pl-6 space-y-3 text-lg">
                <li>Feature one description goes here</li>
                <li>Feature two description goes here</li>
                <li>Feature three description goes here</li>
                <li>Feature four description goes here</li>
              </ul>
            </div>
          </div>

          {/* Project Gallery */}
          <div className="p-10">
            <h3 className="text-xl font-semibold mb-8">Gallery</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="aspect-video bg-gray-100 rounded-xl"></div>
              <div className="aspect-video bg-gray-100 rounded-xl"></div>
              <div className="aspect-video bg-gray-100 rounded-xl"></div>
              <div className="aspect-video bg-gray-100 rounded-xl"></div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
} 