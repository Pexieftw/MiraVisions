"use client"
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const TestimonialsSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const testimonials = [
    {
      name: 'Abdellah Z',
      company: 'Rapide Scooter',
      role: 'CEO & Founder',
      image: '/testimonials/picture1.webp',
      quote: 'Mira Visions transformed our startup idea into a compelling brand identity. Their creative approach and attention to detail exceeded our expectations.',
      rating: 5,
      highlight: 'Brand Identity'
    },
    {
      name: 'Sam H',
      company: 'Blue Sky Property Services',
      role: 'Managing Director',
      image: '/testimonials/picture2.webp',
      quote: 'The website they built for our real estate business has generated 300% more leads. Professional, responsive, and results-driven team.',
      rating: 5,
      highlight: '300% More Leads'
    },
    {
      name: 'Mohamed A',
      company: 'Pure Buys',
      role: 'E-commerce Director',
      image: '/testimonials/picture3.webp',
      quote: 'From concept to launch, Mira Visions handled our e-commerce platform flawlessly. Sales increased by 250% in the first quarter.',
      rating: 5,
      highlight: '250% Sales Increase'
    },
    {
      name: 'Rayan O',
      company: 'Tech Startup',
      role: 'Product Manager',
      image: '/testimonials/picture4.webp',
      quote: 'Their design thinking and strategic approach helped us stand out in a crowded market. Highly recommend for any serious business.',
      rating: 5,
      highlight: 'Market Leadership'
    }
  ];

  return (
    <section id="testimonials" className={`py-8 sm:py-10 lg:py-14 overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 to-slate-800'
        : 'bg-gradient-to-br from-white to-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className={`inline-flex items-center gap-2 rounded-full px-3 sm:px-4 lg:px-6 py-2 mb-4 sm:mb-6 ${
            isDark 
              ? 'bg-green-600/10 border border-green-600/20' 
              : 'bg-green-600/10 border border-green-600/20'
          }`}>
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              isDark ? 'bg-green-600' : 'bg-green-600'
            }`}></div>
            <span className={`text-xs sm:text-sm font-medium ${
              isDark ? 'text-green-400' : 'text-green-600'
            }`}>SUCCESS STORIES</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 px-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            What Our <span className="text-green-600">Clients</span> Say
          </h2>
          <p className={`text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-4 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Real results from real businesses who trusted us with their vision
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -8 }}
              className="group relative"
            >
              <div className={`relative p-4 sm:p-6 lg:p-8 xl:p-10 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border overflow-hidden ${
                isDark 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-100'
              }`}>
                
                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 opacity-5">
                  <div className={`w-full h-full rounded-full transform translate-x-12 sm:translate-x-16 -translate-y-12 sm:-translate-y-16 ${
                    isDark 
                      ? 'bg-gradient-to-br from-green-600 to-emerald-600 opacity-20' 
                      : 'bg-gradient-to-br from-green-400 to-emerald-500 opacity-10'
                  }`}></div>
                </div>
                
                <div className={`absolute top-2 sm:top-3 right-2 sm:right-3 text-2xl sm:text-3xl lg:text-4xl opacity-50 ${
                  isDark ? 'text-green-800' : 'text-green-200'
                }`}>
                  <svg width="24" height="24" className="sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h8V14h-4c0-1.1.9-2 2-2h2V8h-2zm12 0c-3.3 0-6 2.7-6 6v10h8V14h-4c0-1.1.9-2 2-2h2V8h-2z"/>
                  </svg>
                </div>

                {/* Mobile-first layout */}
                <div className="flex flex-col sm:flex-row sm:items-start mb-6">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="relative mb-4 sm:mb-0 sm:mr-4 flex-shrink-0 self-center sm:self-start"
                  >
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl sm:rounded-2xl overflow-hidden ring-2 shadow-lg ring-green-700">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className={`font-bold text-base sm:text-lg ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {testimonial.name}
                    </h4>
                    <p className={`text-xs sm:text-sm uppercase mb-1 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {testimonial.role}
                    </p>
                    <p className={`text-xs sm:text-sm font-semibold ${
                      isDark ? 'text-green-400' : 'text-green-600'
                    }`}>
                      {testimonial.company}
                    </p>
                  </div>

                  <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border mt-3 sm:mt-0 self-center sm:self-start ${
                    isDark 
                      ? 'bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 border-green-800' 
                      : 'bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-700 border-green-200'
                  }`}>
                    {testimonial.highlight}
                  </div>
                </div>

                <div className="flex justify-center sm:justify-start items-center mb-4 sm:mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.svg 
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + i * 0.1 }}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current mr-1" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                  <span className={`text-xs sm:text-sm ml-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    5.0
                  </span>
                </div>

                <blockquote className={`text-sm sm:text-base lg:text-lg leading-relaxed font-medium relative z-10 text-center sm:text-left ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  "{testimonial.quote}"
                </blockquote>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;