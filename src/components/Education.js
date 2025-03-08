"use client"
import { useEffect, useRef, useState } from "react"

const educationData = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Guru Jambheshwar University of Science and Technology",
    period: "2022-2026",
    details: "CGPA: 7.80/10",
    icon: "🎓",
  },
  {
    degree: "B.Sc (Hons.) in Chemistry, Math",
    institution: "Kirori Mal College",
    period: "2021 - 2022",
    details: "",
    icon: "🔬",
  },
  {
    degree: "Higher Secondary Education",
    institution: "RPS Public School, Narnaul",
    period: "2021",
    details: "12th Percentage: 94.60%",
    icon: "🏫",
  },
]

const Education = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState(null)
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // 3D tilt effect for education cards
  useEffect(() => {
    const handleMouseMove = (e, index) => {
      const card = cardRefs.current[index]
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Calculate rotation based on mouse position (more subtle than projects)
      const rotateX = ((y - centerY) / centerY) * 5 // Max 5 degrees
      const rotateY = ((x - centerX) / centerX) * 5 // Max 5 degrees

      // Apply the 3D rotation
      card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    }

    const handleMouseLeave = (index) => {
      const card = cardRefs.current[index]
      if (!card) return

      // Reset the transform
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
    }

    // Add event listeners to each card
    cardRefs.current.forEach((card, index) => {
      if (card) {
        card.addEventListener("mousemove", (e) => handleMouseMove(e, index))
        card.addEventListener("mouseleave", () => handleMouseLeave(index))
      }
    })

    // Cleanup
    return () => {
      cardRefs.current.forEach((card, index) => {
        if (card) {
          card.removeEventListener("mousemove", (e) => handleMouseMove(e, index))
          card.removeEventListener("mouseleave", () => handleMouseLeave(index))
        }
      })
    }
  }, [isVisible])

  return (
    <section id="education" ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-gray-900/0 to-gray-900/0"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-white inline-block relative">
            Education
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-purple-500"></span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">My academic background and qualifications</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {educationData.map((edu, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`relative bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-xl transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              } group`}
              style={{
                transitionDelay: `${index * 200}ms`,
                transformStyle: "preserve-3d",
              }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Icon */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-700 rounded-full text-2xl shadow-lg">
                {edu.icon}
              </div>

              {/* Content */}
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                <p className="text-teal-400 mb-2">{edu.institution}</p>
                <p className="text-gray-400 mb-3">{edu.period}</p>
                {edu.details && <p className="text-gray-300">{edu.details}</p>}
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-teal-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Border animation */}
              <div className="absolute inset-0 rounded-xl border border-teal-500/0 group-hover:border-teal-500/50 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education

