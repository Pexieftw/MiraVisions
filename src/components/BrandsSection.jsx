"use client"
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
// TODO: add grids

const BrandsSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const brands = [
    { id: 1, name: "Rapide Scooter",     logoUrl: "/brands/rapide_scooter.svg" },
    { id: 2, name: "Automax",            logoUrl: "/brands/automax.svg" },
    { id: 3, name: "Beach Day Every Day",logoUrl: "/brands/beach_day_every_day.svg" },
    { id: 4, name: "Blue Sky",           logoUrl: "/brands/blue_sky.svg" },
    { id: 5, name: "Casadior",           logoUrl: "/brands/casadior.svg" },
    { id: 6, name: "Frizzies",           logoUrl: "/brands/frizzies.svg" },
    { id: 7, name: "Muslim Blocks",      logoUrl: "/brands/muslim_blocks.svg" },
    { id: 8, name: "Pure Buys",          logoUrl: "/brands/pure_buys.svg" },
  ];

  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className={`pt-12 lg:pt-20 overflow-hidden relative ${
        isDark
          ? 'bg-gradient-to-br from-slate-900 to-slate-800'
          : 'bg-gradient-to-br from-white to-slate-200'

    }`}>
      {/* grid */}
      <div
        className={`absolute inset-0 ${isDark ? 'opacity-[0.08]' : 'opacity-[0.12]'}`}
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,197,94,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.6) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 50px 50px',
          pointerEvents: 'none',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 lg:mb-16"
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
            }`}>TRUSTED PARTNERSHIPS</span>
          </div>
          
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 leading-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Brands That <span className="bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent">Trust Us</span>
          </h2>
          <p className={`text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join the elite circle of brands that have transformed <br /> their digital presence with 
            <span className={`font-semibold ${
              isDark ? 'text-green-400' : 'text-green-600'
            }`}> Mira Visions</span>
          </p>
        </motion.div>

        <div className="relative mb-8 lg:mb-16 mx-auto" style={{ 
          maxWidth: '100%',
          WebkitMask: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
          mask: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)'
        }}>
          
          <div className={`relative backdrop-blur-sm rounded-xl lg:rounded-2xl border overflow-hidden ${
            isDark 
              ? 'bg-gray-800/30 border-green-800/50' 
              : 'bg-white/50 border-green-200'
          }`}>
            
            <div className="py-6 sm:py-8 lg:py-12">
              <motion.div
                animate={{ x: [-100, -2000] }}
                transition={{
                  duration: 50,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="flex items-center gap-6 sm:gap-12 lg:gap-20 whitespace-nowrap"
                style={{ width: 'max-content' }}
              >
                {duplicatedBrands.map((brand, index) => (
                  <motion.div
                    key={`${brand.id}-${index}`}
                    className="flex-shrink-0 group cursor-pointer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="relative">
                      <div className={`absolute inset-0 rounded-lg sm:rounded-xl lg:rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                        isDark 
                          ? 'bg-gradient-to-r from-green-600/20 to-green-600/20' 
                          : 'bg-gradient-to-r from-green-400/20 to-green-500/20'
                      }`}></div>
                      
                      <div className={`relative backdrop-blur-lg border rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 w-20 sm:w-28 lg:w-36 h-12 sm:h-16 lg:h-20 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg ${
                        isDark 
                          ? 'bg-gray-700/30 border-gray-700 hover:bg-green-900/20 hover:border-green-600 group-hover:shadow-green-500/20' 
                          : 'bg-white/70 border-gray-200 hover:bg-green-50 hover:border-green-300 group-hover:shadow-green-500/20'
                      }`}>
                        <img 
                          src={brand.logoUrl}
                          alt={brand.name}
                          className="h-6 sm:h-8 lg:h-10 w-auto object-contain opacity-60 group-hover:opacity-90 transition-all duration-300"
                          style={{ 
                            filter: isDark 
                              ? 'brightness(0) invert(1)' 
                              : 'brightness(0)'
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BrandsSection;