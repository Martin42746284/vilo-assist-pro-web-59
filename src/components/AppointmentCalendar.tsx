
import { useState } from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

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
      const whatsappUrl = `https://wa.me/YOUR_PHONE_NUMBER?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
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
          <Card>
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
                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Créneaux horaires */}
          <Card>
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
                    className={selectedTime === time ? "bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600" : ""}
                  >
                    {time}
                  </Button>
                ))}
              </div>

              {selectedDate && selectedTime && (
                <div className="mt-6 p-4 bg-vilo-purple-50 dark:bg-vilo-purple-900/20 rounded-lg">
                  <div className="flex items-center mb-3">
                    <User className="w-5 h-5 mr-2 text-vilo-purple-600" />
                    <span className="font-medium">Récapitulatif</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Rendez-vous le {selectedDate.toLocaleDateString('fr-FR')} à {selectedTime}
                  </p>
                  <Button onClick={handleBooking} className="w-full bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600">
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
