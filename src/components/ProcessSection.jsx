"use client"

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const ProcessSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleStepClick = (index) => {
    setActiveStep(index);
    startTimer(); // Reset timer when user clicks
  };

  const steps = [
    {
      title: 'Conversation',
      description: 'We start with understanding your vision through detailed discussions',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      visual: (
        <div className={`rounded-xl p-4 shadow-xl border h-32 flex flex-col justify-center ${
          isDark 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-start space-x-3 mb-2">
            <div className="w-6 h-6 bg-gradient-to-br from-green-600 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm">M</div>
            <div className="h-7 flex justify-center items-center bg-green-600 rounded-lg px-2 py-1 flex-1 shadow-sm">
              <p className="text-xs text-white font-medium">Tell me about your vision</p>
            </div>
          </div>
          <div className="flex items-start flex-row-reverse space-x-3 space-x-reverse">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm ${
              isDark ? 'bg-gray-200 text-gray-700' : 'bg-gray-200 text-gray-700'
            }`}>Y</div>
            <div className={`h-7 flex justify-center items-center rounded-lg px-2 py-1 flex-1 shadow-sm ${
              isDark ? 'bg-gray-200' : 'bg-gray-200'
            }`}>
              <p className="text-xs text-black">I need modern design...</p>
            </div>
          </div>
          <div className="mt-4 flex space-x-1 justify-center">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              className="w-1 h-1 bg-green-600 rounded-full"
            />
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              className="w-1 h-1 bg-green-600 rounded-full"
            />
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
              className="w-1 h-1 bg-green-600 rounded-full"
            />
          </div>
        </div>
      )
    },
    {
      title: 'Sketch & Planning',
      description: 'Your ideas transform into detailed wireframes and concepts',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      visual: (
        <div className={`rounded-xl p-4 shadow-xl border h-32 flex flex-col justify-center ${
          isDark 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-100'
        }`}>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <motion.div 
              className={`h-4 rounded shadow-sm ${
                isDark 
                  ? 'bg-gradient-to-r from-gray-600 to-gray-700' 
                  : 'bg-gradient-to-r from-gray-200 to-gray-300'
              }`}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.div 
              className={`h-4 rounded shadow-sm ${
                isDark 
                  ? 'bg-gradient-to-r from-gray-700 to-gray-600' 
                  : 'bg-gradient-to-r from-gray-300 to-gray-400'
              }`}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <motion.div 
              className={`h-4 rounded shadow-sm ${
                isDark 
                  ? 'bg-gradient-to-r from-gray-600 to-gray-700' 
                  : 'bg-gradient-to-r from-gray-200 to-gray-300'
              }`}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
          </div>
          <motion.div 
            className={`h-6 rounded-md mb-2 shadow-sm relative overflow-hidden ${
              isDark 
                ? 'bg-gradient-to-r from-green-800/50 via-green-700/50 to-green-800/50' 
                : 'bg-gradient-to-r from-green-200 via-green-300 to-green-200'
            }`}
          >
            <motion.div
              className={`absolute inset-0 w-8 ${
                isDark 
                  ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent' 
                  : 'bg-gradient-to-r from-transparent via-white/40 to-transparent'
              }`}
              animate={{ x: [-32, 120] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-1 mb-2">
            {[0, 1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                className={`h-3 rounded shadow-sm ${
                  isDark 
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700' 
                    : 'bg-gradient-to-r from-gray-200 to-gray-300'
                }`}
                animate={{ scaleY: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
          <div className={`mt-2 text-xs text-center font-medium flex items-center justify-center space-x-1 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <span>Wireframe Draft</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-2 h-2 border border-green-600 rounded-full"
            />
          </div>
        </div>
      )
    },
    {
      title: 'Final Result',
      description: 'Polished, professional designs ready to elevate your brand',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      visual: (
        <div className="bg-gradient-to-br from-green-600 via-green-600 to-emerald-600 rounded-xl p-4 shadow-xl h-32 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
          <div className="absolute top-2 left-2 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border border-white/30 rounded-full" />
          <div className={`backdrop-blur-sm rounded-lg p-3 w-full h-full flex flex-col shadow-lg border border-white/20 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex space-x-1">
                <motion.div 
                  className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-sm"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                />
                <motion.div 
                  className="w-1.5 h-1.5 bg-yellow-500 rounded-full shadow-sm"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />
                <motion.div 
                  className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-sm"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                />
              </div>
							
							<motion.div 
								className={`h-4 rounded shadow-sm text-xs text-white font-mono bg-gray-100 px-1 ${
                  isDark 
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700' 
                    : 'bg-gradient-to-r from-gray-200 to-gray-300'
                }`}
								animate={{ opacity: [0.5, 1, 0.5] }}
								transition={{ duration: 2, repeat: Infinity, delay: 0 }}
							>live-site.com
							</motion.div>
            </div>
            <motion.div 
              className="h-8 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 rounded-md mb-2 flex items-center justify-center relative overflow-hidden shadow-sm"
              animate={{ 
                backgroundImage: [
                  'linear-gradient(90deg, #059669, #10b981, #059669)',
                  'linear-gradient(90deg, #10b981, #047857, #10b981)',
                  'linear-gradient(90deg, #059669, #10b981, #059669)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div 
                className="text-white text-[10px] font-bold flex items-center space-x-1"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span>LIVE</span>
                <motion.div
                  className="w-1 h-1 bg-white rounded-full"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
            <div className="space-y-1 flex-1">
              <motion.div 
                className="h-1.5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-full shadow-sm"
                animate={{ scaleX: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              />
              <motion.div 
                className="h-1.5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-4/5 shadow-sm"
                animate={{ scaleX: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div 
                className="h-1.5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-3/5 shadow-sm"
                animate={{ scaleX: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className={`py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-tr from-slate-900 to-slate-800'
        : 'bg-gradient-to-tr from-white to-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
					<div className={`inline-flex items-center gap-2 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6 ${
            isDark 
              ? 'bg-green-600/10 border border-green-600/20' 
              : 'bg-green-600/10 border border-green-600/20'
          }`}>
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              isDark ? 'bg-green-600' : 'bg-green-600'
            }`}></div>
            <span className={`text-xs sm:text-sm font-medium ${
              isDark ? 'text-green-400' : 'text-green-600'
            }`}>WORKFLOW</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            From Idea to Reality
          </h2>
          <p className={`text-lg sm:text-xl max-w-2xl mx-auto px-2 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Our proven process transforms your vision into stunning results
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative group cursor-pointer text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                onClick={() => handleStepClick(index)}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      activeStep === index || isHovered === index
                        ? 'bg-gradient-to-br from-green-600 to-green-600 text-white scale-110 shadow-lg'
                        : isDark
                          ? 'bg-gray-700 text-gray-300 border-2 border-gray-600'
                          : 'bg-white text-gray-600 border-2 border-gray-200'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {index + 1}
                  </motion.div>
                </div>

                <motion.div
                  className={`pt-6 sm:pt-8 pb-8 sm:pb-10 px-4 sm:px-6 rounded-2xl shadow-lg transition-all duration-300 border-2 h-80 sm:h-96 flex flex-col ${
                    activeStep === index
                      ? isDark
                        ? 'border-green-600 shadow-xl bg-gradient-to-b from-green-950/10 to-gray-900'
                        : 'border-green-600 shadow-xl bg-gradient-to-b from-green-50/50 to-white'
                      : isHovered === index
                      ? isDark
                        ? 'border-green-600 shadow-xl bg-gray-900'
                        : 'border-green-600 shadow-xl bg-white'
                      : isDark
                        ? 'border-gray-700 hover:border-green-600 bg-gray-900'
                        : 'border-gray-200 hover:border-green-600 bg-white'
                  }`}
                  whileHover={{ y: -5 }}
                  animate={{ 
                    scale: activeStep === index ? 1.02 : 1 
                  }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <div className={`mb-4 sm:mb-6 transition-all duration-500 flex-shrink-0 ${
                    activeStep === index ? 'scale-105' : 'scale-100'
                  }`}>
                    {step.visual}
                  </div>
                  
                  <motion.div 
                    className={`text-xl mb-4 sm:mb-6 flex-shrink-0 transition-colors duration-300 flex justify-center items-center h-8 ${
                      activeStep === index 
                        ? isDark ? 'text-green-400' : 'text-green-600'
                        : isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                    animate={{ 
                      scale: activeStep === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.icon}
                  </motion.div>
                  
                  <div className="flex-grow flex flex-col justify-center mb-4">
                    <h3 className={`text-lg sm:text-xl font-bold sm:mb-4 transition-colors duration-300 ${
                      activeStep === index 
                        ? isDark ? 'text-green-400' : 'text-green-700'
                        : isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm sm:text-base leading-relaxed px-1 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {step.description}
                    </p>
                  </div>

                  <AnimatePresence>
                    {activeStep === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-br from-green-600 to-green-600 rounded-full shadow-md"
                      >
                        <motion.div
                          className="absolute inset-0 bg-green-500 rounded-full"
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full transform -translate-y-1/2 -translate-x-1/2 z-0" style={{ left: 'calc(100% + 2rem)' }}>
                    <motion.svg 
                      className={`w-8 h-8 ${
                        isDark ? 'text-green-600/60' : 'text-green-600/60'
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ 
                        x: activeStep === index ? 3 : 0,
                        opacity: activeStep === index ? 1 : 0.6,
                        scale: activeStep === index ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </div>
                )}

                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-4 sm:mt-6">
                    <motion.svg 
                      className={`w-8 h-8 ${
                        isDark ? 'text-green-600/60' : 'text-green-600/60'
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ 
                        y: activeStep === index ? 5 : 0,
                        opacity: activeStep === index ? 1 : 0.6,
                        scale: activeStep === index ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l5 5m0 0l5-5m-5 5V6" />
                    </motion.svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8 sm:mt-12">
            <div className={`flex items-center space-x-2 sm:space-x-3 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg border ${
              isDark 
                ? 'bg-gray-800/80 border-gray-600/50' 
                : 'bg-white/80 border-gray-200/50'
            }`}>
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`cursor-pointer transition-all duration-300 rounded-full flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 ${
                    activeStep === index 
                      ? 'bg-gradient-to-r from-green-600 to-green-600 text-white shadow-md' 
                      : isDark
                        ? 'hover:bg-gray-700 text-gray-400'
                        : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <motion.div
                    className={`rounded-full transition-all duration-300 ${
                      activeStep === index 
                        ? 'bg-white/20 w-4 sm:w-6 h-1' 
                        : isDark
                          ? 'bg-gray-600 w-2 h-2'
                          : 'bg-gray-300 w-2 h-2'
                    }`}
                    layout
                  />
                  <AnimatePresence>
                    {activeStep === index && (
                      <motion.span 
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="text-xs sm:text-sm font-medium whitespace-nowrap"
                      >
                        {step.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProcessSection;