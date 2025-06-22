
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'services', label: 'Services' },
    { id: 'process', label: 'Processus' },
    { id: 'portfolio', label: 'Références' },
    { id: 'calculator', label: 'Calculateur' },
    { id: 'tarifs', label: 'Tarifs' },
    { id: 'testimonials', label: 'Témoignages' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-vilo-purple-100 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-vilo-purple-500 to-vilo-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
              VILO ASSIST-PRO
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-6">
            {navigationItems.slice(0, 6).map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 hover:text-vilo-purple-600 font-medium transition-colors text-sm"
              >
                {item.label}
              </button>
            ))}
            
            {/* Dropdown for more items */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-vilo-purple-600 font-medium transition-colors text-sm">
                Plus ▼
              </button>
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {navigationItems.slice(6).map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:text-vilo-purple-600 hover:bg-vilo-purple-50 transition-colors text-sm"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <Button 
            onClick={() => scrollToSection('contact')}
            className="hidden md:inline-flex bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 text-white"
          >
            Nous contacter
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="xl:hidden mt-4 pb-4 border-t border-vilo-purple-100">
            <div className="grid grid-cols-2 gap-3 pt-4">
              {navigationItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-vilo-purple-600 font-medium transition-colors text-left text-sm py-2"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
