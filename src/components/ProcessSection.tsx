
import { useState, useEffect } from 'react';
import { MessageCircle, FileText, Users, Rocket, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ProcessSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('process');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 4);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const steps = [
    {
      icon: MessageCircle,
      title: "1. Premier Contact",
      description: "Échange initial pour comprendre vos besoins spécifiques",
      details: [
        "Appel de découverte gratuit",
        "Analyse de vos besoins",
        "Définition des objectifs",
        "Estimation personnalisée"
      ],
      duration: "30 min"
    },
    {
      icon: FileText,
      title: "2. Proposition & Planification",
      description: "Élaboration d'une solution sur mesure avec planning détaillé",
      details: [
        "Proposition commerciale détaillée",
        "Définition du périmètre",
        "Planning de déploiement",
        "Sélection de l'équipe"
      ],
      duration: "24-48h"
    },
    {
      icon: Users,
      title: "3. Mise en Place",
      description: "Configuration des outils et formation de l'équipe dédiée",
      details: [
        "Setup des outils collaboratifs",
        "Formation de votre assistant",
        "Tests et ajustements",
        "Procédures personnalisées"
      ],
      duration: "1-3 jours"
    },
    {
      icon: Rocket,
      title: "4. Lancement & Suivi",
      description: "Démarrage de la mission avec accompagnement continu",
      details: [
        "Démarrage opérationnel",
        "Suivi hebdomadaire",
        "Rapports réguliers",
        "Optimisation continue"
      ],
      duration: "Ongoing"
    }
  ];

  return (
    <section id="process" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className={`text-center space-y-4 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un processus simple et éprouvé pour démarrer votre collaboration en toute sérénité
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Timeline mobile */}
          <div className="md:hidden space-y-8">
            {steps.map((step, index) => (
              <Card 
                key={index}
                className={`border-l-4 transition-all duration-500 ${
                  activeStep === index 
                    ? 'border-l-vilo-purple-500 shadow-lg' 
                    : 'border-l-gray-200'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      activeStep === index
                        ? 'bg-gradient-to-r from-vilo-purple-500 to-vilo-pink-500 text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <div className="text-sm text-vilo-purple-600 font-medium">
                        Durée: {step.duration}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Timeline desktop */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2">
                <div 
                  className="h-full bg-gradient-to-r from-vilo-purple-500 to-vilo-pink-500 transition-all duration-1000"
                  style={{ width: isVisible ? `${((activeStep + 1) / 4) * 100}%` : '0%' }}
                />
              </div>

              <div className="grid grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <div 
                    key={index}
                    className={`text-center transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="relative">
                      <div 
                        className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg transition-all duration-500 ${
                          index <= activeStep
                            ? 'bg-gradient-to-r from-vilo-purple-500 to-vilo-pink-500 text-white scale-110'
                            : 'bg-white text-gray-400'
                        }`}
                      >
                        <step.icon className="w-8 h-8" />
                      </div>
                    </div>
                    
                    <Card className={`transition-all duration-500 ${
                      index === activeStep ? 'shadow-xl scale-105' : 'shadow-md'
                    }`}>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                        
                        <div className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-center text-xs text-gray-500">
                              <div className="w-1.5 h-1.5 bg-vilo-purple-400 rounded-full mr-2" />
                              {detail}
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="text-xs font-medium text-vilo-purple-600">
                            Durée: {step.duration}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-vilo-purple-50 to-vilo-pink-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Prêt à commencer ?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                La première consultation est gratuite et sans engagement. 
                Découvrons ensemble comment VILO ASSIST-PRO peut transformer votre quotidien.
              </p>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 text-white px-8 py-4 rounded-lg font-medium transition-colors inline-flex items-center"
              >
                Planifier ma consultation gratuite
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
