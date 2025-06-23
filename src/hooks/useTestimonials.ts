
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Testimonial } from '@/types/database';

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setTestimonials(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des témoignages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return {
    testimonials,
    isLoading,
    refetch: fetchTestimonials
  };
};
