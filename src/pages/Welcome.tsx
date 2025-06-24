
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
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
  Star
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (authMode === 'admin') {
        // Admin login with hardcoded credentials
        if (email === 'admin@viloassist.com' && password === 'admin123') {
          window.location.href = '/admin';
          return;
        } else {
          toast({
            title: "Erreur de connexion",
            description: "Identifiants administrateur incorrects",
            variant: "destructive",
          });
          return;
        }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-vilo-purple-50 via-white to-vilo-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
            VILO ASSIST-PRO
          </h1>
        </div>
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Welcome Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Bienvenue chez{' '}
                <span className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
                  VILO ASSIST-PRO
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Votre partenaire de confiance pour l'assistance virtuelle professionnelle. 
                Découvrez nos services d'exception basés à Madagascar.
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Service 24/7</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Support continu pour votre entreprise</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Tarif unique</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">10€/h pour tous nos services</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Sécurisé</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Vos données sont protégées</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Équipe experte</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Professionnels qualifiés</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Card */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 rounded-2xl flex items-center justify-center mb-4">
                  {authMode === 'admin' ? (
                    <Shield className="w-8 h-8 text-white" />
                  ) : (
                    <User className="w-8 h-8 text-white" />
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
                  <div className="flex space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <Button
                      type="button"
                      variant={authMode === 'signin' ? 'default' : 'ghost'}
                      onClick={() => switchMode('signin')}
                      className="flex-1 h-8 text-sm"
                    >
                      Connexion
                    </Button>
                    <Button
                      type="button"
                      variant={authMode === 'signup' ? 'default' : 'ghost'}
                      onClick={() => switchMode('signup')}
                      className="flex-1 h-8 text-sm"
                    >
                      Inscription
                    </Button>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name fields for signup */}
                  {authMode === 'signup' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium">
                          Prénom
                        </Label>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Prénom"
                          className="h-10"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium">
                          Nom
                        </Label>
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Nom"
                          className="h-10"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={authMode === 'admin' ? 'admin@viloassist.com' : 'votre@email.com'}
                        className="pl-10 h-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Mot de passe
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-10 bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 text-white font-medium"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
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
                    <Separator />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => switchMode('admin')}
                      className="w-full h-10 border-vilo-purple-300 text-vilo-purple-600 hover:bg-vilo-purple-50 dark:border-vilo-purple-400 dark:text-vilo-purple-400"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Accès Administration
                    </Button>
                  </>
                )}

                {/* Demo credentials for admin */}
                {authMode === 'admin' && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
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
                    className="w-full h-8 text-sm text-gray-600 dark:text-gray-400"
                  >
                    ← Retour à l'espace utilisateur
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
