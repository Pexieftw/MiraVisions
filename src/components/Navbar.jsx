"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Phone, Mail } from 'lucide-react';
import Image from "next/image";


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isManualScrolling, setIsManualScrolling] = useState(false); 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (isManualScrolling) return; // ignore while manually scrolling

      const sections = ['hero', 'services', 'portfolio', 'testimonials', 'contact'];
      let current = 'home';

      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = sectionId;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isManualScrolling]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsManualScrolling(true); 
      setActiveSection(sectionId);

      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setIsMobileMenuOpen(false);

      setTimeout(() => setIsManualScrolling(false), 800);
    }
  };

  const scrollToTop = () => {
    setIsManualScrolling(true);
    setActiveSection('home');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);

    setTimeout(() => setIsManualScrolling(false), 800);
  };


  const navigationItems = [
    { id: 'home', label: 'Home', action: scrollToTop },
    { id: 'portfolio', label: 'Portfolio', action: () => { setActiveSection('portfolio'); scrollToSection('portfolio'); } },
    { id: 'services', label: 'Services', action: () => { setActiveSection('services'); scrollToSection('services'); } },
    { id: 'testimonials', label: 'Reviews', action: () => { setActiveSection('testimonials'); scrollToSection('testimonials'); } },
    { id: 'contact', label: 'Contact', action: () => { setActiveSection('contact'); scrollToSection('contact'); } }
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/30 dark:border-gray-700/30 shadow-2xl py-3' 
            : 'bg-transparent py-4 lg:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            <motion.div 
              className="flex items-center space-x-2 lg:space-x-3 cursor-pointer group"
              onClick={scrollToTop}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <Image
                  src="https://miravisions.com/wp-content/uploads/2024/03/miravisionswhte@4x.png"
                  alt="Mira Visions Logo"
                  width={160} 
                  height={48}   
                  className="h-10 lg:h-12 w-auto object-contain"
                  priority   
                />
              </div>
            </motion.div>

            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={item.action}
                  className={`relative px-5 py-2.5 rounded-xl font-medium text-sm xl:text-base transition-all duration-300 group cursor-pointer select-none ${
                    activeSection === item.id
                      ? 'text-lime-500 bg-lime-400/10 shadow-lg shadow-lime-400/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-lime-400 dark:hover:text-lime-400 hover:bg-white/60 dark:hover:bg-gray-800/60'
                  }`}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ y: 0, scale: 0.98 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-lime-400 rounded-full transform -translate-x-1/2 shadow-lg shadow-lime-400/50"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-lime-400/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    initial={false}
                  />
                </motion.button>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-3">
              <div className="flex items-center space-x-2 mr-4">
                <motion.a
                  href="tel:+15551234567"
                  className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-lime-400 hover:text-gray-900 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-4 h-4" />
                </motion.a>
                
                <motion.a
                  href="mailto:hello@miravisions.com"
                  className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-lime-400 hover:text-gray-900 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-4 h-4" />
                </motion.a>
              </div>

              <motion.button
                onClick={() => scrollToSection('contact')}
                className="relative overflow-hidden px-6 py-2.5 bg-gradient-to-r from-lime-400 to-emerald-500 text-gray-900 rounded-xl font-bold text-sm xl:text-base transition-all duration-300 hover:from-lime-500 hover:to-emerald-600 shadow-lg hover:shadow-xl hover:shadow-lime-400/25 cursor-pointer select-none"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <motion.svg 
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </span>
              </motion.button>
            </div>

            <motion.button
              className="lg:hidden relative p-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:text-lime-400 dark:hover:text-lime-400 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="lg:hidden fixed top-16 lg:top-20 left-4 right-4 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl overflow-hidden"
            >
              <div className="p-6">
                <div className="space-y-2 mb-6">
                  {navigationItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={item.action}
                      className={`w-full text-left px-4 py-3 rounded-xl font-medium text-base transition-all duration-300 cursor-pointer select-none ${
                        activeSection === item.id
                          ? 'text-lime-500 bg-lime-400/10 shadow-lg shadow-lime-400/20 border border-lime-400/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-lime-400 dark:hover:text-lime-400 hover:bg-gray-100/80 dark:hover:bg-gray-800/80'
                      }`}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ x: 4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.label}</span>
                        {activeSection === item.id && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="w-2 h-2 bg-lime-400 rounded-full"
                          />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
                
                <div className="flex space-x-3 mb-6">
                  <motion.a
                    href="tel:+15551234567"
                    className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-lime-400 hover:text-gray-900 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.25 }}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Call</span>
                  </motion.a>
                  
                  <motion.a
                    href="mailto:hello@miravisions.com"
                    className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-lime-400 hover:text-gray-900 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Email</span>
                  </motion.a>
                </div>
                
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  className="w-full px-6 py-4 bg-gradient-to-r from-lime-400 to-emerald-500 text-gray-900 rounded-xl font-bold text-center transition-all duration-300 hover:from-lime-500 hover:to-emerald-600 shadow-lg hover:shadow-xl hover:shadow-lime-400/25 cursor-pointer select-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.35 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Your Project
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;