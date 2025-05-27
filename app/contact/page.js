'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const socialLinks = [
  { name: 'Twitter', url: 'https://twitter.com/ewuranna', icon: '/social/twitter.svg' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/ewuranna', icon: '/social/linkedin.svg' },
  { name: 'GitHub', url: 'https://github.com/ewuranna', icon: '/social/github.svg' },
  { name: 'Instagram', url: 'https://instagram.com/ewuranna', icon: '/social/instagram.svg' },
  { name: 'Crowdpen ', url: 'https://crowdpen.com/@ewuranna', icon: '/social/crowdpen.svg' },

];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ message: '', type: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ message: 'Your message has been sent successfully!', type: 'success' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      setStatus({ message: error.message || 'Failed to send message', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <Navbar />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/3 -right-1/3 w-2/3 h-2/3 bg-gradient-to-br from-purple-100 to-blue-50 rounded-full opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-blue-100 to-purple-50 rounded-full opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Hero Section */}
      <motion.div 
        className="pt-32 pb-20 bg-gradient-to-br from-primary to-purple-700 text-white relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)]"></div>
        <div className="container-custom relative">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            className="text-xl max-w-3xl opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Have questions or want to work together? Send me a message and I'll get back to you as soon as possible.
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="py-16 relative"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="container-custom">
          <motion.div 
            className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12"
            variants={fadeInUp}
          >
            {/* Contact Form */}
            <motion.div 
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -5 }}
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-bold text-text-dark mb-6">
                Send a Message
                <span className="block w-12 h-1 bg-gradient-to-r from-accent to-[#FF8C6B] mt-2 rounded-full"></span>
              </h2>
              
              {status.message && (
                <div className={`mb-6 p-4 rounded-lg ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-accent to-[#FF8C6B] text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-all duration-300 disabled:opacity-70 flex items-center justify-center shadow-md hover:shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : 'Send Message'}
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              className="relative"
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-bold text-text-dark mb-6">
                Contact Information
                <span className="block w-12 h-1 bg-gradient-to-r from-accent to-[#FF8C6B] mt-2 rounded-full"></span>
              </h2>
              <p className="text-text-medium mb-8">
                Feel free to reach out through the form or directly via email. I'll get back to you as soon as possible.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-text-medium">Email</p>
                    <a href="mailto:hello@ewuranna.com" className="text-text-dark hover:text-accent transition-colors">
                      hello@ewuranna.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-text-medium">Location</p>
                    <p className="text-text-dark">Accra, Ghana</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <motion.div 
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-medium text-text-dark mb-4">Connect with me</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-medium hover:text-accent transition-colors group"
                      aria-label={social.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (index * 0.1) }}
                      whileHover={{ y: -5 }}
                    >
                      <span className="sr-only">{social.name}</span>
                      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-accent/10 group-hover:to-[#FF8C6B]/20">
                        <div className="h-6 w-6 relative">
                          <Image 
                            src={social.icon} 
                            alt={social.name} 
                            fill
                            className="object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
