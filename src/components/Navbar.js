import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kapil's Portfolio</h1>
        <button 
          className="md:hidden block text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        <ul className={`md:flex md:space-x-6 ${isOpen ? 'block' : 'hidden'}`}>
          <li><a href="#home" className="hover:text-teal-300">Home</a></li>
          <li><a href="#projects" className="hover:text-teal-300">Projects</a></li>
          <li><a href="#skills" className="hover:text-teal-300">Skills</a></li>
          <li><a href="#work" className="hover:text-teal-300">Work Experience</a></li>
          <li><a href="#education" className="hover:text-teal-300">Education</a></li>
          <li><a href="#certifications" className="hover:text-teal-300">Certifications</a></li>
          <li><a href="#contact" className="hover:text-teal-300">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
