
import { useState, useEffect } from 'react';
import PortfolioHeader from './portfolio/PortfolioHeader';
import CaseStudyTabs from './portfolio/CaseStudyTabs';
import CaseStudyCard from './portfolio/CaseStudyCard';
import { useCaseStudies } from './portfolio/useCaseStudies';

const PortfolioSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCase, setSelectedCase] = useState(0);
  const { caseStudies } = useCaseStudies();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('portfolio');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-gray-50 to-vilo-purple-50">
      <div className="container mx-auto px-4">
        <PortfolioHeader isVisible={isVisible} />

        <div className="max-w-6xl mx-auto">
          <CaseStudyTabs 
            caseStudies={caseStudies}
            selectedCase={selectedCase}
            onSelectCase={setSelectedCase}
          />

          <CaseStudyCard 
            caseStudy={caseStudies[selectedCase]}
            isVisible={isVisible}
            onScrollToContact={scrollToContact}
          />
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
