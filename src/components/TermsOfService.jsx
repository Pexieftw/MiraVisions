'use client'

import { useState } from 'react'

const TermsOfService = () => {
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

  const tosItems = [
    {
      id: 'acceptance',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      title: 'Acceptance of Terms',
      preview: 'By using our website or services, you agree to these Terms of Service.',
      content: [
        'These Terms of Service (“Terms”) govern your access to and use of the Mira Visions website, products, and services.',
        'By accessing or using any part of our services, you agree to be bound by these Terms and our Privacy Policy.',
        'If you are using our services on behalf of an organization, you represent that you have authority to bind that organization to these Terms.',
        'If you do not agree to these Terms, you may not use our services.'
      ]
    },
    {
      id: 'services',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
        </svg>
      ),
      title: 'Services & Accounts',
      preview: 'Scope of our offerings, eligibility, and account responsibilities.',
      content: [
        'We provide design, development, brand, and creative media services as described on our website or in your proposal.',
        'Certain services may require an account or shared credentials (e.g., hosting, CMS, analytics); you are responsible for safeguarding access.',
        'You must be at least the age of majority in your jurisdiction to engage our services.',
        'We may update, modify, or discontinue any service component with reasonable notice where practical.'
      ]
    },
    {
      id: 'quotes-payments',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.306.835 2.417 2 2.83V18m1-14v2m0 10h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Quotes, Payments & Billing',
      preview: 'Proposals, deposits, invoices, and late payment policies.',
      content: [
        'Quotes and proposals are valid for a limited time as stated in the document or email.',
        'Projects may require a non-refundable deposit to reserve schedule and begin work.',
        'Invoices are due upon receipt unless otherwise specified; late payments may accrue fees or pause project delivery.',
        'All fees are exclusive of taxes unless stated; you are responsible for applicable taxes, duties, and levies.'
      ]
    },
    {
      id: 'scope-changes',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2m4-4h.01M5 7h.01M7 21a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v5" />
        </svg>
      ),
      title: 'Project Scope & Changes',
      preview: 'How we handle revisions, change requests, and timelines.',
      content: [
        'Project scope, deliverables, and milestones will be outlined in your proposal or statement of work.',
        'Reasonable revisions are included as specified; substantial changes or new features may require a change order and additional fees.',
        'Timelines depend on your timely feedback, approvals, and content delivery.',
        'Delays caused by missing inputs or extended approvals may shift delivery dates.'
      ]
    },
    {
      id: 'ip-rights',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A2 2 0 0122 9.528V14.5a2 2 0 01-1.105 1.789L15 19M9 10L4.447 7.724A2 2 0 002 9.528V14.5a2 2 0 001.105 1.789L9 19m6-9v9M9 10v9" />
        </svg>
      ),
      title: 'Intellectual Property',
      preview: 'Ownership of work, licenses, and portfolio usage.',
      content: [
        'Upon full payment, the final approved deliverables are assigned or licensed to you as specified in your proposal.',
        'Pre-existing tools, libraries, frameworks, and internal methods remain the intellectual property of Mira Visions.',
        'We may showcase non-confidential work (e.g., screenshots, links, case studies) in our portfolio and marketing unless you request otherwise in writing.',
        'You are responsible for ensuring you have rights to any assets you provide (fonts, images, copy, trademarks).'
      ]
    },
    {
      id: 'client-responsibilities',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7 20h10a2 2 0 002-2V8l-6-4H7a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Client Responsibilities',
      preview: 'Provide timely feedback, approvals, and accurate content.',
      content: [
        'Provide accurate and complete information, content, and brand assets required to complete the project.',
        'Design and development rely on timely feedback and approvals to meet milestones.',
        'You are responsible for your compliance with applicable laws (e.g., accessibility, data protection, industry rules).',
        'You must keep credentials and confidential details secure and share them only with authorized personnel.'
      ]
    },
    {
      id: 'confidentiality',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Confidentiality',
      preview: 'We protect sensitive information shared during the project.',
      content: [
        'Both parties agree to keep confidential information secure and use it only for the purposes of the project.',
        'We employ reasonable safeguards to protect your confidential data.',
        'Confidentiality obligations do not apply to information already public, independently developed, or lawfully obtained.'
      ]
    },
    {
      id: 'warranties-disclaimer',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M9 16h6M8 8h8M5 12V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H9" />
        </svg>
      ),
      title: 'Warranties & Disclaimers',
      preview: 'Services are provided “as is” with commercially reasonable skill and care.',
      content: [
        'We provide services with commercially reasonable skill and care, but we do not guarantee specific outcomes such as rankings, conversions, or revenue.',
        'Except as expressly stated, the services are provided “as is” and “as available,” without warranties of any kind, whether express or implied.',
        'Third-party services, platforms, APIs, and hosting are outside our control and may affect performance or availability.'
      ]
    },
    {
      id: 'limitation-liability',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2 2 2m-2-2v6m0-6l-2-2m2 2l2-2M12 6v.01" />
        </svg>
      ),
      title: 'Limitation of Liability',
      preview: 'Our liability is limited to the fees paid for the affected services.',
      content: [
        'To the maximum extent permitted by law, Mira Visions will not be liable for indirect, incidental, special, consequential, or punitive damages.',
        'Our total liability for any claim related to the services will not exceed the amount you paid for the specific services giving rise to the claim.',
        'Nothing in these Terms limits liability that cannot be limited by law.'
      ]
    },
    {
      id: 'termination',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      title: 'Term, Suspension & Termination',
      preview: 'When and how either party may terminate services.',
      content: [
        'Either party may terminate a project or ongoing services for convenience with written notice as defined in the proposal or agreement.',
        'We may suspend or terminate services immediately for material breach, non-payment, unlawful activity, or security risks.',
        'Upon termination, you remain responsible for fees incurred and work completed to date.'
      ]
    },
    {
      id: 'refunds',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11a4 4 0 110 8H7" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l-4-3 4-3" />
        </svg>
      ),
      title: 'Refunds & Cancellations',
      preview: 'How deposits and partial work are handled if a project stops.',
      content: [
        'Deposits are typically non-refundable as they reserve production time and cover initial work.',
        'If a project is canceled, you will be invoiced for work performed and expenses incurred up to the date of cancellation.',
        'Any exceptions to refund policies must be agreed in writing.'
      ]
    },
    {
      id: 'third-party',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Third-Party Services',
      preview: 'We may integrate tools we don’t control (hosting, CMS, APIs, payment gateways).',
      content: [
        'Our work may rely on third-party providers such as hosting, CMS, plugins, analytics, fonts, and payment gateways.',
        'Your use of third-party services is governed by their terms and policies.',
        'We are not responsible for third-party outages, policy changes, security incidents, or data loss.'
      ]
    },
    {
      id: 'compliance',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7M9 17V9m6 8V7" />
        </svg>
      ),
      title: 'Compliance & Acceptable Use',
      preview: 'Prohibited uses, unlawful content, and security obligations.',
      content: [
        'You may not use our services for unlawful, fraudulent, defamatory, or infringing activities.',
        'You may not probe or disrupt the security, integrity, or availability of our systems.',
        'You are responsible for ensuring your content and business practices comply with applicable laws and regulations (including accessibility and consumer protections).'
      ]
    },
    {
      id: 'international',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 0c2.5 2.5 2.5 12.5 0 15m0-15C9.5 5.5 5.5 9.5 3 12m9-9c2.5 2.5 6.5 6.5 9 9m-9 9c-2.5-2.5-6.5-6.5-9-9" />
        </svg>
      ),
      title: 'International Use & Data',
      preview: 'Cross-border access and data considerations.',
      content: [
        'Our services may be accessed internationally; you are responsible for compliance with local laws.',
        'Data may be processed and stored in locations outside your country. See our Privacy Policy for details.',
        'By using our services, you consent to such transfers where applicable.'
      ]
    },
    {
      id: 'changes',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v6h6M20 20v-6h-6M20 4l-6 6m-4 4l-6 6" />
        </svg>
      ),
      title: 'Changes to These Terms',
      preview: 'We may update Terms to reflect changes in services or laws.',
      content: [
        'We may modify these Terms from time to time. Changes become effective when posted on our website unless otherwise stated.',
        'Your continued use of the services after changes signifies your acceptance of the updated Terms.',
        'Material changes will be highlighted or communicated when feasible.'
      ]
    },
    {
      id: 'governing',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4-4 4 4M12 3v10" />
        </svg>
      ),
      title: 'Governing Law & Disputes',
      preview: 'Venue, law, and good-faith resolution.',
      content: [
        'These Terms are governed by the laws of the applicable jurisdiction specified in your proposal or invoice (or, if none, our principal place of business), without regard to conflict of laws principles.',
        'The parties will attempt in good faith to resolve disputes informally before pursuing formal remedies.',
        'Venue and jurisdiction will be as specified in the governing documents or otherwise where Mira Visions operates.'
      ]
    },
    {
      id: 'contact',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Contact Us',
      preview: 'Questions about these Terms? Reach out anytime.',
      content: [
        'We’re happy to clarify any part of these Terms or discuss custom agreements where needed.',
        'For questions, please contact us at info@miravision.com.',
        'We aim to respond within one business day.'
      ]
    }
  ]

  return (
    <section id="terms" className="relative py-16 pt-32 lg:py-20 lg:pt-40 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
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
            <span className="text-sm font-medium uppercase tracking-wider text-green-400">Terms of Service</span>
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-white">
            Our <span className="text-green-600">Terms</span> of Service
          </h2>

          <p className="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-300">
            Please read these Terms carefully. They explain your rights and responsibilities when you use Mira Visions’ website and services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ),
              title: 'Clear Agreements',
              description: 'Every project starts with a defined scope, deliverables, and timeline so you always know what to expect.'
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.306.835 2.417 2 2.83V18" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v2m0 12h.01" />
                </svg>
              ),
              title: 'Fair Billing',
              description: 'Transparent quotes, milestone invoicing, and clear policies for changes, refunds, and cancellations.'
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3a9 9 0 100 18 9 9 0 000-18z" />
                </svg>
              ),
              title: 'Responsible Use',
              description: 'Use our services lawfully, protect credentials, and provide timely feedback to keep projects moving.'
            }
          ].map((h, i) => (
            <div
              key={i}
              className="text-center p-8 rounded-3xl border bg-gray-800/50 border-gray-700 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white">{h.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{h.title}</h3>
              <p className="text-base leading-relaxed text-gray-300">{h.description}</p>
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
          {tosItems.map((item) => (
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
                    <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-base text-gray-300">{item.preview}</p>
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
                    {item.content.map((point, idx) => (
                      <li key={idx} className="flex items-start space-x-4">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mt-3 flex-shrink-0"></div>
                        <p className="text-base leading-relaxed text-gray-300">{point}</p>
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
            <h3 className="text-3xl font-bold mb-6 text-white">Questions About These Terms?</h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-300">
              We’re here to help. Contact our team for clarifications, custom contract requests, or anything else you need to proceed confidently.
            </p>
            <a
              href="mailto:info@miravision.com?subject=Terms%20of%20Service%20Question"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Contact Legal</span>
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Last updated: September 22, 2025 • By using our services, you agree to these Terms.
          </p>
        </div>
      </div>
    </section>
  )
}

export default TermsOfService
