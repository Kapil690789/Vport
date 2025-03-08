"use client"

import { useEffect, useRef, useState } from "react"
import { FaHtml5, FaNodeJs, FaGitAlt, FaJava } from "react-icons/fa"
import { SiMongodb, SiLinux } from "react-icons/si"

const categories = [
  {
    title: "Programming Languages",
    icon: <FaJava size={40} className="text-red-500" />,
    skills: ["C", "C++", "Java", "JavaScript", "TypeScript"],
    color: "from-red-500 to-orange-500",
    iconBg: "bg-red-500/10",
  },
  {
    title: "Web Development",
    icon: <FaHtml5 size={40} className="text-orange-500" />,
    skills: ["HTML", "CSS", "ReactJS", "TailwindCSS", "EJS", "NextJS", "Bootstrap", "Wordpress", "Shadcn Ui"],
    color: "from-orange-500 to-yellow-500",
    iconBg: "bg-orange-500/10",
  },
  {
    title: "Backend Development",
    icon: <FaNodeJs size={40} className="text-green-500" />,
    skills: ["Node.js", "Express.js", "PHP"],
    color: "from-green-500 to-teal-500",
    iconBg: "bg-green-500/10",
  },
  {
    title: "Databases",
    icon: <SiMongodb size={40} className="text-green-500" />,
    skills: ["MySQL", "MongoDB"],
    color: "from-teal-500 to-cyan-500",
    iconBg: "bg-teal-500/10",
  },
  {
    title: "Tools",
    icon: <FaGitAlt size={40} className="text-orange-500" />,
    skills: ["Git", "GitHub", "Cpanel", "Render", "Cloudflare", "Docker"],
    color: "from-blue-500 to-indigo-500",
    iconBg: "bg-blue-500/10",
  },
  {
    title: "Additional Skills",
    icon: <SiLinux size={40} className="text-yellow-500" />,
    skills: ["Data Structures", "Algorithms", "Computer Networks", "Linux", "AWS"],
    color: "from-purple-500 to-pink-500",
    iconBg: "bg-purple-500/10",
  },
]

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const sectionRef = useRef(null)
  const categoryRefs = useRef([])

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

  // Floating animation for skill items
  const getRandomFloat = (min, max) => {
    return Math.random() * (max - min) + min
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-teal-500/5"
              style={{
                width: `${getRandomFloat(5, 20)}rem`,
                height: `${getRandomFloat(5, 20)}rem`,
                top: `${getRandomFloat(-10, 100)}%`,
                left: `${getRandomFloat(-10, 100)}%`,
                animation: `float ${getRandomFloat(15, 30)}s infinite ease-in-out`,
                animationDelay: `${getRandomFloat(0, 10)}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-white inline-block relative">
            Skills
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-purple-500"></span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Here are the technologies and skills I've worked with
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              ref={(el) => (categoryRefs.current[index] = el)}
              className={`relative bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-xl transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              } hover:shadow-2xl group`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveCategory(index)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              {/* Gradient border */}
              <div
                className="absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{
                  padding: "2px",
                  background: `linear-gradient(90deg, ${category.color.split(" ")[0].replace("from-", "")} 0%, ${category.color.split(" ")[1].replace("to-", "")} 100%)`,
                  maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                }}
              ></div>

              {/* Icon with animated background */}
              <div className="flex justify-center mb-6">
                <div
                  className={`relative p-4 rounded-full ${category.iconBg} transition-transform duration-500 group-hover:scale-110`}
                >
                  <div
                    className="animate-pulse absolute inset-0 rounded-full opacity-75"
                    style={{
                      background: `radial-gradient(circle, ${category.color.split(" ")[0].replace("from-", "")}20 0%, transparent 70%)`,
                    }}
                  ></div>
                  {category.icon}
                </div>
              </div>

              {/* Category title */}
              <h3 className="text-2xl font-bold mb-4 text-white text-center relative">
                {category.title}
                <span
                  className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r ${category.color} transition-all duration-300 group-hover:w-3/4`}
                ></span>
              </h3>

              {/* Skills list with staggered animation */}
              <ul className="space-y-2">
                {category.skills.map((skill, i) => (
                  <li
                    key={i}
                    className="text-gray-300 hover:text-teal-400 transition-all duration-300 transform hover:translate-x-1"
                    style={{
                      transitionDelay: `${i * 50}ms`,
                      opacity: activeCategory === index ? 1 : 0.8,
                      transform: activeCategory === index ? "translateX(5px)" : "translateX(0)",
                    }}
                  >
                    • {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
      `}</style>
    </section>
  )
}

export default Skills

