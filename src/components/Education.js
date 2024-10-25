import React from 'react';

const Education = () => {
  return (
    <section
      id="education"
      className="relative py-20 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://e1.pxfuel.com/desktop-wallpaper/242/198/desktop-wallpaper-cyber-world-cyber.jpg')`,
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 text-white">Education</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* B.Tech Card */}
          <div className="group relative bg-gray-700 bg-opacity-80 p-6 rounded-lg transition-transform transform hover:scale-105 hover:rotate-1 hover:bg-gray-600 shadow-lg hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-white mb-2">
              B.Tech in Computer Science & Engineering
            </h3>
            <p className="text-teal-400">
              Guru Jambheshwar University of Science and Technology (2022-2026)
            </p>
            <p className="text-gray-300">CGPA: 7.80/10</p>
          </div>

          {/* B.Sc Card */}
          <div className="group relative bg-gray-700 bg-opacity-80 p-6 rounded-lg transition-transform transform hover:scale-105 hover:-rotate-1 hover:bg-gray-600 shadow-lg hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-white mb-2">
              B.Sc (Hons.) in Chemistry, Math
            </h3>
            <p className="text-teal-400">Kirori Mal College (2021 - 2022)</p>
          </div>

          {/* RPS Public School Card */}
          <div className="group relative bg-gray-700 bg-opacity-80 p-6 rounded-lg transition-transform transform hover:scale-105 hover:rotate-1 hover:bg-gray-600 shadow-lg hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-white mb-2">
              RPS Public School, Narnaul
            </h3>
            <p className="text-teal-400">2021</p>
            <p className="text-gray-300">Percentage: 94.60%</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
