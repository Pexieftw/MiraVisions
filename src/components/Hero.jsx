"use client";
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Ruler, Lightbulb, Rocket, Palette, Paintbrush, Zap, Target, Globe, Smartphone, Sparkles, Monitor } from 'lucide-react';

const Hero = ({ isLoaded = true }) => {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeScreen, setActiveScreen] = useState(0);
  const [time, setTime] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);
  const workspaceRef = useRef(null);
  const canvasRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const isDark = theme === 'dark';

  const projects = [
    {
      type: 'Website',
      title: 'E-commerce Platform',
      colors: ['rgb(var(--lime-400))', 'rgb(var(--green-500))', 'rgb(var(--emerald-500))'],
      elements: ['header', 'hero', 'products', 'footer'],
      icon: <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
    },
    {
      type: 'Mobile App',
      title: 'Creative Studio App',
      colors: ['rgb(var(--green-500))', 'rgb(var(--emerald-500))', 'rgb(var(--cyan-500))'],
      elements: ['navbar', 'dashboard', 'gallery', 'profile'],
      icon: <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
    },
    {
      type: 'Brand Identity',
      title: 'Luxury Brand Suite',
      colors: ['rgb(var(--emerald-500))', 'rgb(var(--cyan-500))', 'rgb(var(--blue-500))'],
      elements: ['logo', 'colors', 'typography', 'assets'],
      icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
    },
    {
      type: 'UI/UX Design',
      title: 'SaaS Dashboard',
      colors: ['rgb(var(--cyan-500))', 'rgb(var(--blue-500))', 'rgb(var(--violet-500))'],
      elements: ['sidebar', 'analytics', 'widgets', 'controls'],
      icon: <Monitor className="w-4 h-4 sm:w-5 sm:h-5" />
    }
  ];

  const floatingElements = [
    {
      Icon: Ruler,
      position: { right: isMobile ? '-15px' : '-60px', top: isMobile ? '15px' : '40px' },
      transform: `translateZ(20px) rotateY(${-time * 15}deg)`,
      color: 'text-blue-500'
    },
    {
      Icon: Lightbulb,
      position: { left: isMobile ? '-15px' : '-50px', bottom: isMobile ? '15px' : '30px' },
      transform: `translateZ(25px) rotateY(${time * 10}deg)`,
      color: 'text-yellow-500'
    },
    {
      Icon: Rocket,
      position: { right: isMobile ? '-15px' : '-50px', bottom: isMobile ? '40px' : '60px' },
      transform: `translateZ(15px) rotateY(${-time * 25}deg)`,
      color: 'text-purple-500'
    },
    {
      Icon: Palette,
      position: { left: isMobile ? '-15px' : '-50px', top: isMobile ? '15px' : '40px' },
      transform: `translateZ(30px) rotateY(${time * 20}deg)`,
      color: 'text-pink-500'
    }
  ];

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 0.02);
      setActiveScreen(prev => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });

        if (!isDragging && !isMobile) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / centerY * 8;
          const rotateY = (x - centerX) / centerX * 8;
          setRotation({ x: rotateX, y: rotateY });
        }
      }
    };

    const handleTouchMove = (e) => {
      if (heroRef.current && isMobile && isDragging) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = heroRef.current.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        const deltaX = x - dragStartRef.current.x;
        const deltaY = y - dragStartRef.current.y;
        
        const rotateX = (deltaY / rect.height) * 20;
        const rotateY = (deltaX / rect.width) * 20;
        
        setRotation({ x: rotateX, y: rotateY });
      }
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, isMobile]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleTouchStart = (e) => {
    if (isMobile) {
      setIsDragging(true);
      const touch = e.touches[0];
      const rect = heroRef.current.getBoundingClientRect();
      dragStartRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
      e.preventDefault();
    }
  };

  const handleInteractionEnd = () => {
    setIsDragging(false);
    if (isMobile) {
      setTimeout(() => {
        setRotation({ x: 0, y: 0 });
      }, 100);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = isMobile ? 15 : 40;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.life = Math.random() * 100 + 100;
        this.decay = Math.random() * 0.01 + 0.005;
        this.size = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 
          ? (isDark ? 'rgba(163, 230, 53,' : 'rgba(34, 197, 94,')
          : (isDark ? 'rgba(34, 197, 94,' : 'rgba(16, 185, 129,');
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;

        if (this.life <= 0) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.life = Math.random() * 100 + 100;
        }

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life / 100);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + `${Math.max(0, this.life / 100) * 0.3})`;
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, isDark]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentProject = projects[activeScreen];

  return (
    <section 
      ref={heroRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 to-slate-800'
          : 'bg-gradient-to-br from-white to-slate-200'
      }`}
      onMouseUp={handleInteractionEnd}
      onTouchEnd={handleInteractionEnd}
    >
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-40"
      />

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

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center min-h-screen py-12 sm:py-16 lg:py-20 gap-8 lg:gap-16 w-full">
          
          <div className="lg:w-1/2 text-center lg:text-left space-y-6 sm:space-y-8 lg:space-y-10">
            
            <div 
              className={`mt-4 inline-flex items-center relative px-4 py-2 sm:px-6 sm:py-3 lg:px-6 lg:py-3 mb-4 sm:mb-6 lg:mb-6 group ${
                isLoaded ? 'opacity-0 translate-y-5 animate-[badge-slide_0.8s_ease-out_0.2s_both]' : 'opacity-0'
              }`}
            >
              <div className={`absolute inset-0 rounded-full backdrop-blur-xl bg-gradient-to-r border transition-opacity duration-300 group-hover:opacity-80 ${
                isDark 
                  ? 'from-lime-400/10 via-emerald-500/10 to-lime-400/10 border-lime-400/30'
                  : 'from-green-500/10 via-emerald-500/10 to-green-600/10 border-green-500/40'
              }`} />
              <div className="relative flex items-center">
                <div className={'w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full mr-2 sm:mr-3 lg:mr-3 animate-pulse bg-green-500'} />
                <span className={'font-semibold tracking-[0.15em] text-xs sm:text-sm uppercase text-green-600'}>
                  Expert Design Studio
                </span>
              </div>
            </div>

            <div className={`${isLoaded ? 'opacity-0 translate-y-8 animate-[title-cascade_1s_ease-out_0.4s_both]' : 'opacity-0'}`}>
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl font-black leading-[0.9] mb-4 sm:mb-6 tracking-tight">
                <span className={`block font-light mb-1 sm:mb-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>We Design</span>
                <span 
                  className='block bg-clip-text text-transparent font-black animate-[gradient-shift_3s_ease-in-out_infinite] bg-gradient-to-r from-green-500 via-emerald-500 to-green-600'
                  style={{ backgroundSize: '200% 200%' }}
                >
                  DIGITAL
                </span>
                <span className={`block font-light mt-1 sm:mt-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Experiences.</span>
              </h1>
            </div>

            <div className={`${isLoaded ? 'opacity-0 translate-y-5 animate-[subtitle-reveal_0.8s_ease-out_0.8s_both]' : 'opacity-0'}`}>
              <div className="max-w-2xl mx-auto lg:mx-0 space-y-4 sm:space-y-5">
                <p className={`text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl font-light leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  From <span className='font-semibold text-green-600'>stunning websites</span> to 
                  {' '}<span className='font-semibold text-emerald-600'>powerful brand identities</span>, 
                  <br/>we transform your vision into reality.
                </p>
                <div className={`flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 text-sm sm:text-sm lg:text-base ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <span className="inline-flex items-center">
                    <Paintbrush className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 ${isDark ? 'text-pink-400' : 'text-pink-500'}`} />
                    <span className="font-medium">Creative Excellence</span>
                  </span>
                  <span className="inline-flex items-center">
                    <Zap className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 ${isDark ? 'text-yellow-400' : 'text-yellow-500'}`} />
                    <span className="font-medium">Lightning Fast</span>
                  </span>
                  <span className="inline-flex items-center">
                    <Target className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                    <span className="font-medium">Results Driven</span>
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`grid grid-cols-[auto_auto] gap-3 justify-center lg:justify-start ${
                isLoaded
                  ? 'opacity-0 translate-y-5 animate-[cta-reveal_0.8s_ease-out_1.2s_both]'
                  : 'opacity-0'
              }`}
            >
              {[
                { name: 'UI/UX Design', short: 'UI/UX', Icon: Paintbrush },
                { name: 'Web Development', short: 'Web Dev', Icon: Globe },
                { name: 'Brand Identity', short: 'Branding', Icon: Sparkles },
                { name: 'Mobile Apps', short: 'Mobile', Icon: Smartphone }
              ].map((service, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 lg:px-4 lg:py-3 backdrop-blur-sm border rounded-xl lg:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 group cursor-pointer text-center ${
                    isDark 
                      ? 'bg-gray-800/60 border-gray-700/60 text-gray-200 hover:bg-gray-700/60 hover:border-lime-400/60 hover:text-lime-400'
                      : 'bg-white/60 border-gray-300/60 text-gray-700 hover:bg-gray-100/60 hover:border-green-500/60 hover:text-green-600'
                  }`}
                >
                  <service.Icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-4 lg:h-4 mr-1 sm:mr-2 group-hover:scale-110 transition-transform duration-300" />
                  <span className="hidden sm:inline lg:hidden">{service.short}</span>
                  <span className="sm:hidden lg:inline">{service.name}</span>
                </span>
              ))}
            </div>

            <div className={`flex justify-center lg:justify-start ${isLoaded ? 'opacity-0 translate-y-5 animate-[cta-reveal_0.8s_ease-out_1.4s_both]' : 'opacity-0'}`}>
              <button
                onClick={() => scrollToSection('contact')}
                className={`relative overflow-hidden ${isDark ? 'white' : 'text-gray-800'} rounded-full font-bold text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg px-6 py-3 sm:px-8 sm:py-4 lg:px-8 lg:py-4 transition-all duration-500 transform hover:scale-105 group border-none cursor-pointer bg-green-500 hover:shadow-[0_25px_50px_-12px_rgba(34,197,94,0.5)] shadow-[0_0_0_rgba(34,197,94,0.5)]`}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Start Your Project
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 ml-2 sm:ml-3 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 flex items-center justify-center mt-4 lg:mt-0">
            <div className={`relative ${isLoaded ? 'opacity-0 scale-75 translate-y-5 animate-[workspace-emerge_1s_ease-out_0.6s_both]' : 'opacity-0'}`}>
              
              <div 
                ref={workspaceRef}
                className="relative cursor-grab select-none w-[320px] h-[240px] sm:w-[576px] sm:h-[432px] md:w-[624px] md:h-[480px] lg:w-[720px] lg:h-[540px] xl:w-[768px] xl:h-[576px] transition-transform duration-500 ease-out active:cursor-grabbing"
                onMouseDown={!isMobile ? handleMouseDown : undefined}
                onTouchStart={isMobile ? handleTouchStart : undefined}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: isDragging ? 'none' : 'transform 0.5s ease-out'
                }}
              >
                
                <div className="absolute inset-0 transform-gpu backface-hidden" style={{ transformStyle: 'preserve-3d' }}>
                  
                  <div 
                    className={`absolute bottom-0 left-1/2 w-32 h-20 sm:w-32 sm:h-18 md:w-36 md:h-20 lg:w-40 lg:h-22 xl:w-44 xl:h-24 rounded-lg border bg-gradient-to-t ${
                      isDark 
                        ? 'border-gray-600 from-gray-800 to-gray-600' 
                        : 'border-gray-400 from-gray-600 to-gray-400'
                    }`}
                    style={{ transform: 'translateZ(-20px) translateX(-50%)' }}
                  />
                  
                  <div 
                    className={`absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl border-4 sm:border-6 lg:border-8 bg-gradient-to-br transition-all duration-300 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ${
                      isDark 
                        ? 'border-gray-600 from-gray-800 to-gray-900' 
                        : 'border-gray-300 from-slate-100 to-slate-300'
                    }`}
                    style={{ 
                      transform: 'translateZ(0px)'
                    }}
                  >
                    
                    <div className={`w-full h-full rounded-md sm:rounded-lg md:rounded-xl overflow-hidden relative bg-gradient-to-br ${
                      isDark ? 'from-gray-800 to-gray-900' : 'from-slate-100 to-slate-300'
                    }`}>
                      
                      <div 
                        className="absolute inset-0 transition-all duration-1000 ease-in-out rounded-md sm:rounded-lg md:rounded-xl"
                        style={{
                          background: `linear-gradient(135deg, ${currentProject.colors[0]}20, ${currentProject.colors[1]}20, ${currentProject.colors[2]}20)`
                        }}
                      >
                        
                        <div className={`flex items-center justify-between p-3 sm:p-5 lg:p-6 backdrop-blur-sm border-b ${
                          isDark 
                            ? 'bg-gray-800/80 border-gray-700/50' 
                            : 'bg-white/80 border-gray-300/50'
                        }`}>
                          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 bg-red-500 rounded-full" />
                            <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 bg-yellow-500 rounded-full" />
                            <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 bg-green-500 rounded-full" />
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <div className="text-lime-400">{currentProject.icon}</div>
                            <span className={`text-xs sm:text-sm lg:text-base font-medium ${
                              isDark ? 'text-gray-300' : 'text-gray-600'
                            }`}>{currentProject.type}</span>
                          </div>
                        </div>
                        
                        <div className="p-3 sm:p-6 lg:p-8">
                          <div className="mb-4 sm:mb-6 lg:mb-8">
                            <h3 className={`text-sm sm:text-lg lg:text-xl font-bold mb-2 sm:mb-4 ${
                              isDark ? 'text-white' : 'text-gray-800'
                            }`}>{currentProject.title}</h3>
                            <div className="flex items-center justify-center lg:justify-start space-x-1.5 sm:space-x-2.5">
                              {currentProject.colors.map((color, index) => (
                                <div
                                  key={index}
                                  className={`w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full border ${
                                    isDark ? 'border-white/30' : 'border-gray-400/30'
                                  }`}
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-5">
                            {currentProject.elements.map((element, index) => (
                              <div
                                key={index}
                                className={`h-10 sm:h-16 lg:h-20 rounded-md sm:rounded-lg lg:rounded-xl border border-dashed flex items-center justify-center relative overflow-hidden group ${
                                  isDark ? 'border-gray-600' : 'border-gray-400'
                                }`}
                                style={{
                                  background: `linear-gradient(45deg, ${currentProject.colors[index % 3]}15, ${currentProject.colors[(index + 1) % 3]}15)`,
                                  animationDelay: `${index * 0.2}s`
                                }}
                              >
                                <span className={`text-xs sm:text-sm lg:text-base uppercase tracking-wide font-medium ${
                                  isDark ? 'text-gray-400' : 'text-gray-600'
                                }`}>{element}</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 sm:mt-6 lg:mt-8 flex justify-center space-x-1.5 sm:space-x-2.5">
                            {projects.map((_, index) => (
                              <div
                                key={index}
                                className={`h-1 sm:h-2 lg:h-2.5 rounded-full transition-all duration-300 ${
                                  index === activeScreen ? `w-4 sm:w-6 lg:w-8 ${isDark ? 'bg-lime-400' : 'bg-green-500'}` : `w-1 sm:w-2 lg:w-2.5 ${isDark ? 'bg-gray-600' : 'bg-gray-400'}`
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating elements with proper icons */}
                  {floatingElements.map((element, index) => (
                    <div
                      key={index}
                      className={`absolute w-8 h-8 sm:w-12 sm:h-12 lg:w-18 lg:h-18 xl:w-20 xl:h-20 backdrop-blur-2xl rounded-lg sm:rounded-xl border flex items-center justify-center text-lg sm:text-xl lg:text-2xl xl:text-3xl transition-all duration-300 ${
                        isDark 
                          ? 'border-gray-600/50 bg-gray-800/30 hover:bg-gray-700/50' 
                          : 'border-gray-300/60 bg-gray-100/80 hover:bg-gray-200/90'
                      } ${element.color}`}
                      style={{
                        ...element.position,
                        transform: element.transform,
                      }}
                    >
                      <element.Icon className="w-4 h-4 sm:w-6 sm:h-6 lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;