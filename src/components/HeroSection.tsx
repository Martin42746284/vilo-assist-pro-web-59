
import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    "Plus de 5 ans d'expérience",
    "Service fiable et confidentiel", 
    "Tarif unique de 10€/heure"
  ];

  const stats = [
    { value: "100+", label: "Clients satisfaits", delay: "0ms" },
    { value: "98%", label: "Taux de satisfaction", delay: "200ms" },
    { value: "24h", label: "Délai de réactivité", delay: "400ms" }
  ];

  return (
    <section id="accueil" className="min-h-screen flex items-center pt-20 bg-gradient-to-br from-vilo-purple-50 via-white to-vilo-pink-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-4">
              <div className="inline-block bg-gradient-to-r from-vilo-purple-100 to-vilo-pink-100 rounded-full px-6 py-2 mb-4">
                <span className="text-vilo-purple-700 font-medium">🇲🇬 Depuis Madagascar avec expertise</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
                  VILO ASSIST-PRO
                </span>
              </h1>
              
              <div className="relative h-16">
                <p className="text-xl md:text-2xl text-gray-600 font-medium absolute inset-0 transition-all duration-500">
                  <span className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
                    Votre partenaire d'assistance virtuelle
                  </span>
                </p>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Depuis Madagascar, nous accompagnons depuis plus de 5 ans des professionnels et des entreprises francophones dans la gestion quotidienne de leurs activités à distance.
            </p>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`flex items-center space-x-3 transition-all duration-500 ${
                    currentFeature === index ? 'scale-105 bg-vilo-purple-50 -mx-2 px-2 py-1 rounded-lg' : ''
                  }`}
                >
                  <CheckCircle className={`w-5 h-5 transition-colors ${
                    currentFeature === index ? 'text-vilo-pink-600' : 'text-vilo-purple-600'
                  }`} />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToContact}
                size="lg"
                className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 text-white transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Commencer maintenant
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-vilo-purple-300 text-vilo-purple-700 hover:bg-vilo-purple-50 transform hover:scale-105 transition-all duration-200"
              >
                <Play className="mr-2 w-4 h-4" />
                Découvrir notre histoire
              </Button>
            </div>

            {/* Stats animées */}
            <div className="flex flex-wrap gap-8 pt-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: stat.delay }}
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Animated background elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-vilo-purple-200 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-vilo-pink-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative bg-gradient-to-br from-vilo-purple-500 to-vilo-pink-500 rounded-3xl p-8 text-white shadow-2xl animate-gradient-shift bg-[length:300%_300%] transform hover:scale-105 transition-transform duration-300">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">Pourquoi nous choisir ?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 transform hover:translate-x-2 transition-transform duration-200">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 animate-ping"></div>
                      <p>Expertise et sérieux reconnus</p>
                    </div>
                    <div className="flex items-start space-x-3 transform hover:translate-x-2 transition-transform duration-200">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 animate-ping" style={{ animationDelay: '0.5s' }}></div>
                      <p>Sens de la confidentialité irréprochable</p>
                    </div>
                    <div className="flex items-start space-x-3 transform hover:translate-x-2 transition-transform duration-200">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 animate-ping" style={{ animationDelay: '1s' }}></div>
                      <p>Service flexible et sur mesure</p>
                    </div>
                    <div className="flex items-start space-x-3 transform hover:translate-x-2 transition-transform duration-200">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 animate-ping" style={{ animationDelay: '1.5s' }}></div>
                      <p>Excellent rapport qualité-prix</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/20">
                    <p className="font-semibold italic text-center text-lg">
                      "Vous ne cherchez pas plus, vous cherchez mieux. Faites le bon choix avec Vilo Assist-Pro!"
                    </p>
                  </div>
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
