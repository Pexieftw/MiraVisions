"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image"; 
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from '@/contexts/ThemeContext';

const ProjectsSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);
  const touchStartRef = useRef(null);

  const brands = [
    { 
      name: 'Pure Buys', 
      type: 'E-commerce Design',
      image: '/projects/purebuys.webp',
      gradient: 'from-blue-500 to-purple-600',
      description: 'Modern e-commerce platform with seamless user experience'
    },
    { 
      name: 'Sauce Harra', 
      type: 'Brand Identity',
      image: '/projects/sauce_harra.webp',
      gradient: 'from-red-500 to-orange-600',
      description: 'Spicy brand identity that captures authentic flavors'
    },
    { 
      name: 'Rapide Scooter', 
      type: 'Complete Branding',
      image: '/projects/rapied_scooter.webp',
      gradient: 'from-emerald-500 to-teal-600',
      description: 'Urban mobility solution with dynamic visual identity'
    },
    { 
      name: 'Frizzies', 
      type: 'Visual Identity',
      image: '/projects/frizzies.webp',
      gradient: 'from-gray-700 to-gray-900',
      description: 'Dark kitchen concept with bold visual storytelling'
    },
    { 
      name: 'Dark Kitchen', 
      type: 'Restaurant Branding',
      image: '/projects/dark_kitchen.webp',
      gradient: 'from-purple-600 to-pink-600',
      description: 'Innovative ghost kitchen brand with modern delivery focus'
    },
    { 
      name: 'Muslim Blocks', 
      type: 'Platform Design',
      image: '/projects/muslim_blocks.webp',
      gradient: 'from-green-500 to-emerald-600',
      description: 'Educational platform connecting communities through design'
    },
    { 
      name: 'Tourism Dubai', 
      type: 'Website & Graphics',
      image: '/projects/tourism_dubai.webp',
      gradient: 'from-amber-500 to-orange-600',
      description: 'Luxury tourism experience with golden visual aesthetics'
    },
    { 
      name: 'Beach Day Every Day', 
      type: 'Corporate Identity',
      image: '/projects/beach_day_every_day.webp',
      gradient: 'from-indigo-500 to-purple-600',
      description: 'Professional corporate branding with modern approach'
    },
    { 
      name: 'Fritzguard', 
      type: 'Brand & Website',
      image: '/projects/fritzguard.webp',
      gradient: 'from-slate-600 to-gray-800',
      description: 'Security-focused brand with trustworthy design language'
    }
  ];


  useEffect(() => {
    const startAutoScroll = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % brands.length);
      }, 5000);
    };

    startAutoScroll();
    return () => clearInterval(intervalRef.current);
  }, [currentIndex, brands.length]); 

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + brands.length) % brands.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % brands.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const getVisibleSlides = () => {
    const prev = (currentIndex - 1 + brands.length) % brands.length;
    const next = (currentIndex + 1) % brands.length;
    return { prev, current: currentIndex, next };
  };

  const { prev, current, next } = getVisibleSlides();

  const handleDragEnd = (event, info) => {
    const threshold = 30;
    const velocity = Math.abs(info.velocity.x);
    
    if (info.offset.x > threshold || velocity > 500) {
      goToPrevious();
    } else if (info.offset.x < -threshold || velocity > 500) {
      goToNext();
    }
  };

  return (
    <section id="portfolio" className={`relative py-16 sm:py-20 lg:py-24 bg-gradient-to-bl overflow-hidden  ${
        isDark           ? 'bg-gradient-to-tr from-slate-900 to-slate-800'
          : 'bg-gradient-to-tr from-white to-slate-200'

      }`}>
                
      {/* grid */}
      <div 
        className={`absolute inset-0 ${isDark ? 'opacity-[0.04]' : 'opacity-[0.08]'}`}
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className={`inline-flex items-center gap-2 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6 ${
            isDark 
              ? 'bg-green-600/10 border border-green-600/20' 
              : 'bg-green-500/10 border border-green-500/20'
          }`}>
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              isDark ? 'bg-green-600' : 'bg-green-500'
            }`}></div>
            <span className={`text-xs sm:text-sm font-medium ${
              isDark ? 'text-green-600' : 'text-green-600'
            }`}>PREVIOUS PROJECTS</span>
          </div>
          <h2 className={`text-4xl lg:text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-6 ${
            isDark 
              ? 'from-white via-gray-200 to-white' 
              : 'from-gray-900 via-gray-700 to-gray-900'
          }`}>
            Our Creative Portfolio
          </h2>
          <p className={`text-xl max-w-3xl mx-auto mb-8 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Discover the brands we've transformed through innovative design and strategic creativity
          </p>
        </motion.div>

        <div className="relative">

          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="flex items-center justify-center gap-4 sm:gap-8 lg:gap-16 cursor-grab active:cursor-grabbing select-none overflow-hidden"
            style={{ width: '100%' }}
          >
            <motion.div
              key={`slide-${prev}`}
              layout
              initial={{ x: -200, opacity: 0, scale: 0.6 }}
              animate={{ 
                x: 0, 
                opacity: 0.7, 
                scale: 0.75,
                zIndex: 1
              }}
              exit={{ x: -200, opacity: 0, scale: 0.6 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              onClick={goToPrevious}
              className="hidden sm:block relative w-56 lg:w-60 xl:w-64 aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group shrink-0"
            >
              <Image
                src={brands[prev].image}
                alt={brands[prev].name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 0px, (max-width: 1024px) 160px, (max-width: 1280px) 192px, 208px"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-white text-sm font-medium truncate">{brands[prev].name}</p>
              </div>
            </motion.div>

            <motion.div
              key={`slide-${current}`}
              layout
              initial={{ x: 0, opacity: 0, scale: 0.8 }}
              animate={{ 
                x: 0, 
                opacity: 1, 
                scale: 1,
                zIndex: 10
              }}
              exit={{ x: 0, opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="relative w-56 h-72 sm:w-64 sm:h-80 lg:w-72 lg:h-88 xl:w-80 xl:h-96 rounded-3xl overflow-hidden shadow-2xl shrink-0"
            >
              <Image
                src={brands[current].image}
                alt={brands[current].name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                priority
              />
              
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-6"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
                  className="inline-block px-2 py-1 bg-green-400 text-gray-900 rounded-full text-xs font-bold mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  {brands[current].type}
                </motion.div>
                
                <motion.h3 
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  {brands[current].name}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-200 text-xs sm:text-sm lg:text-base"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  {brands[current].description}
                </motion.p>
              </motion.div>

              <motion.div
                className="absolute inset-0 rounded-3xl"
                animate={{
                  boxShadow: [
                    "0 0 0 2px rgba(34, 197, 94, 0.3)",
                    "0 0 0 4px rgba(34, 197, 94, 0.5)",
                    "0 0 0 2px rgba(34, 197, 94, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <motion.div
              key={`slide-${next}`}
              layout
              initial={{ x: 200, opacity: 0, scale: 0.6 }}
              animate={{ 
                x: 0, 
                opacity: 0.7, 
                scale: 0.75,
                zIndex: 1
              }}
              exit={{ x: 200, opacity: 0, scale: 0.6 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              onClick={goToNext}
              className="hidden sm:block relative w-56 lg:w-60 xl:w-64 aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group shrink-0"
            >
              <Image
                src={brands[next].image}
                alt={brands[next].name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 0px, (max-width: 1024px) 144px, (max-width: 1280px) 160px, 176px"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <p className="text-white text-xs font-medium truncate">{brands[next].name}</p>
              </div>
            </motion.div>
          </motion.div>

          <button
            onClick={goToPrevious}
            className={`cursor-pointer absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-30 ${
              isDark 
                ? 'bg-gray-800/90 hover:bg-gray-700/90' 
                : 'bg-white/90 hover:bg-gray-50/90'
            }`}
          >
            <ChevronLeft className={`w-6 h-6 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`} />
          </button>
          
          <button
            onClick={goToNext}
            className={`cursor-pointer absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-30 ${
              isDark 
                ? 'bg-gray-800/90 hover:bg-gray-700/90' 
                : 'bg-white/90 hover:bg-gray-50/90'
            }`}
          >
            <ChevronRight className={`w-6 h-6 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`} />
          </button>
        </div>

        <div className="flex justify-center mt-8 sm:mt-12 gap-3">
          {brands.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className={`cursor-pointer w-3 h-3 rounded-full ${
                isDark ? 'bg-gray-600' : 'bg-gray-300'
              }`} />
              
              <motion.div
                className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                initial={false}
                animate={{
                  scale: index === currentIndex ? 1 : 0,
                  opacity: index === currentIndex ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              />
              
              {index === currentIndex && isPlaying && (
                <motion.div
                  className="absolute inset-0 w-3 h-3"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                >
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 24 24">
                    <motion.circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="rgba(34, 197, 94, 0.8)"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                    />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="sm:hidden text-center mt-6"
        >
          <p className={`text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Swipe left or right to navigate
          </p>
        </motion.div>

        <div className="mt-8 max-w-md mx-auto text-center">
          <span className={`text-lg font-medium ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {brands[current].type}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              isDark ? 'bg-green-600/20' : 'bg-green-400/20'
            }`}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;