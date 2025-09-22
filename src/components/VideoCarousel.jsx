"use client"

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, X, SkipBack, SkipForward } from "lucide-react";
import { useTheme } from '@/contexts/ThemeContext';

const VideoCarousel = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const intervalRef = useRef(null);
  const videoRef = useRef(null);
  const modalVideoRef = useRef(null);
  const progressRef = useRef(null);
  const lastVideoIndexRef = useRef(currentIndex);

  const videos = [
    {
      id: 1,
      title: "Elixir",
      videoUrl: "videos/WA0001.webm",
      thumbnail: "thumbnails/WA0001.webp"
    },
    {
      id: 2,
      title: "Pardus Consilio",
      videoUrl: "videos/WA0002.webm",
      thumbnail: "thumbnails/WA0002.webp"
    },
    {
      id: 3,
      title: "Harenberg",
      videoUrl: "videos/WA0003.webm",
      thumbnail: "thumbnails/WA0003.webp"
    },
    {
      id: 4,
      title: "Candy Cloud",
      videoUrl: "videos/WA0004.webm",
      thumbnail: "thumbnails/WA0004.webp"
    },
    {
      id: 5,
      title: "Frizzies",
      videoUrl: "videos/WA0005.webm",
      thumbnail: "thumbnails/WA0005.webp"
    },
    {
      id: 6,
      title: "Frizzies",
      videoUrl: "videos/WA0006.webm",
      thumbnail: "thumbnails/WA0006.webp"
    },
    {
      id: 7,
      title: "That'so",
      videoUrl: "videos/WA0007.webm",
      thumbnail: "thumbnails/WA0007.webp"
    },
    {
      id: 8,
      title: "Haute Lueur",
      videoUrl: "videos/WA0008.webm",
      thumbnail: "thumbnails/WA0008.webp"
    }
  ];

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Reset auto-scroll timer
  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!isModalOpen) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
      }, 10000);
    }
  };

  // Auto-scroll
  useEffect(() => {
    if (!isModalOpen) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
      }, 10000); 
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isModalOpen, videos.length]);

  useEffect(() => {
    if (videoRef.current && !isModalOpen) {
      const video = videoRef.current;
      video.muted = true;
      video.play().catch(() => {});
    }
  }, [currentIndex, isModalOpen]);

  useEffect(() => {
    if (isModalOpen && modalVideoRef.current) {
      const video = modalVideoRef.current;

      // Only reset when the selected video changes
      if (lastVideoIndexRef.current !== currentIndex) {
        video.currentTime = 0;
        setCurrentTime(0);
        lastVideoIndexRef.current = currentIndex;
      }

      video.muted = isMuted;

      const updateTime = () => {
        setCurrentTime(video.currentTime);
        setDuration(video.duration || 0);
      };

      video.addEventListener('timeupdate', updateTime);
      video.addEventListener('loadedmetadata', updateTime);

      if (isPlaying) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }

      return () => {
        video.removeEventListener('timeupdate', updateTime);
        video.removeEventListener('loadedmetadata', updateTime);
      };
    }
  }, [isModalOpen, currentIndex, isPlaying, isMuted]);

  useEffect(() => {
    if (isModalOpen && modalVideoRef.current) {
      modalVideoRef.current.muted = isMuted;
    }
  }, [isMuted, isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
    setIsPlaying(true);
    resetTimer();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsPlaying(true);
    setIsMuted(true);
    setCurrentTime(0);
    setDuration(0);
    resetTimer(); 
  };

  const togglePlayPause = () => {
    if (modalVideoRef.current) {
      if (isPlaying) {
        modalVideoRef.current.pause();
      } else {
        modalVideoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const seekTo = (time) => {
    if (modalVideoRef.current) {
      modalVideoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const skipTime = (seconds) => {
    if (modalVideoRef.current) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      seekTo(newTime);
    }
  };

  const handleProgressClick = (e) => {
    if (progressRef.current && modalVideoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * duration;
      seekTo(newTime);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetTimer(); 
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    resetTimer(); 
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
    resetTimer(); 
  };

  const getVisibleSlides = () => {
    const prev = (currentIndex - 1 + videos.length) % videos.length;
    const next = (currentIndex + 1) % videos.length;
    return { prev, current: currentIndex, next };
  };

  const { prev, current, next } = getVisibleSlides();

  return (
    <>
      <section className={`relative py-8 sm:py-10 lg:py-12 overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 to-slate-800'
          : 'bg-gradient-to-br from-white to-slate-200'
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
          
          <div className="text-center mb-16">
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
              }`}>SHORTS SHOWCASE</span>
            </div>
            
            <h2 className={`text-4xl lg:text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-6 ${
              isDark 
                ? 'from-white via-gray-200 to-white' 
                : 'from-gray-900 via-gray-700 to-gray-900'
            }`}>
              Motion & Video Portfolio
            </h2>
            
            <p className={`text-xl max-w-3xl mx-auto mb-8 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Experience our creative video content and motion graphics in action
            </p>
          </div>

          <div className="relative lg:mx-20">
            <div className="flex items-center justify-center gap-4 sm:gap-8 lg:gap-16 overflow-hidden">
              
              <motion.div 
                key={`prev-${prev}`}
                initial={{ opacity: 0, scale: 0.7, x: -50 }}
                animate={{ opacity: 0.7, scale: 0.75, x: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="hidden sm:block relative w-48 h-80 rounded-2xl overflow-hidden cursor-pointer group shrink-0"
                onClick={goToPrevious}
              >
                {videos[prev].thumbnail ? (
                  <img
                    src={videos[prev].thumbnail}
                    alt={videos[prev].title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-white/20 rounded-lg mb-3 mx-auto flex items-center justify-center">
                        <Play className="w-8 h-8" />
                      </div>
                      <p className="text-sm font-medium">{videos[prev].title}</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>{videos[prev].title}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                key={`current-${current}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative w-56 sm:w-64 lg:w-72 aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl cursor-pointer hover:shadow-3xl transition-shadow duration-500 shrink-0 group"
                onClick={openModal}
              >
                
                <video
                  ref={videoRef}
                  key={`video-${current}`}
                  src={videos[current].videoUrl}
                  className="w-full h-full object-cover pointer-events-none"
                  muted
                  autoPlay
                  loop
                  playsInline
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20">
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                      {videos[current].title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-white/80 text-sm">Video {current + 1}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-3xl ring-2 ring-green-400/50" />
              </motion.div>

              <motion.div 
                key={`next-${next}`}
                initial={{ opacity: 0, scale: 0.7, x: 50 }}
                animate={{ opacity: 0.7, scale: 0.75, x: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="hidden sm:block relative w-48 h-80 rounded-2xl overflow-hidden cursor-pointer group shrink-0"
                onClick={goToNext}
              >
                {videos[next].thumbnail ? (
                  <img
                    src={videos[next].thumbnail}
                    alt={videos[next].title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-white/20 rounded-lg mb-3 mx-auto flex items-center justify-center">
                        <Play className="w-8 h-8" />
                      </div>
                      <p className="text-sm font-medium">{videos[next].title}</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>{videos[next].title}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <button
              onClick={goToPrevious}
              className={`hidden lg:flex absolute -left-20 top-1/2 -translate-y-1/2 w-14 h-14 backdrop-blur-sm rounded-full items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-30 ${
                isDark 
                  ? 'bg-gray-800/90 hover:bg-gray-700/90' 
                  : 'bg-white/90 hover:bg-gray-50/90'
              }`}
            >
              <ChevronLeft className={`w-7 h-7 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`} />
            </button>
            
            <button
              onClick={goToNext}
              className={`hidden lg:flex absolute -right-20 top-1/2 -translate-y-1/2 w-14 h-14 backdrop-blur-sm rounded-full items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-30 ${
                isDark 
                  ? 'bg-gray-800/90 hover:bg-gray-700/90' 
                  : 'bg-white/90 hover:bg-gray-50/90'
              }`}
            >
              <ChevronRight className={`w-7 h-7 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`} />
            </button>

            <button
              onClick={goToPrevious}
              className={`lg:hidden flex justify-center items-center absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 z-30 ${
                isDark 
                  ? 'bg-gray-800/80 hover:bg-gray-700/90' 
                  : 'bg-white/80 hover:bg-gray-50/90'
              }`}
            >
              <ChevronLeft className={`w-5 h-5 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`} />
            </button>
            
            <button
              onClick={goToNext}
              className={`lg:hidden flex absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 backdrop-blur-sm rounded-full items-center justify-center shadow-lg transition-all duration-300 z-30 ${
                isDark 
                  ? 'bg-gray-800/80 hover:bg-gray-700/90' 
                  : 'bg-white/80 hover:bg-gray-50/90'
              }`}
            >
              <ChevronRight className={`w-5 h-5 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`} />
            </button>
          </div>

          <div className="flex justify-center mt-8 sm:mt-12 gap-3">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative w-3 h-3 rounded-full transition-colors"
              >
                <div className={`w-3 h-3 rounded-full ${
                  isDark ? 'bg-gray-600' : 'bg-gray-300'
                }`} />
                
                {index === currentIndex && (
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500" />
                )}
              </button>
            ))}
          </div>

          <div className="lg:hidden text-center mt-6">
            <p className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Tap to watch • Use arrows to navigate
            </p>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative max-w-sm w-full h-[80vh] max-h-[700px] bg-black rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              
              <button
                onClick={closeModal}
                className="cursor-pointer absolute top-4 right-4 z-50 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={toggleMute}
                className="cursor-pointer absolute top-4 left-4 z-50 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>

              <button
                onClick={goToPrevious}
                className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors z-40"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              
              <button
                onClick={goToNext}
                className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors z-40"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>

              <video
                ref={modalVideoRef}
                src={videos[current].videoUrl}
                className="cursor-pointer w-full h-full object-cover"
                loop
                playsInline
              />

              <div className="cursor-pointer absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                
                <div 
                  ref={progressRef}
                  className="w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>

                <div className="flex justify-between items-center mb-4 text-white text-sm">
                  <span>{formatTime(currentTime)}</span>
                  <h3 className="text-lg font-bold">{videos[current].title}</h3>
                  <span>{formatTime(duration)}</span>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => skipTime(-2)}
                    className="cursor-pointer w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <SkipBack className="w-5 h-5 text-white" />
                  </button>

                  <button
                    onClick={togglePlayPause}
                    className="cursor-pointer w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-1" />
                    )}
                  </button>

                  <button
                    onClick={() => skipTime(2)}
                    className="cursor-pointer w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <SkipForward className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoCarousel;