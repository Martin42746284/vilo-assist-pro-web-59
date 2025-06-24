import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { Contact, Appointment } from '@/types/database';
import { useAuth } from '@/hooks/useAuth';
import UserManagement from './UserManagement';
import { 
  Calendar, 
  Mail, 
  Phone, 
  User, 
  Clock, 
  CheckCircle, 
  Search,
  Send,
  Eye,
  Filter,
  RefreshCw,
  LogOut,
  Shield,
  Users
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('contacts');

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

      const contacts: Contact[] = (contactsResponse.data || []).map((c: any) => ({
        ...c,
        status: c.status as 'nouveau' | 'traité' | 'fermé'
      }));
      setContacts(contacts);

      const appointments: Appointment[] = (appointmentsResponse.data || []).map((a: any) => ({
        ...a,
        status: a.status as 'en_attente' | 'confirmé' | 'annulé' | 'terminé'
      }));
      setAppointments(appointments);

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

  const refreshData = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
    toast({
      title: "Données actualisées",
      description: "Les données ont été mises à jour",
    });
  };

  const sendEmailConfirmation = async (email: string, name: string, type: 'contact' | 'appointment', data?: any) => {
    try {
      console.log('Envoi email à:', email, 'Type:', type);
      
      const { data: result, error } = await supabase.functions.invoke('send-notification-email', {
        body: {
          to: email,
          name: name,
          type: type,
          data: data
        }
      });

      if (error) {
        console.error('Erreur supabase function:', error);
        throw error;
      }

      console.log('Résultat envoi email:', result);

      toast({
        title: "Email envoyé",
        description: `Email de confirmation envoyé à ${email}`,
      });
    } catch (error: any) {
      console.error('Erreur envoi email:', error);
      toast({
        title: "Erreur email",
        description: `Impossible d'envoyer l'email: ${error.message || 'Erreur inconnue'}`,
        variant: "destructive",
      });
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

      if (status === 'traité') {
        const contact = contacts.find(c => c.id === id);
        if (contact) {
          await sendEmailConfirmation(contact.email, contact.name, 'contact', {
            service: contact.service,
            message: contact.message
          });
        }
      }

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

      if (status === 'confirmé') {
        const appointment = appointments.find(a => a.id === id);
        if (appointment) {
          await sendEmailConfirmation(appointment.client_email, appointment.client_name, 'appointment', {
            date: new Date(appointment.date).toLocaleDateString('fr-FR'),
            time: appointment.time
          });
        }
      }

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
      nouveau: { color: 'bg-blue-500 hover:bg-blue-600', text: 'Nouveau' },
      traité: { color: 'bg-yellow-500 hover:bg-yellow-600', text: 'Traité' },
      fermé: { color: 'bg-green-500 hover:bg-green-600', text: 'Fermé' },
      en_attente: { color: 'bg-orange-500 hover:bg-orange-600', text: 'En attente' },
      confirmé: { color: 'bg-green-500 hover:bg-green-600', text: 'Confirmé' },
      annulé: { color: 'bg-red-500 hover:bg-red-600', text: 'Annulé' },
      terminé: { color: 'bg-gray-500 hover:bg-gray-600', text: 'Terminé' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'bg-gray-500', text: status };

    return (
      <Badge className={`${config.color} text-white transition-colors`}>
        {config.text}
      </Badge>
    );
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.client_email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vilo-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Dashboard Admin
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Gérez vos contacts, rendez-vous et utilisateurs - Vilo Assist Pro
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              onClick={refreshData} 
              disabled={isRefreshing}
              variant="outline"
              className="border-vilo-purple-200 dark:border-vilo-purple-700 text-vilo-purple-600 dark:text-vilo-purple-400"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
            <Button 
              onClick={logout}
              variant="outline"
              className="border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 dark:bg-gray-800">
            <TabsTrigger value="contacts" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Contacts</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Rendez-vous</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Utilisateurs</span>
            </TabsTrigger>
          </TabsList>

          {/* Search and Filter - Only for contacts and appointments */}
          {activeTab !== 'users' && (
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher par nom, email ou service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('all')}
                  className="whitespace-nowrap"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Tous
                </Button>
                <Button
                  variant={statusFilter === 'nouveau' || statusFilter === 'en_attente' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter(activeTab === 'contacts' ? 'nouveau' : 'en_attente')}
                  className="whitespace-nowrap"
                >
                  En attente
                </Button>
                <Button
                  variant={statusFilter === 'traité' || statusFilter === 'confirmé' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter(activeTab === 'contacts' ? 'traité' : 'confirmé')}
                  className="whitespace-nowrap"
                >
                  Traités
                </Button>
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800 dark:text-gray-100">
                  <Mail className="w-5 h-5 mr-2" />
                  Demandes de Contact ({filteredContacts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredContacts.map((contact) => (
                    <div key={contact.id} className="border dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-700 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{contact.name}</h3>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mt-1">
                            <Mail className="w-4 h-4" />
                            <span>{contact.email}</span>
                          </div>
                          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1">{contact.service}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(contact.status)}
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(contact.created_at).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-600 p-3 rounded">
                        {contact.message}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {contact.status === 'nouveau' && (
                          <Button
                            size="sm"
                            onClick={() => updateContactStatus(contact.id, 'traité')}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Marquer comme traité
                          </Button>
                        )}
                        {contact.status === 'traité' && (
                          <Button
                            size="sm"
                            onClick={() => updateContactStatus(contact.id, 'fermé')}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Fermer
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => sendEmailConfirmation(contact.email, contact.name, 'contact', {
                            service: contact.service,
                            message: contact.message
                          })}
                          className="border-vilo-purple-300 text-vilo-purple-600 hover:bg-vilo-purple-50 dark:border-vilo-purple-400 dark:text-vilo-purple-400"
                        >
                          <Send className="w-4 h-4 mr-1" />
                          Envoyer email
                        </Button>
                      </div>
                    </div>
                  ))}
                  {filteredContacts.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      Aucun contact trouvé
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800 dark:text-gray-100">
                  <Calendar className="w-5 h-5 mr-2" />
                  Rendez-vous ({filteredAppointments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAppointments.map((appointment) => (
                    <div key={appointment.id} className="border dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-700 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg flex items-center text-gray-800 dark:text-gray-100">
                            <User className="w-4 h-4 mr-2" />
                            {appointment.client_name}
                          </h3>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mt-1">
                            <Mail className="w-4 h-4" />
                            <span>{appointment.client_email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium mt-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(appointment.date).toLocaleDateString('fr-FR')} à {appointment.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(appointment.status)}
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(appointment.created_at).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {appointment.status === 'en_attente' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => updateAppointmentStatus(appointment.id, 'confirmé')}
                              className="bg-green-500 hover:bg-green-600 text-white"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
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
                            className="bg-gray-500 hover:bg-gray-600 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Marquer comme terminé
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => sendEmailConfirmation(appointment.client_email, appointment.client_name, 'appointment', {
                            date: new Date(appointment.date).toLocaleDateString('fr-FR'),
                            time: appointment.time
                          })}
                          className="border-vilo-purple-300 text-vilo-purple-600 hover:bg-vilo-purple-50 dark:border-vilo-purple-400 dark:text-vilo-purple-400"
                        >
                          <Send className="w-4 h-4 mr-1" />
                          Envoyer email
                        </Button>
                      </div>
                    </div>
                  ))}
                  {filteredAppointments.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      Aucun rendez-vous trouvé
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Management Tab */}
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
