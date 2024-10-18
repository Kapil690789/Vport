import React from 'react';

const WorkExperience = () => {
  return (
    <section id="work" className="py-20 bg-gray-800">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">Work Experience</h2>
        <div className="space-y-8">
          <div className="bg-gray-700 p-6 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold">Freelance Software Developer</h3>
            <p>Freelance, Virtual | Oct 2023 - Jun 2024</p>
            <p>Worked on various web and software development projects for clients.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold">Subject Matter Expert</h3>
            <p>Infinity Learn, Virtual | Jul 2023 - Oct 2023</p>
            <p>Provided expert guidance and support to students.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
