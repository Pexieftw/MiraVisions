"use client"
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Abdellah Z',
      company: 'Rapide Scooter',
      role: 'CEO & Founder',
      image: 'https://miravisions.com/wp-content/uploads/2024/03/image_2024-03-08_144651712-150x150.png',
      quote: 'Mira Visions transformed our startup idea into a compelling brand identity. Their creative approach and attention to detail exceeded our expectations.',
      rating: 5,
      highlight: 'Brand Identity'
    },
    {
      name: 'Sam H',
      company: 'Blue Sky Property Services',
      role: 'Managing Director',
      image: 'https://miravisions.com/wp-content/uploads/2024/03/image_2024-03-08_144651712-150x150.png',
      quote: 'The website they built for our real estate business has generated 300% more leads. Professional, responsive, and results-driven team.',
      rating: 5,
      highlight: '300% More Leads'
    },
    {
      name: 'Mohamed A',
      company: 'Pure Buys',
      role: 'E-commerce Director',
      image: 'https://miravisions.com/wp-content/uploads/2024/03/image_2024-03-08_144651712-150x150.png',
      quote: 'From concept to launch, Mira Visions handled our e-commerce platform flawlessly. Sales increased by 250% in the first quarter.',
      rating: 5,
      highlight: '250% Sales Increase'
    },
    {
      name: 'Rayan O',
      company: 'Tech Startup',
      role: 'Product Manager',
      image: 'https://miravisions.com/wp-content/uploads/2024/03/image_2024-03-08_144651712-150x150.png',
      quote: 'Their design thinking and strategic approach helped us stand out in a crowded market. Highly recommend for any serious business.',
      rating: 5,
      highlight: 'Market Leadership'
    }
  ];

  return (
    <section id="testimonials" className="py-10 lg:py-14 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-lime-500/10 border border-lime-500/20 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
            <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></div>
            <span className="text-lime-600 dark:text-lime-400 text-xs sm:text-sm font-medium">SUCCESS STORIES</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            What Our <span className="text-lime-500">Clients</span> Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real results from real businesses who trusted us with their vision
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
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
              <div className="relative p-8 lg:p-10 rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden">
                
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5 dark:opacity-10">
                  <div className="w-full h-full bg-gradient-to-br from-lime-400 to-emerald-500 rounded-full transform translate-x-16 -translate-y-16"></div>
                </div>
                
                <div className="absolute top-6 right-6 text-4xl text-lime-200 dark:text-lime-800 opacity-50">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h8V14h-4c0-1.1.9-2 2-2h2V8h-2zm12 0c-3.3 0-6 2.7-6 6v10h8V14h-4c0-1.1.9-2 2-2h2V8h-2z"/>
                  </svg>
                </div>

                <div className="flex items-start mb-6">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="relative mr-4 flex-shrink-0"
                  >
                    <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-lime-100 dark:ring-lime-900/50 shadow-lg">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-lg flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.div>
                  
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                      {testimonial.role}
                    </p>
                    <p className="text-lime-600 dark:text-lime-400 text-sm font-semibold">
                      {testimonial.company}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-lime-400/20 to-emerald-500/20 text-lime-700 dark:text-lime-400 px-3 py-1 rounded-full text-xs font-semibold border border-lime-200 dark:border-lime-800">
                    {testimonial.highlight}
                  </div>
                </div>

                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.svg 
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + i * 0.1 }}
                      className="w-5 h-5 text-yellow-400 fill-current mr-1" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    5.0
                  </span>
                </div>

                <blockquote className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed font-medium relative z-10">
                  "{testimonial.quote}"
                </blockquote>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-lime-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;