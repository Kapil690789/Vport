import React from 'react';

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
  return (
    <section id="projects" className="py-20 bg-gray-800">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="mb-4">{project.description}</p>
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
