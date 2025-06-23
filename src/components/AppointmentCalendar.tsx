
import { useState } from 'react';
import { Calendar, Clock, User, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useAppointments } from '@/hooks/useAppointments';

const AppointmentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const { submitAppointment, isLoading } = useAppointments();

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleBooking = async () => {
    if (selectedDate && selectedTime && clientName && clientEmail) {
      const appointmentData = {
        client_name: clientName,
        client_email: clientEmail,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime
      };

      const result = await submitAppointment(appointmentData);
      
      if (result.success) {
        // Réinitialiser le formulaire
        setClientName('');
        setClientEmail('');
        setSelectedTime('');
        setSelectedDate(new Date());
      }
    }
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0 || date.getDay() === 6;
  };

  return (
    <section id="appointment" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent mb-4">
            Prenez rendez-vous
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Réservez directement un créneau pour discuter de vos besoins
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Calendrier */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-vilo-purple-600" />
                Choisissez une date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={isDateDisabled}
                className="rounded-md border"
              />
              <p className="text-sm text-gray-500 mt-2">
                Du lundi au vendredi uniquement
              </p>
            </CardContent>
          </Card>

          {/* Créneaux horaires et informations client */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-vilo-purple-600" />
                Informations de rendez-vous
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Informations client */}
              <div className="space-y-3">
                <div>
                  <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nom complet *
                  </label>
                  <input
                    id="clientName"
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Votre nom complet"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vilo-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    id="clientEmail"
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vilo-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              {/* Créneaux horaires */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Choisissez un horaire *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => setSelectedTime(time)}
                      className={`transition-all duration-200 ${
                        selectedTime === time 
                          ? "bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 transform scale-105" 
                          : "hover:scale-105"
                      }`}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              {selectedDate && selectedTime && clientName && clientEmail && (
                <div className="mt-6 p-4 bg-vilo-purple-50 dark:bg-vilo-purple-900/20 rounded-lg border border-vilo-purple-200 dark:border-vilo-purple-700">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                    <span className="font-medium">Récapitulatif</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Client :</strong> {clientName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Email :</strong> {clientEmail}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <strong>Rendez-vous :</strong> {selectedDate.toLocaleDateString('fr-FR')} à {selectedTime}
                  </p>
                  <Button 
                    onClick={handleBooking}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 transform hover:scale-105 transition-all duration-200"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {isLoading ? 'Enregistrement...' : 'Confirmer le rendez-vous'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AppointmentCalendar;
