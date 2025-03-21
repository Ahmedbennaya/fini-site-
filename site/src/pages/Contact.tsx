
import { useEffect } from 'react';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with animation classes
    document.querySelectorAll('.slide-up, .fade-in').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-luxury-950/40 mix-blend-multiply z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop" 
            alt="Contact Bargaoui Rideaux"
            className="object-cover object-center w-full h-full"
          />
        </div>
        
        <div className="container-luxury relative z-20">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 border border-white/20 text-white/80 uppercase tracking-wider text-xs mb-6 slide-up">
              Nous contacter
            </span>
            <h1 className="heading-xl text-white mb-6 slide-up stagger-1">
              Parlons de votre projet
            </h1>
            <p className="text-white/90 text-lg mb-10 max-w-xl slide-up stagger-2">
              Notre équipe est à votre disposition pour répondre à vos questions et vous accompagner dans votre projet.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="heading-lg mb-10 slide-up">Contactez-nous</h2>
              
              <div className="space-y-8 mb-10">
                <div className="flex items-start slide-up stagger-1">
                  <div className="bg-luxury-100 w-12 h-12 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <MapPin className="text-luxury-800" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Notre showroom</h3>
                    <p className="text-luxury-600">
                      1143 Avenue UMA La Soukra<br />
                      Ariana, Tunisia
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start slide-up stagger-2">
                  <div className="bg-luxury-100 w-12 h-12 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <Phone className="text-luxury-800" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Téléphone</h3>
                    <p className="text-luxury-600">
                      <a href="tel:+21671123456" className="hover:text-luxury-800 transition-colors">
                        +216 50 92 92 92
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start slide-up stagger-3">
                  <div className="bg-luxury-100 w-12 h-12 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <Mail className="text-luxury-800" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Email</h3>
                    <p className="text-luxury-600">
                      <a href="mailto:contact@bargaouirideaux.com" className="hover:text-luxury-800 transition-colors">
                      bargaoui_rideaux@yahoo.fr
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start slide-up stagger-4">
                  <div className="bg-luxury-100 w-12 h-12 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <Clock className="text-luxury-800" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Horaires d'ouverture</h3>
                    <p className="text-luxury-600">
                      Lundi - Vendredi: 9h00 - 19h00<br />
                      Samedi: 9h00 - 19h00<br />
                      Dimanche: Fermé
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="slide-up stagger-5">
                <h3 className="heading-sm mb-4">Suivez-nous</h3>
                <div className="flex space-x-4">
                  {['facebook', 'instagram', 'linkedin'].map((social) => (
                    <a 
                      key={social}
                      href={`https://${social}.com`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-luxury-100 w-12 h-12 rounded-full flex items-center justify-center text-luxury-800 hover:bg-luxury-200 transition-colors"
                    >
                      <img 
                        src={`https://cdn.simpleicons.org/${social}/5a5345`} 
                        alt={social} 
                        className="w-5 h-5"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="slide-up stagger-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative h-[500px] overflow-hidden">
      <div className="absolute inset-0 z-0">
  {/* Embedded Google Map */}
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317258.4390338837!2d10.073237618520994!3d36.80649475947616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd337bfe1c73d5%3A0x2e3e84c5b6f5b3e7!2sBargaoui%20Rideaux!5e0!3m2!1sen!2stn!4v1712345678901"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="w-full h-full object-cover"
  />
</div>

        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 p-8 glass rounded-sm max-w-md w-full slide-up">
          <h3 className="heading-md mb-4 text-luxury-900">Venez nous rendre visite</h3>
          <p className="text-luxury-600 mb-6">
            Notre showroom est situé au cœur de Tunis. Venez découvrir nos collections et discuter de votre projet avec nos experts.
          </p>
          <a 
            href="https://linktr.ee/Bargaoui_Rideaux_Tahar" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-luxury-outline w-full flex justify-center"
          >
            Voir sur Google Maps
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-secondary">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="heading-lg mb-4 slide-up">Questions fréquentes</h2>
            <p className="text-luxury-600 slide-up stagger-1">
              Nous avons rassemblé les réponses aux questions les plus fréquemment posées par nos clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-sm shadow-sm slide-up"
                style={{ transitionDelay: `${(index * 0.1) + 0.2}s` }}
              >
                <h3 className="heading-sm mb-4">{faq.question}</h3>
                <p className="text-luxury-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

// Mock FAQ data
const faqs = [
  {
    question: "Comment se déroule une consultation à domicile ?",
    answer: "Nos experts se déplacent chez vous pour évaluer vos besoins, prendre les mesures exactes et vous présenter des échantillons de tissus. Ce service est gratuit et sans engagement."
  },
  {
    question: "Quel est le délai de fabrication et de livraison ?",
    answer: "Le délai varie selon la complexité du projet et les matériaux choisis. En général, comptez entre 2 et 4 semaines pour des rideaux sur mesure, et 1 à 2 semaines pour des produits standards."
  },
  {
    question: "Proposez-vous un service d'installation ?",
    answer: "Oui, nos équipes professionnelles peuvent installer vos rideaux pour garantir un résultat parfait. Ce service est disponible sur devis."
  },
  {
    question: "Quelles sont les méthodes de paiement acceptées ?",
    answer: "Nous acceptons les paiements par carte bancaire, virement bancaire et espèces. Un acompte de 50% est demandé à la commande, le solde étant payable à la livraison."
  }
];

export default Contact;
