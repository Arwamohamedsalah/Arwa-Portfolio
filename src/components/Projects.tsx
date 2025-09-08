import React, { useEffect, useRef } from 'react';
import { ExternalLink, Github, Smartphone, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { isDark } = useTheme();

  const projects = [
    {
      title: 'E-Commerce React App',
      description: 'A modern, fully responsive e-commerce platform built with React.js featuring component-based architecture, React Hooks for state management, React Router for navigation, and seamless integration with Node.js backend and payment systems.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React.js', 'React Hooks', 'React Router', 'Node.js', 'MongoDB', 'Stripe'],
      type: 'web',
      github: '#',
      live: '#'
    },
    {
      title: 'Task Management Mobile App',
      description: 'Cross-platform mobile application for task management with real-time synchronization and offline support.',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React Native', 'Firebase', 'Redux'],
      type: 'mobile',
      github: '#',
      live: '#'
    },
    {
      title: 'Corporate Website',
      description: 'Modern responsive website for a corporate client with CMS integration and SEO optimization.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Next.js', 'WordPress', 'Material-UI'],
      type: 'web',
      github: '#',
      live: '#'
    },
    {
      title: 'Flutter Finance App',
      description: 'Personal finance tracking application with beautiful UI and comprehensive analytics dashboard.',
      image: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Flutter', 'Dart', 'SQLite'],
      type: 'mobile',
      github: '#',
      live: '#'
    },
    {
      title: 'Real Estate Platform',
      description: 'Full-stack real estate platform with property listings, search functionality, and user dashboards.',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React.js', 'PHP', 'MySQL', 'Google Maps API'],
      type: 'web',
      github: '#',
      live: '#'
    },
    {
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media management with data visualization and reporting features.',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React.js', 'Chart.js', 'Node.js', 'PostgreSQL'],
      type: 'web',
      github: '#',
      live: '#'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-6 relative">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDark 
              ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'
          }`}>
            Featured Projects
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${
            isDark 
              ? 'bg-gradient-to-r from-blue-400 to-purple-400'
              : 'bg-gradient-to-r from-indigo-500 to-purple-500'
          }`}></div>
          <p className={`mt-6 text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            A showcase of my recent work across web and mobile platforms, demonstrating my skills in modern development technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`animate-on-scroll group backdrop-blur-sm rounded-xl overflow-hidden border transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                isDark 
                  ? 'bg-slate-800/30 border-slate-700/50 hover:border-blue-400/50'
                  : 'bg-white/70 border-gray-200/50 hover:border-indigo-400/50'
              }`}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-t from-slate-900/80 to-transparent'
                    : 'bg-gradient-to-t from-gray-900/60 to-transparent'
                }`}></div>
                <div className="absolute top-4 right-4">
                  <div className={`flex items-center gap-2 px-3 py-1 backdrop-blur-sm rounded-full text-xs ${
                    isDark ? 'bg-slate-900/80' : 'bg-white/90'
                  }`}>
                    {project.type === 'web' ? (
                      <Globe className={`w-3 h-3 ${
                        isDark ? 'text-blue-400' : 'text-indigo-500'
                      }`} />
                    ) : (
                      <Smartphone className="w-3 h-3 text-purple-400" />
                    )}
                    <span className={`capitalize ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>{project.type}</span>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                  isDark 
                    ? 'text-white group-hover:text-blue-400'
                    : 'text-gray-900 group-hover:text-indigo-600'
                }`}>
                  {project.title}
                </h3>
                <p className={`mb-4 text-sm leading-relaxed ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-2 py-1 text-xs rounded border ${
                        isDark 
                          ? 'bg-slate-700/50 text-gray-300 border-slate-600/50'
                          : 'bg-gray-100/70 text-gray-700 border-gray-200/50'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-sm ${
                      isDark 
                        ? 'bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white'
                        : 'bg-gray-100/70 hover:bg-gray-200/70 text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  <a
                    href={project.live}
                    className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-all duration-300 text-sm ${
                      isDark 
                        ? 'bg-blue-600/80 hover:bg-blue-600'
                        : 'bg-indigo-500/90 hover:bg-indigo-600'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12 animate-on-scroll">
          <button className={`group text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
            isDark 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
          }`}>
            View All Projects
            <ExternalLink className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;