
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-40 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-8 h-8 bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">VA</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
              VILO ASSIST-PRO
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-gray-700 dark:text-gray-300 hover:text-vilo-purple-600 dark:hover:text-vilo-purple-400 transition-colors duration-300"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="text-gray-700 dark:text-gray-300 hover:text-vilo-purple-600 dark:hover:text-vilo-purple-400 transition-colors duration-300"
            >
              Tarifs
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')} 
              className="text-gray-700 dark:text-gray-300 hover:text-vilo-purple-600 dark:hover:text-vilo-purple-400 transition-colors duration-300"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="text-gray-700 dark:text-gray-300 hover:text-vilo-purple-600 dark:hover:text-vilo-purple-400 transition-colors duration-300"
            >
              FAQ
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-gray-700 dark:text-gray-300 hover:text-vilo-purple-600 dark:hover:text-vilo-purple-400 transition-colors duration-300"
            >
              Contact
            </button>
            <ThemeToggle />
          </nav>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-vilo-purple-600 dark:hover:text-vilo-purple-400 focus:outline-none"
              aria-label="Menu de navigation"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 animate-fade-in">
            <button 
              onClick={() => scrollToSection('services')} 
              className="block w-full text-left py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="block w-full text-left py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              Tarifs
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')} 
              className="block w-full text-left py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="block w-full text-left py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              FAQ
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="block w-full text-left py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
