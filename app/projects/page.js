'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { projects, allTags } from '../data/projects';

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState(6);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter));

  const loadMore = () => {
    setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-primary text-white">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4">Our Projects</h1>
          <p className="text-xl max-w-3xl">
            Explore our portfolio of innovative projects that drive impact and create value across various sectors.
          </p>
        </div>
      </div>

      {/* Projects Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            <button
              onClick={() => setActiveFilter('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'All'
                  ? 'bg-accent text-white'
                  : 'bg-secondary text-text-dark hover:bg-gray-200'
              }`}
            >
              All Projects
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === tag
                    ? 'bg-accent text-white'
                    : 'bg-secondary text-text-dark hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredProjects.slice(0, visibleProjects).map((project) => (
              <Link 
                href={`/projects/${project.slug}`}
                key={project.id} 
                className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-accent text-white px-6 py-2 rounded-full font-medium">
                      View Project
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-text-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary/50 text-text-medium">
                        +{project.tags.length - 2}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-text-dark">{project.title}</h3>
                  <p className="text-text-medium mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-light">{project.year}</span>
                    {project.featured && (
                      <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-accent/10 text-accent">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          {visibleProjects < filteredProjects.length && (
            <div className="text-center">
              <button
                onClick={loadMore}
                className="bg-accent text-white px-8 py-3 rounded-full font-medium hover:bg-accent/90 transition-colors"
              >
                Load More Projects
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Have a project in mind?</h2>
          <p className="text-lg text-text-medium max-w-2xl mx-auto mb-8">
            Let's collaborate and bring your ideas to life. Get in touch to discuss how we can work together.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-accent text-white px-8 py-3 rounded-full font-medium hover:bg-accent/90 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
