
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const WelcomeHero = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 animate-fade-in delay-500">
      <div className="space-y-6">
        <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
          {t('welcome.title')}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          {t('welcome.subtitle')}
        </p>
        <div className="flex items-center space-x-4 animate-slide-in-right delay-700">
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-10 h-10 bg-gradient-to-r from-vilo-purple-400 to-vilo-pink-400 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-white font-semibold animate-bounce`}
                style={{ animationDelay: `${i * 200}ms` }}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-vilo-purple-600 dark:text-vilo-purple-400">+500</span> clients satisfaits
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in delay-1000">
        <Link to="/auth">
          <Button className="w-full sm:w-auto bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
            Commencer maintenant
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Essai gratuit • Sans engagement
        </div>
      </div>
    </div>
  );
};

export default WelcomeHero;
