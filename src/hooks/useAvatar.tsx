
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useSupabaseAuth } from './useSupabaseAuth';

export const useAvatar = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { user, updateProfile } = useSupabaseAuth();

  const uploadAvatar = async (file: File): Promise<string | null> => {
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour modifier votre photo",
        variant: "destructive",
      });
      return null;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Erreur",
        description: "Le fichier doit être une image",
        variant: "destructive",
      });
      return null;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "Erreur",
        description: "L'image ne doit pas dépasser 5MB",
        variant: "destructive",
      });
      return null;
    }

    setIsUploading(true);

    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      console.log('Uploading file:', fileName);

      // Upload file to storage
      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      console.log('File uploaded successfully:', data);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      console.log('Public URL:', publicUrl);

      // Update profile with new avatar URL
      const { error: updateError } = await updateProfile({
        avatar_url: publicUrl
      });

      if (updateError) {
        console.error('Profile update error:', updateError);
        throw updateError;
      }

      toast({
        title: "Photo mise à jour",
        description: "Votre photo de profil a été mise à jour avec succès",
      });

      return publicUrl;

    } catch (error: any) {
      console.error('Avatar upload error:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour la photo",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteAvatar = async (): Promise<boolean> => {
    if (!user) return false;

    setIsUploading(true);

    try {
      // Update profile to remove avatar URL
      const { error: updateError } = await updateProfile({
        avatar_url: null
      });

      if (updateError) {
        throw updateError;
      }

      toast({
        title: "Photo supprimée",
        description: "Votre photo de profil a été supprimée",
      });

      return true;

    } catch (error: any) {
      console.error('Avatar delete error:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer la photo",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadAvatar,
    deleteAvatar,
    isUploading
  };
};
