import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import FocusAreas from './components/FocusAreas';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Mission />
      <FocusAreas />
      <CallToAction />
      <Footer />
    </div>
  );
}
