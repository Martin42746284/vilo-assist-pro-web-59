
export interface Contact {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  status: 'nouveau' | 'traité' | 'fermé';
  created_at: string;
}

export interface Appointment {
  id: string;
  client_name: string;
  client_email: string;
  date: string;
  time: string;
  status: 'en_attente' | 'confirmé' | 'annulé' | 'terminé';
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  commentaire: string;
  note: string;
  date: string;
  created_at: string;
}

export type ContactFormData = Omit<Contact, 'id' | 'created_at' | 'status'>;
export type AppointmentFormData = Omit<Appointment, 'id' | 'created_at' | 'status'>;
