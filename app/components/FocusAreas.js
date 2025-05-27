export default function FocusAreas() {
  const focusAreas = [
    {
      id: 1,
      title: "Creative Chaos",
      description: "Exploring the intersection of art and technology to create unique digital experiences that captivate and inspire.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      delay: "0s"
    },
    {
      id: 2,
      title: "AgriPro",
      description: "Developing sustainable agricultural solutions through technology to address food security challenges and support local farmers.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-secondary">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      bgColor: "bg-green-100 dark:bg-green-900/30",
      delay: "0.1s"
    },
    {
      id: 3,
      title: "CrowdPen",
      description: "Building collaborative platforms that harness collective intelligence to solve complex problems and drive innovation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-accent">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      delay: "0.2s"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Current Focus Areas</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {focusAreas.map((area) => (
            <div 
              key={area.id}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 slide-up" 
              style={{animationDelay: area.delay}}
            >
              <div className={`h-16 w-16 ${area.bgColor} rounded-xl flex items-center justify-center mb-6`}>
                {area.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{area.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
