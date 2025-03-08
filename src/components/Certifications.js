import React, { useEffect, useRef, useState } from 'react';
import { FaAward, FaCertificate, FaGoogle, FaCode, FaLinkedin } from 'react-icons/fa';

const certifications = [
  {
    title: 'AR (Facebook Meta)',
    description: 'Completed through ReSkill | Spark AR (Nov 2022)',
    icon: <FaCertificate className="text-blue-400" size={24} />,
    link: '',
    color: 'from-blue-500 to-purple-500',
    iconBg: 'bg-blue-500/10',
  },
  {
    title: 'HackerRank Certified Software Engineer',
    description: 'Verified skills in problem-solving and coding',
    icon: <FaAward className="text-green-400" size={24} />,
    link: 'https://www.hackerrank.com/certificates/25ff6c9e7d9a',
    color: 'from-green-500 to-teal-500',
    iconBg: 'bg-green-500/10',
  },
  {
    title: 'Google Developer Student Club (GDSC)',
    description: 'Participated in various workshops and projects to enhance skills',
    icon: <FaGoogle className="text-red-400" size={24} />,
    link: '',
    color: 'from-red-500 to-yellow-500',
    iconBg: 'bg-red-500/10',
  },
  {
    title: 'Data Structures and Algorithms Training',
    description: 'Completed a comprehensive course on data structures and algorithms',
    icon: <FaCode className="text-teal-400" size={24} />,
    link: '',
    color: 'from-teal-500 to-cyan-500',
    iconBg: 'bg-teal-500/10',
  },
  {
    title: 'Certifications on LinkedIn',
    description: 'View all my certifications on my LinkedIn profile',
    icon: <FaLinkedin className="text-blue-400" size={24} />,
    link: 'https://www.linkedin.com/in/kapil-sharma-1aa402230/',
    color: 'from-blue-500 to-indigo-500',
    iconBg: 'bg-blue-500/10',
  },
  {
    title: 'Web Development Masterclass',
    description: 'Full-stack development with modern frameworks and tools',
    icon: <FaCode className="text-purple-400" size={24} />,
    link: '',
    color: 'from-purple-500 to-pink-500',
    iconBg: 'bg-purple-500/10',
  },
];

const Certifications = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  // Intersection Observer to detect when the section is in view
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

  // Track mouse position for the section
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3D tilt effect for certification cards
  useEffect(() => {
    const handleMouseMove = (e, index) => {
      const card = cardRefs.current[index];
      if (!card) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation based on mouse position
      const rotateX = ((y - centerY) / centerY) * 8; // Max 8 degrees
      const rotateY = ((x - centerX) / centerX) * 8; // Max 8 degrees
      
      // Apply the 3D rotation
      card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      
      // Add highlight effect
      const shine = card.querySelector('.shine');
      if (shine) {
        shine.style.opacity = '0.2';
        shine.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    
    const handleMouseLeave = (index) => {
      const card = cardRefs.current[index];
      if (!card) return;
      
      // Reset the transform
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      
      // Reset highlight effect
      const shine = card.querySelector('.shine');
      if (shine) {
        shine.style.opacity = '0';
      }
    };
    
    // Add event listeners to each card
    cardRefs.current.forEach((card, index) => {
      if (card) {
        card.addEventListener('mousemove', (e) => handleMouseMove(e, index));
        card.addEventListener('mouseleave', () => handleMouseLeave(index));
      }
    });
    
    // Cleanup
    return () => {
      cardRefs.current.forEach((card, index) => {
        if (card) {
          card.removeEventListener('mousemove', (e) => handleMouseMove(e, index));
          card.removeEventListener('mouseleave', () => handleMouseLeave(index));
        }
      });
    };
  }, [isVisible]);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden"
    >
      {/* Dynamic background elements that follow cursor */}
      <div 
        className="absolute w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"
        style={{
          left: `${mousePosition.x * 100}%`,
          top: `${mousePosition.y * 100}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.5s ease-out, top 0.5s ease-out',
        }}
      ></div>
      <div 
        className="absolute w-64 h-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"
        style={{
          right: `${(1 - mousePosition.x) * 100}%`,
          bottom: `${(1 - mousePosition.y) * 100}%`,
          transform: 'translate(50%, 50%)',
          transition: 'right 0.7s ease-out, bottom 0.7s ease-out',
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-white inline-block relative">
            Trainings & Certifications
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-purple-500"></span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Professional development and achievements
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`relative bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-xl transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } group overflow-hidden`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                transformStyle: 'preserve-3d',
              }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Shine effect overlay */}
              <div className="shine absolute inset-0 w-20 h-20 rounded-full bg-white opacity-0 pointer-events-none mix-blend-overlay"></div>
              
              {/* Gradient border */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                style={{
                  padding: '2px',
                  background: `linear-gradient(90deg, ${cert.color.split(' ')[0].replace('from-', '')} 0%, ${cert.color.split(' ')[1].replace('to-', '')} 100%)`,
                  maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                }}
              ></div>
              
              {/* Icon with animated background */}
              <div className="flex items-center mb-4">
                <div className={`relative p-3 rounded-full ${cert.iconBg} mr-3 transition-transform duration-500 group-hover:scale-110`}>
                  <div className="animate-pulse absolute inset-0 rounded-full opacity-75" 
                    style={{
                      background: `radial-gradient(circle, ${cert.color.split(' ')[0].replace('from-', '')}20 0%, transparent 70%)`,
                    }}
                  ></div>
                  {cert.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{cert.title}</h3>
              </div>
              
              <p className="text-gray-300 mb-4">{cert.description}</p>
              
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block px-4 py-2 rounded-lg text-white transition-all duration-300 bg-gradient-to-r ${cert.color} transform hover:scale-105 hover:shadow-lg`}
                >
                  View Certificate
                </a>
              )}
              
              {/* Decorative elements */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle, ${cert.color.split(' ')[0].replace('from-', '')}30 0%, transparent 70%)`,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
