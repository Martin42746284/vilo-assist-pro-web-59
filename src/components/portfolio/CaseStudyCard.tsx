
import { TrendingUp, Users, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  isVisible: boolean;
  onScrollToContact: () => void;
}

const CaseStudyCard = ({ caseStudy, isVisible, onScrollToContact }: CaseStudyCardProps) => {
  return (
    <div className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Card className="border-0 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 text-white p-8">
          <CardHeader className="p-0">
            <CardTitle className="text-3xl font-bold mb-2">
              {caseStudy.title}
            </CardTitle>
            <p className="text-vilo-purple-100 text-lg">
              {caseStudy.industry}
            </p>
          </CardHeader>
        </div>

        <CardContent className="p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                  🎯 Défi
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {caseStudy.challenge}
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                  💡 Solution
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {caseStudy.solution}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-vilo-purple-600" />
                  Résultats
                </h4>
                <div className="space-y-3">
                  {caseStudy.results.map((result, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">{result}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center bg-vilo-purple-50 rounded-lg p-4">
                  <Clock className="w-8 h-8 text-vilo-purple-600 mx-auto mb-2" />
                  <div className="font-bold text-gray-800">{caseStudy.duration}</div>
                  <div className="text-sm text-gray-600">Durée</div>
                </div>
                <div className="text-center bg-vilo-purple-50 rounded-lg p-4">
                  <Users className="w-8 h-8 text-vilo-purple-600 mx-auto mb-2" />
                  <div className="font-bold text-gray-800">{caseStudy.team}</div>
                  <div className="text-sm text-gray-600">Équipe</div>
                </div>
                <div className="text-center bg-vilo-purple-50 rounded-lg p-4">
                  <TrendingUp className="w-8 h-8 text-vilo-purple-600 mx-auto mb-2" />
                  <div className="font-bold text-gray-800">{caseStudy.savings}</div>
                  <div className="text-sm text-gray-600">Économies</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 mb-4">
              Votre projet mérite une approche sur mesure
            </p>
            <Button 
              onClick={onScrollToContact}
              className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 text-white"
            >
              Discutons de votre projet
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseStudyCard;
