
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AppointmentFormData } from '@/types/database';
import { toast } from '@/hooks/use-toast';

export const useAppointments = () => {
  const [isLoading, setIsLoading] = useState(false);

  const submitAppointment = async (appointmentData: AppointmentFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('appointments')
        .insert([appointmentData]);

      if (error) {
        throw error;
      }

      // Envoyer email de confirmation
      try {
        await supabase.functions.invoke('send-notification-email', {
          body: {
            to: appointmentData.client_email,
            name: appointmentData.client_name,
            type: 'appointment',
            data: {
              date: new Date(appointmentData.date).toLocaleDateString('fr-FR'),
              time: appointmentData.time
            }
          }
        });
      } catch (emailError) {
        console.log('Erreur envoi email (non bloquant):', emailError);
      }

      toast({
        title: "Rendez-vous enregistré !",
        description: "Nous vous confirmerons votre créneau très bientôt.",
      });

      return { success: true };
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du rendez-vous:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitAppointment,
    isLoading
  };
};
