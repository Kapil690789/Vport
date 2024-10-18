import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import WorkExperience from './components/WorkExperience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-gray-900 text-white">
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <WorkExperience />
      <Education />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
