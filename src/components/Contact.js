"use client"
import { useEffect, useRef, useState } from "react"

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [status, setStatus] = useState({ message: '', type: '' })
  const [isSending, setIsSending] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const sectionRef = useRef(null)

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSending(true)

    try {
      // Using Web3Forms (free service) - you'll need to get your access key
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '4f86ec13-57a6-4dab-95a1-79f9a076615e',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          to: 'kapil19092003@gmail.com',
          subject: `Portfolio Contact: Message from ${formData.name}`,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus({ 
          message: 'Message sent successfully! I\'ll get back to you soon. 🎉', 
          type: 'success' 
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      // Fallback: Show a helpful message with direct email
      setStatus({ 
        message: 'Having trouble sending? Email me directly at kapil19092003@gmail.com', 
        type: 'info' 
      })
    } finally {
      setIsSending(false)
      setTimeout(() => setStatus({ message: '', type: '' }), 8000)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-radial from-teal-900/20 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white relative inline-block">
            Get In Touch
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full"></span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? Let's collaborate and create something amazing together.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className={`bg-white/5 backdrop-blur-lg p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl transition-all duration-700 hover:shadow-teal-500/10 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-6">
              {/* Name Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 
                            focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white/10 transition-all duration-300
                            hover:border-white/20"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Email *
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 
                            focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white/10 transition-all duration-300
                            hover:border-white/20"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project or just say hello..."
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 
                            focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white/10 transition-all duration-300
                            hover:border-white/20 resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-4 px-6 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg font-semibold text-white
                          hover:from-teal-600 hover:to-cyan-700 transform hover:scale-[1.02] transition-all duration-300 
                          hover:shadow-lg hover:shadow-teal-500/25 disabled:opacity-70 disabled:cursor-not-allowed 
                          disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isSending ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Status Message */}
          {status.message && (
            <div className={`mt-6 p-4 rounded-lg border transition-all duration-300 ${
              status.type === 'success' 
                ? 'bg-green-900/30 border-green-400/50 text-green-400' 
                : status.type === 'error'
                ? 'bg-red-900/30 border-red-400/50 text-red-400'
                : 'bg-blue-900/30 border-blue-400/50 text-blue-400'
            }`}>
              <div className="flex items-center space-x-2">
                {status.type === 'success' ? (
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                ) : status.type === 'info' ? (
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                )}
                <p className="font-medium">{status.message}</p>
              </div>
            </div>
          )}

          {/* Ready to Use */}
          {/* <div className="mt-8 p-4 bg-green-900/20 border border-green-400/30 rounded-lg">
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <div className="text-green-200">
                <p className="font-medium mb-1">Contact Form Ready! ✅</p>
                <p className="text-sm leading-relaxed">
                  Your contact form is now configured and ready to send emails directly to kapil19092003@gmail.com
                </p>
              </div>
            </div>
          </div> */}

          {/* Contact Info */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">Or reach out directly:</p>
            <a 
              href="mailto:kapil19092003@gmail.com" 
              className="inline-flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span className="font-medium">kapil19092003@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact