
const WelcomeStats = () => {
  const stats = [
    { number: "500+", label: "Clients satisfaits" },
    { number: "24/7", label: "Support disponible" },
    { number: "10€", label: "Tarif unique /h" },
    { number: "5+", label: "Années d'expérience" }
  ];

  return (
    <div className="mt-20 text-center animate-fade-in delay-1200">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-3xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
              {stat.number}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomeStats;
