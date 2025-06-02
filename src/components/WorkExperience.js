"use client"

import { useEffect, useRef, useState } from "react"

// Updated work experiences based on your resume
const workExperiences = [
  {
    title: "Software Engineer Intern",
    company: "Flock AI (New York)",
    date: "May 2024 - Present",
    description:
      "Developed AI-powered 3D image generation systems using Node.js and Django at Flock AI. Architected scalable backend solutions and machine learning pipelines while collaborating with cross-functional teams to deliver high-performance visual content creation tools.",
  },
  {
    title: "Software Engineer Intern",
    company: "SkillRank (USA)",
    date: "Jan 2024 - May 2025",
    description:
      "Developed scalable features using React (frontend) and Python/Node.js (backend) for the Civicsight Project. Collaborated with cross-functional teams to optimize performance and ensure high-quality delivery.",
  },
  
  {
    title: "Website Coordinator",
    company: "Training & Placement Cell, GJUS&T Hisar",
    date: "2023 - 2024",
    description: 
      "Developed a dynamic registration platform for Career Verse 2025, streamlining sign-ups for 3 key groups. Boosted event engagement by 20% and enhanced efficiency by 15%.",
  },
  {
    title: "Web Developer Intern",
    company: "GulMahal (Hyderabad)",
    date: "2023 - 2024",
    description: 
      "Developed scalable, responsive web applications with RESTful APIs, reducing page load times by 15%. Ensured high-quality outcomes through stakeholder collaboration.",
  },
  {
    title: "Full Stack Developer",
    company: "iConnectGJUS&T, Hisar",
    date: "2023 - Present",
    description:
      "Maintained a functional website hosted on cPanel using PHP, MySQL, and JavaScript. Developed key features like legal move validation, turn-based interaction, and dynamic updates.",
  },
]

const WorkExperience = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
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
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 left-40 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-40 w-48 h-48 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-white inline-block relative group">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">
              Work Experience
            </span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-purple-500 transform transition-all duration-300 group-hover:h-2"></span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">My professional journey and contributions</p>
        </div>

        {/* Timeline view for larger screens */}
        <div className="hidden lg:block relative" ref={timelineRef}>
          {/* Timeline line with animation */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-teal-500 via-blue-500 to-purple-500">
            <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b from-teal-400 via-blue-400 to-purple-400 ${isVisible ? "animate-pulse" : ""}`}></div>
          </div>

          {workExperiences.map((exp, index) => (
            <div
              key={index}
              className={`relative flex items-center mb-16 ${index % 2 === 0 ? "justify-start" : "justify-end"} ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms`, transition: "all 0.6s ease-out" }}
              onMouseEnter={() => { setActiveCard(index); setHoveredIndex(index); }}
              onMouseLeave={() => { setActiveCard(null); setHoveredIndex(null); }}
            >
              {/* Timeline dot with pulse effect */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div className={`w-5 h-5 rounded-full bg-teal-500 z-10 shadow-lg shadow-teal-500/30 transition-all duration-300 ${hoveredIndex === index ? "scale-150" : ""}`}></div>
                {hoveredIndex === index && (
                  <div className="absolute w-10 h-10 bg-teal-500/20 rounded-full animate-ping"></div>
                )}
              </div>

              {/* Content card with enhanced hover effects */}
              <div
                className={`w-5/12 bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-xl transition-all duration-300 ${
                  activeCard === index ? "transform scale-105 shadow-2xl" : ""
                }`}
                style={{
                  borderLeft: index % 2 === 0 ? "none" : "3px solid",
                  borderRight: index % 2 === 0 ? "3px solid" : "none",
                  borderImage: "linear-gradient(to bottom, #14b8a6, #8b5cf6) 1",
                }}
              >
                <div className="relative overflow-hidden group">
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-1">{exp.title}</h3>
                  <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-purple-500 transition-all duration-300 ${activeCard === index ? "w-full" : ""}`}></div>
                </div>
                <p className="text-teal-400 mb-2 font-medium">{exp.company}</p>
                <p className="text-gray-400 mb-3 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {exp.date}
                </p>
                <p className="text-gray-300">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Card view for mobile/tablet with enhanced animations */}
        <div className="lg:hidden grid gap-8">
          {workExperiences.map((exp, index) => (
            <div
              key={index}
              className={`bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-xl transform transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              } hover:shadow-2xl border-l-4`}
              style={{ 
                transitionDelay: `${index * 200}ms`,
                borderImage: "linear-gradient(to bottom, #14b8a6, #8b5cf6) 1",
              }}
              onTouchStart={() => setActiveCard(index)}
              onTouchEnd={() => setActiveCard(null)}
            >
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-1">{exp.title}</h3>
              <p className="text-teal-400 mb-2 font-medium">{exp.company}</p>
              <p className="text-gray-400 mb-3 text-sm flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {exp.date}
              </p>
              <p className="text-gray-300">{exp.description}</p>
              <div className="mt-4 w-full h-0.5 bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-50"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkExperience