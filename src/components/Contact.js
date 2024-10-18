// import React from 'react';

// const Contact = () => {
//   return (
//     <section id="contact" className="py-20 bg-gray-800">
//       <div className="container mx-auto text-center">
//         <h2 className="text-4xl font-bold mb-10">Contact Me</h2>
//         <p className="mb-6">Feel free to reach out through the following platforms:</p>

//         <div className="flex justify-center space-x-6 mb-6">
//           <a
//             href="https://linkedin.com/in/kapil-sharma-1aa402230"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-teal-500 hover:underline"
//           >
//             LinkedIn
//           </a>
//           <a
//             href="https://github.com/Kapil690789"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-teal-500 hover:underline"
//           >
//             GitHub
//           </a>
//           <a
//             href="https://leetcode.com/u/kapil1909/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-teal-500 hover:underline"
//           >
//             LeetCode
//           </a>
//         </div>

//         <form className="max-w-lg mx-auto">
//           <input
//             type="text"
//             placeholder="Your Name"
//             className="w-full p-3 mb-4 rounded bg-gray-700"
//           />
//           <input
//             type="email"
//             placeholder="Your Email"
//             className="w-full p-3 mb-4 rounded bg-gray-700"
//           />
//           <textarea
//             placeholder="Your Message"
//             className="w-full p-3 mb-4 rounded bg-gray-700"
//             rows="4"
//           ></textarea>
//           <button className="bg-teal-500 px-6 py-2 rounded hover:bg-teal-400">
//             Send Message
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Contact;
import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      if (response.data.success) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setStatus('Error sending message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">Contact Me</h2>
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-gray-700"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-gray-700"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-gray-700"
            rows="4"
            required
          ></textarea>
          <button className="bg-teal-500 px-6 py-2 rounded hover:bg-teal-400" type="submit">
            Send Message
          </button>
        </form>
        {status && <p className="mt-4">{status}</p>}
      </div>
    </section>
  );
};

export default Contact;
