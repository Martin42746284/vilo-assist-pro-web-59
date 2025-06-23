
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Contact, Appointment } from '@/types/database';
import { Calendar, Mail, Phone, User, Clock, CheckCircle, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [contactsResponse, appointmentsResponse] = await Promise.all([
        supabase.from('contacts').select('*').order('created_at', { ascending: false }),
        supabase.from('appointments').select('*').order('created_at', { ascending: false })
      ]);

      if (contactsResponse.error) throw contactsResponse.error;
      if (appointmentsResponse.error) throw appointmentsResponse.error;

      setContacts(contactsResponse.data || []);
      setAppointments(appointmentsResponse.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateContactStatus = async (id: string, status: 'nouveau' | 'traité' | 'fermé') => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setContacts(prev => prev.map(contact => 
        contact.id === id ? { ...contact, status } : contact
      ));

      toast({
        title: "Statut mis à jour",
        description: "Le statut du contact a été modifié",
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
    }
  };

  const updateAppointmentStatus = async (id: string, status: 'en_attente' | 'confirmé' | 'annulé' | 'terminé') => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setAppointments(prev => prev.map(appointment => 
        appointment.id === id ? { ...appointment, status } : appointment
      ));

      toast({
        title: "Statut mis à jour",
        description: "Le statut du rendez-vous a été modifié",
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      nouveau: { color: 'bg-blue-500', text: 'Nouveau' },
      traité: { color: 'bg-yellow-500', text: 'Traité' },
      fermé: { color: 'bg-green-500', text: 'Fermé' },
      en_attente: { color: 'bg-orange-500', text: 'En attente' },
      confirmé: { color: 'bg-green-500', text: 'Confirmé' },
      annulé: { color: 'bg-red-500', text: 'Annulé' },
      terminé: { color: 'bg-gray-500', text: 'Terminé' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'bg-gray-500', text: status };
    
    return (
      <Badge className={`${config.color} text-white`}>
        {config.text}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Chargement...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard Admin - Vilo Assist Pro</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Mail className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                  <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rendez-vous</p>
                  <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">En attente</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {contacts.filter(c => c.status === 'nouveau').length + 
                     appointments.filter(a => a.status === 'en_attente').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Traités</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {contacts.filter(c => c.status === 'traité').length + 
                     appointments.filter(a => a.status === 'confirmé').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contacts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Demandes de Contact ({contacts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{contact.name}</h3>
                      <p className="text-gray-600">{contact.email}</p>
                      <p className="text-sm text-blue-600 font-medium">{contact.service}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(contact.status)}
                      <span className="text-xs text-gray-500">
                        {new Date(contact.created_at).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{contact.message}</p>
                  
                  <div className="flex space-x-2">
                    {contact.status === 'nouveau' && (
                      <Button 
                        size="sm" 
                        onClick={() => updateContactStatus(contact.id, 'traité')}
                        className="bg-yellow-500 hover:bg-yellow-600"
                      >
                        Marquer comme traité
                      </Button>
                    )}
                    {contact.status === 'traité' && (
                      <Button 
                        size="sm" 
                        onClick={() => updateContactStatus(contact.id, 'fermé')}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Fermer
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Rendez-vous ({appointments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {appointment.client_name}
                      </h3>
                      <p className="text-gray-600">{appointment.client_email}</p>
                      <p className="text-sm text-purple-600 font-medium">
                        {new Date(appointment.date).toLocaleDateString('fr-FR')} à {appointment.time}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(appointment.status)}
                      <span className="text-xs text-gray-500">
                        {new Date(appointment.created_at).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {appointment.status === 'en_attente' && (
                      <>
                        <Button 
                          size="sm" 
                          onClick={() => updateAppointmentStatus(appointment.id, 'confirmé')}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Confirmer
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => updateAppointmentStatus(appointment.id, 'annulé')}
                        >
                          Annuler
                        </Button>
                      </>
                    )}
                    {appointment.status === 'confirmé' && (
                      <Button 
                        size="sm" 
                        onClick={() => updateAppointmentStatus(appointment.id, 'terminé')}
                        className="bg-gray-500 hover:bg-gray-600"
                      >
                        Marquer comme terminé
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
