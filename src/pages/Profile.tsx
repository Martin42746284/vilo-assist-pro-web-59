
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { toast } from '@/hooks/use-toast';
import { 
  User, 
  Mail, 
  Phone, 
  Camera, 
  Save, 
  Lock, 
  LogOut,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';

const Profile = () => {
  const { user, profile, signOut, updateProfile, updatePassword } = useSupabaseAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile form state
  const [firstName, setFirstName] = useState(profile?.first_name || '');
  const [lastName, setLastName] = useState(profile?.last_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');

  // Password form state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      const { error } = await updateProfile({
        first_name: firstName,
        last_name: lastName,
        phone: phone
      });

      if (error) {
        toast({
          title: "Erreur",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Profil mis à jour",
          description: "Vos informations ont été sauvegardées",
        });
        setIsEditing(false);
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

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 6 caractères",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await updatePassword(newPassword);

      if (error) {
        toast({
          title: "Erreur",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Mot de passe modifié",
          description: "Votre mot de passe a été mis à jour",
        });
        setIsChangingPassword(false);
        setNewPassword('');
        setConfirmPassword('');
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

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // For now, we'll just show a message that this feature is coming soon
    toast({
      title: "Fonctionnalité à venir",
      description: "La modification de photo de profil sera bientôt disponible",
    });
  };

  const getInitials = () => {
    const first = firstName || profile?.first_name || '';
    const last = lastName || profile?.last_name || '';
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Mon Profil
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button
              onClick={signOut}
              variant="outline"
              className="border-red-200 dark:border-red-700 text-red-600 dark:text-red-400"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Profile Card */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <User className="w-5 h-5 mr-2" />
              Informations du profil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profile?.avatar_url || ''} />
                  <AvatarFallback className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 text-white text-lg">
                    {getInitials() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={handleAvatarClick}
                  className="absolute -bottom-1 -right-1 w-7 h-7 bg-vilo-purple-600 hover:bg-vilo-purple-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <Camera className="w-4 h-4 text-white" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {profile?.first_name && profile?.last_name 
                    ? `${profile.first_name} ${profile.last_name}`
                    : 'Utilisateur'
                  }
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
              </div>
            </div>

            {/* Profile Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                    placeholder="Prénom"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                    placeholder="Nom"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="pl-10 bg-gray-50 dark:bg-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                    placeholder="+33 1 23 45 67 89"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setFirstName(profile?.first_name || '');
                      setLastName(profile?.last_name || '');
                      setPhone(profile?.phone || '');
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="bg-vilo-purple-600 hover:bg-vilo-purple-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                >
                  Modifier le profil
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Password Change Card */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <Lock className="w-5 h-5 mr-2" />
              Sécurité
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isChangingPassword ? (
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Mot de passe</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Modifiez votre mot de passe pour sécuriser votre compte
                  </p>
                </div>
                <Button
                  onClick={() => setIsChangingPassword(true)}
                  variant="outline"
                >
                  Changer le mot de passe
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nouveau mot de passe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmer le mot de passe"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsChangingPassword(false);
                      setNewPassword('');
                      setConfirmPassword('');
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleChangePassword}
                    disabled={isLoading}
                    className="bg-vilo-purple-600 hover:bg-vilo-purple-700"
                  >
                    {isLoading ? 'Modification...' : 'Changer le mot de passe'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>Compte créé le : {new Date(profile?.created_at || '').toLocaleDateString('fr-FR')}</p>
              <p>Dernière mise à jour : {new Date(profile?.updated_at || '').toLocaleDateString('fr-FR')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
