'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItem = {
  hidden: { opacity: 0, y: -10 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      ease: 'easeOut',
      duration: 0.3
    }
  }
};

const navContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-sm shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <Link href="/" className="z-50">
            <Image 
              src="/Ewuranna Logo.png" 
              alt="Ewuranna Logo"
              width={150} 
              height={60}
              className="transition-all duration-300"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <motion.div 
            className="hidden md:flex items-center space-x-8"
            variants={navContainer}
            initial="hidden"
            animate="show"
          >
            {[
              { name: 'Home', href: '/' },
              { name: 'About', href: '/about' },
              { name: 'Projects', href: '/projects' },
              { name: 'Resources', href: '/resources' },
              { name: 'Contact', href: '/contact' },
            ].map((item) => (
              <motion.div key={item.name} variants={navItem}>
                <Link 
                  href={item.href}
                  className="relative text-text-dark hover:text-accent transition-colors duration-300 font-medium group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-[#FF8C6B] transition-all duration-300 group-hover:w-full"></span>
                  <div className="absolute -top-1/3 -right-1/3 w-2/3 h-2/3 bg-gradient-to-br from-accent/5 to-[#FF8C6B]/10 rounded-full opacity-50 animate-blob animation-delay-2000"></div>
                  <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-[#FF8C6B]/10 to-accent/5 rounded-full opacity-70 animate-blob animation-delay-4000"></div>
                </Link>
              </motion.div>
            ))}
            <motion.div variants={navItem}>
              <Link 
                href="#" 
                className="relative bg-gradient-to-r from-accent to-[#FF8C6B] text-white px-6 py-2 rounded-full hover:opacity-90 transition-all duration-300 font-medium whitespace-nowrap overflow-hidden group"
              >
                <span className="relative z-10">Book a Discovery Call</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#FF8C6B] to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden z-50 p-2 -mr-2" 
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="md:hidden fixed inset-0 bg-white z-40 pt-24 px-6"
          >
            <motion.div 
              className="flex flex-col items-center space-y-6 text-xl"
              variants={navContainer}
              initial="hidden"
              animate="show"
            >
              {[
                { name: 'Home', href: '/' },
                { name: 'About', href: '/about' },
                { name: 'Projects', href: '/projects' },
                { name: 'Resources', href: '/resources' },
                { name: 'Contact', href: '/contact' },
              ].map((item, index) => (
                <motion.div 
                  key={item.name}
                  variants={navItem}
                  custom={index}
                  className="w-full text-center"
                >
                  <Link 
                    href={item.href}
                    className="block py-3 text-text-dark hover:text-accent transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div 
                variants={navItem}
                custom={5}
                className="w-full mt-4"
              >
                <Link 
                  href="#" 
                  className="block w-full text-center py-3 px-6 bg-gradient-to-r from-accent to-purple-500 text-white rounded-lg hover:opacity-90 transition-all duration-300 font-medium whitespace-nowrap"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book a Discovery Call
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
