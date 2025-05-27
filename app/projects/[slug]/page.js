import { projects } from '../../data/projects';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProjectContent from './ProjectContent';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ProjectContent slug={params.slug} />
      <Footer />
    </div>
  );
}
