import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Message sent successfully!'); // Simulated success message
    setFormData({ name: '', email: '', message: '' }); // Reset form fields
  };

  return (
    <section
      id="contact"
      className="relative py-20 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://e0.pxfuel.com/wallpapers/265/130/desktop-wallpaper-statistics.jpg')`,
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 text-white">Contact Me</h2>
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
            rows="4"
            required
          ></textarea>
          <button className="bg-teal-500 px-6 py-2 rounded hover:bg-teal-400 transition-colors" type="submit">
            Send Message
          </button>
        </form>
        {status && <p className="mt-4 text-white">{status}</p>} {/* Display status message */}
      </div>
    </section>
  );
};

export default Contact;
