import { useState, useEffect, useRef } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Custom InView component to handle intersection observing
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

const leetcodeLogo =
  "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png";

const Hero = () => {
  const roles = ["Full Stack Developer", "Software Engineer", "Problem Solver"];
  const [currentRole, setCurrentRole] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredWord, setHoveredWord] = useState(null);
  const heroRef = useRef(null);
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

  // Spring animation for smooth mouse movement
  const mouseX = useSpring(0, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x - 0.5);
      mouseY.set(y - 0.5);
      setMousePosition({ x: x - 0.5, y: y - 0.5 });
    };

    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrolled = window.scrollY;
        backgroundRef.current.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
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
  const nameWords = nameText.split(" ");

  const descriptionText =
    "A passionate Software Engineer focused on crafting elegant solutions through coding, problem-solving, and web development.";
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
      {/* Fixed Background with Parallax */}
      <motion.div
        ref={backgroundRef}
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('https://e0.pxfuel.com/wallpapers/627/591/desktop-wallpaper-better-start-of-a-future-technology-background-portfolio.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: backgroundY,
          opacity,
          willChange: "transform",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-1"></div>

      {/* Animated Particles */}
      <motion.div
        ref={bgParticlesRef}
        className="particles absolute inset-0 z-1"
        style={{
          x: useTransform(mouseX, [-0.5, 0.5], [-20, 20]),
          y: useTransform(mouseY, [-0.5, 0.5], [-20, 20]),
        }}
      />

      {/* Main Content wrapped with custom InViewWrapper */}
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
              className="mb-8"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 relative">
                {nameWords.map((word, index) => (
                  <motion.span
                    key={index}
                    className={`inline-block mx-1 ${
                      hoveredWord === index
                        ? "text-teal-400 transform scale-110"
                        : hoveredWord !== null
                        ? "opacity-70"
                        : ""
                    }`}
                    whileHover={{
                      scale: 1.1,
                      color: "#2DD4BF",
                      transition: { duration: 0.2 },
                    }}
                    onHoverStart={() => setHoveredWord(index)}
                    onHoverEnd={() => setHoveredWord(null)}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              {/* Animated Role */}
              <div className="h-8 md:h-10">
                <TransitionGroup component={null}>
                  <CSSTransition key={currentRole} timeout={500} classNames="role-transition">
                    <motion.p
                      className="text-xl md:text-2xl font-medium text-teal-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {roles[currentRole]}
                    </motion.p>
                  </CSSTransition>
                </TransitionGroup>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              ref={descriptionRef}
              className="mb-10"
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
                    whileHover={{
                      scale: 1.1,
                      color: "#2DD4BF",
                      transition: { duration: 0.2 },
                    }}
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
                <FaLinkedin size={32} />
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
                <FaGithub size={32} />
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
                className="bg-white rounded-full p-1.5 relative group"
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
                <FaEnvelope size={32} />
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
                className="relative px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold bg-teal-500 text-white overflow-hidden"
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
                className="relative px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold border-2 border-teal-400 text-white overflow-hidden"
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
                href="https://drive.google.com/file/d/1n4vI77QmqIF6CbqzIQF0HrmKfem-oCQZ/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold border-2 border-white text-white overflow-hidden"
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

      {/* Floating elements with Framer Motion */}
      <motion.div
        className="absolute w-20 h-20 rounded-full bg-teal-500/20 blur-xl pointer-events-none"
        style={{
          x: useTransform(mouseX, [-0.5, 0.5], [-200, 200]),
          y: useTransform(mouseY, [-0.5, 0.5], [-200, 200]),
        }}
      />

      <motion.div
        className="absolute w-32 h-32 rounded-full bg-purple-500/10 blur-xl pointer-events-none"
        style={{
          x: useTransform(mouseX, [-0.5, 0.5], [150, -150]),
          y: useTransform(mouseY, [-0.5, 0.5], [-150, 150]),
        }}
      />

      <motion.div
        className="absolute w-40 h-40 rounded-full bg-blue-500/5 blur-xl pointer-events-none"
        style={{
          x: useTransform(mouseX, [-0.5, 0.5], [-180, 180]),
          y: useTransform(mouseY, [-0.5, 0.5], [120, -120]),
        }}
      />

      <motion.div
        className="absolute w-24 h-24 rounded-full bg-yellow-500/5 blur-xl pointer-events-none"
        style={{
          x: useTransform(mouseX, [-0.5, 0.5], [120, -120]),
          y: useTransform(mouseY, [-0.5, 0.5], [-100, 100]),
        }}
      />

      {/* Cursor spotlight */}
      <motion.div
        className="absolute w-[40vw] h-[40vw] rounded-full bg-gradient-radial from-teal-500/5 to-transparent pointer-events-none"
        style={{
          x: useTransform(mouseX, [-0.5, 0.5], [-100, 100]),
          y: useTransform(mouseY, [-0.5, 0.5], [-100, 100]),
        }}
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
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
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
    </motion.section>
  );
};

export default Hero;
