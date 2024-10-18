import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-4">Hi, I'm Kapil Sharma</h1>
        <p className="text-xl mb-6">As a motivated software engineer, I specialize in problem-solving and software development.</p>

        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://linkedin.com/in/kapil-sharma-1aa402230"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-500 hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Kapil690789"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-500 hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://leetcode.com/u/kapil1909/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-500 hover:underline"
          >
            LeetCode
          </a>
        </div>

        <a 
          href="#contact"
          className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-400"
        >
          Hire Me
        </a>
      </div>
    </section>
  );
};

export default Hero;
