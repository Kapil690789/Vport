import { FaLinkedin, FaGithub, FaEnvelope, FaHeart } from "react-icons/fa"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-gray-900 pt-16 pb-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-teal-900/20 via-gray-900/0 to-gray-900/0"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4 relative inline-block">
              About Me
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-teal-500"></span>
            </h3>
            <p className="text-gray-300">
              A passionate Software Engineer focused on crafting elegant solutions through coding, problem-solving, and
              web development.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-teal-500"></span>
            </h3>
            <ul className="space-y-2">
              {["Home", "Projects", "Skills", "Work Experience", "Education"].map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "")}`}
                    className="text-gray-300 hover:text-teal-400 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4 relative inline-block">
              Contact
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-teal-500"></span>
            </h3>
            <p className="text-gray-300 flex items-center gap-2">
              <FaEnvelope className="text-teal-400" />
              <a href="mailto:kapil19092003@gmail.com" className="hover:text-teal-400 transition-colors">
                kapil19092003@gmail.com
              </a>
            </p>
          </div>

          {/* Social links */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4 relative inline-block">
              Connect
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-teal-500"></span>
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/in/kapil-sharma-1aa402230"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-teal-400 transform hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://github.com/Kapil690789"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-teal-400 transform hover:scale-110 transition-all duration-300"
                aria-label="GitHub Profile"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="mailto:kapil19092003@gmail.com"
                className="text-gray-300 hover:text-teal-400 transform hover:scale-110 transition-all duration-300"
                aria-label="Email Contact"
              >
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-1">
            &copy; {currentYear} Kapil Sharma. All rights reserved.

          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

