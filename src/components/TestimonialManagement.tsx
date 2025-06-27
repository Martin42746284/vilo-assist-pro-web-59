
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Eye, EyeOff, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Testimonial } from '@/types/database';

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les témoignages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ 
          is_published: !currentStatus,
          status: !currentStatus ? 'published' : 'pending'
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: `Témoignage ${!currentStatus ? 'publié' : 'masqué'}`,
      });

      fetchTestimonials();
    } catch (error) {
      console.error('Error updating testimonial:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le témoignage",
        variant: "destructive",
      });
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Témoignage supprimé",
      });

      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le témoignage",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vilo-purple-600"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Gestion des Témoignages
          <Badge variant="outline">{testimonials.length} témoignages</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      {testimonial.domain && (
                        <div className="text-sm text-gray-500">{testimonial.domain}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{testimonial.service || 'Non spécifié'}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: parseInt(testimonial.note) }, (_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-1 text-sm">({testimonial.note}/5)</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={testimonial.is_published ? "default" : "secondary"}
                      className={testimonial.is_published ? "bg-green-100 text-green-800" : ""}
                    >
                      {testimonial.is_published ? 'Publié' : 'En attente'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(testimonial.created_at).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePublish(testimonial.id, testimonial.is_published || false)}
                      >
                        {testimonial.is_published ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteTestimonial(testimonial.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {testimonials.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucun témoignage trouvé
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestimonialManagement;
