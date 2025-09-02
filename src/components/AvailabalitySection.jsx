"use client"
import { motion } from 'framer-motion';

const AvailabilitySection = () => {
  return (
    <section className="py-12 bg-gray-50 bg-gradient-to-bl from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Why Choose <span className="text-lime-500">Mira Visions</span>?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the difference of dedicated attention - max 3 projects for premium results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 h-full flex flex-col"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-500 dark:text-gray-400 mb-2">
                Other Agencies
              </h3>
              <p className="text-sm text-gray-400">Quantity Over Quality</p>
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
                    i == 7 ? 'bg-lime-600 opacity-50 text-white' :
                    i < 8 ? 'bg-gray-300 text-gray-600' :
                    i < 8 ? 'bg-gray-300 text-gray-600' :
                    'bg-gray-200 text-gray-400'
                  }`}
                >
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-gray-600 opacity-30"
                    style={{ height: `${i < 3 ? 30 : i < 8 ? 15 : 5}%` }}
                  />
                  <span className="relative z-10">P{i + 1}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {['Stretched thin', 'Delayed delivery', 'Generic results'].map((problem, index) => (
                <div key={index} className="flex items-center bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                  {problem}
                </div>
              ))}
            </div>
            
            <div className="bg-gray-300 dark:bg-gray-700 p-4 rounded-xl text-center mt-auto">
              <div className="text-3xl font-bold text-gray-600 dark:text-gray-400">15%</div>
              <div className="text-sm text-gray-500">attention per project</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-1 flex justify-center"
          >
            <div className="bg-gradient-to-r from-lime-400 to-emerald-500 rounded-full w-20 h-20 flex items-center justify-center shadow-xl">
              <span className="text-2xl font-bold text-gray-900">VS</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 p-6 rounded-2xl bg-lime-50 dark:bg-lime-900/20 border-2 border-lime-200 dark:border-lime-800 relative h-full flex flex-col"
          >
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-lime-400 to-emerald-500 text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              ⭐ WINNER
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-lime-700 dark:text-lime-400 mb-2">
                Mira Visions
              </h3>
              <p className="text-sm text-lime-600 dark:text-lime-300">Quality Over Quantity</p>
            </div>
            
            <div className="flex justify-center gap-4 mb-6">
              {Array.from({ length: 3 }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="w-34 h-34 rounded-xl text-lg font-bold bg-lime-400 text-gray-900 shadow-lg flex items-center justify-center relative overflow-hidden"
                >
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-lime-600 opacity-50"
                    style={{ height: '95%' }}
                  />
                  <span className="relative z-10">P{i + 1}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {['Premium focus', 'On-time delivery', 'Custom solutions'].map((benefit, index) => (
                <div key={index} className="flex items-center bg-lime-100 dark:bg-lime-900/20 px-3 py-1 rounded-full text-xs text-lime-700 dark:text-lime-300">
                  <div className="w-3 h-3 rounded-full bg-lime-500 mr-2"></div>
                  {benefit}
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-lime-400 to-emerald-500 p-4 rounded-xl text-center text-gray-900 mt-auto">
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