import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-3 rounded-full bg-slate-800/50 dark:bg-slate-800/50 light:bg-white/90 backdrop-blur-sm border border-slate-700/50 dark:border-slate-700/50 light:border-gray-200 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun 
          className={`absolute inset-0 w-6 h-6 text-yellow-400 transition-all duration-300 transform ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <Moon 
          className={`absolute inset-0 w-6 h-6 text-blue-400 transition-all duration-300 transform ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
      
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
        isDark 
          ? 'bg-blue-400/20 group-hover:bg-blue-400/30' 
          : 'bg-yellow-400/20 group-hover:bg-yellow-400/30'
      } opacity-0 group-hover:opacity-100`}></div>
    </button>
  );
};

export default ThemeToggle;