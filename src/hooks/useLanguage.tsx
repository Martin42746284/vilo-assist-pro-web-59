
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Translation {
  key: string;
  language: string;
  value: string;
}

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const defaultTranslations: Record<string, Record<string, string>> = {
  fr: {
    'welcome.title': 'Bienvenue chez VILO ASSIST-PRO',
    'welcome.subtitle': 'Votre partenaire de confiance pour l\'assistance virtuelle professionnelle',
    'services.title': 'Nos Services',
    'contact.title': 'Contactez-nous',
    'testimonials.title': 'Ils nous font confiance',
    'testimonials.add': 'Ajouter un témoignage',
    'testimonials.form.title': 'Partagez votre expérience',
    'testimonials.form.name': 'Votre nom',
    'testimonials.form.domain': 'Votre domaine d\'activité',
    'testimonials.form.service': 'Service utilisé',
    'testimonials.form.comment': 'Votre commentaire',
    'testimonials.form.rating': 'Note sur 5',
    'testimonials.form.submit': 'Envoyer le témoignage',
    'projects.title': 'Nos Réalisations',
    'language.fr': 'Français',
    'language.mg': 'Malagasy'
  },
  mg: {
    'welcome.title': 'Tongasoa eto amin\'ny VILO ASSIST-PRO',
    'welcome.subtitle': 'Mpiara-miasa mahatoky ho an\'ny fanampiana virtoaly matihanina',
    'services.title': 'Ireo Serivisy Nataonay',
    'contact.title': 'Mifandraisa aminay',
    'testimonials.title': 'Ireo matoky anay',
    'testimonials.add': 'Hanampy fijoroana vavolombelona',
    'testimonials.form.title': 'Zarao ny traikefanao',
    'testimonials.form.name': 'Ny anaranao',
    'testimonials.form.domain': 'Ny sehatry ny asanao',
    'testimonials.form.service': 'Serivisy nampiasaina',
    'testimonials.form.comment': 'Ny hevitrao',
    'testimonials.form.rating': 'Naoty amin\'ny 5',
    'testimonials.form.submit': 'Alefa ny fijoroana vavolombelona',
    'projects.title': 'Ireo Asa Vitanay',
    'language.fr': 'Frantsay',
    'language.mg': 'Malagasy'
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [translations, setTranslations] = useState<Record<string, string>>(defaultTranslations.fr);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTranslations = async (language: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('translations')
        .select('key, value')
        .eq('language', language);

      if (error) {
        console.error('Error fetching translations:', error);
        setTranslations(defaultTranslations[language] || defaultTranslations.fr);
      } else {
        const translationMap: Record<string, string> = {};
        data?.forEach((t) => {
          translationMap[t.key] = t.value;
        });
        
        // Merge with default translations
        setTranslations({
          ...defaultTranslations[language],
          ...translationMap
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setTranslations(defaultTranslations[language] || defaultTranslations.fr);
    } finally {
      setIsLoading(false);
    }
  };

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('vilo-language', lang);
    fetchTranslations(lang);
  };

  const t = (key: string): string => {
    return translations[key] || key;
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('vilo-language') || 'fr';
    setCurrentLanguage(savedLanguage);
    fetchTranslations(savedLanguage);
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
