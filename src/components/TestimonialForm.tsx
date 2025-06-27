
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Star, MessageSquarePlus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';

const TestimonialForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    service: '',
    commentaire: '',
    note: '5'
  });
  const { toast } = useToast();
  const { t } = useLanguage();

  const services = [
    'Assistant Administratif',
    'Support Client',
    'Télésecrétaire Médical',
    'Gestion E-commerce',
    'Comptabilité',
    'Autre'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('testimonials')
        .insert({
          name: formData.name,
          domain: formData.domain,
          service: formData.service,
          commentaire: formData.commentaire,
          note: formData.note,
          date: new Date().toISOString().split('T')[0],
          status: 'pending',
          is_published: false
        });

      if (error) throw error;

      toast({
        title: "Témoignage envoyé !",
        description: "Merci pour votre retour. Il sera examiné par notre équipe.",
      });

      setFormData({
        name: '',
        domain: '',
        service: '',
        commentaire: '',
        note: '5'
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 text-white">
          <MessageSquarePlus className="w-4 h-4 mr-2" />
          {t('testimonials.add')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
            {t('testimonials.form.title')}
          </DialogTitle>
          <DialogDescription>
            Partagez votre expérience avec nos services d'assistance virtuelle.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('testimonials.form.name')}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain">{t('testimonials.form.domain')}</Label>
            <Input
              id="domain"
              placeholder="Ex: Cabinet médical, E-commerce, Consulting..."
              value={formData.domain}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">{t('testimonials.form.service')}</Label>
            <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>{service}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">{t('testimonials.form.rating')}</Label>
            <Select value={formData.note} onValueChange={(value) => setFormData({ ...formData, note: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: rating }, (_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-2">({rating}/5)</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">{t('testimonials.form.comment')}</Label>
            <Textarea
              id="comment"
              placeholder="Décrivez votre expérience avec nos services..."
              value={formData.commentaire}
              onChange={(e) => setFormData({ ...formData, commentaire: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Envoi...' : t('testimonials.form.submit')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialForm;
