import React from 'react';

const skills = [
  'C', 'C++', 'Java', 'JavaScript', 'HTML', 'CSS', 'ReactJS',
  'TailwindCSS', 'EJS', 'Node.js', 'Express.js', 'SQL', 'MongoDB',
  'Git', 'GitHub', 'AWS', 'Linux', 'Data Structures', 'Algorithms',
  'Computer Networks'
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">Skills</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-teal-500 text-white px-4 py-2 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
