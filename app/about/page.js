import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Add padding top to account for fixed navbar */}
      <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-6">About Ewuranna</h1>
          <p className="text-xl max-w-3xl">
            Empowering creatives to build sustainable businesses and achieve financial freedom through innovative solutions and community support.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16">
        <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Founder & Visionary</h2>
            <div className="space-y-6 text-gray-700">
              <p>
                As the founder of multiple successful ventures, I've dedicated my career to creating opportunities for creative professionals. 
                My journey began with a simple belief: that talent should be rewarded fairly and consistently.
              </p>
              <p>
                Through Creative Chaos, AgriPro, and CrowdPen, I'm building ecosystems where creativity meets sustainability, 
                helping thousands of creatives turn their passions into profitable businesses.
              </p>
            </div>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image 
              src="/founder-image.jpg" 
              alt="Ewuranna - Founder"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gray-100">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Mission & Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Empowerment</h3>
              <p className="text-gray-600">
                Equipping creatives with the tools, knowledge, and opportunities they need to succeed on their own terms.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">
                Constantly pushing boundaries to create new solutions that address the evolving needs of the creative economy.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Community</h3>
              <p className="text-gray-600">
                Building supportive networks where creatives can collaborate, learn, and grow together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Our Goals</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">$1M in Revenue</h3>
              <p className="text-gray-600">
                Scaling our platforms to generate over $1M in revenue for our creative community members.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">10,000+ Creatives Empowered</h3>
              <p className="text-gray-600">
                Reaching and positively impacting the lives of over 10,000 creative professionals.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Sustainable Growth</h3>
              <p className="text-gray-600">
                Creating business models that ensure long-term sustainability for both our company and our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Ready to take your creative career to the next level? Let's build something amazing together.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
      </div>
      <Footer/>
    </div>
  );
}
