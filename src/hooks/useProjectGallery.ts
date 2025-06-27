
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ProjectGalleryItem {
  id: string;
  title: string;
  description: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  category: string;
  client_name: string | null;
  completion_date: string | null;
  is_featured: boolean | null;
  created_at: string;
  updated_at: string;
}

export const useProjectGallery = () => {
  const [projects, setProjects] = useState<ProjectGalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('project_gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setProjects(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des projets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    isLoading,
    refetch: fetchProjects
  };
};
