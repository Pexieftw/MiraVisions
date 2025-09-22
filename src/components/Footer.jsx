"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import Image from "next/image";
import { useTheme } from '@/contexts/ThemeContext';
import Link from "next/link";


const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [activeSection, setActiveSection] = useState('');
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  const scrollToSection = (sectionId) => {
    if (sectionId === '' || sectionId === 'home') {
      setIsManualScrolling(true);
      setActiveSection('home');
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      setTimeout(() => setIsManualScrolling(false), 800);
      return;
    }

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

      setTimeout(() => setIsManualScrolling(false), 800);
    }
  };

  const scrollToTop = () => {
    setIsManualScrolling(true);
    setActiveSection('home');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => setIsManualScrolling(false), 800);
  };

  const navigationItems = [
    { label: "Home", id: "home", action: scrollToTop },
    { label: "Portfolio", id: "portfolio", action: () => scrollToSection("portfolio") },
    { label: "Services", id: "services", action: () => scrollToSection("services") },
    { label: "Reviews", id: "testimonials", action: () => scrollToSection("testimonials") },
    { label: "Contact", id: "contact", action: () => scrollToSection("contact") },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className={`bg-gradient-to-br from-gray-900 to-slate-800'
    } text-white border-t ${
      isDark 
        ? 'border-gray-700/50' 
        : 'border-gray-600/30'
    }`}>
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12 text-center md:text-left">
          
          <motion.div 
            className="col-span-1 md:col-span-2 lg:col-span-1"
            variants={itemVariants}
          >
            <motion.div 
              className="mb-6 cursor-pointer group flex justify-center md:justify-start"
              onClick={scrollToTop}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src="/miravisions-logo-white.webp"
                alt="Mira Visions Logo"
                width={195} 
                height={48}   
                className="object-contain transition-all duration-300 group-hover:brightness-110"
                priority
              />
            </motion.div>
            <p className={`mb-6 leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-400'
            }`}>
              Executing your visions to reality through expert website creation,
              graphic design, brand identity, and creative media solutions.
            </p>
            
            <div className="flex space-x-3 justify-center md:justify-start">
              <motion.a
                href="tel:+15551234567"
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  isDark 
                    ? 'bg-gray-800 text-gray-400 hover:bg-green-600 hover:text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-green-600 hover:text-white'
                }`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-4 h-4" />
              </motion.a>
              
              <motion.a
                href="mailto:info@miravisions.com"
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  isDark 
                    ? 'bg-gray-800 text-gray-400 hover:bg-green-600 hover:text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-green-600 hover:text-white'
                }`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center md:justify-start">
            <div>
              <h4 className={`font-bold text-lg mb-6 flex items-center justify-center md:justify-start ${
                isDark ? 'text-white' : 'text-gray-100'
              }`}>
                Quick Links
              </h4>
              <ul className="space-y-3 flex-row justify-center items-center">
                {navigationItems.map((link, index) => (
                  <li key={link.id}>
                    <motion.button
                      onClick={link.action}
                      className={`inline group transition-all duration-300 cursor-pointer select-none ${
                        isDark 
                          ? 'text-gray-300 hover:text-green-400' 
                          : 'text-gray-400 hover:text-green-400'
                      }`}
                      whileHover={{ x: 4 }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      {link.label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center md:justify-start">
            <div>
              <h4 className={`font-bold text-lg mb-6 ${
                isDark ? 'text-white' : 'text-gray-100'
              }`}>
                Get In Touch
              </h4>
              <div className="flex-row justify-center items-center space-y-4">
                <motion.a
                  href="mailto:info@miravisions.com"
                  className={`flex items-center transition-all duration-300 cursor-pointer group ${
                    isDark 
                      ? 'text-gray-300 hover:text-green-400' 
                      : 'text-gray-400 hover:text-green-400'
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 ${
                    isDark 
                      ? 'bg-gray-800 group-hover:bg-green-600/10' 
                      : 'bg-gray-700 group-hover:bg-green-600/10'
                  }`}>
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm">info@miravisions.com</span>
                </motion.a>
                
                <motion.a
                  href="tel:+15551234567"
                  className={`flex items-center transition-all duration-300 cursor-pointer group ${
                    isDark 
                      ? 'text-gray-300 hover:text-green-400' 
                      : 'text-gray-400 hover:text-green-400'
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 ${
                    isDark 
                      ? 'bg-gray-800 group-hover:bg-green-600/10' 
                      : 'bg-gray-700 group-hover:bg-green-600/10'
                  }`}>
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm">+x (xxx) xxx-xxxx</span>
                </motion.a>
                
                <div className={`flex items-center ${
                  isDark ? 'text-gray-300' : 'text-gray-400'
                }`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                    isDark ? 'bg-gray-800' : 'bg-gray-700'
                  }`}>
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm">Worldwide Remote</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className={`border-t pt-8 ${
            isDark ? 'border-gray-700/50' : 'border-gray-600/30'
          }`}
          variants={itemVariants}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className={`text-sm ${
              isDark ? 'text-gray-300' : 'text-gray-400'
            }`}>
              © 2025 Mira Visions. All rights reserved.
            </p>
            
            <div className="flex space-x-6 text-sm">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-service" },
              ].map((item, index) => (
                <motion.div
                  key={item.href}
                  whileHover={{ y: -1 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`transition-colors duration-300 cursor-pointer select-none ${
                      isDark
                        ? "text-gray-300 hover:text-green-400"
                        : "text-gray-400 hover:text-green-400"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-green-400/25 transition-all duration-300 cursor-pointer md:hidden z-500"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;