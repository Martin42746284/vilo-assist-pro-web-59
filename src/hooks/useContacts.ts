
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ContactFormData } from '@/types/database';
import { toast } from '@/hooks/use-toast';

export const useContacts = () => {
  const [isLoading, setIsLoading] = useState(false);

  const submitContact = async (contactData: ContactFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('contacts')
        .insert([contactData]);

      if (error) {
        throw error;
      }

      // Envoyer email de confirmation
      try {
        await supabase.functions.invoke('send-notification-email', {
          body: {
            to: contactData.email,
            name: contactData.name,
            type: 'contact',
            data: {
              service: contactData.service,
              message: contactData.message
            }
          }
        });
      } catch (emailError) {
        console.log('Erreur envoi email (non bloquant):', emailError);
      }

      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });

      return { success: true };
    } catch (error) {
      console.error('Erreur lors de l\'envoi du contact:', error);
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
    submitContact,
    isLoading
  };
};
