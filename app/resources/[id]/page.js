'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { resources } from '../../data/resources';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DownloadModal from '../../components/DownloadModal';

export default function ResourceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [resource, setResource] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [relatedResources, setRelatedResources] = useState([]);

  useEffect(() => {
    const foundResource = resources.find(r => r.id.toString() === id);
    
    if (!foundResource) {
      router.push('/resources');
      return;
    }
    
    setResource(foundResource);
    
    // Find related resources (same category, excluding current resource)
    const related = resources.filter(
      r => r.category === foundResource.category && r.id !== foundResource.id
    ).slice(0, 3);
    setRelatedResources(related);
  }, [id, router]);

  if (!resource) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-4xl">
            <span className="inline-block bg-white/20 text-sm px-3 py-1 rounded-full mb-4">
              {resource.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{resource.title}</h1>
            <p className="text-xl opacity-90">{resource.longDescription || resource.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
              {resource.previewImage && (
                <div className="relative h-64 md:h-96 bg-gray-50">
                  <Image
                    src={resource.previewImage}
                    alt={resource.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                  <div>
                    <span className="inline-block bg-secondary text-text-medium text-xs font-medium px-2.5 py-1 rounded-full mb-2">
                      {resource.fileType}
                    </span>
                    <span className="text-text-light text-sm ml-2">
                      {resource.fileSize}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors font-medium flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Now
                  </button>
                </div>
                
                <div className="prose max-w-none">
                  {resource.details?.map((detail, index) => (
                    <div key={index} className="mb-6">
                      <h3 className="text-xl font-bold text-text-dark mb-2">{detail.title}</h3>
                      <p className="text-text-medium">{detail.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {relatedResources.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6 text-text-dark">Related Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedResources.map((related) => (
                    <div 
                      key={related.id}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                    >
                      <Link href={`/resources/${related.id}`}>
                        <div className="relative h-40 bg-gray-50">
                          {related.previewImage ? (
                            <Image
                              src={related.previewImage}
                              alt={related.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="text-4xl h-full flex items-center justify-center">
                              {related.icon}
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-text-dark mb-1">{related.title}</h3>
                          <p className="text-sm text-text-medium line-clamp-2">{related.description}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
      
      {/* Download Modal */}
      <DownloadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        resource={resource} 
      />
    </div>
  );
}
