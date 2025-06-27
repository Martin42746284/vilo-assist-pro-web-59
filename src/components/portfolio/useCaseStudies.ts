
export interface CaseStudy {
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  duration: string;
  team: string;
  savings: string;
}

export const useCaseStudies = () => {
  const caseStudies: CaseStudy[] = [
    {
      title: "Cabinet d'Expertise Comptable",
      industry: "Services Financiers",
      challenge: "Surcharge administrative pendant la saison fiscale",
      solution: "Mise en place d'une équipe de 3 assistants pour la saisie comptable et le support client",
      results: [
        "Réduction de 60% du temps de traitement",
        "100% des déclarations traitées dans les délais",
        "Amélioration de 40% de la satisfaction client"
      ],
      duration: "6 mois",
      team: "3 assistants",
      savings: "15 000€"
    },
    {
      title: "E-commerce Mode",
      industry: "Commerce en ligne",
      challenge: "Gestion du service client et des commandes en forte croissance",
      solution: "Support client 6j/7 et assistance administrative pour la logistique",
      results: [
        "Temps de réponse client réduit à 2h",
        "Croissance de 80% du CA",
        "Taux de satisfaction de 98%"
      ],
      duration: "12 mois",
      team: "2 assistants",
      savings: "25 000€"
    },
    {
      title: "Cabinet Juridique",
      industry: "Services Juridiques",
      challenge: "Télésecrétariat et gestion des dossiers clients",
      solution: "Assistante dédiée pour l'accueil téléphonique et le suivi administratif",
      results: [
        "0% d'appels manqués",
        "Organisation optimisée des plannings",
        "Confidentialité absolue maintenue"
      ],
      duration: "18 mois",
      team: "1 assistante",
      savings: "20 000€"
    }
  ];

  return { caseStudies };
};
