"use client"
import { motion } from 'framer-motion';

const BrandsSection = () => {
  const brands = [
    {
      id: 1,
      name: "Brand 1",
      logoUrl: "https://miravisions.com/wp-content/uploads/2024/03/bdedmiravisions.svg",
    },
    {
      id: 2,
      name: "Brand 2",
      logoUrl: "https://miravisions.com/wp-content/uploads/2024/03/Asset-15.svg",
    },
    {
      id: 3,
      name: "Brand 3",
      logoUrl: "https://miravisions.com/wp-content/uploads/2024/03/Asset-14.svg",
    },
    {
      id: 4,
      name: "Brand 4",
      logoUrl: "https://miravisions.com/wp-content/uploads/2024/03/Asset-13.svg",
    },
    {
      id: 5,
      name: "Brand 5",
      logoUrl: "https://miravisions.com/wp-content/uploads/2024/03/Asset-12.svg",
    },
    {
      id: 6,
      name: "Brand 6",
      logoUrl: "https://miravisions.com/wp-content/uploads/2024/03/Asset-11.svg",
    },
    {
      id: 7,
      name: "Brand 7",
      logoUrl: "https://miravisions.com/wp-content/uploads/2024/10/frzzs.svg",
    },
    {
      id: 8,
      name: "Brand 8",
      logoUrl: "https://miravisions.com/wp-content/uploads/2024/10/Casadior.svg",
    },
  ];
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="pt-12 lg:pt-20 bg-gray-50 dark:bg-gray-900/50 overflow-hidden relative">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-lime-500/10 border border-lime-500/20 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
            <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></div>
            <span className="text-lime-600 dark:text-lime-400 text-xs sm:text-sm font-medium">TRUSTED PARTNERSHIPS</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight">
            Brands That <span className="bg-gradient-to-r from-lime-500 to-lime-600 bg-clip-text text-transparent">Trust Us</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Join the elite circle of brands that have transformed <br /> their digital presence with 
            <span className="text-lime-600 dark:text-lime-400 font-semibold"> Mira Visions</span>
          </p>
        </motion.div>

        <div className="relative mb-8 lg:mb-16 mx-auto" style={{ maxWidth: '100%' }}>
          <div className="absolute left-0 top-0 w-8 sm:w-20 lg:w-32 h-full bg-gradient-to-r from-gray-50 dark:from-gray-900 via-gray-50/80 dark:via-gray-900/80 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-8 sm:w-20 lg:w-32 h-full bg-gradient-to-l from-gray-50 dark:from-gray-900 via-gray-50/80 dark:via-gray-900/80 to-transparent z-20 pointer-events-none"></div>
          
          <div className="relative bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl lg:rounded-2xl border border-lime-200 dark:border-lime-800/50 overflow-hidden">
            
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
                      <div className="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-lime-500/20 rounded-lg sm:rounded-xl lg:rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative bg-white/70 dark:bg-gray-700/30 hover:bg-lime-50 dark:hover:bg-lime-900/20 backdrop-blur-lg border border-gray-200 dark:border-gray-700 hover:border-lime-300 dark:hover:border-lime-600 rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 w-20 sm:w-28 lg:w-36 h-12 sm:h-16 lg:h-20 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-lime-500/20">
                        <img 
                          src={brand.logoUrl}
                          alt={brand.name}
                          className="h-6 sm:h-8 lg:h-10 w-auto object-contain opacity-60 dark:opacity-70 group-hover:opacity-90 transition-all duration-300"
                          style={{ 
                            filter: 'brightness(0) invert(1)'
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