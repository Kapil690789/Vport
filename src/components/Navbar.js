"use client"

import { useState, useEffect } from "react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled
      setScrolled(window.scrollY > 50)

      // Determine active section
      const sections = ["home", "projects", "skills", "work", "education", "contact"]

      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    setIsOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900/90 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo/Name */}
        <h1 className="text-2xl font-bold text-white hover:text-teal-400 transition-colors duration-300 relative group">
          <span className="relative z-10">Kapil's Portfolio</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300"></span>
        </h1>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between relative">
            <span
              className={`w-full h-0.5 bg-white rounded-full transform transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`w-full h-0.5 bg-white rounded-full transform transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </div>
        </button>

        {/* Desktop menu */}
        <ul className="hidden lg:flex space-x-8 text-white">
          {["home", "projects", "skills", "work", "education", "contact"].map((item) => (
            <li key={item} className="relative group">
              <button
                onClick={() => scrollToSection(item)}
                className={`py-2 transition-colors duration-300 ${
                  activeSection === item ? "text-teal-400" : "text-white hover:text-teal-300"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300 ${
                  activeSection === item ? "w-full" : "w-0"
                }`}
              ></span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute w-full bg-gray-800/95 backdrop-blur-md transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-96 shadow-2xl" : "max-h-0"
        }`}
      >
        <ul className="container mx-auto px-4 py-4 space-y-4 text-white">
          {["home", "projects", "skills", "work", "education", "contact"].map((item) => (
            <li key={item}>
              <button
                onClick={() => scrollToSection(item)}
                className={`block w-full text-left py-2 px-4 rounded-lg transition-all duration-300 ${
                  activeSection === item ? "bg-teal-500/20 text-teal-400" : "hover:bg-gray-700/50 hover:text-teal-300"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

