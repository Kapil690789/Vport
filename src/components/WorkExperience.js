"use client"

import { useEffect, useRef, useState } from "react"

const workExperiences = [
  {
    title: "Full Stack Developer",
    company: "iConnectGJUS&T, Hisar (onsite)",
    date: "Dec 2024 - Present",
    description:
      "Building scalable web solutions and Techfest registration systems for 1,500+ students with 99.9% uptime.",
  },
  {
    title: "Web Developer Intern",
    company: "Drmudhiwalla, New Delhi (Remote)",
    date: "Jan 2025 - Feb 2025",
    description: "Architected secure doctor-patient registration systems for 1,000+ users with 99.9% uptime.",
  },
  {
    title: "Web Developer Intern",
    company: "GuIMahal Hyderabad (Remote)",
    date: "Jan 2025 - Present",
    description: "Developed responsive web applications with RESTful APIs, reducing page load times by 15%.",
  },
  {
    title: "Freelance Software Developer",
    company: "Freelance, Virtual",
    date: "Oct 2023 - Jun 2024",
    description: "Worked on various web and software development projects for clients.",
  },
  {
    title: "Subject Matter Expert",
    company: "Infinity Learn, Virtual",
    date: "Jul 2023 - Oct 2023",
    description: "Provided expert guidance and support to students.",
  },
]

const WorkExperience = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState(null)
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)

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

  return (
    <section id="work" ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-white inline-block relative">
            Work Experience
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-purple-500"></span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">My professional journey and work history</p>
        </div>

        {/* Timeline view for larger screens */}
        <div className="hidden lg:block relative" ref={timelineRef}>
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-teal-500 to-purple-500"></div>

          {workExperiences.map((exp, index) => (
            <div
              key={index}
              className={`relative flex items-center mb-16 ${index % 2 === 0 ? "justify-start" : "justify-end"} ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms`, transition: "all 0.6s ease-out" }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-teal-500 z-10 shadow-lg shadow-teal-500/30"></div>

              {/* Content card */}
              <div
                className={`w-5/12 bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-xl transition-all duration-300 ${
                  activeCard === index ? "transform scale-105 shadow-2xl" : ""
                }`}
                style={{
                  borderLeft: index % 2 === 0 ? "none" : "3px solid #14b8a6",
                  borderRight: index % 2 === 0 ? "3px solid #14b8a6" : "none",
                }}
              >
                <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
                <p className="text-teal-400 mb-2">{exp.company}</p>
                <p className="text-gray-400 mb-3 text-sm">{exp.date}</p>
                <p className="text-gray-300">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Card view for mobile/tablet */}
        <div className="lg:hidden grid gap-8">
          {workExperiences.map((exp, index) => (
            <div
              key={index}
              className={`bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-xl transform transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              } hover:shadow-2xl border-l-4 border-teal-500`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
              <p className="text-teal-400 mb-2">{exp.company}</p>
              <p className="text-gray-400 mb-3 text-sm">{exp.date}</p>
              <p className="text-gray-300">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkExperience

