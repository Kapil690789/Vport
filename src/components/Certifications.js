import React, { useEffect, useRef, useState } from 'react';

const Certifications = () => {
  const [isVisible, setIsVisible] = useState(false); // Track visibility state
  const sectionRef = useRef(null); // Reference to the section

  // Intersection Observer to detect when the section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing after first trigger
        }
      },
      { threshold: 0.2 } // Trigger animation when 20% of the section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className={`relative py-20 bg-cover bg-center transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        backgroundImage: `url('https://e0.pxfuel.com/wallpapers/653/339/desktop-wallpaper-child-of-eden-concept-art-your-new.jpg')`,
      }}
    >
      {/* Overlay to improve text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 text-white">Trainings & Certifications</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group bg-gray-700 bg-opacity-80 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-600 hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-white">AR (Facebook Meta)</h3>
            <p className="text-gray-300">Completed through ReSkill | Spark AR (Nov 2022)</p>
          </div>

          <div className="group bg-gray-700 bg-opacity-80 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-600 hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-white">HackerRank Certified Software Engineer</h3>
            <p>
              <a
                href="https://www.hackerrank.com/certificates/25ff6c9e7d9a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 hover:underline"
              >
                View Certificate
              </a>
            </p>
          </div>

          <div className="group bg-gray-700 bg-opacity-80 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-600 hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-white">Google Developer Student Club (GDSC)</h3>
            <p className="text-gray-300">
              Participated in various workshops and projects to enhance skills.
            </p>
          </div>

          <div className="group bg-gray-700 bg-opacity-80 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-600 hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-white">Data Structures and Algorithms Training</h3>
            <p className="text-gray-300">
              Completed a comprehensive course on data structures and algorithms.
            </p>
          </div>

          <div className="group bg-gray-700 bg-opacity-80 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-600 hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-white">Certifications on LinkedIn</h3>
            <p className="text-gray-300">
              You can find all my certifications on my LinkedIn profile:
              <a
                href="https://www.linkedin.com/in/kapil-sharma-1aa402230/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 hover:underline"
              >
                View LinkedIn Profile
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
