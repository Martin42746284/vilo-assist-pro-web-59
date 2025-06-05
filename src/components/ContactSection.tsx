
import { Mail, MessageCircle, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/261332178785', '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:info@viloassistpro.com';
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
            Contactez-nous
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Prêt à déléguer vos tâches et à vous concentrer sur l'essentiel ? 
            Contactez-nous dès aujourd'hui pour discuter de vos besoins.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Nos coordonnées
              </h3>
              <div className="space-y-6">
                <Card className="border-vilo-purple-100 hover:border-vilo-purple-300 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-vilo-purple-500 to-vilo-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                        <p className="text-gray-600">info@viloassistpro</p>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-vilo-purple-600 hover:text-vilo-purple-700"
                          onClick={handleEmail}
                        >
                          Nous écrire →
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-vilo-purple-100 hover:border-vilo-purple-300 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-vilo-purple-500 to-vilo-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">WhatsApp</h4>
                        <p className="text-gray-600">+261 33 21 787 85</p>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-vilo-purple-600 hover:text-vilo-purple-700"
                          onClick={handleWhatsApp}
                        >
                          Discuter sur WhatsApp →
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-vilo-purple-100">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-vilo-purple-500 to-vilo-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Adresse</h4>
                        <p className="text-gray-600">
                          LOT IPF 023 Ambohijafy Bemasoandro<br />
                          Antananarivo, Madagascar
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <Card className="border-vilo-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-vilo-purple-50 to-vilo-pink-50">
                <CardTitle className="text-2xl text-center bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
                  Prêt à commencer ?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-vilo-purple-500 to-vilo-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Clock className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Gagnez du temps dès aujourd'hui
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Contactez-nous pour discuter de vos besoins et découvrir comment nous pouvons vous aider à optimiser votre temps.
                  </p>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={handleWhatsApp}
                    className="w-full bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 text-white py-6 text-lg"
                    size="lg"
                  >
                    <MessageCircle className="mr-2 w-5 h-5" />
                    Discuter sur WhatsApp
                  </Button>
                  
                  <Button 
                    onClick={handleEmail}
                    variant="outline"
                    className="w-full border-vilo-purple-300 text-vilo-purple-700 hover:bg-vilo-purple-50 py-6 text-lg"
                    size="lg"
                  >
                    <Mail className="mr-2 w-5 h-5" />
                    Envoyer un email
                  </Button>
                </div>

                <div className="pt-6 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-vilo-purple-700">Tarif unique :</span> 10€/heure
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Tous services inclus • Devis gratuit
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
