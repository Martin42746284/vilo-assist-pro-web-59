
import { Clock, Star, Globe, Users } from 'lucide-react';

const WelcomeFeatures = () => {
  const features = [
    {
      icon: Clock,
      title: "Service 24/7",
      description: "Support continu pour votre entreprise",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Star,
      title: "Tarif unique",
      description: "10€/h pour tous nos services",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Globe,
      title: "Sécurisé",
      description: "Vos données sont protégées",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: Users,
      title: "Équipe experte",
      description: "Professionnels qualifiés",
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="group relative overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in"
          style={{ animationDelay: `${800 + index * 150}ms` }}
        >
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-vilo-purple-600 dark:group-hover:text-vilo-purple-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {feature.description}
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-vilo-purple-600/5 to-vilo-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      ))}
    </div>
  );
};

export default WelcomeFeatures;
