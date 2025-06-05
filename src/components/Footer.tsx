
import { Mail, MessageCircle, MapPin } from 'lucide-react';

const Footer = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/261332178785', '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:info@viloassistpro.com';
  };

  return (
    <footer className="bg-gradient-to-r from-vilo-purple-900 to-vilo-pink-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-bold">VILO ASSIST-PRO</span>
            </div>
            <p className="text-vilo-purple-100 leading-relaxed">
              Votre partenaire d'assistance virtuelle depuis Madagascar. 
              Plus de 5 ans d'expérience au service des professionnels francophones.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Nos Services</h3>
            <div className="space-y-2 text-vilo-purple-100">
              <p>• Assistant administratif</p>
              <p>• Support client</p>
              <p>• Télésecrétariat</p>
              <p>• Gestion financière</p>
              <p>• Et bien plus...</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-vilo-pink-300" />
                <span className="text-vilo-purple-100">info@viloassistpro</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-vilo-pink-300" />
                <span className="text-vilo-purple-100">+261 33 21 787 85</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-vilo-pink-300 mt-0.5" />
                <span className="text-vilo-purple-100">
                  LOT IPF 023 Ambohijafy Bemasoandro<br />
                  Antananarivo, Madagascar
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-vilo-purple-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-vilo-purple-100">
                © 2024 VILO ASSIST-PRO. Tous droits réservés.
              </p>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={handleEmail}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Nous écrire
              </button>
              <button 
                onClick={handleWhatsApp}
                className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 px-4 py-2 rounded-lg transition-colors text-sm"
              >
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
