
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';
import { useProjectGallery } from '@/hooks/useProjectGallery';
import { useLanguage } from '@/hooks/useLanguage';

interface ProjectGalleryProps {
  showTitle?: boolean;
  maxItems?: number;
}

const ProjectGallery = ({ showTitle = true, maxItems }: ProjectGalleryProps) => {
  const { projects, isLoading } = useProjectGallery();
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const displayedProjects = maxItems ? projects.slice(0, maxItems) : projects;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('projects');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % displayedProjects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + displayedProjects.length) % displayedProjects.length);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vilo-purple-600"></div>
      </div>
    );
  }

  if (displayedProjects.length === 0) {
    return (
      <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-vilo-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          {showTitle && (
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
                {t('projects.title')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Nos projets seront bientôt disponibles
              </p>
            </div>
          )}
        </div>
      </section>
    );
  }

  const currentProject = displayedProjects[currentIndex];

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-vilo-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className={`text-center space-y-4 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
              {t('projects.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Découvrez quelques exemples de notre travail d'excellence
            </p>
          </div>
        )}

        <div className="max-w-4xl mx-auto relative">
          <Card className="border-0 shadow-2xl overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Images Before/After */}
              <div className="space-y-4 p-6">
                {currentProject.before_image_url && (
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-orange-600 border-orange-600">
                      Avant
                    </Badge>
                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <img
                        src={currentProject.before_image_url}
                        alt="Avant transformation"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                
                {currentProject.after_image_url && (
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Après
                    </Badge>
                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <img
                        src={currentProject.after_image_url}
                        alt="Après transformation"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="p-6 flex flex-col justify-center">
                <CardHeader className="p-0 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600">
                      {currentProject.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {currentProject.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0 space-y-4">
                  {currentProject.description && (
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {currentProject.description}
                    </p>
                  )}

                  <div className="space-y-2">
                    {currentProject.client_name && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <User className="w-4 h-4" />
                        <span>Client: {currentProject.client_name}</span>
                      </div>
                    )}
                    
                    {currentProject.completion_date && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Terminé le {new Date(currentProject.completion_date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>

          {displayedProjects.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={prevProject}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 hover:bg-white border-vilo-purple-200 shadow-lg dark:bg-gray-800/80 dark:hover:bg-gray-800"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={nextProject}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 hover:bg-white border-vilo-purple-200 shadow-lg dark:bg-gray-800/80 dark:hover:bg-gray-800"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>

        {displayedProjects.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {displayedProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-vilo-purple-500 to-vilo-pink-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectGallery;
