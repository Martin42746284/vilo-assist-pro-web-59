
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
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

    const section = document.getElementById('faq');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const faqs = [
    {
      question: "Comment fonctionne la collaboration à distance ?",
      answer: "Nous utilisons des outils collaboratifs modernes (Slack, Teams, Zoom) pour maintenir une communication fluide. Chaque client a un responsable de compte dédié qui coordonne les missions et assure le suivi quotidien."
    },
    {
      question: "Quels sont vos horaires de disponibilité ?",
      answer: "Nous nous adaptons aux fuseaux horaires de nos clients. Pour l'Europe, nous sommes disponibles de 6h à 15h heure française. Des arrangements spéciaux peuvent être pris selon vos besoins."
    },
    {
      question: "Comment garantissez-vous la confidentialité ?",
      answer: "Tous nos collaborateurs signent un accord de confidentialité strict. Nous utilisons des connexions sécurisées, des VPN dédiés et nous nous conformons au RGPD pour la protection des données."
    },
    {
      question: "Quel est le délai de démarrage d'une mission ?",
      answer: "En général, nous pouvons démarrer une mission sous 48h après validation du brief. Pour des besoins urgents, nous avons une équipe de réactivité qui peut intervenir sous 24h."
    },
    {
      question: "Comment se déroule la facturation ?",
      answer: "La facturation se fait au temps passé, avec un suivi précis des heures. Vous recevez un rapport détaillé chaque semaine et une facture mensuelle. Aucun minimum d'heures n'est requis."
    },
    {
      question: "Que se passe-t-il si je ne suis pas satisfait ?",
      answer: "Votre satisfaction est notre priorité. En cas de problème, nous mettons tout en œuvre pour corriger la situation. Si le problème persiste, nous ne facturons pas les heures concernées."
    },
    {
      question: "Quelles garanties offrez-vous ?",
      answer: "Nous garantissons la qualité de nos services, le respect des délais convenus, et la confidentialité absolue. Nous avons également une assurance responsabilité civile professionnelle."
    },
    {
      question: "Puis-je demander un assistant spécialisé ?",
      answer: "Absolument ! Nous avons des spécialistes dans différents domaines (comptabilité, juridique, e-commerce, etc.). Nous assignons l'assistant le plus adapté à vos besoins spécifiques."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className={`text-center space-y-4 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center mb-4">
            <HelpCircle className="w-16 h-16 text-vilo-purple-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
            Questions Fréquentes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions sur nos services d'assistance virtuelle
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={index}
              className={`border border-gray-200 hover:border-vilo-purple-300 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-vilo-purple-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openItems.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-vilo-purple-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-vilo-purple-600" />
                    )}
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  openItems.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6 pt-0">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Contactez-nous directement
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
