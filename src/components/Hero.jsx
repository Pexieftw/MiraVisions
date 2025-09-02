"use client";
import { useState, useEffect, useRef } from 'react';

const Hero = ({ isLoaded = true }) => {
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

  const projects = [
    {
      type: 'Website',
      title: 'E-commerce Platform',
      colors: ['rgb(var(--lime-400))', 'rgb(var(--green-500))', 'rgb(var(--emerald-500))'],
      elements: ['header', 'hero', 'products', 'footer'],
      icon: '🌐'
    },
    {
      type: 'Mobile App',
      title: 'Creative Studio App',
      colors: ['rgb(var(--green-500))', 'rgb(var(--emerald-500))', 'rgb(var(--cyan-500))'],
      elements: ['navbar', 'dashboard', 'gallery', 'profile'],
      icon: '📱'
    },
    {
      type: 'Brand Identity',
      title: 'Luxury Brand Suite',
      colors: ['rgb(var(--emerald-500))', 'rgb(var(--cyan-500))', 'rgb(var(--blue-500))'],
      elements: ['logo', 'colors', 'typography', 'assets'],
      icon: '✨'
    },
    {
      type: 'UI/UX Design',
      title: 'SaaS Dashboard',
      colors: ['rgb(var(--cyan-500))', 'rgb(var(--blue-500))', 'rgb(var(--violet-500))'],
      elements: ['sidebar', 'analytics', 'widgets', 'controls'],
      icon: '🎨'
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
          ? 'rgba(163, 230, 53,' 
          : 'rgba(34, 197, 94,';
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
  }, [isMobile]);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-200 dark:from-black dark:via-gray-900 dark:to-gray-800 transition-colors duration-300"
      onMouseUp={handleInteractionEnd}
      onTouchEnd={handleInteractionEnd}
    >
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-40"
      />

      <div 
        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(163, 230, 53, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(163, 230, 53, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center min-h-screen py-12 sm:py-16 lg:py-20 gap-8 lg:gap-16">
          
          <div className="lg:w-1/2 text-center lg:text-left space-y-6 sm:space-y-8 lg:space-y-10">
            
            <div 
              className={`inline-flex items-center relative px-4 py-2 sm:px-6 sm:py-3 lg:px-6 lg:py-3 mb-4 sm:mb-6 lg:mb-6 group ${
                isLoaded ? 'opacity-0 translate-y-5 animate-[badge-slide_0.8s_ease-out_0.2s_both]' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 rounded-full backdrop-blur-xl bg-gradient-to-r from-lime-400/10 via-emerald-500/10 to-lime-400/10 border border-lime-400/30 transition-opacity duration-300 group-hover:opacity-80" />
              <div className="relative flex items-center">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-lime-400 rounded-full mr-2 sm:mr-3 lg:mr-3 animate-pulse" />
                <span className="text-lime-400 font-semibold tracking-[0.15em] text-xs sm:text-sm uppercase">
                  Expert Design Studio
                </span>
              </div>
            </div>

            <div className={`${isLoaded ? 'opacity-0 translate-y-8 animate-[title-cascade_1s_ease-out_0.4s_both]' : 'opacity-0'}`}>
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl font-black leading-[0.9] mb-4 sm:mb-6 tracking-tight">
                <span className="block text-gray-800 dark:text-gray-100 font-light mb-1 sm:mb-2">We Design</span>
                <span 
                  className="block bg-gradient-to-r from-lime-400 via-emerald-500 to-lime-400 bg-clip-text text-transparent font-black animate-[gradient-shift_3s_ease-in-out_infinite]"
                  style={{ backgroundSize: '200% 200%' }}
                >
                  DIGITAL
                </span>
                <span className="block text-gray-800 dark:text-gray-100 font-light mt-1 sm:mt-2">Experiences.</span>
              </h1>
            </div>

            <div className={`${isLoaded ? 'opacity-0 translate-y-5 animate-[subtitle-reveal_0.8s_ease-out_0.8s_both]' : 'opacity-0'}`}>
              <div className="max-w-2xl mx-auto lg:mx-0 space-y-4 sm:space-y-5">
                <p className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                  From <span className="text-lime-400 font-semibold">stunning websites</span> to 
                  {' '}<span className="text-emerald-400 font-semibold">powerful brand identities</span>, 
                  we transform your vision into reality.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 text-sm sm:text-sm lg:text-base text-gray-500 dark:text-gray-400">
                  <span className="inline-flex items-center">
                    <span className="text-base sm:text-lg mr-2 sm:mr-3">🎨</span> 
                    <span className="font-medium">Creative Excellence</span>
                  </span>
                  <span className="inline-flex items-center">
                    <span className="text-base sm:text-lg mr-2 sm:mr-3">⚡</span> 
                    <span className="font-medium">Lightning Fast</span>
                  </span>
                  <span className="inline-flex items-center">
                    <span className="text-base sm:text-lg mr-2 sm:mr-3">🚀</span> 
                    <span className="font-medium">Results Driven</span>
                  </span>
                </div>
              </div>
            </div>

            <div className={`grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 lg:gap-3 justify-center lg:justify-start ${isLoaded ? 'opacity-0 translate-y-5 animate-[cta-reveal_0.8s_ease-out_1.2s_both]' : 'opacity-0'}`}>
              {[
                { name: 'UI/UX Design', short: 'UI/UX', icon: '🎨' },
                { name: 'Web Development', short: 'Web Dev', icon: '💻' },
                { name: 'Brand Identity', short: 'Branding', icon: '✨' },
                { name: 'Mobile Apps', short: 'Mobile', icon: '📱' }
              ].map((service, index) => (
                <span
                  key={index}
                  className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 lg:px-4 lg:py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-300/60 dark:border-gray-700/60 rounded-xl lg:rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-lime-400/60 hover:text-lime-400 hover:bg-gray-100/60 dark:hover:bg-gray-700/60 transition-all duration-300 group cursor-pointer text-center"
                >
                  <span className="mr-1 sm:mr-2 text-sm sm:text-base lg:text-base group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </span>
                  <span className="hidden sm:inline lg:hidden">{service.short}</span>
                  <span className="sm:hidden lg:inline">{service.name}</span>
                </span>
              ))}
            </div>

            <div className={`flex justify-center lg:justify-start ${isLoaded ? 'opacity-0 translate-y-5 animate-[cta-reveal_0.8s_ease-out_1.4s_both]' : 'opacity-0'}`}>
              <button
                onClick={() => scrollToSection('contact')}
                className="relative overflow-hidden bg-gradient-to-r from-lime-400 via-emerald-500 to-lime-400 text-gray-900 rounded-full font-bold text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg px-6 py-3 sm:px-8 sm:py-4 lg:px-8 lg:py-4 transition-all duration-500 transform hover:scale-105 hover:shadow-[0_25px_50px_-12px_rgba(163,230,53,0.5)] group border-none cursor-pointer shadow-[0_0_0_rgba(163,230,53,0.5)]"
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
                className="relative cursor-grab select-none w-80 h-56 sm:w-96 sm:h-72 md:w-[420px] md:h-[300px] lg:w-[480px] lg:h-[360px] xl:w-[520px] xl:h-[400px] transition-transform duration-500 ease-out active:cursor-grabbing"
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
                    className="absolute bottom-0 left-1/2 w-20 h-12 sm:w-24 sm:h-14 md:w-28 md:h-16 lg:w-32 lg:h-18 xl:w-36 xl:h-20 rounded-lg border border-gray-600 bg-gradient-to-t from-gray-800 to-gray-600 dark:from-gray-800 dark:to-gray-600"
                    style={{ transform: 'translateZ(-20px) translateX(-50%)' }}
                  />
                  
                  <div 
                    className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl border-4 sm:border-6 lg:border-8 border-gray-300 dark:border-gray-600 bg-gradient-to-br from-slate-100 to-slate-300 dark:from-gray-800 dark:to-gray-900 transition-all duration-300 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
                    style={{ 
                      transform: 'translateZ(0px)'
                    }}
                  >
                    
                    <div className="w-full h-full rounded-md sm:rounded-lg md:rounded-xl overflow-hidden relative bg-gradient-to-br from-slate-100 to-slate-300 dark:from-gray-800 dark:to-gray-900">
                      
                      <div 
                        className="absolute inset-0 transition-all duration-1000 ease-in-out rounded-md sm:rounded-lg md:rounded-xl"
                        style={{
                          background: `linear-gradient(135deg, ${currentProject.colors[0]}20, ${currentProject.colors[1]}20, ${currentProject.colors[2]}20)`
                        }}
                      >
                        
                        <div className="flex items-center justify-between p-3 sm:p-4 lg:p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-300/50 dark:border-gray-700/50">
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-red-500 rounded-full" />
                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-yellow-500 rounded-full" />
                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-green-500 rounded-full" />
                          </div>
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <span className="text-lg sm:text-xl lg:text-2xl">{currentProject.icon}</span>
                            <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-300 font-medium hidden sm:inline">{currentProject.type}</span>
                          </div>
                        </div>
                        
                        <div className="p-3 sm:p-4 lg:p-6">
                          <div className="mb-4 sm:mb-5 lg:mb-6">
                            <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 dark:text-white mb-2 sm:mb-3">{currentProject.title}</h3>
                            <div className="flex items-center justify-center lg:justify-start space-x-1 sm:space-x-2">
                              {currentProject.colors.map((color, index) => (
                                <div
                                  key={index}
                                  className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full border border-gray-400/30 dark:border-white/30"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                            {currentProject.elements.map((element, index) => (
                              <div
                                key={index}
                                className="h-8 sm:h-12 lg:h-16 rounded-sm sm:rounded-md lg:rounded-lg border border-dashed border-gray-400 dark:border-gray-600 flex items-center justify-center relative overflow-hidden group"
                                style={{
                                  background: `linear-gradient(45deg, ${currentProject.colors[index % 3]}15, ${currentProject.colors[(index + 1) % 3]}15)`,
                                  animationDelay: `${index * 0.2}s`
                                }}
                              >
                                <span className="text-xs sm:text-xs lg:text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide font-medium">{element}</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 sm:mt-5 lg:mt-6 flex justify-center space-x-1 sm:space-x-2">
                            {projects.map((_, index) => (
                              <div
                                key={index}
                                className={`h-1 sm:h-1.5 lg:h-2 rounded-full transition-all duration-300 ${
                                  index === activeScreen ? 'bg-lime-400 w-4 sm:w-5 lg:w-6' : 'bg-gray-600 w-1 sm:w-1.5 lg:w-2'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div
                    className="absolute w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 backdrop-blur-2xl rounded-lg sm:rounded-xl border border-gray-300/60 dark:border-gray-600/50 flex items-center justify-center text-sm sm:text-lg lg:text-2xl bg-gray-100/80 dark:bg-gray-800/30 transition-all duration-300 hover:bg-gray-200/90 dark:hover:bg-gray-700/50"
                    style={{
                      right: isMobile ? '-25px' : '-60px',
                      top: isMobile ? '20px' : '40px',
                      transform: `translateZ(20px) rotateY(${-time * 15}deg)`,
                    }}
                  >
                    📐
                  </div>
                  
                  <div
                    className="absolute w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 backdrop-blur-2xl rounded-lg sm:rounded-xl border border-gray-300/60 dark:border-gray-600/50 flex items-center justify-center text-sm sm:text-lg lg:text-2xl bg-gray-100/80 dark:bg-gray-800/30 transition-all duration-300 hover:bg-gray-200/90 dark:hover:bg-gray-700/50"
                    style={{
                      left: isMobile ? '-25px' : '-50px',
                      bottom: isMobile ? '20px' : '30px',
                      transform: `translateZ(25px) rotateY(${time * 10}deg)`,
                    }}
                  >
                    💡
                  </div>
                  
                  <div
                    className="absolute w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 backdrop-blur-2xl rounded-lg sm:rounded-xl border border-gray-300/60 dark:border-gray-600/50 flex items-center justify-center text-sm sm:text-lg lg:text-2xl bg-gray-100/80 dark:bg-gray-800/30 transition-all duration-300 hover:bg-gray-200/90 dark:hover:bg-gray-700/50"
                    style={{
                      right: isMobile ? '-25px' : '-50px',
                      bottom: isMobile ? '50px' : '60px',
                      transform: `translateZ(15px) rotateY(${-time * 25}deg)`,
                    }}
                  >
                    🚀
                  </div>
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