import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-40 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">VA</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
              VILO ASSIST-PRO
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 dark:text-gray-300 hover:text-vilo-purple-600 dark:hover:text-vilo-purple-400 transition-colors duration-300">
              Services
            </a>
            <a href="#pricing" className="text-gray-700 dark:text-gray-300 hover:text-vilo-purple-600 dark:hover:text-vilo-purple-400 transition-colors duration-300">
              Tarifs
            </a>
            <a href="#portfolio" className="text-gray-700 dark:text-gray-300 hover:text-vilo-purple-600 dark:hover:text-vilo-purple-400 transition-colors duration-300">
              Portfolio
            </a>
            <a href="#faq" className="text-gray-700 dark:text-gray-300 hover:text-vilo-purple-600 dark:hover:text-vilo-purple-400 transition-colors duration-300">
              FAQ
            </a>
            <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-vilo-purple-600 dark:hover:text-vilo-purple-400 transition-colors duration-300">
              Contact
            </a>
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
            <a href="#services" className="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
              Services
            </a>
            <a href="#pricing" className="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
              Tarifs
            </a>
            <a href="#portfolio" className="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
              Portfolio
            </a>
            <a href="#faq" className="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
              FAQ
            </a>
            <a href="#contact" className="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
              Contact
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
