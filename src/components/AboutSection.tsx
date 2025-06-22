
import { useEffect, useState } from 'react';
import { Users, Globe, Award, Shield, Heart, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: Shield,
      title: "Confidentialité",
      description: "Respect absolu de la confidentialité de vos données et informations"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Engagement constant vers la qualité et l'amélioration continue"
    },
    {
      icon: Heart,
      title: "Relation humaine",
      description: "Proximité et écoute pour une collaboration personnalisée"
    },
    {
      icon: Target,
      title: "Efficacité",
      description: "Solutions pratiques et résultats mesurables pour votre business"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-vilo-purple-50 to-vilo-pink-50">
      <div className="container mx-auto px-4">
        <div className={`text-center space-y-4 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
            À propos de VILO ASSIST-PRO
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Votre partenaire de confiance pour l'assistance virtuelle depuis Madagascar
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h3 className="text-3xl font-bold text-gray-800">
              Notre Histoire
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Fondée il y a plus de 5 ans, VILO ASSIST-PRO est née de la vision de créer un pont 
              entre l'expertise malgache et les besoins des entreprises francophones. Basée à 
              Antananarivo, notre équipe combine savoir-faire local et standards internationaux.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nous avons accompagné plus de 100 clients dans leur croissance en leur offrant 
              des services d'assistance virtuelle de haute qualité, tout en maintenant des 
              tarifs compétitifs grâce à notre implantation stratégique à Madagascar.
            </p>
            
            <div className="flex items-center space-x-6 pt-4">
              <div className="text-center">
                <Users className="w-8 h-8 text-vilo-purple-600 mx-auto mb-2" />
                <div className="font-bold text-gray-800">10+</div>
                <div className="text-sm text-gray-600">Collaborateurs</div>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 text-vilo-purple-600 mx-auto mb-2" />
                <div className="font-bold text-gray-800">3</div>
                <div className="text-sm text-gray-600">Continents</div>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 text-vilo-purple-600 mx-auto mb-2" />
                <div className="font-bold text-gray-800">5+</div>
                <div className="text-sm text-gray-600">Années</div>
              </div>
            </div>
          </div>

          <div className={`relative transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-gradient-to-br from-vilo-purple-500 to-vilo-pink-500 rounded-3xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-6">Notre Mission</h4>
              <p className="text-lg leading-relaxed mb-6">
                Permettre aux entrepreneurs et entreprises de se concentrer sur leur cœur de métier 
                en déléguant leurs tâches administratives à une équipe compétente et fiable.
              </p>
              <div className="bg-white/20 rounded-2xl p-6">
                <p className="text-center font-semibold italic">
                  "Votre succès est notre priorité. Ensemble, nous construisons votre avenir."
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-center text-gray-800">
            Nos Valeurs
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-vilo-purple-500 to-vilo-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
