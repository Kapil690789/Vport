
import { assests } from '../assests/assets'; // Adjust path as needed

import React, { useEffect, useRef, useState } from 'react';

// Placeholder for assets


const projects = [
  { title: 'Prescripto', description: 'Doctor Appointment System using MERN Stack.', link: 'https://prescripto-frontend-616t.onrender.com', image: assests.precripto },
  { title: 'IconnectGJUS&T', description: 'Full-stack project hosted on cPanel with PHP, MySQL, and JavaScript.', link: 'https://iconnectgjust.live', image: assests.iconnect },
  { title: 'MstryMessage', description: 'Next.js and TypeScript app with OpenAI integration for anonymous messaging.', link: 'https://mstrymessage-ka9e.onrender.com', image: assests.Mstrymessage },
  { title: 'Chat-app', description: 'Real-time chat application using React.js and Firebase.', link: 'https://chatapp-kapil.web.app', image: assests.chat },
  { title: 'Code Project', description: 'Collection of 10 React projects from basic to advanced.', link: 'https://github.com/Kapil690789/Kapil-aur-react', image: assests.reactproject },
  { title: 'E-commerce Backend', description: 'Backend for an e-commerce platform using Node.js and bcrypt.', link: 'https://github.com/Kapil690789/Scatch-', image: assests.Eshop },
  { title: 'Chess Game', description: 'Chess game with Node.js backend and EJS templating.', link: 'https://chess-game-vguz.onrender.com', image: assests.chessgame },
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const sectionRef = useRef(null);
  const projectRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Mouse move effect for project cards
  useEffect(() => {
    const handleMouseMove = (e, index) => {
      const card = projectRefs.current[index];
      if (!card) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation based on mouse position
      const rotateX = ((y - centerY) / centerY) * 10; // Max 10 degrees
      const rotateY = ((x - centerX) / centerX) * 10; // Max 10 degrees
      
      // Apply the 3D rotation
      card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      
      // Add highlight effect
      const shine = card.querySelector('.shine');
      if (shine) {
        shine.style.opacity = '0.15';
        shine.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    
    const handleMouseLeave = (index) => {
      const card = projectRefs.current[index];
      if (!card) return;
      
      // Reset the transform
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      
      // Reset highlight effect
      const shine = card.querySelector('.shine');
      if (shine) {
        shine.style.opacity = '0';
      }
    };
    
    // Add event listeners to each project card
    projectRefs.current.forEach((card, index) => {
      if (card) {
        card.addEventListener('mousemove', (e) => handleMouseMove(e, index));
        card.addEventListener('mouseleave', () => handleMouseLeave(index));
      }
    });
    
    // Cleanup
    return () => {
      projectRefs.current.forEach((card, index) => {
        if (card) {
          card.removeEventListener('mousemove', (e) => handleMouseMove(e, index));
          card.removeEventListener('mouseleave', () => handleMouseLeave(index));
        }
      });
    };
  }, [isVisible]);

  return (
    
    <section id="projects" ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-white inline-block relative">
            Projects
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-purple-500 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (projectRefs.current[index] = el)}
              className={`relative bg-gray-800 rounded-xl overflow-hidden shadow-xl transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                transformStyle: 'preserve-3d',
                transform: 'perspective(1000px)',
              }}
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Shine effect overlay */}
              <div className="shine absolute inset-0 w-20 h-20 rounded-full bg-white opacity-0 pointer-events-none mix-blend-overlay"></div>
              
              {/* Project image with overlay */}
              <div className="relative overflow-hidden group">
                <img 
                  src={project.image || "/placeholder.svg"} 
                  alt={project.title} 
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              </div>
              
              {/* Project content */}
              <div className="p-6 relative z-10">
                <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="mb-4 text-gray-300">{project.description}</p>
                
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block px-4 py-2 bg-teal-500 text-white rounded-lg transform transition-all duration-300 hover:bg-teal-600 hover:scale-105 hover:shadow-lg"
                >
                  View Project
                </a>
              </div>
              
              {/* Animated border */}
              <div className={`absolute inset-0 border-2 border-teal-400 rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none ${activeProject === index ? 'opacity-100' : ''}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
