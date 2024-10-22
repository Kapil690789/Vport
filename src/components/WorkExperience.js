import React from 'react';

const WorkExperience = () => {
  return (
    <section id="work" className="py-20 bg-gray-800">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 text-white">Work Experience</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="group relative bg-gray-700 p-6 rounded-lg transition-transform transform hover:rotate-1 hover:scale-105 hover:bg-gray-600 shadow-lg hover:shadow-2xl">
            <div className="transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 opacity-75">
              <h3 className="text-2xl font-semibold text-white">Freelance Software Developer</h3>
              <p className="text-teal-400">Freelance, Virtual | Oct 2023 - Jun 2024</p>
              <p className="text-gray-300">
                Worked on various web and software development projects for clients.
              </p>
            </div>
          </div>

          <div className="group relative bg-gray-700 p-6 rounded-lg transition-transform transform hover:-rotate-1 hover:scale-105 hover:bg-gray-600 shadow-lg hover:shadow-2xl">
            <div className="transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 opacity-75">
              <h3 className="text-2xl font-semibold text-white">Subject Matter Expert</h3>
              <p className="text-teal-400">Infinity Learn, Virtual | Jul 2023 - Oct 2023</p>
              <p className="text-gray-300">
                Provided expert guidance and support to students.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
