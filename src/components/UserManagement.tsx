
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { User, Settings, Trash2, Search, UserPlus, Crown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
  role?: 'admin' | 'user';
}

const UserManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      
      // Fetch profiles with user data
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          first_name,
          last_name,
          avatar_url,
          phone,
          created_at
        `);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw profilesError;
      }

      // Fetch user roles separately
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) {
        console.error('Error fetching roles:', rolesError);
        // Don't throw here, roles are optional
      }

      // Get user emails from auth metadata (this might need admin privileges)
      const usersWithDetails: UserProfile[] = [];
      
      for (const profile of profiles || []) {
        // Try to get user email from auth.users (requires service role)
        const { data: authUser } = await supabase.auth.admin.getUserById(profile.id);
        
        const userRole = roles?.find(r => r.user_id === profile.id)?.role || 'user';
        
        usersWithDetails.push({
          id: profile.id,
          email: authUser?.user?.email || 'Email non disponible',
          first_name: profile.first_name,
          last_name: profile.last_name,
          avatar_url: profile.avatar_url,
          phone: profile.phone,
          created_at: profile.created_at,
          role: userRole as 'admin' | 'user'
        });
      }

      setUsers(usersWithDetails);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les utilisateurs. Certaines fonctionnalités peuvent nécessiter des privilèges administrateur.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'user') => {
    try {
      // Check if user already has a role entry
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (existingRole) {
        // Update existing role
        const { error } = await supabase
          .from('user_roles')
          .update({ role: newRole })
          .eq('user_id', userId);

        if (error) throw error;
      } else {
        // Insert new role
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: newRole });

        if (error) throw error;
      }

      // Update local state
      setUsers(prev => prev.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      ));

      toast({
        title: "Rôle mis à jour",
        description: `L'utilisateur est maintenant ${newRole === 'admin' ? 'administrateur' : 'utilisateur'}`,
      });
    } catch (error: any) {
      console.error('Error updating user role:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le rôle",
        variant: "destructive",
      });
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }

    try {
      // Delete user (this will cascade to profiles and user_roles)
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) throw error;

      setUsers(prev => prev.filter(user => user.id !== userId));

      toast({
        title: "Utilisateur supprimé",
        description: "L'utilisateur a été supprimé avec succès",
      });
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'utilisateur",
        variant: "destructive",
      });
    }
  };

  const getInitials = (firstName: string | null, lastName: string | null) => {
    const first = firstName || '';
    const last = lastName || '';
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase() || 'U';
  };

  const getDisplayName = (firstName: string | null, lastName: string | null) => {
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    return 'Nom non renseigné';
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    const fullName = getDisplayName(user.first_name, user.last_name).toLowerCase();
    const email = user.email.toLowerCase();
    
    return fullName.includes(searchLower) || email.includes(searchLower);
  });

  if (isLoading) {
    return (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vilo-purple-600"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center text-gray-800 dark:text-gray-100">
          <User className="w-5 h-5 mr-2" />
          Gestion des Utilisateurs ({filteredUsers.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div key={user.id} className="border dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-700 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar_url || ''} alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 text-white">
                      {getInitials(user.first_name, user.last_name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                      {getDisplayName(user.first_name, user.last_name)}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
                    {user.phone && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user.phone}</p>
                    )}
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Membre depuis: {new Date(user.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Role Badge */}
                  <Badge className={user.role === 'admin' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-blue-500 hover:bg-blue-600'}>
                    {user.role === 'admin' ? (
                      <>
                        <Crown className="w-3 h-3 mr-1" />
                        Admin
                      </>
                    ) : (
                      <>
                        <User className="w-3 h-3 mr-1" />
                        Utilisateur
                      </>
                    )}
                  </Badge>

                  {/* Role Selector */}
                  <Select
                    value={user.role}
                    onValueChange={(value: 'admin' | 'user') => updateUserRole(user.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Utilisateur</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Actions */}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteUser(user.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Aucun utilisateur trouvé
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
