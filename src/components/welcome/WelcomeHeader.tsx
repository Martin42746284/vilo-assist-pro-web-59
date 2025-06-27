
import { Sparkles } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';

const WelcomeHeader = () => {
  return (
    <div className="relative z-10 flex justify-between items-center p-6">
      <div className="flex items-center space-x-3 animate-fade-in">
        <div className="w-12 h-12 bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 rounded-xl flex items-center justify-center shadow-lg animate-scale-in">
          <Sparkles className="w-7 h-7 text-white animate-pulse" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
          VILO ASSIST-PRO
        </h1>
      </div>
      <div className="flex items-center space-x-2 animate-fade-in delay-300">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default WelcomeHeader;
