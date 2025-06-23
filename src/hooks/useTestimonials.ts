
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Testimonial } from '@/types/database';
import { useQuery } from '@tanstack/react-query';

export const useTestimonials = () => {
  const { data: testimonials = [], isLoading, error } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data as Testimonial[];
    },
  });

  return {
    testimonials,
    isLoading,
    error
  };
};
