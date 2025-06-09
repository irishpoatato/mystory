'use client';

import { motion, Variants, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Reset position when modal opens
  useEffect(() => {
    if (isOpen) {
      x.set(0);
      y.set(0);
    }
  }, [isOpen, x, y]);

  const modalVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal Window */}
      <motion.div
        className="absolute bg-white rounded-xl shadow-xl overflow-hidden w-[900px] max-w-[95vw] max-h-[85vh]"
        style={{ x, y }}
        drag
        dragMomentum={false}
        dragConstraints={{ left: -900, right: 900, top: -400, bottom: 400 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Window Title Bar */}
        <div 
          className="bg-gray-100 px-5 py-3.5 flex items-center justify-between cursor-move border-b border-gray-200 select-none"
          onPointerDown={(e) => {
            // Prevent text selection during drag
            e.preventDefault();
          }}
        >
          <div className="flex items-center gap-4">
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              onMouseEnter={() => setIsCloseHovered(true)}
              onMouseLeave={() => setIsCloseHovered(false)}
              className="relative w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors focus:outline-none group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg 
                width="8" 
                height="8" 
                viewBox="0 0 6.5 7.7" 
                fill="none" 
                className="text-red-800/60"
              >
              </svg>
            </motion.button>
            <h3 className="text-base font-medium text-gray-700 pl-2">{title}</h3>
          </div>
        </div>

        {/* Window Content */}
        <div 
          className={`${isDragging ? 'pointer-events-none' : ''} overflow-y-auto max-h-[calc(85vh-48px)] hide-scrollbar`}
          style={{ 
            cursor: isDragging ? 'grabbing' : 'default'
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
} 