"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, Sun, Moon } from 'lucide-react';
import Image from "next/image";
import { useTheme } from '@/contexts/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getThemeStyles = () => {
    const isDark = theme === 'dark';
    
    return {
      // Navbar background
      navBg: isScrolled 
        ? (isDark ? 'bg-gray-900/90 border-gray-700/30' : 'bg-white/90 border-gray-200/30')
        : 'bg-transparent',
      
      // Text colors
      textPrimary: isDark ? 'text-gray-300' : 'text-gray-700',
      textHover: isDark ? 'hover:text-lime-400' : 'hover:text-green-600',
      
      // Button backgrounds
      buttonBg: isDark ? 'bg-gray-800' : 'bg-gray-100',
      buttonHover: isDark ? 'hover:bg-gray-800/60' : 'hover:bg-white/60',

      // Green button styles
      greenButtonBg: 'bg-green-500',
      greenButtonText: isDark ? 'text-white' : 'text-gray-800',
      
      // Icon button styles
      iconButtonBg: isDark ? 'bg-gray-800' : 'bg-gray-100',
      iconButtonText: isDark ? 'text-white' : 'text-gray-800',
      iconButtonHover: 'hover:bg-green-500',
      
      // Mobile menu
      mobileBg: isDark ? 'bg-gray-900/95 border-gray-700/50' : 'bg-white/95 border-gray-200/50',
      mobileButtonBg: isDark ? 'bg-gray-800' : 'bg-gray-100',
      mobileButtonHover: isDark ? 'hover:bg-gray-800/80' : 'hover:bg-gray-100/80',
      
      
      // Icon colors
      iconColor: isDark ? 'text-gray-300' : 'text-gray-600',
      
      // Overlay
      overlayBg: 'bg-black/50'
    };
  };

  const styles = getThemeStyles();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (isManualScrolling) return;

      const sections = ['hero', 'services', 'portfolio', 'testimonials', 'contact'];
      let current = activeSection; 

      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = sectionId === 'hero' ? 'home' : sectionId;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isManualScrolling, activeSection]);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${styles.navBg} ${
          isScrolled ? 'backdrop-blur-xl border-b shadow-xl shadow-black/5 py-3' : 'py-4 lg:py-6'
        }`}
        suppressHydrationWarning
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            <motion.div 
              className="flex items-center space-x-2 lg:space-x-3 cursor-pointer group"
              onClick={scrollToTop}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center relative">
                <Image
                  src="/miravisions-logo-white.webp"
                  alt="Mira Visions Logo"
                  width={195} 
                  height={48}   
                  className={`object-contain transition-opacity duration-300 ${
                    theme === 'dark' ? 'opacity-100' : 'opacity-0'
                  } absolute top-0 left-0`}
                  priority
                />
                <Image
                  src="/miravisions-logo-dark.webp"
                  alt="Mira Visions Logo"
                  width={195} 
                  height={48}   
                  className={`object-contain transition-opacity duration-300 ${
                    theme === 'light' ? 'opacity-100' : 'opacity-0'
                  }`}
                  priority
                />
              </div>
            </motion.div>

            <div className="hidden lg:flex items-center space-x-1" suppressHydrationWarning>
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={item.action}
                  className={`relative px-5 py-2.5 rounded-xl font-medium text-sm xl:text-base transition-all duration-300 group cursor-pointer select-none ${
                    activeSection === item.id
                      ? `${styles.textPrimary} font-black`
                      : `${styles.textPrimary} ${styles.textHover} ${styles.buttonHover}`
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
                      className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-green-600 rounded-full transform -translate-x-1/2 shadow-lg shadow-lime-400/50"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  <motion.div
                    className="absolute inset-0 rounded-xl bg-green-400/5 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    initial={false}
                  />
                </motion.button>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-3" suppressHydrationWarning>
              <div className="flex items-center space-x-2 mr-4">
                <motion.button
                  onClick={toggleTheme}
                  className={`w-10 h-10 rounded-xl ${styles.iconButtonBg} flex items-center justify-center ${styles.iconButtonText} ${styles.iconButtonText} ${styles.iconButtonHover}  transition-all duration-300 cursor-pointer`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  <AnimatePresence mode="wait">
                    {isClient && theme === 'dark' ? (
                      <motion.div
                        key="sun"
                        initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Sun className="w-4 h-4" />
                      </motion.div>
                    ) : isClient ? (
                      <motion.div
                        key="moon"
                        initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Moon className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                  </AnimatePresence>
                </motion.button>
                
                <motion.a
                  href="mailto:info@miravisions.com"
                  className={`w-10 h-10 rounded-xl ${styles.iconButtonBg} flex items-center justify-center ${styles.iconButtonText} ${styles.iconButtonHover} transition-all duration-300 cursor-pointer`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-4 h-4" />
                </motion.a>
              </div>

              <motion.button
                onClick={() => scrollToSection('contact')}
                className={`${styles.greenButtonBg} ${styles.greenButtonText} relative overflow-hidden px-6 py-2.5 hover:shadow-[0_25px_50px_-12px_rgba(34,197,94,0.5)] shadow-[0_0_0_rgba(34,197,94,0.5)] rounded-xl font-bold text-sm xl:text-base transition-all duration-300 cursor-pointer select-none`}
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
              className={`lg:hidden relative p-2.5 rounded-xl ${styles.textPrimary} ${styles.textHover} ${styles.buttonHover} transition-all duration-300 cursor-pointer`}
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
              className={`lg:hidden fixed inset-0 ${styles.overlayBg} z-40 backdrop-blur-sm`}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`lg:hidden fixed top-16 lg:top-20 left-4 right-4 z-50 ${styles.mobileBg} backdrop-blur-xl rounded-2xl border shadow-2xl overflow-hidden`}
              suppressHydrationWarning
            >
              <div className="p-6">
                <div className="space-y-2 mb-6">
                  {navigationItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={item.action}
                      className={`w-full text-left px-4 py-3 rounded-xl font-medium text-base transition-all duration-300 cursor-pointer select-none ${
                        activeSection === item.id
                          ? 'text-green-600 shadow-lg border-2 border-green-600/20'
                          : `${styles.textPrimary} ${styles.textHover} ${styles.mobileButtonHover}`
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
                  <motion.button
                    onClick={toggleTheme}
                    className={`flex-1 flex items-center justify-center px-4 py-3 ${styles.mobileButtonBg} rounded-xl ${styles.textPrimary}  transition-all duration-300 cursor-pointer`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.25 }}
                  >
                    <AnimatePresence mode="wait">
                      {isClient && theme === 'dark' ? (
                        <motion.div
                          key="sun-mobile"
                          initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center"
                        >
                          <Sun className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">Light</span>
                        </motion.div>
                      ) : isClient ? (
                        <motion.div
                          key="moon-mobile"
                          initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center"
                        >
                          <Moon className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">Dark</span>
                        </motion.div>
                      ) : (
                        <div className="flex items-center">
                          <Moon className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">Dark</span>
                        </div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                  
                  <motion.a
                    href="mailto:hello@miravisions.com"
                    className={`flex-1 flex items-center justify-center px-4 py-3 ${styles.mobileButtonBg} rounded-xl ${styles.textPrimary} transition-all duration-300 cursor-pointer`}
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
                  className={`w-full px-6 py-4 bg-green-600 rounded-xl font-bold text-center transition-all duration-300 hover:from-lime-500 hover:to-emerald-600 shadow-lg hover:shadow-xl hover:shadow-lime-400/25 cursor-pointer select-none ${styles.iconButtonText}`}
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