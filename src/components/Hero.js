import { FaLinkedin, FaGithub, FaEnvelope, FaCode } from 'react-icons/fa'; // Updated import
const leetcodeLogo = 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png';

const Hero = () => {
  return (
    <section
      id="home"
      className="h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://e0.pxfuel.com/wallpapers/627/591/desktop-wallpaper-better-start-of-a-future-technology-background-portfolio.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
          Hi, I'm Kapil Sharma
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl animate-slide-up">
          A passionate Software Engineer focused on crafting elegant solutions through coding, problem-solving, and web development.
        </p>

        <div className="flex space-x-8 mb-8">
          <a
            href="https://linkedin.com/in/kapil-sharma-1aa402230"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:text-teal-600 transition-colors"
          >
            <FaLinkedin size={30} />
          </a>
          <a
            href="https://github.com/Kapil690789"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:text-teal-600 transition-colors"
          >
            <FaGithub size={30} />
          </a>
          
            <a
            href="https://leetcode.com/u/kapil1909/"
              target="_blank"
                 rel="noopener noreferrer"
             >
        <img src={leetcodeLogo} alt="LeetCode" className="w-8 h-8" />
           </a>
          {/* <a
            href="https://leetcode.com/u/kapil1909/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:text-teal-600 transition-colors"
          >
            <FaCode size={30} />
          </a> */}
          <a
            href="mailto:kapil19092003@gmail.com"
            className="text-teal-400 hover:text-teal-600 transition-colors"
          >
            <FaEnvelope size={30} />
          </a>
        </div>

        <div className="flex space-x-4">
          <a
            href="#projects"
            className="bg-teal-500 px-6 py-3 rounded-md text-lg font-semibold hover:bg-teal-400 transition"
          >
            See My Work
          </a>
          <a
            href="#contact"
            className="border-2 border-teal-500 px-6 py-3 rounded-md text-lg font-semibold hover:bg-teal-500 hover:text-white transition"
          >
            Hire Me
          </a>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
