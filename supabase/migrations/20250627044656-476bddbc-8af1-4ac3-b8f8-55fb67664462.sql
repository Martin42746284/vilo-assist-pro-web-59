
-- Améliorer la table testimonials pour supporter les nouveaux champs
ALTER TABLE testimonials 
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS domain TEXT,
ADD COLUMN IF NOT EXISTS service TEXT,
ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Créer une table pour la galerie de projets
CREATE TABLE IF NOT EXISTS project_gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  before_image_url TEXT,
  after_image_url TEXT,
  category TEXT NOT NULL,
  client_name TEXT,
  completion_date DATE,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Créer une table pour les langues/traductions
CREATE TABLE IF NOT EXISTS translations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL,
  language TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(key, language)
);

-- Ajouter des politiques RLS pour project_gallery
ALTER TABLE project_gallery ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre à tous de voir les projets publiés
CREATE POLICY "Anyone can view published projects" 
  ON project_gallery 
  FOR SELECT 
  USING (true);

-- Politique pour permettre aux admins de gérer les projets
CREATE POLICY "Admins can manage projects" 
  ON project_gallery 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Ajouter des politiques RLS pour translations
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view translations" 
  ON translations 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage translations" 
  ON translations 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Modifier les politiques des témoignages pour permettre aux utilisateurs authentifiés de créer des témoignages
CREATE POLICY "Authenticated users can create testimonials" 
  ON testimonials 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Politique pour permettre aux admins de publier des témoignages
CREATE POLICY "Admins can update testimonials" 
  ON testimonials 
  FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Insérer quelques traductions de base
INSERT INTO translations (key, language, value) VALUES
('welcome.title', 'fr', 'Bienvenue chez VILO ASSIST-PRO'),
('welcome.title', 'mg', 'Tongasoa eto amin''ny VILO ASSIST-PRO'),
('welcome.subtitle', 'fr', 'Votre partenaire de confiance pour l''assistance virtuelle professionnelle'),
('welcome.subtitle', 'mg', 'Mpiara-miasa mahatoky ho an''ny fanampiana virtoaly matihanina'),
('services.title', 'fr', 'Nos Services'),
('services.title', 'mg', 'Ireo Serivisy Nataonay'),
('contact.title', 'fr', 'Contactez-nous'),
('contact.title', 'mg', 'Mifandraisa aminay')
ON CONFLICT (key, language) DO NOTHING;
