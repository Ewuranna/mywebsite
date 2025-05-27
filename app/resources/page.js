'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { resources, categories } from '../data/resources';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DownloadModal from '../components/DownloadModal';

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'All' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-primary text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Resources</h1>
          <p className="text-xl max-w-3xl">
            Download our collection of resources, templates, and guides to help you get the most out of Ewuranna's offerings.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="container-custom">
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-2xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Category Filter - Mobile */}
              <div className="md:hidden">
                <select
                  className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent rounded-lg"
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Category Filter - Desktop */}
              <div className="hidden md:flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category
                        ? 'bg-accent text-white'
                        : 'bg-secondary text-text-dark hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource) => (
                <div 
                  key={resource.id} 
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-gray-100"
                >
                  {/* Preview Image */}
                  <div className="relative h-48 bg-gray-50 flex items-center justify-center">
                    {resource.previewImage ? (
                      <Image
                        src={resource.previewImage}
                        alt={resource.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="text-5xl">{resource.icon}</div>
                    )}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center mb-3">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-text-medium">
                        {resource.fileType}
                      </span>
                      <span className="ml-2 text-xs text-text-light">
                        {resource.fileSize}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-text-dark">{resource.title}</h3>
                    <p className="text-text-medium mb-4 flex-1">{resource.description}</p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                      <Link
                        href={`/resources/${resource.id}`}
                        className="flex-1 text-center px-4 py-2 border border-gray-300 rounded-md text-text-dark hover:bg-gray-50 transition-colors font-medium text-sm"
                      >
                        Learn More
                      </Link>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedResource(resource);
                          setIsModalOpen(true);
                        }}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors font-medium text-sm"
                      >
                        <span>Download</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-text-dark mb-2">No resources found</h3>
              <p className="text-text-medium">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
      
      {/* Download Modal */}
      <DownloadModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedResource(null);
        }} 
        resource={selectedResource} 
      />
    </div>
  );
}
