
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  name: string;
  type: 'contact' | 'appointment';
  data?: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, name, type, data }: EmailRequest = await req.json();

    let subject = "";
    let html = "";

    if (type === 'contact') {
      subject = "Merci pour votre demande - Vilo Assist Pro";
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Vilo Assist Pro</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Votre assistant virtuel professionnel</p>
          </div>
          
          <div style="padding: 30px; background: white;">
            <h2 style="color: #374151; margin-bottom: 20px;">Bonjour ${name} !</h2>
            
            <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
              Nous avons bien reçu votre demande concernant <strong>${data?.service}</strong>. 
              Merci de nous faire confiance pour vos besoins d'assistance virtuelle.
            </p>
            
            <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Votre demande :</h3>
              <p style="color: #6B7280; margin: 0;">${data?.message}</p>
            </div>
            
            <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
              <strong>Notre engagement :</strong> Nous vous répondrons dans les <span style="color: #8B5CF6; font-weight: bold;">24 heures</span> 
              avec un devis personnalisé et gratuit.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://wa.me/261348901234" 
                 style="background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); 
                        color: white; text-decoration: none; padding: 12px 30px; 
                        border-radius: 6px; font-weight: bold; display: inline-block;">
                Nous contacter sur WhatsApp
              </a>
            </div>
            
            <p style="color: #9CA3AF; font-size: 14px; text-align: center; margin-top: 30px;">
              Vilo Assist Pro - Votre succès, notre mission<br>
              Email: contact@viloassistpro.com
            </p>
          </div>
        </div>
      `;
    } else if (type === 'appointment') {
      subject = "Confirmation de votre rendez-vous - Vilo Assist Pro";
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Vilo Assist Pro</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Rendez-vous confirmé</p>
          </div>
          
          <div style="padding: 30px; background: white;">
            <h2 style="color: #374151; margin-bottom: 20px;">Bonjour ${name} !</h2>
            
            <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
              Votre rendez-vous a été enregistré avec succès. Nous vous confirmerons le créneau très bientôt.
            </p>
            
            <div style="background: #F0F9FF; border-left: 4px solid #3B82F6; padding: 20px; margin: 20px 0;">
              <h3 style="color: #1E40AF; margin-top: 0;">Détails du rendez-vous</h3>
              <p style="margin: 5px 0; color: #374151;"><strong>Date :</strong> ${data?.date}</p>
              <p style="margin: 5px 0; color: #374151;"><strong>Heure :</strong> ${data?.time}</p>
              <p style="margin: 5px 0; color: #374151;"><strong>Statut :</strong> En attente de confirmation</p>
            </div>
            
            <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
              Nous vous contacterons prochainement pour confirmer définitivement ce créneau et préparer notre entretien.
            </p>
            
            <div style="background: #FEF3C7; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <p style="color: #92400E; margin: 0; font-size: 14px;">
                <strong>💡 Conseil :</strong> Préparez vos questions et besoins spécifiques pour optimiser notre temps d'échange.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://wa.me/261348901234" 
                 style="background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); 
                        color: white; text-decoration: none; padding: 12px 30px; 
                        border-radius: 6px; font-weight: bold; display: inline-block;">
                Questions ? Contactez-nous
              </a>
            </div>
            
            <p style="color: #9CA3AF; font-size: 14px; text-align: center; margin-top: 30px;">
              Vilo Assist Pro - Votre succès, notre mission<br>
              Email: contact@viloassistpro.com
            </p>
          </div>
        </div>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "Vilo Assist Pro <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      html: html,
    });

    console.log("Email envoyé avec succès:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
