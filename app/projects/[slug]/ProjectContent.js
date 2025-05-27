'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '../../data/projects';
import ImageLightbox from '../../components/ImageLightbox';

export default function ProjectContent({ slug }) {
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Clean up the overflow style when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    // Find the project with the matching slug
    const foundProject = projects.find(p => p.slug === slug);
    
    if (foundProject) {
      setProject(foundProject);
      setIsLoading(false);
    } else {
      // Redirect to 404 if project not found
      router.push('/404');
    }
  }, [slug, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <>
      {/* Project Header */}
      <div className="pt-32 pb-20 bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span 
                  key={tag}
                  className="inline-block bg-white/20 text-white/90 text-xs font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
            <p className="text-xl opacity-90">{project.description}</p>
          </div>
        </div>
      </div>

      {/* Project Meta */}
      <div className="py-8 bg-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-text-medium mb-1">YEAR</h3>
              <p className="text-text-dark">{project.year}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-medium mb-1">CLIENT</h3>
              <p className="text-text-dark">{project.client}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-medium mb-1">ROLE</h3>
              <p className="text-text-dark">{project.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="container-custom">
          {/* Main Image */}
          <div className="mb-16 rounded-xl overflow-hidden shadow-xl">
            <div className="relative h-96 md:h-[600px] w-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Project Content */}
          <div className="max-w-4xl mx-auto">
            {/* Overview */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6 text-text-dark">Project Overview</h2>
              <div className="prose max-w-none text-text-medium">
                <p>{project.content.overview}</p>
              </div>
            </section>

            {/* Challenge & Solution */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <section>
                <h3 className="text-xl font-semibold mb-4 text-text-dark">The Challenge</h3>
                <p className="text-text-medium">{project.content.challenge}</p>
              </section>
              <section>
                <h3 className="text-xl font-semibold mb-4 text-text-dark">Our Solution</h3>
                <p className="text-text-medium">{project.content.solution}</p>
              </section>
            </div>

            {/* Results */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6 text-text-dark">Results & Impact</h2>
              <ul className="space-y-3">
                {project.content.results.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-text-medium">{result}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Gallery */}
            {project.content.gallery && project.content.gallery.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold mb-6 text-text-dark">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.content.gallery.map((image, index) => (
                    <div 
                      key={index} 
                      className="rounded-xl overflow-hidden shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => {
                        setLightboxIndex(index);
                        openLightbox(index);
                      }}
                    >
                      <div className="relative h-64 w-full">
                        <Image
                          src={image}
                          alt={`${project.title} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <svg 
                            className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m0 0v6m0-6h6m-6 0H4" 
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Lightbox */}
                {isLightboxOpen && (
                  <ImageLightbox
                    images={project.content.gallery}
                    currentIndex={lightboxIndex}
                    onClose={closeLightbox}
                  />
                )}
              </section>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start your project?</h2>
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
    </>
  );
}
