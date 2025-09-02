'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ContactSection = () => {
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
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        service: formData.service,
        message: formData.message.trim()
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

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
      } else {
        console.error('API Error:', data)
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
    <section id="contact" className="relative py-20 lg:py-32 bg-gradient-to-bl from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 150, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative inline-block"
          >
            <h2 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-lime-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent mb-8">
              Get In Touch
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Ready to bring your project to life? Let's discuss how we can help you achieve your goals.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="xl:col-span-2 flex"
          >
            <div className="relative flex-1">
              <div className="absolute -inset-1 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-3xl blur-lg opacity-25"></div>
              <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-white/20 dark:border-gray-700/20 shadow-2xl h-full flex flex-col">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <motion.div
                    variants={inputVariants}
                    animate={focusedField === 'name' ? 'focused' : 'unfocused'}
                  >
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
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
                      className={`w-full p-5 rounded-2xl border-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-4 focus:ring-lime-400/20 transition-all duration-300 text-lg min-h-[60px] ${
                        validationErrors.name 
                          ? 'border-red-400 focus:border-red-400' 
                          : 'border-gray-200 dark:border-gray-600 focus:border-lime-400'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {validationErrors.name && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{validationErrors.name}</p>
                    )}
                  </motion.div>

                  <motion.div
                    variants={inputVariants}
                    animate={focusedField === 'email' ? 'focused' : 'unfocused'}
                  >
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
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
                      className={`w-full p-5 rounded-2xl border-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-4 focus:ring-lime-400/20 transition-all duration-300 text-lg min-h-[60px] ${
                        validationErrors.email 
                          ? 'border-red-400 focus:border-red-400' 
                          : 'border-gray-200 dark:border-gray-600 focus:border-lime-400'
                      }`}
                      placeholder="your@email.com"
                    />
                    {validationErrors.email && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{validationErrors.email}</p>
                    )}
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <motion.div
                    variants={inputVariants}
                    animate={focusedField === 'company' ? 'focused' : 'unfocused'}
                  >
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white focus:border-lime-400 focus:ring-4 focus:ring-lime-400/20 transition-all duration-300 text-lg min-h-[60px]"
                      placeholder="Company name (optional)"
                    />
                  </motion.div>

                  <motion.div
                    variants={inputVariants}
                    animate={focusedField === 'service' ? 'focused' : 'unfocused'}
                  >
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                      Service Interest
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('service')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white focus:border-lime-400 focus:ring-4 focus:ring-lime-400/20 transition-all duration-300 text-lg min-h-[60px]"
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
                  className="mb-8 flex-1"
                >
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                    Project Details <span className="text-red-500">*</span>
                    <span className="text-xs font-normal ml-2 text-gray-500">
                      ({formData.message.length}/2000 characters, minimum 10)
                    </span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full p-5 rounded-2xl border-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-4 focus:ring-lime-400/20 transition-all duration-300 text-lg resize-none flex-1 min-h-[200px] ${
                      validationErrors.message 
                        ? 'border-red-400 focus:border-red-400' 
                        : 'border-gray-200 dark:border-gray-600 focus:border-lime-400'
                    }`}
                    placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                  />
                  {validationErrors.message && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{validationErrors.message}</p>
                  )}
                </motion.div>

                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting || Object.keys(validationErrors).length > 0}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-lime-400 via-emerald-500 to-teal-600 text-gray-900 py-6 px-8 rounded-2xl font-black text-xl transition-all duration-300 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
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
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
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
                      className={`mt-6 p-4 rounded-xl text-center font-semibold ${
                        submitStatus === 'success' 
                          ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700' 
                          : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-700'
                      }`}
                    >
                      {submitStatus === 'success' 
                        ? 'Message sent successfully! We\'ll get back to you within 24 hours.' 
                        : 'Something went wrong. Please try again or contact us directly.'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex"
          >
            <div className="space-y-8 flex flex-col h-full flex-1">
              <div className="relative">
                <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/40 dark:border-gray-700/40 flex-1">
                  <div className="flex items-center mb-6">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-16 h-16 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-2xl flex items-center justify-center mr-4"
                    >
                      <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white">Email Us</h3>
                      <p className="text-gray-600 dark:text-gray-400">Direct communication</p>
                    </div>
                  </div>
                  <motion.a 
                    href="mailto:info@miravision.com"
                    whileHover={{ scale: 1.05 }}
                    className="text-lg font-bold text-lime-600 hover:text-emerald-600 transition-colors"
                  >
                    info@miravision.com
                  </motion.a>
                </div>
              </div>

              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/40 dark:border-gray-700/40 flex-1 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h5 className="font-black text-gray-900 dark:text-white text-lg">Quick Response</h5>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We typically respond to all inquiries within 24 hours during business days. Urgent projects get priority attention.
                </p>
              </div>

              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/40 dark:border-gray-700/40 flex-1">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-lime-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h5 className="font-black text-gray-900 dark:text-white text-lg">Our Expertise</h5>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-full mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Website Development</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Brand Identity Design</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-gradient-to-r from-teal-600 to-lime-400 rounded-full mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Creative Media Solutions</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-gradient-to-r from-lime-500 to-emerald-400 rounded-full mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Digital Strategy Consulting</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection