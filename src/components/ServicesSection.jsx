"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Palette, Star, Video, ArrowRight, Check } from "lucide-react";

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      title: "Website Creation",
      shortTitle: "Websites",
      description:
        "Upgrade your brand with our Website Creation service, crafting a captivating online presence perfectly in tune with your unique vision. Shopify, WordPress, Wix... we do it all!",
      icon: Globe,
      features: [
        "Shopify Development",
        "WordPress Sites",
        "Wix Customization",
        "Mobile Responsive",
      ],
      image:
        "https://miravisions.com/wp-content/uploads/2024/10/websitecreation-2048x2048.webp",
    },
    {
      title: "Graphic Design",
      shortTitle: "Graphics",
      description:
        "Transforming ideas into visual masterpieces. Our Graphic Design expertise knows no limits. Visuals crafted to your unique identity. Socials Media Graphics, Advertisements, Posters & more!",
      icon: Palette,
      features: [
        "Social Media Graphics",
        "Print Advertisements",
        "Poster Design",
        "Digital Assets",
      ],
      image:
        "https://miravisions.com/wp-content/uploads/2024/10/graphicdesign.webp",
    },
    {
      title: "Brand Identity",
      shortTitle: "Branding",
      description:
        "Going beyond just logos, our Brand Identity services tell your story through color, message, and design. A lasting impression with a brand uniquely aligned with your visions!",
      icon: Star,
      features: [
        "Logo Design",
        "Brand Guidelines",
        "Visual Identity",
        "Brand Strategy",
      ],
      image:
        "https://miravisions.com/wp-content/uploads/2024/10/brandidentity2-2048x2048.webp",
    },
    {
      title: "Creative Media",
      shortTitle: "Media",
      description:
        "Dive your audience in a visual journey!. Our Creative Mmedia services go beyond 3D Design, Motion Graphics, Video Editing... We got you covered on anything!",
      icon: Video,
      features: ["3D Design", "Motion Graphics", "Video Editing", "Animation"],
      image:
        "https://miravisions.com/wp-content/uploads/2024/10/creativemedia2.webp",
    },
  ];

  const ActiveIcon = services[activeService].icon;

  return (
    <section
      id="services"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-bl from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(163, 230, 53, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(163, 230, 53, 0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
					<div className="inline-flex items-center gap-2 bg-lime-500/10 border border-lime-500/20 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
            <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></div>
            <span className="text-lime-600 dark:text-lime-400 text-xs sm:text-sm font-medium">OFFERED SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent mb-4">
            Our Premium Services
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Upgrade your online presence with our comprehensive design solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <div className="space-y-3 sm:space-y-4">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const isActive = activeService === index;

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveService(index)}
                  className="group cursor-pointer"
                >
                  <motion.div
                    className={`relative p-4 sm:p-6 rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? "bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-lime-400/40 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                        : "bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border-gray-300/30 dark:border-gray-700/30 hover:bg-white/60 dark:hover:bg-gray-800/60 hover:border-lime-400/30"
                    }`}
                    animate={{ scale: isActive ? 1.02 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
										<motion.div
											className="absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full bg-gradient-to-b from-lime-400 to-emerald-500"
											animate={{ height: isActive ? 40 : 0, opacity: isActive ? 1 : 0 }}
											transition={{ duration: 0.3 }}
										/>

                    <div className="flex items-center space-x-4">
                      <motion.div
                        className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-br from-lime-400 to-emerald-500 text-white shadow-lg"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-gray-200 dark:group-hover:bg-gray-600"
                        }`}
                        animate={{ scale: isActive ? 1.1 : 1, rotate: isActive ? [0, -5, 5, 0] : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <motion.h3
                          className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                            isActive
                              ? "text-gray-900 dark:text-white"
                              : "text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white"
                          }`}
                        >
                          {service.title}
                        </motion.h3>
                        <p
                          className={`text-sm transition-colors duration-300 ${
                            isActive ? "text-gray-600 dark:text-gray-300" : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          Click to explore features
                        </p>
                      </div>

                      <motion.div
                        animate={{ x: isActive ? 4 : 0, rotate: isActive ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex-shrink-0 transition-colors duration-300 ${
                          isActive ? "text-lime-500" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                        }`}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-8 h-full flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="relative flex-1"
              >
                <div className="relative h-full min-h-[28rem] rounded-3xl overflow-hidden group">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={services[activeService].image}
                      alt={services[activeService].title}
                      className="w-full h-full object-cover"
                    />
										<div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/50 to-transparent rounded-2xl" />
                  </motion.div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                    <motion.div
                      className="flex items-center space-x-3 mb-3"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.35 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-400 to-emerald-500 flex items-center justify-center">
                        <ActiveIcon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold">
                        {services[activeService].title}
                      </h3>
                    </motion.div>

                    <motion.p
                      className="text-gray-200 text-sm sm:text-base leading-relaxed max-w-2xl"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.35 }}
                    >
                      {services[activeService].description}
                    </motion.p>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {services[activeService].features.map((f, i) => (
                        <div key={f} className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="text-sm sm:text-base text-white/90">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    animate={{
                      boxShadow: [
                        "0 0 0 2px rgba(132, 204, 22, 0.30)",
                        "0 0 0 4px rgba(132, 204, 22, 0.45)",
                        "0 0 0 2px rgba(132, 204, 22, 0.30)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-2 lg:hidden">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveService(index)}
              className="relative"
            >
              <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
              <motion.div
                className="absolute inset-0 w-2 h-2 rounded-full bg-gradient-to-r from-lime-400 to-emerald-500"
                animate={{ scale: activeService === index ? 1 : 0, opacity: activeService === index ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
