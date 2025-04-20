import { assests } from '../assests/assets';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Projects data
const projects = [
  { title: 'Prescripto', description: 'Doctor Appointment System using MERN Stack.', link: 'https://prescripto-frontend-616t.onrender.com', image: assests.precripto, technologies: ['React', 'Node.js', 'Express', 'MongoDB'], category: 'Full Stack' },
  { title: 'IconnectGJUS&T', description: 'Full-stack project hosted on cPanel with PHP, MySQL, and JavaScript.', link: 'https://iconnectgjust.live', image: assests.iconnect, technologies: ['PHP', 'MySQL', 'JavaScript', 'cPanel'], category: 'Full Stack' },
  { title: 'MstryMessage', description: 'Next.js and TypeScript app with OpenAI integration for anonymous messaging.', link: 'https://mstrymessage-ka9e.onrender.com', image: assests.Mstrymessage, technologies: ['Next.js', 'TypeScript', 'OpenAI API'], category: 'Web App' },
  { title: 'Chat-app', description: 'Real-time chat application using React.js and Firebase.', link: 'https://chatapp-kapil.web.app', image: assests.chat, technologies: ['React', 'Firebase', 'Firestore'], category: 'Web App' },
  { title: 'Code Project', description: 'Collection of 10 React projects from basic to advanced.', link: 'https://github.com/Kapil690789/Kapil-aur-react', image: assests.reactproject, technologies: ['React', 'JavaScript', 'CSS'], category: 'Portfolio' },
  { title: 'E-commerce Backend', description: 'Backend for an e-commerce platform using Node.js and bcrypt.', link: 'https://github.com/Kapil690789/Scatch-', image: assests.Eshop, technologies: ['Node.js', 'Express', 'MongoDB', 'bcrypt'], category: 'Backend' },
  { title: 'Chess Game', description: 'Chess game with Node.js backend and EJS templating.', link: 'https://chess-game-vguz.onrender.com', image: assests.chessgame, technologies: ['Node.js', 'EJS', 'Socket.io', 'CSS'], category: 'Game' },
];

// Categories for filtering
const categories = ['All', ...new Set(projects.map(project => project.category))];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [detailsProject, setDetailsProject] = useState(null);
  const [filter, setFilter] = useState('All');
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef(null);
  const projectRefs = useRef([]);
  const canvasRef = useRef(null);
  const threeContainerRef = useRef(null);
  const detailsRef = useRef(null);

  // Filtered projects based on category
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  // Three.js animation setup
  useEffect(() => {
    if (!threeContainerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      threeContainerRef.current.clientWidth / threeContainerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(threeContainerRef.current.clientWidth, threeContainerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = window.innerWidth < 768 ? 800 : 1500; // Reduce particles on mobile
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    // Colors for gradient effect
    const color1 = new THREE.Color(0x06b6d4); // teal-500
    const color2 = new THREE.Color(0x8b5cf6); // purple-500
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 100;
      posArray[i + 1] = (Math.random() - 0.5) * 100;
      posArray[i + 2] = (Math.random() - 0.5) * 50;
      
      // Color - gradient between teal and purple
      const ratio = Math.random();
      const mixedColor = new THREE.Color().lerpColors(color1, color2, ratio);
      
      colorArray[i] = mixedColor.r;
      colorArray[i + 1] = mixedColor.g;
      colorArray[i + 2] = mixedColor.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.18,
      transparent: true,
      opacity: 0.7,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    
    // Points mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add some light sources for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 5);
    scene.add(directionalLight);
    
    // Mouse interaction
    const mouse = {
      x: 0,
      y: 0,
      target: { x: 0, y: 0 }
    };
    
    const handleMouseMove = (event) => {
      mouse.target.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.target.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      requestAnimationFrame(animate);
      
      // Smooth mouse movement
      mouse.x += (mouse.target.x - mouse.x) * 0.05;
      mouse.y += (mouse.target.y - mouse.y) * 0.05;
      
      // Rotate particles
      particlesMesh.rotation.x += 0.0003;
      particlesMesh.rotation.y += 0.0005;
      
      // Respond to mouse movement
      particlesMesh.rotation.x += mouse.y * 0.0003;
      particlesMesh.rotation.y += mouse.x * 0.0003;
      
      // Move particles slightly in a wave pattern
      const positions = particlesMesh.geometry.attributes.position.array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(elapsedTime + positions[i] * 0.5) * 0.002;
      }
      
      particlesMesh.geometry.attributes.position.needsUpdate = true;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!threeContainerRef.current) return;
      
      const width = threeContainerRef.current.clientWidth;
      const height = threeContainerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      scene.clear();
    };
  }, []);

  // Intersection observer for section visibility
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
    
    return () => {
      if (sectionRef.current) observer.disconnect();
    };
  }, []);

  // Click outside to close detailed view
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target) && detailsProject !== null) {
        closeDetails();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [detailsProject]);

  // 3D card effect
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
      const rotateX = ((y - centerY) / centerY) * 12; // Max 12 degrees
      const rotateY = ((x - centerX) / centerX) * 12; // Max 12 degrees
      
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
  }, [isVisible, filter]);

  // Show project details
  const showDetails = (index) => {
    setIsAnimating(true);
    setDetailsProject(filteredProjects[index]);
    
    // Allow animation to complete
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  // Close project details
  const closeDetails = () => {
    setIsAnimating(true);
    
    // Animate out
    setTimeout(() => {
      setDetailsProject(null);
      setIsAnimating(false);
    }, 300);
  };

  // Handle category filter change
  const handleFilterChange = (category) => {
    setIsAnimating(true);
    
    // Reset project refs when changing categories
    projectRefs.current = [];
    
    setTimeout(() => {
      setFilter(category);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative overflow-hidden min-h-screen">
      {/* Three.js Background */}
      <div 
        ref={threeContainerRef} 
        className="absolute inset-0 w-full h-full z-0"
        style={{ 
          background: 'linear-gradient(to bottom, rgb(0, 0, 0, 0), rgb(0, 0, 0, 0.1))'
        }}
      >
        <canvas ref={canvasRef} className="w-full h-full block"></canvas>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-white inline-block relative group">
            <span className="relative z-10">My Projects</span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-purple-500 transition-transform duration-500 transform scale-x-0 group-hover:scale-x-100"></span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Showcasing my skills through real-world applications and creative solutions.
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleFilterChange(category)}
              className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                filter === category 
                  ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-lg shadow-teal-500/20' 
                  : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (projectRefs.current[index] = el)}
              className={`relative bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl transition-all duration-500 border border-gray-700/50 ${
                isVisible && !isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                transformStyle: 'preserve-3d',
                transform: 'perspective(1000px)',
              }}
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
              onClick={() => showDetails(index)}
            >
              {/* Shine effect overlay */}
              <div className="shine absolute inset-0 w-32 h-32 rounded-full bg-white opacity-0 pointer-events-none mix-blend-overlay"></div>
              
              {/* Glow effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-xl opacity-0 blur transition duration-700 ${activeProject === index ? 'opacity-30' : ''}`}></div>
              
              {/* Project image with overlay */}
              <div className="relative overflow-hidden group h-52">
                <img 
                  src={project.image || "/placeholder.svg"} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                
                {/* View details overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/40">
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                    <span className="text-white font-medium">View Details</span>
                  </div>
                </div>
                
                {/* Category badge */}
                <div className="absolute top-3 right-3 px-2 py-1 bg-teal-500/80 backdrop-blur-sm rounded-lg text-xs font-medium text-white">
                  {project.category}
                </div>
              </div>
              
              {/* Project content */}
              <div className="p-6 relative z-10">
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-teal-400 transition-colors duration-300">{project.title}</h3>
                <p className="mb-4 text-gray-300">{project.description}</p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="text-xs font-medium px-2 py-1 rounded-full bg-gray-700/80 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-700/80 text-gray-300">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Animated border */}
              <div className={`absolute inset-0 border-2 border-teal-400 rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none ${activeProject === index ? 'opacity-100' : ''}`}></div>
            </div>
          ))}
        </div>
        
        {/* No projects message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-300">No projects found in this category.</p>
          </div>
        )}
        
        {/* Project details modal */}
        {detailsProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div 
              ref={detailsRef}
              className={`relative bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto transition-all duration-500 ${
                isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              {/* Close button */}
              <button 
                onClick={closeDetails}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Project image */}
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={detailsProject.image || "/placeholder.svg"} 
                  alt={detailsProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-90"></div>
                
                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{detailsProject.title}</h2>
                  <div className="flex items-center">
                    <span className="px-3 py-1 bg-teal-500/80 backdrop-blur-sm rounded-lg text-sm font-medium text-white mr-2">
                      {detailsProject.category}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Project details */}
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
                  <p className="text-gray-300">{detailsProject.description}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {detailsProject.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="text-sm font-medium px-3 py-1 rounded-full bg-gray-800 text-teal-400 border border-teal-400/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Key features (example) */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Responsive design for all device sizes</li>
                    <li>Intuitive user interface with modern animations</li>
                    <li>Secure authentication and data protection</li>
                    <li>Optimized performance for faster load times</li>
                  </ul>
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-wrap gap-4 mt-8">
                  <a 
                    href={detailsProject.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Live Demo
                  </a>
                  
                  <a 
                    href={detailsProject.link.includes('github') ? detailsProject.link : "#"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg transition-all duration-300 hover:bg-gray-700 ${
                      !detailsProject.link.includes('github') ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900 to-transparent z-0 pointer-events-none"></div>
    </section>
  );
};

export default Projects;