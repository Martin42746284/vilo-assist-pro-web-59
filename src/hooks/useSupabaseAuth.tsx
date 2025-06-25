
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile, UserRole } from '@/types/database';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  userRole: UserRole | null;
  isLoading: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<{ error: any }>;
  updatePassword: (newPassword: string) => Promise<{ error: any }>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const SupabaseAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer user data fetching to avoid blocking the auth state change
          setTimeout(async () => {
            if (mounted) {
              await fetchUserData(session.user.id);
            }
          }, 100);
        } else {
          setProfile(null);
          setUserRole(null);
        }
        
        setIsLoading(false);
      }
    );

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
          return;
        }
        
        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserData(session.user.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      console.log('Fetching user data for:', userId);

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!profileError && profileData) {
        console.log('Profile found:', profileData);
        setProfile(profileData);
      } else if (profileError) {
        console.error('Error fetching profile:', profileError);
        
        // Create profile if it doesn't exist
        if (profileError.code === 'PGRST116') {
          console.log('Creating new profile for user:', userId);
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: userId,
              first_name: '',
              last_name: '',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .select()
            .single();

          if (!createError && newProfile) {
            console.log('New profile created:', newProfile);
            setProfile(newProfile);
          } else {
            console.error('Error creating profile:', createError);
          }
        }
      }

      // Fetch user role
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (!roleError && roleData) {
        console.log('Role found:', roleData);
        setUserRole(roleData);
      } else if (roleError) {
        console.error('Error fetching role:', roleError);
        
        // Create default role if none exists
        if (roleError.code === 'PGRST116') {
          console.log('Creating default role for user:', userId);
          const { data: newRole, error: createRoleError } = await supabase
            .from('user_roles')
            .insert({
              user_id: userId,
              role: 'user',
              created_at: new Date().toISOString()
            })
            .select()
            .single();

          if (!createRoleError && newRole) {
            console.log('New role created:', newRole);
            setUserRole(newRole);
          } else {
            console.error('Error creating role:', createRoleError);
            // Set fallback role
            setUserRole({ 
              id: '', 
              user_id: userId, 
              role: 'user', 
              created_at: new Date().toISOString() 
            });
          }
        } else {
          // Set fallback role for other errors
          setUserRole({ 
            id: '', 
            user_id: userId, 
            role: 'user', 
            created_at: new Date().toISOString() 
          });
        }
      }
    } catch (error) {
      console.error('Error in fetchUserData:', error);
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: firstName || '',
            last_name: lastName || ''
          }
        }
      });
      
      return { error };
    } catch (error) {
      console.error('SignUp error:', error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      return { error };
    } catch (error) {
      console.error('SignIn error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('SignOut error:', error);
        toast({
          title: "Erreur de déconnexion",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setProfile(null);
        setUserRole(null);
        setUser(null);
        setSession(null);
      }
    } catch (error) {
      console.error('SignOut error:', error);
    }
  };

  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      console.log('Updating profile with data:', data);

      const { error } = await supabase
        .from('profiles')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        return { error };
      }

      // Refresh user data after successful update
      await fetchUserData(user.id);
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès",
      });

      return { error: null };
    } catch (error) {
      console.error('Error in updateProfile:', error);
      return { error };
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (!error) {
        toast({
          title: "Mot de passe mis à jour",
          description: "Votre mot de passe a été changé avec succès",
        });
      }

      return { error };
    } catch (error) {
      console.error('UpdatePassword error:', error);
      return { error };
    }
  };

  const isAdmin = userRole?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      userRole,
      isLoading,
      signUp,
      signIn,
      signOut,
      updateProfile,
      updatePassword,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider');
  }
  return context;
};
