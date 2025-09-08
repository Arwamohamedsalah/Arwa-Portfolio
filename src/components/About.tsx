import React, { useEffect, useRef } from 'react';
import { Code, Heart, Coffee, MapPin, Calendar, Rocket, Linkedin, Github, Briefcase, Users } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { isDark } = useTheme();

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

  const stats = [
    { number: '50+', label: 'Projects Completed', icon: Code },
    { number: '3+', label: 'Years Experience', icon: Calendar },
    { number: '15+', label: 'Technologies Mastered', icon: Rocket },
    { number: '100%', label: 'Client Satisfaction', icon: Heart }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      {/* Space Background Elements */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float ${
              isDark ? 'bg-white/10' : 'bg-indigo-300/20'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 8 + 6}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDark 
              ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'
          }`}>
            About Me
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${
            isDark 
              ? 'bg-gradient-to-r from-blue-400 to-purple-400'
              : 'bg-gradient-to-r from-indigo-500 to-purple-500'
          }`}></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="relative animate-on-scroll">
            <div className="relative group">
              <div className={`absolute -inset-1 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500'
              }`}></div>
              <div className={`relative backdrop-blur-sm rounded-lg overflow-hidden border ${
                isDark 
                  ? 'bg-slate-800/50 border-slate-700/50'
                  : 'bg-white/70 border-gray-200/50'
              }`}>
                <img
                  src="https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Arwa working"
                  className="w-full h-96 object-cover"
                />
                <div className={`absolute inset-0 ${
                  isDark 
                    ? 'bg-gradient-to-t from-slate-900/80 to-transparent'
                    : 'bg-gradient-to-t from-gray-900/60 to-transparent'
                }`}></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-white">
                    <Code className={`w-5 h-5 animate-pulse ${
                      isDark ? 'text-blue-400' : 'text-indigo-400'
                    }`} />
                    <span className="text-sm">Currently coding something amazing...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6 animate-on-scroll">
            <div className="space-y-4">
              <h3 className={`text-2xl md:text-3xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Hi, I'm <span className={`text-transparent bg-clip-text ${
                  isDark 
                    ? 'bg-gradient-to-r from-blue-400 to-purple-400'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600'
                }`}>Arwa MohamedSalah</span>
              </h3>
              <p className={`text-lg leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                A passionate fullstack developer exploring the infinite possibilities of web and mobile technologies. 
                I create digital experiences that are not only functional but also beautiful and user-friendly.
              </p>
              <p className={`leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                My journey in the coding universe started with HTML and CSS, and has evolved to include 
                cutting-edge frameworks like React, Next.js, and React Native. I'm constantly learning 
                and adapting to new technologies to deliver stellar solutions.
              </p>
              <p className={`leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                I'm a proud graduate of the Information Technology Institute (ITI) from the Frontend & 
                Cross-Platform Development track, where I honed my skills in modern web and mobile 
                development technologies. This intensive program equipped me with the expertise to 
                build comprehensive digital solutions across multiple platforms.
              </p>
            </div>

            {/* Personal Info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className={`flex items-center gap-3 p-4 backdrop-blur-sm rounded-lg border transition-all duration-300 hover:shadow-lg ${
                isDark 
                  ? 'bg-slate-800/30 border-slate-700/50 hover:border-blue-400/50 hover:shadow-blue-500/10'
                  : 'bg-white/60 border-gray-200/50 hover:border-indigo-400/50 hover:shadow-indigo-500/10'
              }`}>
                <MapPin className={`w-5 h-5 ${
                  isDark ? 'text-blue-400' : 'text-indigo-500'
                }`} />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Egypt</span>
              </div>
              <div className={`flex items-center gap-3 p-4 backdrop-blur-sm rounded-lg border transition-all duration-300 hover:shadow-lg ${
                isDark 
                  ? 'bg-slate-800/30 border-slate-700/50 hover:border-purple-400/50 hover:shadow-purple-500/10'
                  : 'bg-white/60 border-gray-200/50 hover:border-purple-400/50 hover:shadow-purple-500/10'
              }`}>
                <Calendar className="w-5 h-5 text-purple-400" />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Available for work</span>
              </div>
              <a 
                href="https://github.com/Arwamohamedsalah" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-3 p-4 backdrop-blur-sm rounded-lg border transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                  isDark 
                    ? 'bg-slate-800/30 border-slate-700/50 hover:border-gray-400/50 hover:shadow-gray-500/10'
                    : 'bg-white/60 border-gray-200/50 hover:border-gray-400/50 hover:shadow-gray-500/10'
                }`}
              >
                <Github className="w-5 h-5 text-gray-500" />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>View GitHub</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/arwamsalah/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-3 p-4 backdrop-blur-sm rounded-lg border transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                  isDark 
                    ? 'bg-slate-800/30 border-slate-700/50 hover:border-blue-400/50 hover:shadow-blue-500/10'
                    : 'bg-white/60 border-gray-200/50 hover:border-blue-400/50 hover:shadow-blue-500/10'
                }`}
              >
                <Linkedin className="w-5 h-5 text-blue-500" />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Connect on LinkedIn</span>
              </a>
              <a 
                href="https://khamsat.com/user/arwa_mohamedsalah" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-3 p-4 backdrop-blur-sm rounded-lg border transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                  isDark 
                    ? 'bg-slate-800/30 border-slate-700/50 hover:border-orange-400/50 hover:shadow-orange-500/10'
                    : 'bg-white/60 border-gray-200/50 hover:border-orange-400/50 hover:shadow-orange-500/10'
                }`}
              >
                <Briefcase className="w-5 h-5 text-orange-500" />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Khamsat (خمسات)</span>
              </a>
              <a 
                href="https://mostaql.com/u/ArwaMsalah" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-3 p-4 backdrop-blur-sm rounded-lg border transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                  isDark 
                    ? 'bg-slate-800/30 border-slate-700/50 hover:border-teal-400/50 hover:shadow-teal-500/10'
                    : 'bg-white/60 border-gray-200/50 hover:border-teal-400/50 hover:shadow-teal-500/10'
                }`}
              >
                <Users className="w-5 h-5 text-teal-500" />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Mostaql (مستقل)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 animate-on-scroll">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`text-center p-6 backdrop-blur-sm rounded-lg border transition-all duration-300 transform hover:scale-105 hover:shadow-xl group ${
                    isDark 
                      ? 'bg-slate-800/20 border-slate-700/50 hover:border-blue-400/50 hover:shadow-blue-500/10'
                      : 'bg-white/60 border-gray-200/50 hover:border-indigo-400/50 hover:shadow-indigo-500/10'
                  }`}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-3 group-hover:animate-bounce ${
                    isDark ? 'text-blue-400' : 'text-indigo-500'
                  }`} />
                  <div className={`text-3xl md:text-4xl font-bold mb-2 ${
                    isDark 
                      ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'
                  }`}>
                    {stat.number}
                  </div>
                  <div className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

