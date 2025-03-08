"use client"

import { useState, useEffect, useRef } from "react"
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa"
import { CSSTransition, TransitionGroup } from "react-transition-group"

const leetcodeLogo = "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"

const Hero = () => {
  const roles = ["Full Stack Developer", "Software Engineer", "Problem Solver"]
  const [currentRole, setCurrentRole] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredWord, setHoveredWord] = useState(null)
  const heroRef = useRef(null)

  // Parallax elements refs
  const headingRef = useRef(null)
  const descriptionRef = useRef(null)
  const buttonsRef = useRef(null)
  const socialRef = useRef(null)
  const bgParticlesRef = useRef(null)

  // Text animation refs
  const nameTextRef = useRef(null)
  const descriptionTextRef = useRef(null)

  useEffect(() => {
    setIsVisible(true)

    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return

      const rect = heroRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Calculate position relative to the center of the element
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Calculate the offset from center (normalized from -1 to 1)
      const offsetX = (x - centerX) / centerX
      const offsetY = (y - centerY) / centerY

      setMousePosition({ x: offsetX, y: offsetY })

      // Apply parallax effect to different elements
      if (headingRef.current) {
        headingRef.current.style.transform = `translate(${offsetX * -15}px, ${offsetY * -15}px)`
      }

      if (descriptionRef.current) {
        descriptionRef.current.style.transform = `translate(${offsetX * 10}px, ${offsetY * 10}px)`
      }

      if (buttonsRef.current) {
        buttonsRef.current.style.transform = `translate(${offsetX * 5}px, ${offsetY * 5}px)`
      }

      if (socialRef.current) {
        socialRef.current.style.transform = `translate(${offsetX * -8}px, ${offsetY * -8}px)`
      }

      if (bgParticlesRef.current) {
        bgParticlesRef.current.style.transform = `translate(${offsetX * 20}px, ${offsetY * 20}px)`
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  // Text hover effects
  const handleWordHover = (index) => {
    setHoveredWord(index)
  }

  const handleWordLeave = () => {
    setHoveredWord(null)
  }

  // Split text into words for hover effects
  const nameText = "Hi, I'm Kapil Sharma"
  const nameWords = nameText.split(" ")

  const descriptionText =
    "A passionate Software Engineer focused on crafting elegant solutions through coding, problem-solving, and web development."
  const descriptionWords = descriptionText.split(" ")

  return (
    <section
      id="home"
      ref={heroRef}
      className="h-screen w-full bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url('https://e0.pxfuel.com/wallpapers/627/591/desktop-wallpaper-better-start-of-a-future-technology-background-portfolio.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

      {/* Animated background particles with parallax effect */}
      <div
        ref={bgParticlesRef}
        className="particles absolute inset-0 z-1 transition-transform duration-200 ease-out"
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-6 max-w-6xl mx-auto">
        <div
          className={`transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div ref={headingRef} className="transition-transform duration-200 ease-out">
            {/* Interactive name heading with word-by-word hover effect */}
            <h1 ref={nameTextRef} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 relative">
              {nameWords.map((word, index) => (
                <span
                  key={index}
                  className={`inline-block mx-1 transition-all duration-300 ${
                    hoveredWord === index
                      ? "text-teal-400 transform scale-110"
                      : hoveredWord !== null
                        ? "opacity-70"
                        : ""
                  }`}
                  onMouseEnter={() => handleWordHover(index)}
                  onMouseLeave={handleWordLeave}
                  style={{
                    textShadow: hoveredWord === index ? "0 0 15px rgba(45, 212, 191, 0.5)" : "none",
                  }}
                >
                  {word}
                </span>
              ))}
              <span className="absolute -bottom-2 left-0 w-0 h-1 bg-teal-500 transition-all duration-500 group-hover:w-full"></span>
            </h1>

            {/* Cycling Roles with Fade Transition */}
            <div className="h-8 md:h-10 mb-6">
              <TransitionGroup component={null}>
                <CSSTransition key={currentRole} timeout={500} classNames="role-transition">
                  <p className="text-xl md:text-2xl font-medium text-teal-300">{roles[currentRole]}</p>
                </CSSTransition>
              </TransitionGroup>
            </div>
          </div>

          {/* Description with parallax effect and word-by-word hover */}
          <div ref={descriptionRef} className="transition-transform duration-200 ease-out">
            <p
              ref={descriptionTextRef}
              className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-200 leading-relaxed"
            >
              {descriptionWords.map((word, index) => (
                <span
                  key={index}
                  className={`inline-block mx-1 transition-all duration-300 ${
                    hoveredWord === index + 100
                      ? "text-teal-400 transform scale-110"
                      : hoveredWord !== null && hoveredWord >= 100
                        ? "opacity-70"
                        : ""
                  }`}
                  onMouseEnter={() => handleWordHover(index + 100)}
                  onMouseLeave={handleWordLeave}
                >
                  {word}
                </span>
              ))}
            </p>
          </div>

          {/* Social Media Icons with parallax effect */}
          <div
            ref={socialRef}
            className="flex justify-center space-x-8 mb-10 transition-transform duration-200 ease-out"
          >
            <a
              href="https://linkedin.com/in/kapil-sharma-1aa402230"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-teal-300 transform hover:scale-125 transition-all duration-300 relative group"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={32} />
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="https://github.com/Kapil690789"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-teal-300 transform hover:scale-125 transition-all duration-300 relative group"
              aria-label="GitHub Profile"
            >
              <FaGithub size={32} />
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="https://leetcode.com/u/kapil1909/"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-125 transition-all duration-300 bg-white rounded-full p-1.5 relative group"
              aria-label="LeetCode Profile"
            >
              <img src={leetcodeLogo || "/placeholder.svg"} alt="LeetCode" className="w-6 h-6" />
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="mailto:kapil19092003@gmail.com"
              className="text-white hover:text-teal-300 transform hover:scale-125 transition-all duration-300 relative group"
              aria-label="Email Contact"
            >
              <FaEnvelope size={32} />
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          {/* Buttons with parallax effect and enhanced hover */}
          <div
            ref={buttonsRef}
            className="flex flex-wrap justify-center gap-4 md:gap-6 transition-transform duration-200 ease-out"
          >
            <a
              href="#projects"
              className="group relative px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold bg-teal-500 text-white overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10">See My Work</span>
              <span className="absolute inset-0 bg-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
            <a
              href="mailto:kapil19092003@gmail.com"
              className="group relative px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold border-2 border-teal-400 text-white overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10">Hire Me</span>
              <span className="absolute inset-0 bg-teal-400/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
            <a
              href="https://drive.google.com/file/d/1n4vI77QmqIF6CbqzIQF0HrmKfem-oCQZ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold border-2 border-white text-white overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10">Resume</span>
              <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating elements that follow cursor with enhanced effects */}
      <div
        className="absolute w-20 h-20 rounded-full bg-teal-500/20 blur-xl pointer-events-none"
        style={{
          left: `calc(50% + ${mousePosition.x * 200}px)`,
          top: `calc(50% + ${mousePosition.y * 200}px)`,
          transition: "left 0.3s ease-out, top 0.3s ease-out",
        }}
      ></div>
      <div
        className="absolute w-32 h-32 rounded-full bg-purple-500/10 blur-xl pointer-events-none"
        style={{
          right: `calc(40% + ${mousePosition.x * -150}px)`,
          bottom: `calc(30% + ${mousePosition.y * -150}px)`,
          transition: "right 0.5s ease-out, bottom 0.5s ease-out",
        }}
      ></div>

      {/* Additional cursor-following elements */}
      <div
        className="absolute w-40 h-40 rounded-full bg-blue-500/5 blur-xl pointer-events-none"
        style={{
          left: `calc(30% + ${mousePosition.x * -180}px)`,
          top: `calc(70% + ${mousePosition.y * 120}px)`,
          transition: "left 0.7s ease-out, top 0.7s ease-out",
        }}
      ></div>
      <div
        className="absolute w-24 h-24 rounded-full bg-yellow-500/5 blur-xl pointer-events-none"
        style={{
          right: `calc(20% + ${mousePosition.x * 120}px)`,
          top: `calc(20% + ${mousePosition.y * -100}px)`,
          transition: "right 0.4s ease-out, top 0.4s ease-out",
        }}
      ></div>

      {/* Cursor spotlight effect */}
      <div
        className="absolute w-[40vw] h-[40vw] rounded-full bg-gradient-radial from-teal-500/5 to-transparent pointer-events-none"
        style={{
          left: `calc(50% + ${mousePosition.x * 100}px)`,
          top: `calc(50% + ${mousePosition.y * 100}px)`,
          transform: "translate(-50%, -50%)",
          transition: "left 0.2s ease-out, top 0.2s ease-out",
          opacity: 0.7,
        }}
      ></div>

      {/* Styles */}
      <style jsx>{`
        .typewriter-container {
          display: inline-block;
          overflow: hidden;
        }
        
        .typewriter {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 3px solid teal;
          animation: typing 3.5s steps(30, end) forwards, blink 1s step-end infinite;
          width: 0;
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        @keyframes blink {
          from, to { border-color: transparent }
          50% { border-color: teal }
        }
        
        .role-transition-enter {
          opacity: 0;
          transform: translateY(10px);
        }
        
        .role-transition-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 500ms, transform 500ms;
        }
        
        .role-transition-exit {
          opacity: 1;
          transform: translateY(0);
          position: absolute;
        }
        
        .role-transition-exit-active {
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 500ms, transform 500ms;
        }
        
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }
        
        .particles:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
          z-index: 2;
        }
        
        .particles:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(255,255,255,0.1)' fillRule='evenodd'/%3E%3C/svg%3E");
          background-size: 150px;
          opacity: 0.5;
          animation: particleAnimation 15s linear infinite;
        }
        
        @keyframes particleAnimation {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }
        
        /* Add radial gradient for cursor spotlight */
        .bg-gradient-radial {
          background-image: radial-gradient(var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  )
}

export default Hero

