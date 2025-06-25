
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { 
  Shield, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  Sparkles,
  CheckCircle,
  Star,
  ArrowRight,
  Clock,
  Globe,
  Users
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

type AuthMode = 'signin' | 'signup' | 'admin';

const Welcome = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, signUp } = useSupabaseAuth();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (authMode === 'admin') {
        const success = await login(email, password);
        if (success) {
          window.location.href = '/admin';
        } else {
          toast({
            title: "Erreur de connexion",
            description: "Identifiants administrateur incorrects",
            variant: "destructive",
          });
        }
        return;
      }

      if (authMode === 'signup') {
        const { error } = await signUp(email, password, firstName, lastName);
        if (error) {
          toast({
            title: "Erreur d'inscription",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Inscription réussie",
            description: "Vérifiez votre email pour confirmer votre compte",
          });
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Erreur de connexion",
            description: error.message,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setShowPassword(false);
  };

  const switchMode = (mode: AuthMode) => {
    setAuthMode(mode);
    resetForm();
  };

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
      icon: Shield,
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
    <div className="min-h-screen bg-gradient-to-br from-vilo-purple-50 via-white to-vilo-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-700">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-vilo-purple-400/20 to-vilo-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-vilo-pink-400/20 to-vilo-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center space-x-3 animate-fade-in">
          <div className="w-12 h-12 bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 rounded-xl flex items-center justify-center shadow-lg animate-scale-in">
            <Sparkles className="w-7 h-7 text-white animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
            VILO ASSIST-PRO
          </h1>
        </div>
        <div className="animate-fade-in delay-300">
          <ThemeToggle />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Welcome Content */}
          <div className="space-y-8 animate-fade-in delay-500">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Bienvenue chez{' '}
                <span className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent animate-pulse">
                  VILO ASSIST-PRO
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Votre partenaire de confiance pour l'assistance virtuelle professionnelle. 
                Découvrez nos services d'exception basés à Madagascar.
              </p>
              <div className="flex items-center space-x-4 animate-slide-in-right delay-700">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 bg-gradient-to-r from-vilo-purple-400 to-vilo-pink-400 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-white font-semibold animate-bounce`}
                      style={{ animationDelay: `${i * 200}ms` }}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-vilo-purple-600 dark:text-vilo-purple-400">+500</span> clients satisfaits
                </div>
              </div>
            </div>

            {/* Animated Features */}
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

            {/* Call to Action */}
            <div className="flex items-center space-x-4 animate-fade-in delay-1000">
              <Button className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                Commencer maintenant
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Essai gratuit • Sans engagement
              </div>
            </div>
          </div>

          {/* Right Side - Auth Card */}
          <div className="flex justify-center animate-fade-in delay-700">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg animate-pulse">
                  {authMode === 'admin' ? (
                    <Shield className="w-10 h-10 text-white" />
                  ) : (
                    <User className="w-10 h-10 text-white" />
                  )}
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {authMode === 'admin' ? 'Administration' : 
                   authMode === 'signup' ? 'Créer un compte' : 'Connexion'}
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {authMode === 'admin' ? 'Accès réservé aux administrateurs' :
                   authMode === 'signup' ? 'Rejoignez notre plateforme' : 'Accédez à votre espace'}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Auth Mode Switcher */}
                {authMode !== 'admin' && (
                  <div className="flex space-x-2 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                    <Button
                      type="button"
                      variant={authMode === 'signin' ? 'default' : 'ghost'}
                      onClick={() => switchMode('signin')}
                      className="flex-1 h-10 text-sm transition-all duration-300"
                    >
                      Connexion
                    </Button>
                    <Button
                      type="button"
                      variant={authMode === 'signup' ? 'default' : 'ghost'}
                      onClick={() => switchMode('signup')}
                      className="flex-1 h-10 text-sm transition-all duration-300"
                    >
                      Inscription
                    </Button>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name fields for signup */}
                  {authMode === 'signup' && (
                    <div className="grid grid-cols-2 gap-3 animate-fade-in">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Prénom
                        </Label>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Prénom"
                          className="h-11 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-vilo-purple-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Nom
                        </Label>
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Nom"
                          className="h-11 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-vilo-purple-500"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={authMode === 'admin' ? 'admin@viloassist.com' : 'votre@email.com'}
                        className="pl-11 h-12 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-vilo-purple-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Mot de passe
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="pl-11 pr-12 h-12 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-vilo-purple-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Connexion...
                      </div>
                    ) : (
                      authMode === 'signup' ? 'Créer le compte' : 'Se connecter'
                    )}
                  </Button>
                </form>

                {/* Admin Access */}
                {authMode !== 'admin' && (
                  <>
                    <Separator className="dark:bg-gray-600" />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => switchMode('admin')}
                      className="w-full h-11 border-vilo-purple-300 dark:border-vilo-purple-400 text-vilo-purple-600 dark:text-vilo-purple-400 hover:bg-vilo-purple-50 dark:hover:bg-vilo-purple-900/20 transition-all duration-300"
                    >
                      <Shield className="w-5 h-5 mr-2" />
                      Accès Administration
                    </Button>
                  </>
                )}

                {/* Demo credentials for admin */}
                {authMode === 'admin' && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <p className="text-xs text-blue-600 dark:text-blue-400 text-center">
                      <strong>Démo:</strong> admin@viloassist.com / admin123
                    </p>
                  </div>
                )}

                {/* Back to user auth */}
                {authMode === 'admin' && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => switchMode('signin')}
                    className="w-full h-9 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    ← Retour à l'espace utilisateur
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section - Statistics */}
        <div className="mt-20 text-center animate-fade-in delay-1200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "500+", label: "Clients satisfaits" },
              { number: "24/7", label: "Support disponible" },
              { number: "10€", label: "Tarif unique /h" },
              { number: "5+", label: "Années d'expérience" }
            ].map((stat, index) => (
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
      </div>
    </div>
  );
};

export default Welcome;
