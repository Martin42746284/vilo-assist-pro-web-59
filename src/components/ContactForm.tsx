
import { useState } from 'react';
import { Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulation d'envoi (vous pouvez intégrer avec votre service d'email)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });

      // Reset form
      setFormData({ name: '', email: '', service: '', message: '' });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    'Assistance administrative',
    'Gestion d\'emails',
    'Recherche et rédaction',
    'Gestion des réseaux sociaux',
    'Support client',
    'Saisie de données',
    'Planification et organisation',
    'Autre'
  ];

  return (
    <Card className="border-vilo-purple-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-vilo-purple-50 to-vilo-pink-50">
        <CardTitle className="text-2xl text-center bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
          Demande de devis gratuit
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Nom complet *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Votre nom complet"
                required
                className="border-vilo-purple-200 focus:border-vilo-purple-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="votre@email.com"
                required
                className="border-vilo-purple-200 focus:border-vilo-purple-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service" className="text-gray-700 font-medium">
              Service souhaité *
            </Label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-vilo-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-vilo-purple-400 focus:border-transparent"
            >
              <option value="">Sélectionnez un service</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-gray-700 font-medium">
              Message *
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Décrivez vos besoins en détail..."
              required
              rows={5}
              className="border-vilo-purple-200 focus:border-vilo-purple-400"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 text-white py-3 text-lg"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="mr-2 w-5 h-5" />
                Envoyer la demande
              </>
            )}
          </Button>
        </form>

        <div className="pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-vilo-purple-700">Réponse garantie</span> sous 24h
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Devis gratuit • Sans engagement
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
