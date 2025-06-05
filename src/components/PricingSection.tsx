
import { Check, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PricingSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits = [
    "Tous nos services inclus",
    "Équipe expérimentée et qualifiée",
    "Confidentialité garantie",
    "Support en français",
    "Flexibilité horaire",
    "Rapport qualité-prix exceptionnel"
  ];

  return (
    <section id="tarifs" className="py-20 bg-gradient-to-br from-vilo-purple-50 to-vilo-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
            Tarification Simple
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un tarif unique et transparent pour tous nos services d'assistance virtuelle
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <Card className="relative overflow-hidden border-2 border-vilo-purple-200 shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-vilo-purple-500 to-vilo-pink-500"></div>
            
            <CardHeader className="text-center pt-8">
              <div className="flex justify-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              
              <CardTitle className="text-3xl font-bold text-gray-800">
                Tarif Unique
              </CardTitle>
              
              <div className="py-6">
                <div className="flex items-baseline justify-center">
                  <span className="text-6xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
                    10€
                  </span>
                  <span className="text-2xl font-semibold text-gray-600 ml-2">
                    /heure
                  </span>
                </div>
                <p className="text-gray-600 mt-2">
                  Pour tous nos services
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-vilo-purple-500 to-vilo-pink-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-200">
                <Button 
                  onClick={scrollToContact}
                  className="w-full bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 text-white text-lg py-6"
                  size="lg"
                >
                  Commencer dès maintenant
                </Button>
              </div>

              <div className="text-center text-sm text-gray-600">
                <p className="font-semibold text-vilo-purple-700">
                  Gagnez un temps précieux pour vous concentrer sur l'essentiel : 
                  le développement de votre activité !
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Pourquoi choisir notre tarif unique ?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-vilo-purple-500 to-vilo-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">💰</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Transparence totale</h4>
                <p className="text-gray-600">Aucun frais caché, aucune surprise. Un tarif clair et simple.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-vilo-purple-500 to-vilo-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">⚡</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Simplicité</h4>
                <p className="text-gray-600">Un seul tarif pour tous nos services, facile à budgétiser.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-vilo-purple-500 to-vilo-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">🎯</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Qualité garantie</h4>
                <p className="text-gray-600">Le même niveau d'excellence pour chaque mission.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
