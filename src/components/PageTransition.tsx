import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ 
        opacity: 0,
        y: 10,
        clipPath: 'polygon(45% 45%, 55% 45%, 55% 55%, 45% 55%)'
      }}
      animate={{ 
        opacity: 1,
        y: 0,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
      }}
      exit={{ 
        opacity: 0,
        y: -10,
        clipPath: 'polygon(45% 45%, 55% 45%, 55% 55%, 45% 55%)'
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        clipPath: {
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
} 