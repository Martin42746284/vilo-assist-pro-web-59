
import { useState } from 'react';
import { Calendar, Clock, User, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { toast } from '@/hooks/use-toast';

const AppointmentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      const formattedDate = selectedDate.toLocaleDateString('fr-FR');
      const message = `Bonjour, je souhaiterais prendre rendez-vous le ${formattedDate} à ${selectedTime}`;
      const phoneNumber = "261348901234"; // Remplacez par votre vrai numéro
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      
      toast({
        title: "Redirection vers WhatsApp",
        description: "Vous allez être redirigé vers WhatsApp pour confirmer votre rendez-vous.",
      });
      
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1000);
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

          {/* Créneaux horaires */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-vilo-purple-600" />
                Choisissez un horaire
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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

              {selectedDate && selectedTime && (
                <div className="mt-6 p-4 bg-vilo-purple-50 dark:bg-vilo-purple-900/20 rounded-lg border border-vilo-purple-200 dark:border-vilo-purple-700">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                    <span className="font-medium">Récapitulatif</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Rendez-vous le {selectedDate.toLocaleDateString('fr-FR')} à {selectedTime}
                  </p>
                  <Button 
                    onClick={handleBooking} 
                    className="w-full bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 transform hover:scale-105 transition-all duration-200"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Confirmer le rendez-vous
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
