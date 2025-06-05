
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="min-h-screen flex items-center pt-20 bg-gradient-to-br from-vilo-purple-50 via-white to-vilo-pink-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
                  VILO ASSIST-PRO
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-medium">
                Votre partenaire d'assistance virtuelle depuis Madagascar
              </p>
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Depuis Madagascar, nous accompagnons depuis plus de 5 ans des professionnels et des entreprises francophones dans la gestion quotidienne de leurs activités à distance.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-vilo-purple-600 w-5 h-5" />
                <span className="text-gray-700">Plus de 5 ans d'expérience</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-vilo-purple-600 w-5 h-5" />
                <span className="text-gray-700">Service fiable et confidentiel</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-vilo-purple-600 w-5 h-5" />
                <span className="text-gray-700">Tarif unique de 10€/heure</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToContact}
                size="lg"
                className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 text-white"
              >
                Commencer maintenant
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-vilo-purple-300 text-vilo-purple-700 hover:bg-vilo-purple-50"
              >
                Découvrir nos services
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-vilo-purple-500 to-vilo-pink-500 rounded-3xl p-8 text-white shadow-2xl animate-gradient-shift bg-[length:300%_300%]">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Pourquoi nous choisir ?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                    <p>Expertise et sérieux reconnus</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                    <p>Sens de la confidentialité irréprochable</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                    <p>Service flexible et sur mesure</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                    <p>Excellent rapport qualité-prix</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/20">
                  <p className="font-semibold italic">
                    "Vous ne cherchez pas plus, vous cherchez mieux. Faites le bon choix avec Vilo Assist-Pro!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
