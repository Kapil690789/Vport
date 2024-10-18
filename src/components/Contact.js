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
    // Here, instead of sending data to the backend,
    // you can display a success message directly.
    setStatus('Message sent successfully!'); // Simulated success message
    setFormData({ name: '', email: '', message: '' }); // Reset form fields
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
        {status && <p className="mt-4">{status}</p>} {/* Display the simulated status message */}
      </div>
    </section>
  );
};

export default Contact;
