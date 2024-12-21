import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const leetcodeLogo = 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png';

const Hero = () => {
  return (
    <div>
      <section
        id="home"
        className="h-screen w-full bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://e0.pxfuel.com/wallpapers/627/591/desktop-wallpaper-better-start-of-a-future-technology-background-portfolio.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 overflow-hidden whitespace-nowrap border-r-4 border-white animate-typewriter">
            Hi, I&apos;m Kapil Sharma
          </h1>
          {/* <p className="text-lg md:text-xl mb-2 max-w-2xl overflow-hidden whitespace-nowrap border-r-4 border-white animate-role-typewriter">
            MERN Developer
          </p> */}
          <p className="text-lg md:text-xl mb-8 max-w-2xl animate-slide-up">
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
            <a
              href="mailto:kapil19092003@gmail.com"
              className="text-teal-400 hover:text-teal-600 transition-colors"
            >
              <FaEnvelope size={30} />
            </a>
          </div>

          <div className="flex flex-wrap justify-center space-x-4">
            <a
              href="#projects"
              className="border-2 border-teal-500 px-4 md:px-6 py-2 md:py-3 rounded-md text-sm md:text-lg font-semibold hover:bg-teal-500 hover:text-white transition"
            >
              See My Work
            </a>
            <a
              href="mailto:kapil19092003@gmail.com"
              className="border-2 border-teal-500 px-4 md:px-6 py-2 md:py-3 rounded-md text-sm md:text-lg font-semibold hover:bg-teal-500 hover:text-white transition"
            >
              Hire Me
            </a>
            <a
              href="https://drive.google.com/file/d/1sSYVmusRM3BkX2SGuyUso4Bq5ifZLsq8/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-teal-500 px-4 md:px-6 py-2 md:py-3 rounded-md text-sm md:text-lg font-semibold hover:bg-teal-500 hover:text-white transition"
            >
              Resume
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes typewriter {
          0% { width: 0; }
          50% { width: 15ch; }
          100% { width: 0; }
        }

        @keyframes role-typewriter {
          0% { width: 0; }
          33% { width: 15ch; }
          66% { width: 17ch; }
          100% { width: 0; }
        }

        @keyframes blink {
          from, to { border-color: transparent; }
          50% { border-color: white; }
        }

        .animate-typewriter {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid white;
          animation: typewriter 4s steps(20, end) infinite, blink 0.75s step-end infinite;
          font-size: 1.5rem;
        }

        .animate-role-typewriter {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid white;
          animation: role-typewriter 6s steps(20, end) infinite, blink 0.75s step-end infinite;
          font-size: 1.2rem;
        }

        @media (min-width: 768px) {
          .animate-typewriter {
            font-size: 3rem;
          }
          .animate-role-typewriter {
            font-size: 2rem;
          }
        }

        .animate-slide-up {
          animation: slide-up 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Hero;
