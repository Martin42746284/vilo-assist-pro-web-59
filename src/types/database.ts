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
  avatar_url?: string | null;
  domain?: string | null;
  service?: string | null;
  is_published?: boolean | null;
  status?: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'user';
  created_at: string;
}

export interface ProjectGallery {
  id: string;
  title: string;
  description: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  category: string;
  client_name: string | null;
  completion_date: string | null;
  is_featured: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface Translation {
  id: string;
  key: string;
  language: string;
  value: string;
  created_at: string;
}

export type ContactFormData = Omit<Contact, 'id' | 'created_at' | 'status'>;
export type AppointmentFormData = Omit<Appointment, 'id' | 'created_at' | 'status'>;
export type ProfileFormData = Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
export type ProjectGalleryFormData = Omit<ProjectGallery, 'id' | 'created_at' | 'updated_at'>;
export type TranslationFormData = Omit<Translation, 'id' | 'created_at'>;
