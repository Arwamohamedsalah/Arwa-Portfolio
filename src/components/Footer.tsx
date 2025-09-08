import React from 'react';
import { Heart, ArrowUp, Github, Linkedin, Mail, Briefcase, Users } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`py-12 px-6 backdrop-blur-sm border-t ${
      isDark 
        ? 'bg-slate-900/80 border-slate-700/50'
        : 'bg-white/80 border-gray-200/50'
    }`}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-8">
            <h3 className={`text-3xl font-bold ${
              isDark 
                ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'
            }`}>
              Arwa MohamedSalah
            </h3>
            <p className={`mt-2 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>Fullstack Developer</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {['Home', 'About', 'Education', 'Projects', 'Reviews', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  const element = document.getElementById(item.toLowerCase());
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`font-medium transition-colors duration-300 ${
                  isDark 
                    ? 'text-gray-400 hover:text-blue-400'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://github.com/Arwamohamedsalah"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                isDark 
                  ? 'bg-slate-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                  : 'bg-gray-100/70 text-gray-600 hover:text-gray-900 hover:bg-gray-200/70'
              }`}
              aria-label="GitHub Profile"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/arwamsalah/"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                isDark 
                  ? 'bg-slate-800/50 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20'
                  : 'bg-gray-100/70 text-gray-600 hover:text-blue-600 hover:bg-blue-100/70'
              }`}
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:arwamohamedsalah05@gmail.com"
              className={`p-3 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                isDark 
                  ? 'bg-slate-800/50 text-gray-400 hover:text-red-400 hover:bg-red-900/20'
                  : 'bg-gray-100/70 text-gray-600 hover:text-red-600 hover:bg-red-100/70'
              }`}
              aria-label="Email Contact"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="https://khamsat.com/user/arwa_mohamedsalah"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                isDark 
                  ? 'bg-slate-800/50 text-gray-400 hover:text-orange-400 hover:bg-orange-900/20'
                  : 'bg-gray-100/70 text-gray-600 hover:text-orange-600 hover:bg-orange-100/70'
              }`}
              aria-label="Khamsat Profile"
            >
              <Briefcase className="w-6 h-6" />
            </a>
            <a
              href="https://mostaql.com/u/ArwaMsalah"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                isDark 
                  ? 'bg-slate-800/50 text-gray-400 hover:text-teal-400 hover:bg-teal-900/20'
                  : 'bg-gray-100/70 text-gray-600 hover:text-teal-600 hover:bg-teal-100/70'
              }`}
              aria-label="Mostaql Profile"
            >
              <Users className="w-6 h-6" />
            </a>
          </div>

          {/* Divider */}
          <div className={`w-full h-px mb-8 ${
            isDark 
              ? 'bg-gradient-to-r from-transparent via-slate-600 to-transparent'
              : 'bg-gradient-to-r from-transparent via-gray-300 to-transparent'
          }`}></div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className={`flex items-center gap-2 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>by Arwa MohamedSalah</span>
            </div>
            
            <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
            </div>

            <button
              onClick={scrollToTop}
              className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                isDark 
                  ? 'bg-slate-800/50 hover:bg-blue-600/50 text-gray-400 hover:text-white'
                  : 'bg-gray-100/70 hover:bg-indigo-500/90 text-gray-600 hover:text-white'
              }`}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;