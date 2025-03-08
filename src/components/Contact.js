"use client"
import { useEffect, useRef, useState } from "react"
import { FiUser, FiMail, FiMessageSquare } from 'react-icons/fi'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [status, setStatus] = useState({ message: '', type: '' })
  const [isSending, setIsSending] = useState(false)
  const sectionRef = useRef(null)
  const formRef = useRef()
  const containerRef = useRef()

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // 3D Tilt Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      containerRef.current.style.transform = `
        perspective(1000px)
        rotateX(${(centerY - y) / 25}deg)
        rotateY(${(x - centerX) / 25}deg)
        scale3d(1.02, 1.02, 1.02)
      `
    }

    const handleMouseLeave = () => {
      if (containerRef.current) {
        containerRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)'
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSending(true)

    try {
      await emailjs.sendForm(
        'service_b8mv89a',
        'template_acfajlf',
        formRef.current,
        'sE8SUY9AM62nfxe7n'
      )
      
      setStatus({ message: 'Message sent successfully! 🎉', type: 'success' })
      formRef.current.reset()
    } catch (error) {
      setStatus({ message: 'Failed to send message. Please try again.', type: 'error' })
    } finally {
      setIsSending(false)
      setTimeout(() => setStatus({ message: '', type: '' }), 5000)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-gray-900/0 to-gray-900/0 pointer-events-none"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-white inline-block relative">
            Get In Touch
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-purple-500"></span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Let's create something amazing together</p>
        </div>

        <div className="max-w-2xl mx-auto transform transition-all duration-1000">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={`relative bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-xl transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div 
              ref={containerRef} 
              className="space-y-6 transform-preserve pointer-events-none"
            >
              {/* Name Field */}
              <div className="pointer-events-auto">
                <div className="relative group">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-400 transition-colors" />
                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 text-white placeholder-gray-400 
                              focus:ring-2 focus:ring-teal-500 focus:bg-white/10 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="pointer-events-auto">
                <div className="relative group">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-400 transition-colors" />
                  <input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 text-white placeholder-gray-400 
                              focus:ring-2 focus:ring-teal-500 focus:bg-white/10 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="pointer-events-auto">
                <div className="relative group">
                  <FiMessageSquare className="absolute left-4 top-4 text-gray-400 group-focus-within:text-teal-400 transition-colors" />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 text-white placeholder-gray-400 
                              focus:ring-2 focus:ring-teal-500 focus:bg-white/10 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pointer-events-auto">
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3 px-6 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg font-semibold
                            text-white hover:scale-[1.02] transform transition-all duration-300 hover:shadow-xl
                            disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSending ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-teal-500/10 rounded-full blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="absolute inset-0 rounded-xl border border-teal-500/0 hover:border-teal-500/50 transition-all duration-500 pointer-events-none"></div>
          </form>

          {/* Status Message */}
          {status.message && (
            <div className={`mt-6 p-4 rounded-lg transition-all duration-300 ${
              status.type === 'success' 
                ? 'bg-green-900/50 border border-green-400' 
                : 'bg-red-900/50 border border-red-400'
            }`}>
              <p className={`text-center font-medium ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {status.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact