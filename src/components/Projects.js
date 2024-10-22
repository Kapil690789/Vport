import React, { useEffect, useRef, useState } from 'react';

const projects = [
  {
    title: 'React Router Implementation',
    description: 'Implementation of React Router for dynamic routing.',
    link: 'https://github.com/Kapil690789/React-Router'
  },
  {
    title: 'To-Do List Application',
    description: 'Interactive to-do list using React for task management.',
    link: 'https://todolist-gamma-flax.vercel.app/'
  },
  {
    title: 'Simon Game',
    description: 'Fully functional game using HTML, CSS, and JavaScript.',
    link: 'https://github.com/Kapil690789/Simon-Game'
  },
  {
    title: 'Hotstar Clone',
    description: 'Clone of the Hotstar website using HTML, CSS, and JavaScript.'
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
    <section id="projects" ref={sectionRef} className="py-20 bg-gray-800">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 text-white">Projects</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`bg-gray-700 p-6 rounded-lg transform transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              } hover:scale-105 hover:rotate-1 hover:bg-gray-600 shadow-lg hover:shadow-xl`}
            >
              <h3 className="text-2xl font-semibold mb-2 text-white">{project.title}</h3>
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
