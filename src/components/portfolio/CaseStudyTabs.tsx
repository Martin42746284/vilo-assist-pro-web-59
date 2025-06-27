
interface CaseStudy {
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  duration: string;
  team: string;
  savings: string;
}

interface CaseStudyTabsProps {
  caseStudies: CaseStudy[];
  selectedCase: number;
  onSelectCase: (index: number) => void;
}

const CaseStudyTabs = ({ caseStudies, selectedCase, onSelectCase }: CaseStudyTabsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {caseStudies.map((caseStudy, index) => (
        <button
          key={index}
          onClick={() => onSelectCase(index)}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            selectedCase === index
              ? 'bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 text-white'
              : 'bg-white text-gray-700 hover:bg-vilo-purple-50 border border-gray-200'
          }`}
        >
          {caseStudy.industry}
        </button>
      ))}
    </div>
  );
};

export default CaseStudyTabs;
