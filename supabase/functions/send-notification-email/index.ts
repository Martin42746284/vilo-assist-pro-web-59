// supabase/functions/send-notification-email/index.ts
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

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
  type: 'contact' | 'appointment' | 'appointment_confirmed' | 'appointment_completed';
  data?: {
    service?: string;
    message?: string;
    date?: string;
    time?: string;
    [key: string]: any;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, name, type, data }: EmailRequest = await req.json();

    // Validation
    if (!to || !name || !type) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: to, name, type" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    let subject = "";
    let html = "";

    switch (type) {
      case 'contact':
        subject = "Merci pour votre demande - Vilo Assist Pro";
        html = generateContactEmail(name, data);
        break;
      
      case 'appointment':
        subject = "Confirmation de votre rendez-vous - Vilo Assist Pro";
        html = generateAppointmentEmail(name, data);
        break;
      
      case 'appointment_confirmed':
        subject = "✅ Rendez-vous confirmé - Vilo Assist Pro";
        html = generateConfirmedEmail(name, data);
        break;
      
      case 'appointment_completed':
        subject = "🎉 Merci pour votre confiance - Vilo Assist Pro";
        html = generateCompletedEmail(name, data);
        break;
      
      default:
        return new Response(
          JSON.stringify({ error: "Invalid email type" }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
    }

    const emailResponse = await resend.emails.send({
      from: "Vilo Assist Pro <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      html: html,
    });

    console.log(`Email ${type} envoyé avec succès:`, emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

// Template functions
function generateContactEmail(name: string, data: any): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Vilo Assist Pro</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Votre assistant virtuel professionnel</p>
      </div>
      
      <div style="padding: 30px; background: white;">
        <h2 style="color: #374151; margin-bottom: 20px;">Bonjour ${name} !</h2>
        
        <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
          Nous avons bien reçu votre demande concernant <strong>${data?.service || 'nos services'}</strong>. 
          Merci de nous faire confiance pour vos besoins d'assistance virtuelle.
        </p>
        
        <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Votre demande :</h3>
          <p style="color: #6B7280; margin: 0;">${data?.message || 'Demande reçue'}</p>
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
}

function generateAppointmentEmail(name: string, data: any): string {
  return `
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
          <p style="margin: 5px 0; color: #374151;"><strong>Date :</strong> ${data?.date || 'À confirmer'}</p>
          <p style="margin: 5px 0; color: #374151;"><strong>Heure :</strong> ${data?.time || 'À confirmer'}</p>
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

function generateConfirmedEmail(name: string, data: any): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">✅ Rendez-vous Confirmé</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Vilo Assist Pro</p>
      </div>
      
      <div style="padding: 30px; background: white;">
        <h2 style="color: #374151; margin-bottom: 20px;">Excellente nouvelle ${name} !</h2>
        
        <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
          Votre rendez-vous est maintenant <strong style="color: #10B981;">officiellement confirmé</strong>. 
          Nous avons hâte de vous rencontrer et de discuter de vos projets !
        </p>
        
        <div style="background: #ECFDF5; border-left: 4px solid #10B981; padding: 20px; margin: 20px 0;">
          <h3 style="color: #065F46; margin-top: 0;">📅 Détails confirmés</h3>
          <p style="margin: 5px 0; color: #374151;"><strong>Date :</strong> ${data?.date || 'À confirmer'}</p>
          <p style="margin: 5px 0; color: #374151;"><strong>Heure :</strong> ${data?.time || 'À confirmer'}</p>
          <p style="margin: 5px 0; color: #10B981; font-weight: bold;">✅ Statut : CONFIRMÉ</p>
        </div>
        
        <div style="background: #FEF3C7; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p style="color: #92400E; margin: 0; font-size: 14px;">
            <strong>📋 À prévoir :</strong>
          </p>
          <ul style="color: #92400E; margin: 10px 0 0 0; padding-left: 20px;">
            <li>Votre liste de besoins et objectifs</li>
            <li>Questions spécifiques sur nos services</li>
            <li>Budget approximatif si disponible</li>
          </ul>
        </div>
        
        <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
          Un rappel vous sera envoyé la veille de notre rendez-vous. En cas d'imprévu, n'hésitez pas à nous contacter au plus tôt.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://wa.me/261348901234" 
             style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); 
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
}

function generateCompletedEmail(name: string, data: any): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Rendez-vous Terminé</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Merci pour votre confiance !</p>
      </div>
      
      <div style="padding: 30px; background: white;">
        <h2 style="color: #374151; margin-bottom: 20px;">Merci ${name} !</h2>
        
        <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
          Notre rendez-vous du <strong>${data?.date || 'récent'} à ${data?.time || ''}</strong> s'est parfaitement déroulé. 
          Merci pour le temps que vous nous avez accordé et pour votre confiance.
        </p>
        
        <div style="background: #F0F9FF; border-left: 4px solid #3B82F6; padding: 20px; margin: 20px 0;">
          <h3 style="color: #1E40AF; margin-top: 0;">📋 Récapitulatif</h3>
          <p style="margin: 5px 0; color: #374151;"><strong>Date :</strong> ${data?.date || 'Récent'}</p>
          <p style="margin: 5px 0; color: #374151;"><strong>Heure :</strong> ${data?.time || 'N/A'}</p>
          <p style="margin: 5px 0; color: #10B981; font-weight: bold;">✅ Statut : TERMINÉ</p>
        </div>
        
        <div style="background: #ECFDF5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #065F46; margin-top: 0;">🚀 Prochaines étapes</h3>
          <p style="color: #374151; margin: 10px 0;">
            Comme convenu lors de notre échange, nous vous ferons parvenir :
          </p>
          <ul style="color: #374151; margin: 10px 0; padding-left: 20px;">
            <li>Le devis détaillé sous 48h</li>
            <li>La proposition de planning</li>
            <li>Les documents de démarrage si applicable</li>
          </ul>
        </div>
        
        <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
          Nous restons à votre disposition pour toute question complémentaire. 
          N'hésitez pas à nous contacter à tout moment !
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://wa.me/261348901234" 
             style="background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); 
                    color: white; text-decoration: none; padding: 12px 30px; 
                    border-radius: 6px; font-weight: bold; display: inline-block;">
            Rester en contact
          </a>
        </div>
        
        <div style="background: #FEF3C7; padding: 15px; border-radius: 6px; margin: 20px 0; text-align: center;">
          <p style="color: #92400E; margin: 0; font-size: 14px;">
            <strong>⭐ Votre avis compte !</strong><br>
            N'hésitez pas à nous faire un retour sur notre échange
          </p>
        </div>
        
        <p style="color: #9CA3AF; font-size: 14px; text-align: center; margin-top: 30px;">
          Vilo Assist Pro - Votre succès, notre mission<br>
          Email: contact@viloassistpro.com
        </p>
      </div>
    </div>
  `;
}

serve(handler);