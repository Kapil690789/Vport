import React, { useEffect, useRef, useState } from 'react';
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGitAlt, FaAws } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss, SiLinux, SiCplusplus } from 'react-icons/si';

const categories = [
  {
    title: 'Programming Languages',
    icon: <SiCplusplus size={40} className="text-blue-500" />,
    skills: ['C', 'C++', 'Java', 'JavaScript', 'Data Structures', 'Algorithms'],
  },
  {
    title: 'Web Development',
    icon: <FaHtml5 size={40} className="text-orange-500" />,
    skills: ['HTML', 'CSS', 'ReactJS', 'TailwindCSS', 'EJS', 'Node.js', 'Express.js'],
  },
  {
    title: 'Databases & Dev Tools',
    icon: <SiMongodb size={40} className="text-green-500" />,
    skills: ['MongoDB', 'SQL', 'Git', 'GitHub', 'AWS', 'Linux', 'Computer Networks'],
  },
];

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false); // State to track if section is in view
  const sectionRef = useRef(null); // Ref to monitor the skills section

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Set visibility to true when section is in view
          observer.unobserve(entry.target); // Stop observing after the first view
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the section is in view
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`py-20 bg-gray-900 transition-opacity duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 text-white">Skills</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-center mb-4">{category.icon}</div>
              <h3 className="text-2xl font-semibold mb-4 text-white">{category.title}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill, i) => (
                  <li key={i} className="text-teal-500">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
