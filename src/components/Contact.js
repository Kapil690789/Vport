import React, { useEffect, useRef, useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gray-900 relative">
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 text-white">Contact Me</h2>
        <form
          className={`max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-gray-700 text-white focus:ring-2 focus:ring-teal-500 transition-all"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-gray-700 text-white focus:ring-2 focus:ring-teal-500 transition-all"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-gray-700 text-white focus:ring-2 focus:ring-teal-500 transition-all"
            rows="4"
            required
          />
          <button className="bg-teal-500 px-6 py-2 rounded hover:bg-teal-400 hover:shadow-lg transition-all" type="submit">
            Send Message
          </button>
        </form>
        {status && <p className="mt-4 text-teal-400">{status}</p>}
      </div>
    </section>
  );
};

export default Contact;