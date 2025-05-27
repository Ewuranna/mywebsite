'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ImageLightbox({ images, currentIndex, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);

  useEffect(() => {
    setCurrentImageIndex(currentIndex);
  }, [currentIndex]);

  const showNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const showPrevious = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };

  if (currentIndex === null) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button 
        className="absolute top-4 right-6 text-white text-4xl hover:text-accent transition-colors"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        &times;
      </button>
      
      {images.length > 1 && (
        <>
          <button 
            className="absolute left-4 md:left-8 text-white text-4xl hover:text-accent transition-colors z-10"
            onClick={showPrevious}
            aria-label="Previous image"
          >
            &larr;
          </button>
          <button 
            className="absolute right-4 md:right-8 text-white text-4xl hover:text-accent transition-colors z-10"
            onClick={showNext}
            aria-label="Next image"
          >
            &rarr;
          </button>
        </>
      )}
      
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
        <Image
          src={images[currentImageIndex]}
          alt={`Gallery image ${currentImageIndex + 1}`}
          fill
          className="object-contain p-4"
          onClick={(e) => e.stopPropagation()}
        />
        
        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
}
