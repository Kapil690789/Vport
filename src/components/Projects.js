import React, { useEffect, useRef, useState } from 'react';

const projects = [
  {
    title: 'React Project',
    description: 'Here is all react 10 project basic to hard',
    link: 'https://github.com/Kapil690789/Kapil-aur-react'
  },
  {
    title: 'Prescripto',
    description: 'Doctor Appointment System based on MERN Stack Project and also admin/doctor link  ',
     link: 'https://prescripto-frontend-616t.onrender.com',
     
  },
  {
    title: 'Simon Game',
    description: 'Fully functional game using HTML, CSS, and JavaScript.',
    link: 'https://github.com/Kapil690789/Simon-Game'
  },
  {
    title: 'To-Do List Application',
    description: 'Interactive to-do list using React for task management.',
    link: 'https://todolist-gamma-flax.vercel.app/'
  },
  {
    title: 'Chess Game',
    description: 'Chess game with Node.js backend and EJS for templating.',
    link: 'https://github.com/Kapil690789/Chess-game'
  },
  {
    title: 'E-commerce Backend (Scatch)',
    description: 'Backend for an e-commerce platform using Node.js and bcrypt.',
    link: 'https://github.com/Kapil690789/Scatch-'
  }
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://e1.pxfuel.com/desktop-wallpaper/727/195/desktop-wallpaper-blue-aqua-digital-art-circuitry-gray-black-artwork-abstract-geometry-abstract-black-thumbnail.jpg')`,
      }}
    >
      {/* Overlay to improve text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 text-white">Projects</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`bg-gray-700 bg-opacity-80 p-6 rounded-lg transform transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              } hover:scale-105 hover:rotate-1 hover:bg-gray-600 shadow-lg hover:shadow-xl`}
            >
              <h3 className="text-2xl font-semibold mb-2 text-white">
                {project.title}
              </h3>
              <p className="mb-4 text-gray-300">{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-500 hover:underline"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
