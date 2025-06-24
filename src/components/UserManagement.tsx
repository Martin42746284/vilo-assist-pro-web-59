
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  Users, 
  Search, 
  Mail, 
  Calendar, 
  Shield, 
  UserCheck,
  Trash2,
  Filter
} from 'lucide-react';

interface UserWithProfile {
  id: string;
  email: string;
  created_at: string;
  email_confirmed_at: string | null;
  profile: {
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    phone: string | null;
  } | null;
  role: {
    role: 'admin' | 'user';
  } | null;
}

const UserManagement = () => {
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter]);

  const fetchUsers = async () => {
    try {
      // Fetch users with their profiles and roles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          *,
          user_roles (role)
        `);

      if (profilesError) throw profilesError;

      // Get auth users (this requires admin privileges)
      const { data: { users: authUsers }, error: usersError } = await supabase.auth.admin.listUsers();

      if (usersError) {
        console.error('Error fetching auth users:', usersError);
        // If we can't fetch auth users, we'll work with profiles only
        const mappedUsers = profilesData.map(profile => ({
          id: profile.id,
          email: 'Email non disponible',
          created_at: profile.created_at,
          email_confirmed_at: null,
          profile: {
            first_name: profile.first_name,
            last_name: profile.last_name,
            avatar_url: profile.avatar_url,
            phone: profile.phone
          },
          role: profile.user_roles?.[0] || null
        }));
        setUsers(mappedUsers);
      } else {
        // Combine auth users with profiles
        const combinedUsers = authUsers.map(authUser => {
          const profile = profilesData.find(p => p.id === authUser.id);
          return {
            id: authUser.id,
            email: authUser.email || '',
            created_at: authUser.created_at,
            email_confirmed_at: authUser.email_confirmed_at,
            profile: profile ? {
              first_name: profile.first_name,
              last_name: profile.last_name,
              avatar_url: profile.avatar_url,
              phone: profile.phone
            } : null,
            role: profile?.user_roles?.[0] || null
          };
        });
        setUsers(combinedUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les utilisateurs",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.profile?.first_name && user.profile.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.profile?.last_name && user.profile.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by role
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role?.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'user') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({
          user_id: userId,
          role: newRole
        });

      if (error) throw error;

      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, role: { role: newRole } }
          : user
      ));

      toast({
        title: "Rôle mis à jour",
        description: `L'utilisateur est maintenant ${newRole === 'admin' ? 'administrateur' : 'utilisateur'}`,
      });
    } catch (error) {
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
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) throw error;

      setUsers(prev => prev.filter(user => user.id !== userId));

      toast({
        title: "Utilisateur supprimé",
        description: "L'utilisateur a été supprimé avec succès",
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'utilisateur",
        variant: "destructive",
      });
    }
  };

  const getInitials = (user: UserWithProfile) => {
    const first = user.profile?.first_name || '';
    const last = user.profile?.last_name || '';
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase() || user.email.charAt(0).toUpperCase();
  };

  const getRoleBadge = (role: string | undefined) => {
    if (role === 'admin') {
      return <Badge className="bg-red-500 hover:bg-red-600 text-white">Admin</Badge>;
    }
    return <Badge variant="secondary">Utilisateur</Badge>;
  };

  if (isLoading) {
    return (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vilo-purple-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center text-gray-800 dark:text-gray-100">
          <Users className="w-5 h-5 mr-2" />
          Gestion des Utilisateurs ({filteredUsers.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-48 dark:bg-gray-700 dark:border-gray-600">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filtrer par rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les rôles</SelectItem>
              <SelectItem value="user">Utilisateurs</SelectItem>
              <SelectItem value="admin">Administrateurs</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div key={user.id} className="border dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-700 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.profile?.avatar_url || ''} />
                    <AvatarFallback className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 text-white">
                      {getInitials(user)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {user.profile?.first_name && user.profile?.last_name 
                        ? `${user.profile.first_name} ${user.profile.last_name}`
                        : 'Nom non renseigné'
                      }
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {user.email}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(user.created_at).toLocaleDateString('fr-FR')}
                      </div>
                      {user.email_confirmed_at && (
                        <div className="flex items-center text-green-600 dark:text-green-400">
                          <UserCheck className="w-4 h-4 mr-1" />
                          Vérifié
                        </div>
                      )}
                    </div>
                    {user.profile?.phone && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        📞 {user.profile.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {getRoleBadge(user.role?.role)}
                  
                  <Select
                    value={user.role?.role || 'user'}
                    onValueChange={(value) => updateUserRole(user.id, value as 'admin' | 'user')}
                  >
                    <SelectTrigger className="w-32">
                      <Shield className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Utilisateur</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteUser(user.id)}
                    className="w-10 h-10 p-0"
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
