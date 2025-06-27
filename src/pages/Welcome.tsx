
import WelcomeHeader from '@/components/welcome/WelcomeHeader';
import WelcomeBackground from '@/components/welcome/WelcomeBackground';
import WelcomeHero from '@/components/welcome/WelcomeHero';
import WelcomeFeatures from '@/components/welcome/WelcomeFeatures';
import WelcomeAuthCard from '@/components/welcome/WelcomeAuthCard';
import WelcomeStats from '@/components/welcome/WelcomeStats';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-vilo-purple-50 via-white to-vilo-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-700">
      <WelcomeBackground />
      <WelcomeHeader />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-8">
            <WelcomeHero />
            <WelcomeFeatures />
          </div>
          <WelcomeAuthCard />
        </div>
        <WelcomeStats />
      </div>
    </div>
  );
};

export default Welcome;
