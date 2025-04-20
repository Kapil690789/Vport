"use client"

import { useEffect, useRef, useState } from "react"
import { FaHtml5, FaNodeJs, FaGitAlt, FaJava, FaReact, FaPython, FaAws } from "react-icons/fa"
import { SiMongodb, SiLinux, SiFirebase, SiTypescript } from "react-icons/si"
import { GoDatabase } from "react-icons/go"
import { BsTools } from "react-icons/bs"
import { GiBrain } from "react-icons/gi"

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
    icon: <FaReact size={40} className="text-blue-400" />,
    skills: ["HTML", "CSS", "ReactJS", "TailwindCSS", "EJS", "NextJS", "Bootstrap", "Wordpress", "Shadcn UI"],
    color: "from-blue-400 to-cyan-500",
    iconBg: "bg-blue-400/10",
  },
  {
    title: "Backend Development",
    icon: <FaNodeJs size={40} className="text-green-500" />,
    skills: ["Node.js", "Express.js", "PHP", "Python", "Firebase"],
    color: "from-green-500 to-teal-500",
    iconBg: "bg-green-500/10",
  },
  {
    title: "Databases",
    icon: <GoDatabase size={40} className="text-cyan-400" />,
    skills: ["MySQL", "MongoDB"],
    color: "from-cyan-400 to-blue-500",
    iconBg: "bg-cyan-400/10",
  },
  {
    title: "Development Tools",
    icon: <BsTools size={40} className="text-yellow-500" />,
    skills: ["Git", "GitHub", "Cpanel", "Render", "Cloudflare", "Docker"],
    color: "from-yellow-500 to-amber-500",
    iconBg: "bg-yellow-500/10",
  },
  {
    title: "Cloud & Infrastructure",
    icon: <FaAws size={40} className="text-orange-400" />,
    skills: ["AWS", "Linux", "Firebase"],
    color: "from-orange-400 to-red-400",
    iconBg: "bg-orange-400/10",
  },
  {
    title: "Computer Science",
    icon: <GiBrain size={40} className="text-purple-500" />,
    skills: ["Data Structures", "Algorithms", "Computer Networks"],
    color: "from-purple-500 to-violet-500",
    iconBg: "bg-purple-500/10",
  },
  {
    title: "AI & Advanced Skills",
    icon: <SiTypescript size={40} className="text-blue-600" />,
    skills: ["AI Agents", "TypeScript", "REST APIs"],
    color: "from-blue-600 to-indigo-600",
    iconBg: "bg-blue-600/10",
  },
]

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)
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

  // Floating animation for background elements
  const getRandomFloat = (min, max) => {
    return Math.random() * (max - min) + min
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden"
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
          <h2 className="text-5xl font-bold mb-6 text-white inline-block relative">
            Technical Expertise
            <span className="absolute -bottom-3 left-0 w-full h-1.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full"></span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            My comprehensive toolkit of technologies and skills that I've mastered throughout my software engineering journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              ref={(el) => (categoryRefs.current[index] = el)}
              className={`relative bg-gray-800/60 backdrop-blur-lg p-6 rounded-xl shadow-lg transition-all duration-700 border border-gray-700/50 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              } hover:shadow-2xl group transform hover:-translate-y-1`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveCategory(index)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              {/* Gradient border on hover */}
              <div
                className="absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{
                  padding: "2px",
                  background: `linear-gradient(90deg, ${category.color.split(" ")[0].replace("from-", "")} 0%, ${category.color.split(" ")[1].replace("to-", "")} 100%)`,
                  maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                }}
              ></div>

              {/* Glowing effect on hover */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl -z-10"
                style={{
                  background: `radial-gradient(circle at center, ${category.color.split(" ")[0].replace("from-", "")} 0%, transparent 70%)`,
                }}
              ></div>

              {/* Icon with animated background */}
              <div className="flex justify-center mb-6">
                <div
                  className={`relative p-5 rounded-full ${category.iconBg} transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}
                  style={{
                    boxShadow: `0 0 20px ${category.color.split(" ")[0].replace("from-", "")}20`,
                  }}
                >
                  <div
                    className="animate-pulse absolute inset-0 rounded-full opacity-75"
                    style={{
                      background: `radial-gradient(circle, ${category.color.split(" ")[0].replace("from-", "")}30 0%, transparent 70%)`,
                    }}
                  ></div>
                  {category.icon}
                </div>
              </div>

              {/* Category title with animated underline */}
              <h3 className="text-2xl font-bold mb-4 text-white text-center relative">
                {category.title}
                <span
                  className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r ${category.color} transition-all duration-500 group-hover:w-full rounded-full`}
                ></span>
              </h3>

              {/* Skills list with hover animations */}
              <ul className="space-y-2.5">
                {category.skills.map((skill, i) => (
                  <li
                    key={i}
                    className="text-gray-300 transition-all duration-300 transform pl-4 border-l-2 border-transparent hover:border-l-2"
                    style={{
                      transitionDelay: `${i * 50}ms`,
                      opacity: activeCategory === index || activeCategory === null ? 1 : 0.7,
                      transform: 
                        hoveredSkill === `${index}-${i}` 
                          ? "translateX(8px)" 
                          : activeCategory === index 
                            ? "translateX(4px)" 
                            : "translateX(0)",
                      borderColor: hoveredSkill === `${index}-${i}` 
                        ? category.color.split(" ")[0].replace("from-", "") 
                        : "transparent"
                    }}
                    onMouseEnter={() => setHoveredSkill(`${index}-${i}`)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <span 
                      style={{
                        color: hoveredSkill === `${index}-${i}` 
                          ? category.color.split(" ")[0].replace("from-", "") 
                          : ""
                      }}
                      className="font-medium"
                    >
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Stats section highlighting experience */}
      <div className="mt-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-gray-800/40 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50">
              <div className="text-4xl font-bold text-teal-400 mb-2">240+</div>
              <div className="text-gray-300">LeetCode Problems</div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50">
              <div className="text-4xl font-bold text-purple-400 mb-2">70+</div>
              <div className="text-gray-300">GeeksforGeeks Problems</div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50">
              <div className="text-4xl font-bold text-blue-400 mb-2">8+</div>
              <div className="text-gray-300">Technologies Mastered</div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50">
              <div className="text-4xl font-bold text-red-400 mb-2">3+</div>
              <div className="text-gray-300">Years Coding Experience</div>
            </div>
          </div>
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