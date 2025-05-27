import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-16 md:py-24 bg-blue-50 dark:bg-blue-900/10">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work Together?</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
        </p>
        <Link href="#contact" className="btn btn-primary inline-block">
          Let's Connect
        </Link>
      </div>
    </section>
  );
}
