'use client'

import { useState } from 'react'

const PrivacyPolicy = () => {
  const [expandedSection, setExpandedSection] = useState(null)
  const [expandAll, setExpandAll] = useState(false)

  const toggleSection = (section) => {
    if (expandAll) {
      setExpandAll(false)
    }
    setExpandedSection(expandedSection === section ? null : section)
  }

  const toggleExpandAll = () => {
    const newExpandAll = !expandAll
    setExpandAll(newExpandAll)
    if (!newExpandAll) {
      setExpandedSection(null)
    }
  }

  const isExpanded = (sectionId) => {
    return expandAll || expandedSection === sectionId
  }

  const privacyItems = [
    {
      id: 'collection',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Information We Collect',
      preview: 'Personal details you provide through our contact forms and communications.',
      content: [
        'Contact information including name, email address, and company details',
        'Project requirements and communication preferences you share with us',
        'Technical data such as IP address, browser type, and device information for website optimization',
        'Cookies and similar technologies to enhance your browsing experience'
      ]
    },
    {
      id: 'usage',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'How We Use Your Data',
      preview: 'Your information helps us deliver exceptional design services and support.',
      content: [
        'Respond to your inquiries and provide project quotes and consultations',
        'Deliver our design and development services according to your requirements',
        'Send project updates, important announcements, and service communications',
        'Improve our website functionality and user experience through analytics',
        'Comply with legal obligations and protect our business interests'
      ]
    },
    {
      id: 'protection',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Data Protection',
      preview: 'Industry-standard security measures safeguard your personal information.',
      content: [
        'SSL encryption for all data transmission and form submissions',
        'Secure cloud storage with regular backups and access controls',
        'Limited access to your data on a need-to-know basis for project delivery',
        'Regular security audits and updates to our systems and processes',
        'Immediate notification procedures in the unlikely event of a data breach'
      ]
    },
    {
      id: 'sharing',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Information Sharing',
      preview: 'We never sell your data and only share with trusted service providers.',
      content: [
        'We do not sell, rent, or trade your personal information to third parties',
        'Trusted service providers may process data on our behalf (hosting, email services)',
        'Legal compliance when required by law or to protect our rights',
        'Business transfers only in case of merger, acquisition, or asset sale',
        'Your explicit consent for any other sharing purposes'
      ]
    },
    {
      id: 'rights',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Your Rights',
      preview: 'Full control over your personal data with easy access and modification options.',
      content: [
        'Access and review all personal data we hold about you',
        'Request corrections or updates to your information at any time',
        'Delete your data from our systems (subject to legal requirements)',
        'Opt-out of marketing communications while maintaining service updates',
        'Data portability - receive your data in a structured, machine-readable format'
      ]
    },
    {
      id: 'cookies',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Cookies & Tracking',
      preview: 'Essential cookies for functionality, with options to control your preferences.',
      content: [
        'Essential cookies required for website functionality and security',
        'Analytics cookies to understand user behavior and improve our services',
        'Preference cookies to remember your settings and enhance user experience',
        'No third-party advertising cookies or invasive tracking technologies',
        'Cookie management options available through your browser settings'
      ]
    }
  ]

  return (
    <section id="privacy" className="relative py-16 pt-32 lg:py-20 lg:pt-40 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
      
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,197,94,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full px-6 py-3 mb-6 bg-green-600/10 border border-green-600/20">
            <div className="w-2 h-2 rounded-full animate-pulse bg-green-400"></div>
            <span className="text-sm font-medium uppercase tracking-wider text-green-400">Privacy & Security</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-white">
            Your <span className="text-green-600">Privacy</span> Matters
          </h2>
          
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-300">
            We're committed to protecting your personal information and being transparent about how we collect, use, and safeguard your data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ),
              title: 'Data Security',
              description: 'Industry-standard encryption and security measures protect your information at every step.'
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ),
              title: 'Full Transparency',
              description: 'Clear, honest communication about what data we collect and exactly how we use it.'
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: 'Your Control',
              description: 'Complete control over your data with easy access, modification, and deletion options.'
            }
          ].map((principle, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-3xl border bg-gray-800/50 border-gray-700 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white">{principle.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">
                {principle.title}
              </h3>
              <p className="text-base leading-relaxed text-gray-300">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={toggleExpandAll}
            className="cursor-pointer inline-flex items-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {expandAll ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              )}
            </svg>
            <span>{expandAll ? 'Collapse All' : 'Expand All'}</span>
          </button>
        </div>

        <div className="space-y-6">
          {privacyItems.map((item, index) => (
            <div
              key={item.id}
              className="rounded-3xl border bg-gray-800/70 border-gray-700 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <button
                onClick={() => toggleSection(item.id)}
                className="w-full p-8 text-left flex items-center justify-between cursor-pointer group hover:scale-[1.01] transition-transform duration-300"
              >
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <span className="text-white">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-white">
                      {item.title}
                    </h3>
                    <p className="text-base text-gray-300">
                      {item.preview}
                    </p>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                    isExpanded(item.id) ? 'rotate-180' : ''
                  }`}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isExpanded(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-8">
                  <div className="w-full h-px mb-6 bg-gray-700"></div>
                  <ul className="space-y-4">
                    {item.content.map((point, pointIndex) => (
                      <li
                        key={pointIndex}
                        className="flex items-start space-x-4"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mt-3 flex-shrink-0"></div>
                        <p className="text-base leading-relaxed text-gray-300">
                          {point}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="p-10 rounded-3xl border bg-gray-800/50 border-gray-700 backdrop-blur-sm shadow-lg">
            <h3 className="text-3xl font-bold mb-6 text-white">
              Questions About Your Privacy?
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-300">
              We're here to help. Contact our team for any privacy-related questions, data requests, or concerns about how we handle your information.
            </p>
            <a
              href="mailto:info@miravision.com?subject=Privacy%20Question"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Contact Privacy Team</span>
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Last updated: September 22, 2025 • This policy is effective immediately and applies to all users.
          </p>
        </div>
      </div>
    </section>
  )
}

export default PrivacyPolicy