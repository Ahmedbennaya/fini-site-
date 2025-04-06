import { useState, FormEvent } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ContactForm = ({ minimal = false }: { minimal?: boolean }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if the user is logged in
      const { data: user } = await supabase.auth.getUser();

      if (!user) {
        // Show toast if the user is not logged in
        toast({
          title: 'Connexion requise',
          description: 'Vous devez vous connecter pour envoyer un message.',
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }

      // Insert data into the Supabase `messages` table
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
          },
        ]);

      if (error) {
        throw new Error('Failed to send message');
      }

      toast({
        title: 'Message envoyé',
        description: 'Nous vous répondrons dans les plus brefs délais.',
        duration: 5000,
      });

      setSubmitted(true);

      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={minimal ? '' : 'glass p-8 rounded-sm'}>
      {!minimal && (
        <div className="mb-8">
          <h3 className="heading-md mb-4">Contactez-nous</h3>
          <p className="text-luxury-600">
            Nous sommes à votre disposition pour répondre à vos questions et vous accompagner dans votre projet.
          </p>
        </div>
      )}

      {submitted ? (
        <div className="text-center py-12">
          <CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} />
          <h3 className="heading-sm mb-2">Message envoyé !</h3>
          <p className="text-luxury-600">
            Merci de nous avoir contacté. Notre équipe vous répondra dans les plus brefs délais.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-luxury-800 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-luxury-200 rounded-sm focus:ring-1 focus:ring-luxury-500 focus:border-luxury-500 transition-all"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-luxury-800 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-luxury-200 rounded-sm focus:ring-1 focus:ring-luxury-500 focus:border-luxury-500 transition-all"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-luxury-800 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-luxury-200 rounded-sm focus:ring-1 focus:ring-luxury-500 focus:border-luxury-500 transition-all"
                placeholder="Votre numéro de téléphone"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-luxury-800 mb-1">
                Sujet
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-luxury-200 rounded-sm focus:ring-1 focus:ring-luxury-500 focus:border-luxury-500 transition-all"
              >
                <option value="" disabled>
                  Sélectionnez un sujet
                </option>
                <option value="devis">Demande de devis</option>
                <option value="information">Demande d'information</option>
                <option value="rendez-vous">Prise de rendez-vous</option>
                <option value="autre">Autre</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-luxury-800 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border border-luxury-200 rounded-sm focus:ring-1 focus:ring-luxury-500 focus:border-luxury-500 transition-all resize-none"
              placeholder="Votre message..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn-luxury w-full flex items-center justify-center ${isSubmitting ? 'opacity-80' : ''}`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Envoi en cours...
              </>
            ) : (
              <>
                Envoyer <Send size={16} className="ml-2" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
