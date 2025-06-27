
import { Sparkles, LogIn, UserPlus, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const WelcomeAuthCard = () => {
  return (
    <div className="flex justify-center animate-fade-in delay-700">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg hover:shadow-3xl transition-all duration-500 hover:scale-105">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg animate-pulse">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Accédez à votre espace
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Connectez-vous ou créez votre compte pour commencer
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Link to="/auth">
            <Button 
              className="w-full h-12 bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <LogIn className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              Se connecter
            </Button>
          </Link>

          <Link to="/auth">
            <Button 
              variant="outline"
              className="w-full h-12 border-2 border-vilo-purple-300 dark:border-vilo-purple-400 text-vilo-purple-600 dark:text-vilo-purple-400 hover:bg-vilo-purple-50 dark:hover:bg-vilo-purple-900/20 font-medium transition-all duration-300 group"
            >
              <UserPlus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Créer un compte
            </Button>
          </Link>

          <div className="mt-6 space-y-3">
            <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>Accès immédiat à tous nos services</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>Support client 24h/7j</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>Tarification transparente à 10€/h</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeAuthCard;
