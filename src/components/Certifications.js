import React from 'react';

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 bg-gray-800">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">Trainings & Certifications</h2>
        <div className="space-y-8">
          <div className="bg-gray-700 p-6 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold">AR (Facebook Meta)</h3>
            <p>Completed through ReSkill | Spark AR (Nov 2022)</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold">HackerRank Certified Software Engineer</h3>
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
          <div className="bg-gray-700 p-6 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold">Google Developer Student Club (GDSC)</h3>
            <p>Participated in various workshops and projects to enhance skills.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold">Data Structures and Algorithms Training</h3>
            <p>Completed a comprehensive course on data structures and algorithms.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold">Certifications on LinkedIn</h3>
            <p>
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
