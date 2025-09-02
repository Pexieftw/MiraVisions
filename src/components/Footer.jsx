"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowUp, Sparkles } from 'lucide-react';
import Image from "next/image";

const Footer = () => {
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
    <footer className="bg-gray-900 text-white">
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
                src="https://miravisions.com/wp-content/uploads/2024/03/miravisionswhte@4x.png"
                alt="Mira Visions Logo"
                width={160}
                height={48}
                className="h-10 lg:h-12 w-auto object-contain transition-all duration-300 group-hover:brightness-110"
                priority
              />
            </motion.div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Executing your visions to reality through expert website creation,
              graphic design, brand identity, and creative media solutions.
            </p>
            
            <div className="flex space-x-3 justify-center md:justify-start">
              <motion.a
                href="tel:+15551234567"
                className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-lime-400 hover:text-gray-900 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-4 h-4" />
              </motion.a>
              
              <motion.a
                href="mailto:hello@miravisions.com"
                className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-lime-400 hover:text-gray-900 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center md:justify-start">
            <div>
              <h4 className="font-bold text-lg mb-6 text-white flex items-center justify-center md:justify-start">
                <Sparkles className="w-4 h-4 mr-2 text-lime-400" />
                Quick Links
              </h4>
              <ul className="space-y-3 flex-row justify-center items-center">
                {navigationItems.map((link, index) => (
                  <li key={link.id}>
                    <motion.button
                      onClick={link.action}
                      className="inline group text-gray-400 hover:text-lime-400 transition-all duration-300 cursor-pointer select-none"
                      whileHover={{ x: 4 }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-3 group-hover:bg-lime-400 transition-all duration-300"></span>
                      {link.label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center md:justify-start">
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Get In Touch</h4>
              <div className="flex-row justify-center items-center space-y-4">
                <motion.a
                  href="mailto:hello@miravisions.com"
                  className="flex items-center text-gray-400 hover:text-lime-400 transition-all duration-300 cursor-pointer group"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center mr-3 group-hover:bg-lime-400/10 transition-all duration-300">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm">hello@miravisions.com</span>
                </motion.a>
                
                <motion.a
                  href="tel:+15551234567"
                  className="flex items-center text-gray-400 hover:text-lime-400 transition-all duration-300 cursor-pointer group"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center mr-3 group-hover:bg-lime-400/10 transition-all duration-300">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm">+x (xxx) xxx-xxxx</span>
                </motion.a>
                
                <div className="flex items-center text-gray-400">
                  <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center mr-3">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm">Worldwide Remote</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-gray-800/50 pt-8"
          variants={itemVariants}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Mira Visions. All rights reserved.
            </p>
            
            <div className="flex space-x-6 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookies"].map((item, index) => (
                <motion.button
                  key={item}
                  className="text-gray-400 hover:text-lime-400 transition-colors duration-300 cursor-pointer select-none"
                  whileHover={{ y: -1 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>
          
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-lime-400 to-emerald-500 text-gray-900 flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-lime-400/25 transition-all duration-300 cursor-pointer md:hidden z-500"
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