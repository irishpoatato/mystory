'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import ExperienceCard from '@/components/ExperienceCard';
import MusicPlayer from '@/components/MusicPlayer';
import Image from 'next/image';

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  logo: string;
  subItems?: Experience[];
}

const experiences: Experience[] = [
  {
    id: 'amazon',
    title: 'Account Manager Intern',
    company: 'Amazon',
    period: 'Jan 2024 - Jan 2025',
    description: 'Thanks for stopping by. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    logo: './amazon_logo.png'
  },
  {
    id: 'sap',
    title: 'Software Engineer',
    company: 'SAP',
    period: 'Jun 2023 - Dec 2023',
    description: 'Led development of enterprise software solutions, focusing on cloud integration and microservices architecture. Implemented automated testing frameworks and CI/CD pipelines.',
    logo: '/SAP logo.png',
    subItems: [
      {
        id: 'sap-cloud',
        title: 'Cloud Integration Specialist',
        company: 'SAP',
        period: 'Sep 2023 - Dec 2023',
        description: 'Specialized in developing cloud-native solutions using SAP Cloud Platform. Implemented microservices architecture and containerized applications using Docker and Kubernetes. Developed RESTful APIs and integrated with various cloud services.',
        logo: 'SAP logo.png'
      },
      {
        id: 'sap-testing',
        title: 'Test Automation Lead',
        company: 'SAP',
        period: 'Jun 2023 - Sep 2023',
        description: 'Led the implementation of automated testing frameworks. Developed comprehensive test suites using Jest and Cypress. Established CI/CD pipelines with Jenkins and GitHub Actions for continuous testing and deployment.',
        logo: 'SAP logo.png'
      }
    ]
  },
  {
    id: 'apple',
    title: 'UX Design Intern',
    company: 'Apple',
    period: 'Jan 2023 - May 2023',
    description: 'Collaborated with design team on user interface improvements for iOS applications. Conducted user research and created interactive prototypes.',
    logo: '/apple logo.png'
  },
  {
    id: 'redDot',
    title: 'Frontend Developer',
    company: 'Red Dot Payments',
    period: 'May 2022 - Dec 2022',
    description: 'Developed responsive web applications using React and TypeScript. Implemented payment integration systems and optimized performance.',
    logo: '/rdp logo.png'
  }
];

export default function Experience() {
  const [activeExperience, setActiveExperience] = useState(experiences[0].id);
  const navRef = useRef<HTMLDivElement>(null);
  const experienceRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [isManuallySelected, setIsManuallySelected] = useState(false);
  const lastManualSelection = useRef<string | null>(null);
  const manualSelectionTimeout = useRef<NodeJS.Timeout | null>(null);
  const scrollEndTimeout = useRef<NodeJS.Timeout | null>(null);
  const HEADER_HEIGHT = 96; // Height of the fixed header
  const MANUAL_SELECTION_LOCK_DURATION = 1000; // Duration to lock intersection observer after manual selection

  // Initialize refs and handle cleanup
  useEffect(() => {
    // Short delay to prevent initial animation issues
    const initTimeout = setTimeout(() => {
      setIsInitialMount(false);
    }, 100);

    return () => {
      experienceRefs.current.clear();
      if (manualSelectionTimeout.current) {
        clearTimeout(manualSelectionTimeout.current);
      }
      if (scrollEndTimeout.current) {
        clearTimeout(scrollEndTimeout.current);
      }
      clearTimeout(initTimeout);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -45% 0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5]
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Don't process intersection during manual selection lock
      if (isUserScrolling || !entries.length || isManuallySelected) return;

      // Sort entries by intersection ratio and vertical position
      const sortedEntries = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => {
          // First prioritize intersection ratio
          const ratioDiff = b.intersectionRatio - a.intersectionRatio;
          if (Math.abs(ratioDiff) > 0.1) return ratioDiff;
          
          // If ratios are similar, prioritize the element closer to the center
          const viewportCenter = window.innerHeight / 2;
          const aDistance = Math.abs(a.boundingClientRect.top - viewportCenter);
          const bDistance = Math.abs(b.boundingClientRect.top - viewportCenter);
          return aDistance - bDistance;
        });

      if (sortedEntries.length === 0) return;

      const entry = sortedEntries[0];
      const element = entry.target as HTMLElement;
      const id = element.dataset.experienceId;
      
      if (!id) return;

      // Find the experience item and check if it's a parent or child
      const parentExp = experiences.find(exp => exp.id === id || exp.subItems?.some(sub => sub.id === id));
      const isChild = parentExp && parentExp.id !== id;

      // If we have a manual selection active
      if (lastManualSelection.current) {
        const selectedExp = experiences.find(exp => exp.id === lastManualSelection.current);
        
        // Don't update if:
        // 1. We're still on the manually selected item
        // 2. We're on a child of the manually selected parent
        // 3. We're on the parent of the manually selected child
        if (
          id === lastManualSelection.current ||
          selectedExp?.subItems?.some(sub => sub.id === id) ||
          (isChild && parentExp?.id === lastManualSelection.current)
        ) {
          return;
        }
      }

      // Debounce the state update
      const timeoutId = setTimeout(() => {
        if (!isManuallySelected) { // Double-check we're not in manual selection mode
          setActiveExperience(id);
        }
      }, 50);

      return () => clearTimeout(timeoutId);
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observe all experience items and their sub-items after a short delay
    const observerTimeout = setTimeout(() => {
      experiences.forEach(exp => {
        const element = experienceRefs.current.get(exp.id);
        if (element) {
          element.dataset.experienceId = exp.id;
          observer.observe(element);
        }

        exp.subItems?.forEach(subItem => {
          const subElement = experienceRefs.current.get(subItem.id);
          if (subElement) {
            subElement.dataset.experienceId = subItem.id;
            observer.observe(subElement);
          }
        });
      });
    }, 100);

    // Add scroll event listener with improved scroll end detection
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      if (!isUserScrolling) {
        setIsUserScrolling(true);
      }
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsUserScrolling(false);
        
        // Only reset manual selection if we're not in the lock period
        if (!isManuallySelected) {
          if (scrollEndTimeout.current) {
            clearTimeout(scrollEndTimeout.current);
          }
          scrollEndTimeout.current = setTimeout(() => {
            lastManualSelection.current = null;
          }, 500);
        }
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      clearTimeout(observerTimeout);
      if (scrollEndTimeout.current) {
        clearTimeout(scrollEndTimeout.current);
      }
    };
  }, [isUserScrolling, activeExperience, isManuallySelected]);

  const handleExperienceClick = (id: string) => {
    if (!isInitialMount) {
      // Clear any existing timeouts
      if (manualSelectionTimeout.current) {
        clearTimeout(manualSelectionTimeout.current);
      }
      if (scrollEndTimeout.current) {
        clearTimeout(scrollEndTimeout.current);
      }

      // Set manual selection mode
      setIsManuallySelected(true);
      setIsUserScrolling(true);
      setActiveExperience(id);
      lastManualSelection.current = id;
      
      // Scroll to the selected experience
      requestAnimationFrame(() => {
        scrollToExperience(id);
        
        // Reset user scrolling after animation
        setTimeout(() => {
          setIsUserScrolling(false);
        }, 1000);

        // Reset manual selection mode after lock duration
        manualSelectionTimeout.current = setTimeout(() => {
          setIsManuallySelected(false);
          if (lastManualSelection.current === id) {
            lastManualSelection.current = null;
          }
        }, MANUAL_SELECTION_LOCK_DURATION);
      });
    }
  };

  const scrollToExperience = (id: string) => {
    const element = experienceRefs.current.get(id);
    if (!element) return;

    // Find if this is a parent item with sub-items
    const exp = experiences.find(e => e.id === id);
    const isParentItem = exp?.subItems !== undefined;
    const isFirstItem = id === experiences[0].id;
    
    // Calculate the offset considering the fixed header
    const offset = Math.floor(window.innerHeight * (isFirstItem ? 0.3 : 0.35)) + HEADER_HEIGHT;
    
    if (isParentItem && exp?.subItems) {
      // Get the last sub-item's element
      const lastSubItemElement = experienceRefs.current.get(exp.subItems[exp.subItems.length - 1].id);
      
      if (lastSubItemElement) {
        // Calculate the center point between the parent and the last sub-item
        const parentTop = element.getBoundingClientRect().top + window.scrollY;
        const lastSubItemBottom = lastSubItemElement.getBoundingClientRect().bottom + window.scrollY;
        const sectionCenter = parentTop + (lastSubItemBottom - parentTop) / 2;
        
        // Center the entire section in the viewport
        const viewportCenter = window.innerHeight * (isFirstItem ? 0.45 : 0.5);
        const targetScroll = sectionCenter - viewportCenter - HEADER_HEIGHT;

        window.scrollTo({
          top: Math.max(0, targetScroll),
          behavior: 'smooth'
        });
        return;
      }
    }
    
    // Default scrolling behavior for non-parent items
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth'
    });
  };

  // Calculate scale and opacity based on distance from active item
  const getItemStyles = (index: number) => {
    const activeIndex = experiences.findIndex(exp => exp.id === activeExperience);
    const distance = Math.abs(index - activeIndex);
    
    // Subtle vertical offset for nav items
    const translateY = distance * 4;

    return {
      translateY: index < activeIndex ? -translateY : translateY
    };
  };

  return (
    <motion.main 
      className="min-h-screen relative overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Top-right decorative circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-gradient-to-br from-blue-200/40 to-purple-200/40 blur-3xl"
        />
        
        {/* Bottom-left decorative shape */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute -left-32 bottom-0 w-[40rem] h-[40rem] rounded-full bg-gradient-to-tr from-green-200/30 to-blue-200/30 blur-3xl"
        />

        {/* Decorative patterns */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 opacity-[0.15]" // Reduced overall opacity
        >
          {/* Right decorative pattern */}
          <motion.div 
            className="absolute -right-32 top-1/4 w-96 h-96"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full text-black">
              <Image
                src="/sap-pattern.svg"
                alt="Decorative pattern"
                width={384}
                height={384}
                className="w-full h-full"
              />
            </div>
          </motion.div>
          
          {/* Left decorative pattern */}
          <motion.div 
            className="absolute -left-35 bottom-40 w-80 h-70"
            initial={{ rotate: 360 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full text-black">
              <Image
                src="/tech-pattern.svg"
                alt="Tech pattern"
                width={320}
                height={320}
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)]"
          style={{ backgroundSize: '32px 32px' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative overflow-y-auto">
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
        <div className="min-h-screen w-full py-24 px-8 md:px-16 pt-40 overflow-y-auto">
          <div className="max-w-7xl mx-auto flex gap-8">
            {/* Experience Cards */}
            <div className="flex-1">
              <motion.div 
                className="fixed top-32 left-0 right-0 z-30"
              >
                {/* Main white background */}
                <div className="relative bg-white">
                  {/* Content */}
                  <div className="px-8 md:px-16 py-8">
                    <div className="max-w-7xl mx-auto space-y-4">
                      <motion.h1 
                        className="text-4xl font-bold"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        Experience
                      </motion.h1>

                    </div>
                  </div>
                  
                  {/* Extended white background with gradient */}
                  <div className="absolute top-full left-0 right-0">
                    <div className="h-2 bg-white" />
                    <div className="h-16 bg-gradient-to-b from-white via-white/50 to-transparent" />
                  </div>
                </div>
              </motion.div>
              
              <div className="space-y-48 mt-28 pb-[40vh] overflow-y-auto">
                {experiences.map((exp, index) => (
                  <div key={exp.id}>
                    <motion.div
                      ref={el => {
                        if (el) {
                          experienceRefs.current.set(exp.id, el);
                        }
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: activeExperience === exp.id || (exp.subItems?.some(sub => sub.id === activeExperience)) ? 1 : 0.3,
                        y: 0 
                      }}
                      transition={{ duration: 0.5 }}
                      className={`scroll-mt-48 ${index === 0 ? 'mt-[15vh]' : ''}`}
                    >
                      <ExperienceCard
                        {...exp}
                        isActive={activeExperience === exp.id}
                      />
                    </motion.div>

                    {/* Sub-items */}
                    {exp.subItems && (
                      <div className="mt-24 space-y-16 pl-24">
                        {exp.subItems.map((subItem) => (
                          <motion.div
                            key={subItem.id}
                            ref={el => {
                              if (el) {
                                experienceRefs.current.set(subItem.id, el);
                              }
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ 
                              opacity: activeExperience === subItem.id || activeExperience === exp.id ? 1 : 0.3,
                              y: 0 
                            }}
                            transition={{ duration: 0.5 }}
                            className="scroll-mt-48"
                          >
                            <ExperienceCard
                              {...subItem}
                              isActive={activeExperience === subItem.id || activeExperience === exp.id}
                              isSubItem={true}
                            />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical Navigation */}
            <div className="w-64 flex-shrink-0">
              <div 
                ref={navRef}
                className="fixed top-1/2 -translate-y-1/2 flex flex-col items-end z-20"
              >
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <div key={exp.id} className="relative group">
                      {/* Background highlight */}
                      <motion.div
                        className="absolute -right-4 top-0 w-1 h-full bg-black rounded-full"
                        initial={{ opacity: 0, height: '0%' }}
                        animate={{ 
                          opacity: activeExperience === exp.id || (exp.subItems?.some(sub => sub.id === activeExperience)) ? 1 : 0,
                          height: '100%'
                        }}
                        transition={{ duration: 0.4 }}
                      />
                      
                      {/* Button */}
                      <motion.button
                        onClick={() => handleExperienceClick(exp.id)}
                        className={`relative block text-right w-full text-base transition-all px-6 py-2 -mr-4
                          ${activeExperience === exp.id || (exp.subItems?.some(sub => sub.id === activeExperience))
                            ? 'font-semibold text-black bg-black/5 rounded-l-xl' 
                            : 'text-black/50 hover:text-black/80 hover:bg-black/5 hover:rounded-l-xl'}`}
                        animate={{
                          y: getItemStyles(index).translateY
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center justify-end gap-3">
                          <motion.div 
                            className="h-[1px] bg-black"
                            initial={{ width: 0 }}
                            animate={{ 
                              width: activeExperience === exp.id || (exp.subItems?.some(sub => sub.id === activeExperience)) ? 24 : 0,
                              opacity: activeExperience === exp.id || (exp.subItems?.some(sub => sub.id === activeExperience)) ? 1 : 0
                            }}
                            transition={{ duration: 0.3 }}
                          />
                          <span>{exp.company}</span>
                        </div>
                      </motion.button>

                      {/* Sub-items */}
                      {exp.subItems && (
                        <motion.div 
                          className="mt-2 space-y-1 pr-6"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ 
                            opacity: activeExperience === exp.id || (exp.subItems?.some(sub => sub.id === activeExperience)) ? 1 : 0,
                            height: activeExperience === exp.id || (exp.subItems?.some(sub => sub.id === activeExperience)) ? 'auto' : 0
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {exp.subItems.map((subItem) => (
                            <motion.button
                              key={subItem.id}
                              onClick={() => handleExperienceClick(subItem.id)}
                              className={`relative block text-right w-full text-sm transition-all px-4 py-1.5
                                ${activeExperience === subItem.id 
                                  ? 'font-medium text-black bg-black/5 rounded-l-lg' 
                                  : 'text-black/40 hover:text-black/60 hover:bg-black/5 hover:rounded-l-lg'}`}
                              whileHover={{ x: -4 }}
                              transition={{ duration: 0.2 }}
                            >
                              {subItem.title}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
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
