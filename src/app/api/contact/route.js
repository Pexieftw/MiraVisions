import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

const rateLimitMap = new Map()

setInterval(() => {
  const oneHourAgo = Date.now() - 60 * 60 * 1000
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.timestamp < oneHourAgo) {
      rateLimitMap.delete(key)
    }
  }
}, 60 * 60 * 1000)

function checkRateLimit(identifier, maxRequests = 15, windowMs = 60 * 60 * 1000) {
  const now = Date.now()
  const windowStart = now - windowMs

  if (!rateLimitMap.has(identifier)) {
    rateLimitMap.set(identifier, { count: 1, timestamp: now })
    return true
  }

  const record = rateLimitMap.get(identifier)
  if (record.timestamp < windowStart) {
    rateLimitMap.set(identifier, { count: 1, timestamp: now })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

function sanitizeInput(input) {
  if (typeof input !== 'string') return ''
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 5000) // Limit length
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function createZohoTransporter() {
  // Check if Zoho is properly configured
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    throw new Error('Zoho configuration missing. Please set SMTP_EMAIL and SMTP_PASSWORD environment variables.')
  }

  return nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  })
}

export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request
    const contentType = request.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type. Expected application/json.' },
        { status: 400 }
      )
    }

    let body
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json(
        { error: `Invalid JSON in request body: ${error}` },
        { status: 400 }
      )
    }

    const { name, email, company, service, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      company: sanitizeInput(company || ''),
      service: sanitizeInput(service || ''),
      message: sanitizeInput(message),
    }

    // Additional validations
    if (sanitizedData.name.length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters long.' },
        { status: 400 }
      )
    }
    
    if (sanitizedData.name.length > 100) {
      return NextResponse.json(
        { error: 'Name must be less than 100 characters.' },
        { status: 400 }
      )
    }

    if (sanitizedData.message.length < 10) {
      return NextResponse.json(
        { error: `Message is too short. Please write at least 10 characters. (Current: ${sanitizedData.message.length})` },
        { status: 400 }
      )
    }
    
    if (sanitizedData.message.length > 2000) {
      return NextResponse.json(
        { error: 'Message is too long. Please keep it under 2000 characters.' },
        { status: 500 }
      )
    }

    // Spam patterns
    const spamKeywords = ['bitcoin', 'crypto', 'investment', 'loan', 'casino']
    const messageContent = sanitizedData.message.toLowerCase()
    const hasSpam = spamKeywords.some(keyword => messageContent.includes(keyword))
    
    if (hasSpam) {
      console.warn('⚠️ Potential spam detected:', { email: sanitizedData.email, ip })
      return NextResponse.json({ message: 'Message received successfully.' })
    }

    // Create Zoho transporter
    let transporter
    try {
      transporter = createZohoTransporter()
    } catch (error) {
      console.error('❌ Failed to create Zoho transporter:', error)
      return NextResponse.json(
        { error: 'Email configuration error. Please check your Zoho Mail SMTP settings.' },
        { status: 500 }
      )
    }

    try {
      await transporter.verify()
    } catch (error) {
      console.error('❌ Zoho Mail SMTP connection failed:', error)
      
      if (error.code === 'EAUTH') {
        console.error('🔐 Zoho Mail authentication failed. Check your email credentials.')
        return NextResponse.json(
          { error: 'Zoho Mail authentication failed. Please check your email and app password.' },
          { status: 503 }
        )
      } else {
        console.error('🌐 Zoho Mail SMTP verification error:', error.message)
        return NextResponse.json(
          { error: 'Zoho Mail SMTP service temporarily unavailable. Please try again later.' },
          { status: 503 }
        )
      }
    }

    const recipients = process.env.EMAIL_RECIPIENTS 
      ? process.env.EMAIL_RECIPIENTS.split(',').map(email => email.trim())
      : ['info@miravisions.com'] // fallback

    // Validate recipients
    const validRecipients = recipients.filter(isValidEmail)
    if (validRecipients.length === 0) {
      console.error('❌ No valid recipients configured')
      return NextResponse.json(
        { error: 'Email configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    const fromName = process.env.FROM_NAME || 'MiraVision Contact System'

    const mailOptions = {
      from: `"${fromName}" <${process.env.SMTP_EMAIL}>`,
      to: validRecipients,
      replyTo: sanitizedData.email,
      subject: `New Contact Form Submission from ${sanitizedData.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          
          <!-- Header -->
          <div style="background: #f8f9fa; padding: 30px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #28a745;">
            <h1 style="margin: 0 0 10px 0; color: #28a745; font-size: 24px;">New Contact Form Submission</h1>
            <p style="margin: 0; color: #666; font-size: 14px;">Received on ${new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>

          <!-- Contact Information -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #333; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 5px;">Contact Information</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: 600; width: 100px; vertical-align: top;">Name:</td>
                <td style="padding: 8px 0;">${sanitizedData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${sanitizedData.email}" style="color: #28a745; text-decoration: none;">${sanitizedData.email}</a></td>
              </tr>
              ${sanitizedData.company ? `
              <tr>
                <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Company:</td>
                <td style="padding: 8px 0;">${sanitizedData.company}</td>
              </tr>
              ` : ''}
              ${sanitizedData.service ? `
              <tr>
                <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Service:</td>
                <td style="padding: 8px 0;"><span style="background: #cfeed6; color: #28a745; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${sanitizedData.service}</span></td>
              </tr>
              ` : ''}
            </table>
          </div>

          <!-- Message -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #333; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 5px;">Message</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 3px solid #28a745;">
              ${sanitizedData.message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <!-- Quick Actions -->
          <div style="background: #fff3cd; padding: 20px; border-radius: 6px; border: 1px solid #ffeaa7; margin-bottom: 20px;">
            <h3 style="margin: 0 0 10px 0; color: #856404; font-size: 16px;">Quick Actions</h3>
            <a href="mailto:${sanitizedData.email}?subject=Re: Your inquiry to MiraVision&body=Hi ${sanitizedData.name},%0D%0A%0D%0AThank you for contacting MiraVision! I'd love to learn more about your project.%0D%0A%0D%0ABest regards,%0D%0AThe MiraVision Team" 
               style="display: inline-block; background: #28a745; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: 500; margin-right: 10px;">
              Reply to ${sanitizedData.name}
            </a>
          </div>

          <!-- Footer -->
          <div style="border-top: 1px solid #eee; padding-top: 20px; color: #666; font-size: 12px;">
            <p style="margin: 0;">This message was sent from your MiraVision website contact form.</p>
            <p style="margin: 5px 0 0 0;">IP Address: ${ip}</p>
          </div>

        </body>
        </html>
      `,
      text: `
NEW CONTACT FORM SUBMISSION - ${new Date().toLocaleDateString()}

CONTACT INFORMATION
Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
${sanitizedData.company ? `Company: ${sanitizedData.company}` : ''}
${sanitizedData.service ? `Service: ${sanitizedData.service}` : ''}

MESSAGE
${sanitizedData.message}

REPLY TO: ${sanitizedData.email}
SOURCE: MiraVision Website Contact Form
IP: ${ip}
TIMESTAMP: ${new Date().toISOString()}
      `
    }

    let emailSent = false
    let attempts = 0
    const maxAttempts = 3

    while (!emailSent && attempts < maxAttempts) {
      try {
        attempts++
        await transporter.sendMail(mailOptions)
        emailSent = true
      } catch (error) {
        console.error(`❌ Email sending failed via Zoho Mail SMTP (attempt ${attempts}/${maxAttempts}):`, error.message)
        if (attempts >= maxAttempts) {
          console.error('💀 All Zoho Mail SMTP email attempts failed:', error)
          return NextResponse.json(
            { error: 'Unable to send message at this time. Please try again later.' },
            { status: 503 }
          )
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts - 1)))
      }
    }

    if (process.env.SEND_AUTO_REPLY === 'true') {
      try {
        await transporter.sendMail({
          from: `"${fromName}" <${process.env.SMTP_EMAIL}>`,
          to: sanitizedData.email,
          subject: `Thank you for contacting MiraVision, ${sanitizedData.name}!`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Thank you for contacting us</title>
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              
              <!-- Header -->
              <div style="background: #e8f5e8; padding: 30px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
                <h1 style="margin: 0 0 10px 0; color: #28a745; font-size: 24px;">Thank You!</h1>
                <p style="margin: 0; color: #666;">We received your message and will get back to you soon.</p>
              </div>

              <!-- Message -->
              <div style="margin-bottom: 30px;">
                <p style="font-size: 16px; margin-bottom: 20px;">Hi ${sanitizedData.name},</p>
                
                <p>Thank you for reaching out to MiraVision! We appreciate you taking the time to contact us${sanitizedData.service ? ` about our ${sanitizedData.service} services` : ''}.</p>
                
                <p>We've received your message and our team will review it carefully. You can expect to hear back from us within 24 hours.</p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 3px solid #28a745; margin: 20px 0;">
                  <h3 style="margin: 0 0 10px 0; color: #28a745; font-size: 16px;">What happens next?</h3>
                  <p style="margin: 0;">Our team will review your inquiry and prepare a personalized response with next steps for your project.</p>
                </div>
                
                <p>If you have any urgent questions in the meantime, feel free to reply to this email.</p>
                
                <p>Best regards,<br>The MiraVision Team</p>
              </div>

              <!-- Footer -->
              <div style="border-top: 1px solid #eee; padding-top: 20px; color: #666; font-size: 12px; text-align: center;">
                <p style="margin: 0;">This is an automated response to confirm we received your message.</p>
              </div>

            </body>
            </html>
          `,
          text: `
            Hi ${sanitizedData.name},

            Thank you for reaching out to MiraVision! We appreciate you taking the time to contact us${sanitizedData.service ? ` about our ${sanitizedData.service} services` : ''}.

            We've received your message and our team will review it carefully. You can expect to hear back from us within 24 hours.

            What happens next?
            Our team will review your inquiry and prepare a personalized response with next steps for your project.

            If you have any urgent questions in the meantime, feel free to reply to this email.

            Best regards,
            The MiraVision Team

            ---
            This is an automated response to confirm we received your message.
          `
        })
      } catch (autoReplyError) {
        console.warn('⚠️ Auto-reply failed via Zoho Mail SMTP, but main email was sent:', autoReplyError.message)
      }
    } else {
      console.log('Auto-reply is disabled')
    }

    return NextResponse.json(
      { 
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('💥 Unexpected error in contact API:', error)
    console.error('🔍 Error details:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    })
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit contact form.' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit contact form.' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit contact form.' },
    { status: 405 }
  )
}