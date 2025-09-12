"use client"
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

// TODO: add grids
const AvailabilitySection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`relative py-12 overflow-hidden ${
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
      <div className="max-w-7xl mx-auto px-4">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
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
            }`}>OUR AVAILABILITY</span>
          </div>
          <h2 className={`text-3xl lg:text-4xl font-bold mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Why Choose <span className="text-green-600">Mira Visions</span>?
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Experience the difference of dedicated attention <br/> max 3 projects for premium results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`lg:col-span-2 p-6 rounded-2xl h-full flex flex-col ${
              isDark ? 'bg-gray-800' : 'bg-gray-100'
            }`}
          >
            <div className="text-center mb-6">
              <h3 className={`text-xl font-bold mb-2 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Other Agencies
              </h3>
              <p className={`text-sm ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}>
                Quantity Over Quality
              </p>
            </div>
            
            <div className="grid grid-cols-5 gap-2 mb-6">
              {Array.from({ length: 15 }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className={`aspect-square rounded-lg text-xs font-semibold flex items-center justify-center relative overflow-hidden ${
                    i == 7 ? 'bg-green-600 opacity-50 text-white' :
                    i < 8 ? (isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-300 text-gray-600') :
                    (isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400')
                  }`}
                >
                  <div 
                    className={`absolute bottom-0 left-0 right-0 opacity-30 ${
                      isDark ? 'bg-gray-400' : 'bg-gray-600'
                    }`}
                    style={{ height: `${i < 3 ? 30 : i < 8 ? 15 : 5}%` }}
                  />
                  <span className="relative z-10">P{i + 1}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {['Stretched thin', 'Delayed delivery', 'Generic results'].map((problem, index) => (
                <div key={index} className={`flex items-center px-3 py-1 rounded-full text-xs ${
                  isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}>
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                  {problem}
                </div>
              ))}
            </div>
            
            <div className={`p-4 rounded-xl text-center mt-auto ${
              isDark ? 'bg-gray-700' : 'bg-gray-300'
            }`}>
              <div className={`text-3xl font-bold ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>15%</div>
              <div className={`text-sm ${
                isDark ? 'text-gray-500' : 'text-gray-500'
              }`}>attention per project</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-1 flex justify-center"
          >
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-full w-20 h-20 flex items-center justify-center shadow-xl">
              <span className="text-2xl font-bold text-white">VS</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`lg:col-span-2 p-6 rounded-2xl border-2 relative h-full flex flex-col ${
              isDark 
                ? 'bg-green-900/20 border-green-800' 
                : 'bg-green-50 border-green-200'
            }`}
          >
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              ⭐ WINNER
            </div>
            
            <div className="text-center mb-6">
              <h3 className={`text-xl font-bold mb-2 ${
                isDark ? 'text-green-400' : 'text-green-700'
              }`}>
                Mira Visions
              </h3>
              <p className={`text-sm ${
                isDark ? 'text-green-300' : 'text-green-600'
              }`}>
                Quality Over Quantity
              </p>
            </div>
            
            <div className="flex justify-center gap-4 mb-6">
              {Array.from({ length: 3 }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="w-34 h-34 rounded-xl text-lg font-bold bg-green-600 text-white shadow-lg flex items-center justify-center relative overflow-hidden"
                >
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-green-700 opacity-50"
                    style={{ height: '95%' }}
                  />
                  <span className="relative z-10">P{i + 1}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {['Premium focus', 'On-time delivery', 'Custom solutions'].map((benefit, index) => (
                <div key={index} className={`flex items-center px-3 py-1 rounded-full text-xs ${
                  isDark 
                    ? 'bg-green-900/20 text-green-300' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  {benefit}
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-xl text-center text-white mt-auto">
              <div className="text-3xl font-bold">95%</div>
              <div className="text-sm font-semibold">attention per project</div>
              <div className="text-xs opacity-80">6x better results!</div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default AvailabilitySection;