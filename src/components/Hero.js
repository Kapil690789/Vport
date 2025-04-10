"use client";

import { useState, useEffect, useRef } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Float, OrbitControls, Cloud, Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Custom InView component
const InViewWrapper = ({ children, threshold = 0.1, triggerOnce = true }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else {
          if (!triggerOnce) setInView(false);
        }
      },
      { threshold }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, triggerOnce]);

  return children({ inView, ref });
};

// Enhanced particle system with more dynamic behavior
const EnhancedParticles = ({ mousePosition }) => {
  const groupRef = useRef();
  const particlesRef = useRef([]);
  const particleCount = 40;
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  // Initialize particles with random positions and properties
  useEffect(() => {
    particlesRef.current = Array(particleCount).fill().map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      ),
      scale: 0.1 + Math.random() * 0.3,
      speed: 0.01 + Math.random() * 0.02,
      rotationSpeed: 0.001 + Math.random() * 0.002,
      colorIndex: Math.floor(Math.random() * 3),
      originalPosition: new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      ),
    }));
  }, [particleCount]);

  // Animation frame updates
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Global group movement following mouse
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x += 0.0005;
      groupRef.current.position.x += (mousePosition.x * 3 - groupRef.current.position.x) * 0.03;
      groupRef.current.position.y += (mousePosition.y * 3 - groupRef.current.position.y) * 0.03;
      
      // Update individual particles
      particlesRef.current.forEach((particle, i) => {
        if (!groupRef.current.children[i]) return;
        
        // Apply sine wave movement for a floating effect
        const now = state.clock.elapsedTime;
        const mesh = groupRef.current.children[i];
        
        // Dynamic position adjustments based on mouse
        const mouseInfluence = 0.5 + Math.sin(now * 0.5) * 0.3;
        const targetX = particle.originalPosition.x + mousePosition.x * 2 * mouseInfluence;
        const targetY = particle.originalPosition.y + mousePosition.y * 2 * mouseInfluence;
        const targetZ = particle.originalPosition.z + Math.sin(now * 0.3) * 0.5;
        
        // Smooth interpolation
        mesh.position.x += (targetX - mesh.position.x) * 0.02 * delta * 60;
        mesh.position.y += (targetY - mesh.position.y) * 0.02 * delta * 60;
        mesh.position.z += (targetZ - mesh.position.z) * 0.02 * delta * 60;

        // Rotation
        mesh.rotation.x += particle.rotationSpeed * delta * 60;
        mesh.rotation.y += particle.rotationSpeed * 1.3 * delta * 60;
        mesh.rotation.z += particle.rotationSpeed * 0.7 * delta * 60;
        
        // Pulse scale effect
        const scalePulse = 1 + Math.sin(now * particle.speed * 5) * 0.1;
        mesh.scale.set(
          particle.scale * scalePulse,
          particle.scale * scalePulse,
          particle.scale * scalePulse
        );
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: particleCount }).map((_, i) => {
        // Assign one of three colors based on index
        const colors = ["#2DD4BF", "#0EA5E9", "#8B5CF6"];
        const colorIndex = i % 3;
        
        return (
          <mesh key={i} position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15
          ]}>
            {i % 5 === 0 ? (
              <octahedronGeometry args={[0.2 + Math.random() * 0.3, 0]} />
            ) : i % 3 === 0 ? (
              <tetrahedronGeometry args={[0.2 + Math.random() * 0.3, 0]} />
            ) : (
              <sphereGeometry args={[0.1 + Math.random() * 0.2, 8, 8]} />
            )}
            <meshStandardMaterial
              color={colors[colorIndex]}
              transparent
              opacity={0.7 + Math.random() * 0.3}
              emissive={colors[colorIndex]}
              emissiveIntensity={0.5 + Math.random() * 0.5}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Enhanced 3D text with better animations
const EnhancedFloatingText = ({ mousePosition }) => {
  const textRef = useRef();
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  useFrame((state) => {
    if (textRef.current) {
      // Smooth follow with dampening
      textRef.current.rotation.x = THREE.MathUtils.lerp(
        textRef.current.rotation.x,
        mousePosition.y * 0.2, 
        0.05
      );
      textRef.current.rotation.y = THREE.MathUtils.lerp(
        textRef.current.rotation.y,
        mousePosition.x * 0.2,
        0.05
      );
      
      // Add subtle floating motion
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Pulse scale effect
      const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.03;
      textRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={textRef} position={[0, 0, -1]}>
      <Text
        fontSize={isMobile ? 0.6 : 0.8}
        maxWidth={viewport.width / 2}
        lineHeight={1.2}
        font="/fonts/Inter-Bold.woff" // You'll need to provide this font or use a default one
        color="#2DD4BF"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
        material-depthWrite={false}
        letterSpacing={0.05}
        strokeWidth={0.01}
        strokeColor="#0EA5E9"
        outlineWidth={0.005}
        outlineColor="#8B5CF6"
      >
        KAPIL SHARMA
      </Text>
    </group>
  );
};

// Enhanced interactive objects with better hover effects
const EnhancedInteractiveObject = ({ position, data, mousePosition, onHover, shape = "box" }) => {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const originalPosition = useRef(position);
  const { clock } = useThree();

  useFrame((state, delta) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Base hover animation
      const hoverScale = isHovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(hoverScale, hoverScale, hoverScale), 0.1);
      
      // Dynamic effects based on interaction state
      if (isHovered) {
        // Rotation animation when hovered
        meshRef.current.rotation.y += 0.02 * delta * 60;
        meshRef.current.rotation.x += 0.01 * delta * 60;
        
        // Emissive intensity pulse
        meshRef.current.material.emissiveIntensity = 0.8 + Math.sin(time * 5) * 0.2;
      } else {
        // Slower rotation when not hovered
        meshRef.current.rotation.y += 0.005 * delta * 60;
        
        // Gentle movement animation
        const floatX = Math.sin(time * 0.5 + position[0]) * 0.1;
        const floatY = Math.cos(time * 0.5 + position[1]) * 0.1;
        
        // Smooth movement toward cursor with spring physics
        const targetX = originalPosition.current[0] + mousePosition.x * 1.5 + floatX;
        const targetY = originalPosition.current[1] + mousePosition.y * 1.5 + floatY;
        const targetZ = originalPosition.current[2] + Math.sin(time * 0.3) * 0.2;
        
        meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05 * delta * 60;
        meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05 * delta * 60;
        meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.05 * delta * 60;
        
        // Reset emissive intensity
        meshRef.current.material.emissiveIntensity = 0.5;
      }
    }
  });

  // Determine which geometry to use based on shape prop
  const Geometry = () => {
    switch (shape) {
      case "sphere":
        return <sphereGeometry args={[0.7, 32, 32]} />;
      case "tetrahedron":
        return <tetrahedronGeometry args={[0.8, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.7, 0]} />;
      default:
        return <boxGeometry args={[0.8, 0.8, 0.8]} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
        onHover(data);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
        onHover(null);
      }}
      onClick={() => setIsClicked(!isClicked)}
    >
      <Geometry />
      <meshPhysicalMaterial
        color={isHovered ? "#FF6B6B" : "#2DD4BF"}
        emissive={isHovered ? "#FF6B6B" : "#2DD4BF"}
        emissiveIntensity={0.5}
        roughness={0.3}
        metalness={0.8}
        clearcoat={1.0}
        clearcoatRoughness={0.2}
        transmission={0.2}
        thickness={1}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

// Background stars and atmosphere effects
const BackgroundEffects = () => {
  const starsRef = useRef();
  
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0001;
      starsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.01;
    }
  });

  return (
    <group>
      <Stars 
        ref={starsRef}
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0.5}
        fade
        speed={0.5}
      />
      
      {/* Add atmospheric clouds in the distance */}
      <group position={[0, 0, -20]}>
        <Cloud 
          opacity={0.2}
          speed={0.1}
          width={30}
          depth={5}
          segments={20}
          color="#2DD4BF"
        />
      </group>
    </group>
  );
};

// Main 3D Scene Component
const Scene = ({ mousePosition, setHoveredObject }) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#0EA5E9" />
      <spotLight position={[5, 5, 5]} intensity={0.6} angle={0.2} penumbra={1} castShadow />
      
      <BackgroundEffects />
      <EnhancedParticles mousePosition={mousePosition} />
      <EnhancedFloatingText mousePosition={mousePosition} />
      
      {/* Interactive 3D Objects with different shapes */}
      <EnhancedInteractiveObject
        position={[2.5, 1.2, 0]}
        data={{ name: "React", description: "A JavaScript library for building user interfaces" }}
        mousePosition={mousePosition}
        onHover={setHoveredObject}
        shape="box"
      />
      <EnhancedInteractiveObject
        position={[-2.5, 1.2, 0]}
        data={{ name: "Node.js", description: "A JavaScript runtime for server-side development" }}
        mousePosition={mousePosition}
        onHover={setHoveredObject}
        shape="sphere"
      />
      <EnhancedInteractiveObject
        position={[0, -1.5, 0]}
        data={{ name: "Three.js", description: "A library for 3D graphics on the web" }}
        mousePosition={mousePosition}
        onHover={setHoveredObject}
        shape="octahedron"
      />
      <EnhancedInteractiveObject
        position={[-1.8, -0.5, 1]}
        data={{ name: "TypeScript", description: "A strongly typed programming language that builds on JavaScript" }}
        mousePosition={mousePosition}
        onHover={setHoveredObject}
        shape="tetrahedron"
      />
      <EnhancedInteractiveObject
        position={[1.8, -0.5, 1]}
        data={{ name: "Framer Motion", description: "A production-ready motion library for React" }}
        mousePosition={mousePosition}
        onHover={setHoveredObject}
        shape="box"
      />
    </>
  );
};

// High-quality bloom effect for hero text
const HeroText = ({ name, roles, currentRole, setHoveredWord, hoveredWord }) => {
  // Split text for animations
  const nameWords = name.split(" ");

  return (
    <div className="mb-8">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 relative">
        {nameWords.map((word, index) => (
          <motion.span
            key={index}
            className={`inline-block mx-1 text-glow ${
              hoveredWord === index ? "text-teal-400 transform scale-110" : hoveredWord !== null ? "opacity-70" : ""
            }`}
            whileHover={{ scale: 1.1, color: "#2DD4BF", transition: { duration: 0.2 } }}
            onHoverStart={() => setHoveredWord(index)}
            onHoverEnd={() => setHoveredWord(null)}
          >
            {word}
          </motion.span>
        ))}
      </h1>
      <div className="h-8 md:h-10">
        <TransitionGroup component={null}>
          <CSSTransition key={currentRole} timeout={500} classNames="role-transition">
            <motion.p
              className="text-xl md:text-2xl font-medium text-teal-300 role-text-glow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {roles[currentRole]}
            </motion.p>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
};

const leetcodeLogo = "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png";

const Hero = () => {
  const roles = ["Full Stack Developer", "Software Engineer", "Problem Solver", "Code Enthusiast"];
  const [currentRole, setCurrentRole] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mousePixelPosition, setMousePixelPosition] = useState({ x: 0, y: 0 });
  const [hoveredWord, setHoveredWord] = useState(null);
  const [hoveredObject, setHoveredObject] = useState(null);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const backgroundRef = useRef(null);

  // Parallax elements refs
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const socialRef = useRef(null);
  const bgParticlesRef = useRef(null);

  // Scroll-based animations
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ["0%", "50%"]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const parallaxY1 = useTransform(scrollY, [0, 500], [0, -100]);
  const parallaxY2 = useTransform(scrollY, [0, 500], [0, -50]);
  const parallaxY3 = useTransform(scrollY, [0, 500], [0, -25]);

  // Spring animation for smooth mouse movement
  const mouseX = useSpring(0, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 30 });

  // Role cycling effect
  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  // Mouse movement and scroll handling
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x - 0.5);
      mouseY.set(y - 0.5);
      setMousePosition({ x: x - 0.5, y: y - 0.5 });
      setMousePixelPosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrolled = window.scrollY;
        backgroundRef.current.style.transform = `translate3d(0, ${scrolled * 0.2}px, 0)`;
        if (canvasRef.current) {
          canvasRef.current.style.transform = `translate3d(0, ${scrolled * 0.05}px, 0)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Split text for animations
  const nameText = "Hi, I'm Kapil Sharma";
  const descriptionText =
    "A passionate Software Engineer focused on crafting elegant solutions through coding, problem-solving, and innovative web development.";
  const descriptionWords = descriptionText.split(" ");

  return (
    <motion.section
      id="home"
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0" ref={canvasRef}>
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 2]} // Performance optimization
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0
          }}
        >
          <Scene mousePosition={mousePosition} setHoveredObject={setHoveredObject} />
        </Canvas>
      </div>

      {/* Fixed Background with Parallax */}
      <motion.div
        ref={backgroundRef}
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('https://e0.pxfuel.com/wallpapers/627/591/desktop-wallpaper-better-start-of-a-future-technology-background-portfolio.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: backgroundY,
          opacity: 0.4, // Lower opacity for better ThreeJS visibility
          willChange: "transform",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-1"></div>

      {/* Animated Particles */}
      <motion.div
        ref={bgParticlesRef}
        className="particles absolute inset-0 z-1"
        style={{
          x: useTransform(mouseX, [-0.5, 0.5], [-20, 20]),
          y: useTransform(mouseY, [-0.5, 0.5], [-20, 20]),
        }}
      />

      {/* Main Content */}
      <InViewWrapper threshold={0.1} triggerOnce>
        {({ inView, ref }) => (
          <motion.div
            ref={ref}
            className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-6 max-w-6xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Name and Role */}
            <motion.div 
              ref={headingRef} 
              style={{ y: parallaxY1 }}
              className="pointer-events-auto"
            >
              <HeroText 
                name={nameText}
                roles={roles}
                currentRole={currentRole}
                setHoveredWord={setHoveredWord}
                hoveredWord={hoveredWord}
              />
            </motion.div>

            {/* Description */}
            <motion.div
              ref={descriptionRef}
              className="mb-10"
              style={{ y: parallaxY2 }}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200 leading-relaxed">
                {descriptionWords.map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mx-1"
                    whileHover={{ scale: 1.1, color: "#2DD4BF", transition: { duration: 0.2 } }}
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              ref={socialRef}
              className="flex justify-center space-x-8 mb-10"
              style={{ y: parallaxY3 }}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
            >
              <motion.a
                href="https://linkedin.com/in/kapil-sharma-1aa402230"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-teal-300 relative group"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="social-icon-container">
                  <FaLinkedin size={32} />
                </div>
                <motion.span
                  className="absolute -bottom-2 left-1/2 h-0.5 bg-teal-500"
                  initial={{ width: 0, x: "-50%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.a
                href="https://github.com/Kapil690789"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-teal-300 relative group"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="social-icon-container">
                  <FaGithub size={32} />
                </div>
                <motion.span
                  className="absolute -bottom-2 left-1/2 h-0.5 bg-teal-500"
                  initial={{ width: 0, x: "-50%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.a
                href="https://leetcode.com/u/kapil1909/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-full p-1.5 relative group social-icon-container-light"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={leetcodeLogo} alt="LeetCode" className="w-6 h-6" />
                <motion.span
                  className="absolute -bottom-2 left-1/2 h-0.5 bg-teal-500"
                  initial={{ width: 0, x: "-50%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.a
                href="mailto:kapil19092003@gmail.com"
                className="text-white hover:text-teal-300 relative group"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="social-icon-container">
                  <FaEnvelope size={32} />
                </div>
                <motion.span
                  className="absolute -bottom-2 left-1/2 h-0.5 bg-teal-500"
                  initial={{ width: 0, x: "-50%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.div>

            {/* Buttons */}
            <motion.div
              ref={buttonsRef}
              className="flex flex-wrap justify-center gap-4 md:gap-6"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
            >
              <motion.a
                href="#projects"
                className="relative px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold bg-teal-500 text-white overflow-hidden group neon-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">See My Work</span>
                <motion.div
                  className="absolute inset-0 bg-teal-600"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </motion.a>
              <motion.a
                href="mailto:kapil19092003@gmail.com"
                className="relative px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold border-2 border-teal-400 text-white overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Hire Me</span>
                <motion.div
                  className="absolute inset-0 bg-teal-400/20"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </motion.a>
              <motion.a
                href="https://drive.google.com/file/d/1NeBBycChUwjKC89Dbhm2gNiB78KWkuL7/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold border-2 border-white text-white overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Resume</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </InViewWrapper>

      {/* Tooltip for 3D Objects */}
      {hoveredObject && (
        <div
          style={{
            position: "fixed",
            top: `${mousePixelPosition.y}px`,
            left: `${mousePixelPosition.x}px`,
            transform: "translate(-50%, -100%)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "8px",
            borderRadius: "4px",
            pointerEvents: "none",
            zIndex: 100,
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(45, 212, 191, 0.3)",
          }}
        >
          <h3>{hoveredObject.name}</h3>
          <p>{hoveredObject.description}</p>
        </div>
      )}

      {/* Floating Elements */}
      <motion.div
        className="absolute w-20 h-20 rounded-full bg-teal-500/20 blur-xl pointer-events-none"
        style={{ x: useTransform(mouseX, [-0.5, 0.5], [-200, 200]), y: useTransform(mouseY, [-0.5, 0.5], [-200, 200]) }}
      />
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-purple-500/10 blur-xl pointer-events-none"
        style={{ x: useTransform(mouseX, [-0.5, 0.5], [150, -150]), y: useTransform(mouseY, [-0.5, 0.5], [-150, 150]) }}
      />
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-blue-500/5 blur-xl pointer-events-none"
        style={{ x: useTransform(mouseX, [-0.5, 0.5], [-180, 180]), y: useTransform(mouseY, [-0.5, 0.5], [120, -120]) }}
      />
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-yellow-500/5 blur-xl pointer-events-none"
        style={{ x: useTransform(mouseX, [-0.5, 0.5], [120, -120]), y: useTransform(mouseY, [-0.5, 0.5], [-100, 100]) }}
      />

      {/* Cursor Spotlight */}
      <motion.div
        className="absolute w-[40vw] h-[40vw] rounded-full bg-gradient-radial from-teal-500/5 to-transparent pointer-events-none"
        style={{ x: useTransform(mouseX, [-0.5, 0.5], [-100, 100]), y: useTransform(mouseY, [-0.5, 0.5], [-100, 100]) }}
      />

      <style jsx>{`
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }
        .particles:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
          z-index: 2;
        }
        .particles:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(255,255,255,0.1)' fillRule='evenodd'/%3E%3C/svg%3E");
          background-size: 150px;
          opacity: 0.5;
          animation: particleAnimation 15s linear infinite;
        }
        @keyframes particleAnimation {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        .bg-gradient-radial {
          background-image: radial-gradient(var(--tw-gradient-stops));
        }
        .role-transition-enter {
          opacity: 0;
          transform: translateY(10px);
        }
        .role-transition-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 500ms, transform 500ms;
        }
        .role-transition-exit {
          opacity: 1;
          transform: translateY(0);
          position: absolute;
        }
        .role-transition-exit-active {
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 500ms, transform 500ms;
        }
      `}</style>
      <style jsx>{`
  .neon-button {
    box-shadow: 0 0 10px rgba(45, 212, 191, 0.5);
    transition: box-shadow 0.3s ease;
  }
  .neon-button:hover {
    box-shadow: 0 0 20px rgba(45, 212, 191, 0.8), 0 0 30px rgba(45, 212, 191, 0.6);
  }
  .border-button {
    border-image: linear-gradient(45deg, #2DD4BF, #0EA5E9) 1;
  }
  .resume-button {
    border-image: linear-gradient(45deg, #ffffff, #94a3b8) 1;
  }
  .social-icon-container {
    transition: transform 0.3s ease;
  }
  .social-icon-container:hover {
    transform: translateY(-3px);
  }
  .social-icon-container-light {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
  }
  .text-glow {
    text-shadow: 0 0 10px rgba(45, 212, 191, 0.5);
  }
  .role-text-glow {
    text-shadow: 0 0 15px rgba(45, 212, 191, 0.7);
  }
`}</style>
    </motion.section>
  );
};

export default Hero;
