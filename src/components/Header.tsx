
import { useState } from 'react';
import { Menu, X, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navigateToAdmin = () => {
    window.open('/admin', '_blank');
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-40 transition-colors duration-300 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo amélioré */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => scrollToSection('hero')}>
            <div className="w-10 h-10 bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg">VA</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
                VILO ASSIST-PRO
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                Assistant Virtuel Professionnel
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { id: 'accueil', label: 'Accueil' },
              { id: 'about', label: 'À propos' },
              { id: 'services', label: 'Services' },
              { id: 'process', label: 'Processus' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'calculator', label: 'Devis' },
              { id: 'tarifs', label: 'Tarifs' },
              { id: 'testimonials', label: 'Témoignages' },
              { id: 'appointment', label: 'RDV' },
              { id: 'faq', label: 'FAQ' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 dark:text-gray-300 hover:text-vilo-purple-600 dark:hover:text-vilo-purple-400 hover:bg-vilo-purple-50 dark:hover:bg-vilo-purple-900/20 transition-all duration-300 px-3 py-2 rounded-lg text-sm font-medium"
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle - visible sur toutes les tailles */}
            <ThemeToggle />
            
            {/* Admin Button */}
            <Button
              onClick={navigateToAdmin}
              variant="outline"
              className="hidden md:flex items-center space-x-2 border-vilo-purple-200 dark:border-vilo-purple-700 text-vilo-purple-600 dark:text-vilo-purple-400 hover:bg-vilo-purple-50 dark:hover:bg-vilo-purple-900/20 transition-all duration-300"
            >
              <Settings className="w-4 h-4" />
              <span>Admin</span>
            </Button>

            {/* Logout Button (si authentifié) */}
            {isAuthenticated && (
              <Button
                onClick={handleLogout}
                variant="outline"
                className="hidden md:flex items-center space-x-2 border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-700 dark:text-gray-300 hover:text-vilo-purple-600 dark:hover:text-vilo-purple-400 p-2"
              aria-label="Menu de navigation"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 animate-fade-in shadow-lg">
            <div className="space-y-2">
              {[
                { id: 'services', label: 'Services' },
                { id: 'tarifs', label: 'Tarifs' },
                { id: 'portfolio', label: 'Portfolio' },
                { id: 'calculator', label: 'Devis' },
                { id: 'faq', label: 'FAQ' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => scrollToSection(item.id)}
                  className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-vilo-purple-600 dark:hover:text-vilo-purple-400 hover:bg-vilo-purple-50 dark:hover:bg-vilo-purple-900/20 transition-all duration-300 px-4 py-3"
                >
                  {item.label}
                </Button>
              ))}
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                <Button
                  onClick={navigateToAdmin}
                  variant="ghost"
                  className="w-full justify-start text-vilo-purple-600 dark:text-vilo-purple-400 hover:bg-vilo-purple-50 dark:hover:bg-vilo-purple-900/20 transition-all duration-300 px-4 py-3"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Dashboard Admin
                </Button>

                {isAuthenticated && (
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 px-4 py-3"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
