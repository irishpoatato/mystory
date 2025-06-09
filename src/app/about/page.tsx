'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import MusicPlayer from '@/components/MusicPlayer';

const Section = ({ 
  children, 
  className = "",
  style = {},
}: { 
  children: React.ReactNode; 
  className?: string;
  style?: React.CSSProperties;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px 0px -50px 0px", amount: 0.2 });
  
  return (
    <motion.section
      ref={ref}
      className={`min-h-screen w-full flex items-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={style}
    >
      <div className="max-w-6xl mx-auto px-8 w-full">
        {children}
      </div>
    </motion.section>
  );
};

const HobbyTitle = ({ title, isActive, onClick }: { title: string; isActive: boolean; onClick: () => void }) => (
  <motion.div
    className="text-5xl font-black cursor-pointer"
    onClick={onClick}
    initial={{ opacity: 1 }}
    animate={{ opacity: isActive ? 0.2 : 1 }}
    whileHover={{ opacity: 0.4 }}
    transition={{ duration: 0.2 }}
    layout
  >
    {title}
  </motion.div>
);

const HobbyContent = ({ isVisible, children }: { isVisible: boolean; children: React.ReactNode }) => (
  <AnimatePresence mode="wait">
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, height: 0, y: -20 }}
        animate={{ opacity: 1, height: '400px', y: 0 }}
        exit={{ opacity: 0, height: 0, y: -20 }}
        transition={{ 
          duration: 0.3,
          height: {
            duration: 0.4,
          },
          opacity: {
            duration: 0.25,
          }
        }}
        style={{ originY: 0 }}
        className="overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="py-6 text-lg">
            {children}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default function About() {
  const [activeHobby, setActiveHobby] = useState<string | null>(null);
  const containerRef = useRef(null);
  const introRef = useRef(null);
  const hobbiesRef = useRef(null);
  const educationRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Intro section parallax
  const introY = useTransform(scrollYProgress, [0, 0.3], [0, -30]);
  const introRotate = useTransform(scrollYProgress, [0, 0.3], [0, 2]);
  const introScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.98]);

  // Hobbies section parallax
  const hobbiesY = useTransform(scrollYProgress, [0.3, 0.6], [0, -30]);
  const hobbiesRotate = useTransform(scrollYProgress, [0.3, 0.6], [0, 2]);
  const hobbiesScale = useTransform(scrollYProgress, [0.3, 0.6], [1, 0.98]);

  // Education section parallax
  const educationY = useTransform(scrollYProgress, [0.6, 1], [0, -40]);
  const educationRotate = useTransform(scrollYProgress, [0.6, 1], [-1, 0]);
  const educationScale = useTransform(scrollYProgress, [0.6, 1], [1, 0.98]);

  const toggleHobby = (hobby: string) => {
    setActiveHobby(activeHobby === hobby ? null : hobby);
  };

  return (
    <motion.main 
      className="min-h-screen overflow-y-auto" 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-16 py-12">
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

      {/* Intro Section */}
      <motion.div 
        ref={introRef}
        style={{ 
          y: introY,
          rotateZ: introRotate,
          scale: introScale,
          transformPerspective: 1000,
        }}
      >
        <Section className="h-screen pt-0">
          <div className="flex items-start gap-12 h-full pt-24">
            <motion.div 
              className="flex-1 space-y-8"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-12">
                ABOUT ME
              </h1>
              <div className="space-y-8 text-lg leading-relaxed">
                <p>
                  Hey there! I'm Matthew Kim, a passionate developer with a love for creating beautiful and functional web experiences. My journey in web development started with a simple curiosity about how websites work, and it has evolved into a full-fledged career where I get to build amazing things every day.
                </p>
                <p>
                  I specialize in front-end development, with a particular focus on creating intuitive user interfaces and smooth animations. My tech stack includes React, Next.js, TypeScript, and Tailwind CSS, but I'm always excited to learn and experiment with new technologies.
                </p>
              </div>
            </motion.div>
            <motion.div 
              className="w-[400px] h-[400px] relative flex-shrink-0"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Image
                src="profile2.png"
                alt="Profile"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </motion.div>
          </div>
        </Section>
      </motion.div>

      {/* Hobbies Section */}
      <motion.div
        ref={hobbiesRef}
        style={{ 
          y: hobbiesY,
          rotateZ: hobbiesRotate,
          scale: hobbiesScale,
          transformPerspective: 1000,
        }}
      >
        <Section>
          <div className="space-y-8">
            <h2 className="text-2xl mb-12">HOBBIES:</h2>
            <div className="space-y-6">
              <HobbyTitle 
                title="UI&UX DESIGN" 
                isActive={activeHobby === 'uiux'} 
                onClick={() => toggleHobby('uiux')}
              />
              <HobbyContent isVisible={activeHobby === 'uiux'}>
                Passionate about creating intuitive and beautiful user interfaces. 
                Experienced in user research, wireframing, and prototyping.
              </HobbyContent>

              <HobbyTitle 
                title="3D MODELLING & ANIMATION" 
                isActive={activeHobby === '3d'} 
                onClick={() => toggleHobby('3d')}
              />
              <HobbyContent isVisible={activeHobby === '3d'}>
                Creating 3D models and animations using industry-standard tools.
                Focused on architectural visualization and character animation.
              </HobbyContent>

              <HobbyTitle 
                title="INTERIOR DESIGN" 
                isActive={activeHobby === 'interior'} 
                onClick={() => toggleHobby('interior')}
              />
              <HobbyContent isVisible={activeHobby === 'interior'}>
                Exploring the intersection of functionality and aesthetics in living spaces.
                Experience with both residential and commercial interior design concepts.
              </HobbyContent>

              <HobbyTitle 
                title="PHOTOGRAPHY & FILM" 
                isActive={activeHobby === 'photo'} 
                onClick={() => toggleHobby('photo')}
              />
              <HobbyContent isVisible={activeHobby === 'photo'}>
                Capturing moments through both still photography and cinematography.
                Skilled in both digital and analog photography techniques.
              </HobbyContent>

              <motion.p 
                className="text-lg mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                I also like playing the drums and cooking :)
              </motion.p>
            </div>
          </div>
        </Section>
      </motion.div>

      {/* Education Section */}
      <motion.div
        ref={educationRef}
        style={{ 
          y: educationY,
          rotateZ: educationRotate,
          scale: educationScale,
          transformPerspective: 1000,
        }}
      >
        <Section>
          <div className="space-y-12">
            <motion.h2 
              className="text-5xl font-black tracking-tight mb-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              EDUCATION
            </motion.h2>
            
            <div className="flex flex-col gap-8">
              {/* University Education */}
              <motion.div 
                className="bg-white rounded-2xl p-8 border border-black/10 hover:border-black/20 transition-colors shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="flex flex-col gap-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <h3 className="text-3xl font-bold text-black">
                        Bachelor of Science
                      </h3>
                      <p className="text-xl text-black/80">Computer Science</p>
                      <p className="text-base text-black/60">University of Technology</p>
                    </motion.div>
                    <motion.div 
                      className="flex flex-col items-end gap-2"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <span className="px-4 py-1 rounded-full bg-black/5 text-sm font-medium text-black/70">
                        2019 - 2023
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span className="text-sm text-black/60">First Class Honours</span>
                      </div>
                    </motion.div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <motion.div 
                      className="space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <h4 className="text-lg font-semibold text-black/90">Core Studies</h4>
                      <ul className="space-y-2 text-base text-black/70">
                        {["Software Engineering", "Data Structures", "Web Technologies", "Database Systems"].map((item, index) => (
                          <motion.li 
                            key={item}
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                          >
                            <span className="h-1 w-1 rounded-full bg-black/40"></span>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                    <motion.div 
                      className="space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <h4 className="text-lg font-semibold text-black/90">Specializations</h4>
                      <ul className="space-y-2 text-base text-black/70">
                        {["UI/UX Design", "Cloud Computing", "Mobile Development", "System Architecture"].map((item, index) => (
                          <motion.li 
                            key={item}
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                          >
                            <span className="h-1 w-1 rounded-full bg-black/40"></span>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Professional Certifications */}
              <motion.div 
                className="bg-white rounded-2xl p-8 border border-black/10 hover:border-black/20 transition-colors shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <h3 className="text-3xl font-bold mb-2 text-black">
                      Professional Development
                    </h3>
                    <p className="text-lg text-black/60">Industry Certifications & Training</p>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Full Stack Development",
                        org: "Advanced Web Development Bootcamp",
                        year: "2023",
                        skills: "React, Node.js, TypeScript"
                      },
                      {
                        title: "UI/UX Certification",
                        org: "Google Design Program",
                        year: "2022",
                        skills: "User Research, Prototyping"
                      },
                      {
                        title: "AWS Cloud Practitioner",
                        org: "Amazon Web Services",
                        year: "2022",
                        skills: "Cloud Infrastructure, Services"
                      },
                      {
                        title: "Agile Development",
                        org: "Scrum.org Certification",
                        year: "2022",
                        skills: "Scrum, Project Management"
                      }
                    ].map((cert, index) => (
                      <motion.div 
                        key={index}
                        className="bg-black/5 rounded-xl p-4 hover:bg-black/10 transition-colors"
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20, y: 20 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                        whileHover={{ x: 10 }}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-1 flex-1">
                            <h4 className="font-semibold text-black/90">{cert.title}</h4>
                            <p className="text-sm text-black/60">{cert.org}</p>
                            <p className="text-sm text-black/40 mt-2">{cert.skills}</p>
                          </div>
                          <span className="text-sm text-black/40 whitespace-nowrap">{cert.year}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </Section>
      </motion.div>

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
