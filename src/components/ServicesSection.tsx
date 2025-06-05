
import { 
  FileText, 
  Users, 
  Phone, 
  Calculator, 
  Stethoscope, 
  Scale, 
  Database, 
  Headphones,
  Search,
  UserCheck,
  Briefcase,
  Speaker
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ServicesSection = () => {
  const services = [
    {
      icon: FileText,
      title: "Assistant administratif",
      description: "Gestion de vos tâches administratives quotidiennes avec rigueur et efficacité."
    },
    {
      icon: Briefcase,
      title: "Assistant polyvalent",
      description: "Support complet pour diverses missions selon vos besoins spécifiques."
    },
    {
      icon: UserCheck,
      title: "Assistant recrutement",
      description: "Accompagnement dans vos processus de recrutement et sélection de candidats."
    },
    {
      icon: Users,
      title: "Assistant virtuel en conciergerie",
      description: "Services de conciergerie personnalisés pour vos clients et partenaires."
    },
    {
      icon: Search,
      title: "Téléprospecteurs à distance",
      description: "Prospection commerciale efficace pour développer votre clientèle."
    },
    {
      icon: Headphones,
      title: "Support client",
      description: "Assistance et accompagnement de vos clients avec professionnalisme."
    },
    {
      icon: Phone,
      title: "Standardiste téléphonique",
      description: "Accueil téléphonique professionnel et gestion de vos appels."
    },
    {
      icon: Calculator,
      title: "Gestion financière en pré-compta",
      description: "Préparation et organisation de vos documents comptables."
    },
    {
      icon: Stethoscope,
      title: "Télésecrétaire médical",
      description: "Secrétariat spécialisé pour les professionnels de santé."
    },
    {
      icon: Scale,
      title: "Télésecrétaire juridique",
      description: "Support administratif spécialisé pour le secteur juridique."
    },
    {
      icon: Database,
      title: "Saisie de données",
      description: "Saisie précise et rapide de vos données importantes."
    },
    {
      icon: Speaker,
      title: "Transcripteur audio et vidéo",
      description: "Transcription professionnelle de vos contenus audio et vidéo."
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
            Nos Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Notre équipe expérimentée vous propose des prestations sur mesure, dans des domaines variés. 
            Nous ciblons les PME, les entrepreneurs, les professionnels occupés qui veulent optimiser leur temps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 border-vilo-purple-100 hover:border-vilo-purple-300 hover:-translate-y-1"
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-vilo-purple-100 to-vilo-pink-100 rounded-2xl flex items-center justify-center group-hover:from-vilo-purple-500 group-hover:to-vilo-pink-500 transition-all duration-300">
                  <service.icon className="w-8 h-8 text-vilo-purple-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-vilo-purple-700 transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-vilo-purple-50 to-vilo-pink-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Faire appel à nous, c'est bénéficier :
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-vilo-purple-500 to-vilo-pink-500 rounded-xl mx-auto flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
                <p className="font-semibold text-gray-800">Service fiable</p>
                <p className="text-gray-600 text-sm">Expertise reconnue depuis plus de 5 ans</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-vilo-purple-500 to-vilo-pink-500 rounded-xl mx-auto flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
                <p className="font-semibold text-gray-800">Service flexible</p>
                <p className="text-gray-600 text-sm">Adapté à vos besoins spécifiques</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-vilo-purple-500 to-vilo-pink-500 rounded-xl mx-auto flex items-center justify-center">
                  <span className="text-white font-bold">3</span>
                </div>
                <p className="font-semibold text-gray-800">Excellent rapport qualité-prix</p>
                <p className="text-gray-600 text-sm">Tarif unique de 10€/heure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
