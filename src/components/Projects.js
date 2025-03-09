import { assests } from '../assests/assets'; // Adjust path as needed
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

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
  const canvasRef = useRef(null);
  const threeContainerRef = useRef(null);

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
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    // Colors for gradient effect
    const color1 = new THREE.Color(0x06b6d4); // teal-500
    const color2 = new THREE.Color(0x06b6d4); // purple-500
    
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
      size: 0.15,
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
      y: 0
    };
    
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate particles
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0008;
      
      // Respond to mouse movement
      particlesMesh.rotation.x += mouse.y * 0.0005;
      particlesMesh.rotation.y += mouse.x * 0.0005;
      
      // Move particles slightly
      const positions = particlesMesh.geometry.attributes.position.array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(Date.now() * 0.001 + positions[i]) * 0.003;
      }
      
      particlesMesh.geometry.attributes.position.needsUpdate = true;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = threeContainerRef.current.clientWidth / threeContainerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(threeContainerRef.current.clientWidth, threeContainerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
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
    <section id="projects" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Three.js Background */}
      <div 
        ref={threeContainerRef} 
        className="absolute inset-0 w-full h-full z-0"
        style={{ 
          background: 'linear-gradient(to bottom, rgb(17, 7, 9), rgb(31, 41, 55))'
        }}
      >
        <canvas ref={canvasRef} className="w-full h-full block"></canvas>
      </div>
      
      {/* Content overlay */}
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
              className={`relative bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl transition-all duration-500 border border-gray-700/50 ${
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
              
              {/* Glow effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-xl opacity-0 blur transition duration-700 group-hover:opacity-70 ${activeProject === index ? 'opacity-20' : ''}`}></div>
              
              {/* Project image with overlay */}
              <div className="relative overflow-hidden group">
                <img 
                  src={project.image || "/placeholder.svg"} 
                  alt={project.title} 
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
              </div>
              
              {/* Project content */}
              <div className="p-6 relative z-10">
                <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="mb-4 text-gray-300">{project.description}</p>
                
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block px-4 py-2 bg-teal-500 text-white rounded-lg transform transition-all duration-300 hover:bg-teal-600 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/20"
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
      
      {/* Additional decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900 to-transparent z-0 pointer-events-none"></div>
    </section>
  );
};

export default Projects;