import React from 'react';

const Education = () => {
  return (
    <section id="education" className="py-20 bg-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">Education</h2>
        <div className="space-y-8">
          <div className="bg-gray-700 p-6 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold">B.Tech in Computer Science & Engineering</h3>
            <p>Guru Jambheshwar University of Science and Technology (2022-2026)</p>
            <p>CGPA: 7.80/10</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold">B.Sc (Hons.) in Chemistry, Math</h3>
            <p>Kirori Mal College (2021 - 2022)</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
