'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

const ContactSection = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', null
  const [focusedField, setFocusedField] = useState(null)
  const [validationErrors, setValidationErrors] = useState({})

  const validateField = (name, value) => {
    const errors = { ...validationErrors }
    
    switch (name) {
      case 'name':
        if (value.trim().length < 2) {
          errors.name = 'Name must be at least 2 characters'
        } else if (value.trim().length > 100) {
          errors.name = 'Name must be less than 100 characters'
        } else {
          delete errors.name
        }
        break
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (value.trim() && !emailRegex.test(value.trim())) {
          errors.email = 'Please enter a valid email address'
        } else {
          delete errors.email
        }
        break
      
      case 'message':
        const messageLength = value.trim().length
        if (messageLength > 0 && messageLength < 10) {
          errors.message = `Message too short (${messageLength}/10 minimum)`
        } else if (messageLength > 2000) {
          errors.message = `Message too long (${messageLength}/2000 maximum)`
        } else {
          delete errors.message
        }
        break
    }
    
    setValidationErrors(errors)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    validateField(name, value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const finalErrors = {}
    
    if (!formData.name.trim()) {
      finalErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      finalErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email.trim()) {
      finalErrors.email = 'Email is required'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email.trim())) {
        finalErrors.email = 'Please enter a valid email address'
      }
    }
    
    if (!formData.message.trim()) {
      finalErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      finalErrors.message = `Message must be at least 10 characters (currently ${formData.message.trim().length})`
    }

    if (Object.keys(finalErrors).length > 0) {
      setValidationErrors(finalErrors)
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          service: formData.service,
          message: formData.message.trim()
        })
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          message: ''
        })
        setValidationErrors({})
        console.log('Contact form submitted successfully:', result)
      } else {
        console.error('API Error:', result)
        setSubmitStatus('error')
      }

    } catch (error) {
      console.error('Network Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }


  const inputVariants = {
    focused: { scale: 1.02, transition: { type: "spring", stiffness: 300 } },
    unfocused: { scale: 1, transition: { type: "spring", stiffness: 300 } }
  }

  return (
    <section id="contact" className={`relative py-10 lg:py-14 overflow-hidden ${
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
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
            }`}>GET IN TOUCH</span>
          </div>
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Ready to <span className="text-green-600">Start</span> Your Project?
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Let's discuss how we can help you achieve your goals <br/>and bring your vision to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="xl:col-span-2"
          >
            <div className="relative h-full">
              <div className={`relative p-8 lg:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border h-full overflow-hidden group ${
                isDark 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-100'
              }`}>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <motion.div
                    variants={inputVariants}
                    animate={focusedField === 'name' ? 'focused' : 'unfocused'}
                  >
                    <label className={`block text-sm font-bold mb-2 uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-base h-14 ${
                        isDark 
                          ? 'bg-gray-700/70 text-white' 
                          : 'bg-gray-50/70 text-gray-900'
                      } ${
                        validationErrors.name 
                          ? 'border-red-400 focus:border-red-400' 
                          : isDark
                            ? 'border-gray-600 focus:border-green-600 focus:ring-2 focus:ring-green-600/20'
                            : 'border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-600/20'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {validationErrors.name && (
                      <p className={`mt-1 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>{validationErrors.name}</p>
                    )}
                  </motion.div>

                  <motion.div
                    variants={inputVariants}
                    animate={focusedField === 'email' ? 'focused' : 'unfocused'}
                  >
                    <label className={`block text-sm font-bold mb-2 uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-base h-14 ${
                        isDark 
                          ? 'bg-gray-700/70 text-white' 
                          : 'bg-gray-50/70 text-gray-900'
                      } ${
                        validationErrors.email 
                          ? 'border-red-400 focus:border-red-400' 
                          : isDark
                            ? 'border-gray-600 focus:border-green-600 focus:ring-2 focus:ring-green-600/20'
                            : 'border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-600/20'
                      }`}
                      placeholder="your@email.com"
                    />
                    {validationErrors.email && (
                      <p className={`mt-1 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>{validationErrors.email}</p>
                    )}
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <motion.div
                    variants={inputVariants}
                    animate={focusedField === 'company' ? 'focused' : 'unfocused'}
                  >
                    <label className={`block text-sm font-bold mb-2 uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-base h-14 ${
                        isDark 
                          ? 'bg-gray-700/70 text-white border-gray-600 focus:border-green-600 focus:ring-2 focus:ring-green-600/20' 
                          : 'bg-gray-50/70 text-gray-900 border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-600/20'
                      }`}
                      placeholder="Company name (optional)"
                    />
                  </motion.div>

                  <motion.div
                    variants={inputVariants}
                    animate={focusedField === 'service' ? 'focused' : 'unfocused'}
                  >
                    <label className={`block text-sm font-bold mb-2 uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Service Interest
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('service')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-base h-14 ${
                        isDark 
                          ? 'bg-gray-700/70 text-white border-gray-600 focus:border-green-600 focus:ring-2 focus:ring-green-600/20' 
                          : 'bg-gray-50/70 text-gray-900 border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-600/20'
                      }`}
                    >
                      <option value="">Select a service</option>
                      <option value="website">Website Development</option>
                      <option value="branding">Brand Identity</option>
                      <option value="graphics">Graphic Design</option>
                      <option value="media">Creative Media</option>
                      <option value="multiple">Multiple Services</option>
                      <option value="consultation">Consultation</option>
                    </select>
                  </motion.div>
                </div>

                <motion.div
                  variants={inputVariants}
                  animate={focusedField === 'message' ? 'focused' : 'unfocused'}
                  className="mb-6"
                >
                  <label className={`block text-sm font-bold mb-2 uppercase tracking-wider ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Project Details <span className="text-red-500">*</span>
                    <span className={`text-xs font-normal ml-2 ${
                      isDark ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      ({formData.message.length}/2000 characters, minimum 10)
                    </span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    key={theme}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-base resize-none min-h-[120px] ${
                      isDark 
                          ? 'bg-gray-700/70 text-white placeholder-gray-400'
                          : 'bg-gray-50/70 text-gray-900 placeholder-gray-500'}
                    } ${
                      validationErrors.message 
                        ? 'border-red-400 focus:border-red-400' 
                        : isDark
                          ? 'border-gray-600 focus:border-green-600 focus:ring-2 focus:ring-green-600/20'
                          : 'border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-600/20'
                    }`}
                    placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                  />
                  {validationErrors.message && (
                    <p className={`mt-1 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>{validationErrors.message}</p>
                  )}
                </motion.div>

                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting || Object.keys(validationErrors).length > 0}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative overflow-hidden cursor-pointer bg-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl"
                >
                  <motion.div
                    animate={{
                      x: isSubmitting ? ['-100%', '100%'] : '0%',
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: isSubmitting ? Infinity : 0,
                      ease: "linear"
                    }}
                    className=""
                  />
                  <span className="relative z-10">
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`mt-4 p-3 rounded-lg text-center font-semibold ${
                        submitStatus === 'success' 
                          ? isDark 
                            ? 'bg-emerald-900/20 text-emerald-300 border border-emerald-700' 
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : isDark 
                            ? 'bg-red-900/20 text-red-300 border border-red-700'
                            : 'bg-red-100 text-red-800 border border-red-200'
                      }`}
                    >
                      {submitStatus === 'success' 
                        ? 'Message sent successfully! We\'ll get back to you within 24 hours.' 
                        : 'Something went wrong. Please try again or contact us directly.'}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col h-full"
          >
            <div className="flex flex-col justify-between h-full space-y-6">
              {/* Email Card - Smaller */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -8 }}
                className={`p-6 rounded-3xl border flex flex-col justify-center shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-100'
                }`}
              >
                <div className="flex items-center mb-4 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Email Us</h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Direct communication</p>
                  </div>
                </div>
                <motion.a 
                  href="mailto:info@miravision.com"
                  whileHover={{ scale: 1.05 }}
                  className={`text-base font-bold transition-colors relative z-10 ${
                    isDark ? 'text-green-400 hover:text-emerald-400' : 'text-green-600 hover:text-emerald-600'
                  }`}
                >
                  info@miravision.com
                </motion.a>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>

              {/* Quick Response Card - Larger */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -8 }}
                className={`p-6 rounded-3xl border flex-1 flex flex-col justify-center shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-100'
                }`}
              >
                <div className="flex items-center mb-4 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Response</h5>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Fast turnaround</p>
                  </div>
                </div>
                <p className={`text-sm leading-relaxed relative z-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  We typically respond to all inquiries within 24 hours during business days. Urgent projects get priority attention.
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>

              {/* Expertise Card - Larger */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -8 }}
                className={`p-6 rounded-3xl border flex-1 flex flex-col justify-center shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-100'
                }`}
              >
                <div className="flex items-center mb-4 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Expertise</h5>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>What we do best</p>
                  </div>
                </div>
                <div className="space-y-2 relative z-10">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mr-3 flex-shrink-0"></span>
                    <span className={`font-medium text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Website Development</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full mr-3 flex-shrink-0"></span>
                    <span className={`font-medium text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Brand Identity Design</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mr-3 flex-shrink-0"></span>
                    <span className={`font-medium text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Creative Media Solutions</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection