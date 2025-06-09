'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  logo: string;
  isActive: boolean;
  isSubItem?: boolean;
}

export default function ExperienceCard({
  title,
  company,
  period,
  description,
  logo,
  isActive,
  isSubItem = false
}: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ 
        opacity: isActive ? 1 : 0.3,
        x: isActive ? 0 : -20,
        scale: isActive ? 1 : 0.98
      }}
      transition={{ duration: 0.4 }}
      className={`${isActive ? 'hover:opacity-90' : 'hover:opacity-50'} 
        transition-all cursor-pointer max-w-3xl`}
    >
      <div className="flex items-start gap-8">
        {/* Logo - only show for main items */}
        {!isSubItem && (
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image
              src={`/${logo}`}
              alt={`${company} logo`}
              width={80}
              height={80}
              className={`object-contain ${company === 'Apple' ? 'scale-75' : ''}`}
            />
          </div>
        )}

        {/* Content */}
        <div className={`flex-1 space-y-6 ${isSubItem ? 'border-l border-black/10 pl-8' : ''}`}>
          <div className="space-y-2">
            <h2 className={`${isSubItem ? 'text-2xl' : 'text-3xl'} font-bold`}>{title}</h2>
            {!isSubItem && (
              <p className="text-xl text-black/70">{company}</p>
            )}
            <p className={`${isSubItem ? 'text-sm text-black/40' : 'text-base text-black/50'}`}>{period}</p>
          </div>
          
          <p className={`${isSubItem ? 'text-base text-black/70' : 'text-lg text-black/80'} leading-relaxed`}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
} 