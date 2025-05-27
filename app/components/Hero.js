import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
        <div className="fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Hello, I'm <span className="text-primary">Ewuranna</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
            Turning ideas into impactful digital experiences
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#projects" className="btn btn-primary slide-up">
              See My Work
            </Link>
            <Link href="#contact" className="btn btn-secondary slide-up">
              Get In Touch
            </Link>
          </div>
        </div>
        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl fade-in">
          <Image 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Ewuranna" 
            fill 
            style={{objectFit: 'cover'}} 
            className="transition-transform duration-500 hover:scale-105"
            priority
          />
        </div>
      </div>
    </section>
  );
}
