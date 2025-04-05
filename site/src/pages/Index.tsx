import { useEffect } from 'react';
import { Helmet } from 'react-helmet'; // Added import for Helmet
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ShieldCheck, Star, Zap, Phone, Mail, MapPin } from 'lucide-react';
import Instagramfeed from '@/components/InstagramFeed';
import Vero from '@/components/Hero';

// Component definitions (already defined in your code):
const Hero = () => (
  <Vero/>
);

const ProductShowcase = () => (
  <section className="section-padding bg-secondary">
    <div className="container-luxury">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="heading-lg mb-4 slide-up">Nos Collections</h2>
        <p className="text-luxury-600 slide-up stagger-1">
          Découvrez notre sélection de rideaux et textiles d'ameublement de luxe, conçus pour sublimer votre intérieur.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Collection Premium */}
        <div className="group relative overflow-hidden rounded-sm slide-up">
          <div className="aspect-[4/5] overflow-hidden">
            <img 
              src="https://oehbiqlfllyxpueofuob.supabase.co/storage/v1/object/public/products//Design%20sans%20titre%20(12).png" 
              alt="Collection Premium"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-950/80 via-luxury-950/20 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-white text-xl font-serif font-medium mb-2">Collection Premium</h3>
            <p className="text-white/80 text-sm mb-4 max-w-xs">
              Des tissus nobles et des finitions impeccables pour un intérieur d'exception.
            </p>
            <Link 
              to="/products?category=premium" 
              className="inline-flex items-center text-white font-medium text-sm"
            >
              <span className="border-b border-white/30 hover:border-white transition-all">Découvrir</span>
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
        
        {/* Collection Classique */}
        <div className="group relative overflow-hidden rounded-sm slide-up stagger-1">
          <div className="aspect-[4/5] overflow-hidden">
            <img 
              src="https://oehbiqlfllyxpueofuob.supabase.co/storage/v1/object/public/products//Design%20sans%20titre%20(11).png" 
              alt="Collection Classique"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-950/80 via-luxury-950/20 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-white text-xl font-serif font-medium mb-2">Collection Classique</h3>
            <p className="text-white/80 text-sm mb-4 max-w-xs">
              L'élégance intemporelle pour tous les styles d'intérieur.
            </p>
            <Link 
              to="/products?category=classic" 
              className="inline-flex items-center text-white font-medium text-sm"
            >
              <span className="border-b border-white/30 hover:border-white transition-all">Découvrir</span>
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
        
        {/* Voilages */}
        <div className="group relative overflow-hidden rounded-sm slide-up stagger-2">
          <div className="aspect-[4/5] overflow-hidden">
            <img 
              src="https://oehbiqlfllyxpueofuob.supabase.co/storage/v1/object/public/products//Design%20sans%20titre%20(13).png" 
              alt="Voilages"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-950/80 via-luxury-950/20 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-white text-xl font-serif font-medium mb-2">Voilages</h3>
            <p className="text-white/80 text-sm mb-4 max-w-xs">
              Légèreté et élégance pour filtrer la lumière tout en préservant votre intimité.
            </p>
            <Link 
              to="/products?category=voilages" 
              className="inline-flex items-center text-white font-medium text-sm"
            >
              <span className="border-b border-white/30 hover:border-white transition-all">Découvrir</span>
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-12">
        <Link 
          to="/products" 
          className="btn-luxury-outline text-luxury-800 border-luxury-800 hover:bg-luxury-50"
        >
          Voir toutes nos collections
        </Link>
      </div>
    </div>
  </section>
);

const TestimonialSlider = () => (
  <section className="section-padding bg-luxury-50">
    <div className="container-luxury">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="heading-lg mb-4 slide-up">Ce que disent nos clients</h2>
        <p className="text-luxury-600 slide-up stagger-1">
          La satisfaction de nos clients est notre priorité. Découvrez leurs témoignages.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm slide-up stagger-2">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img 
                src="https://oehbiqlfllyxpueofuob.supabase.co/storage/v1/object/public/products//photo-1544005313-94ddf0286df2.avif"
                alt="Sarah Mansour"
                className="w-24 h-24 rounded-full object-cover mx-auto md:mx-0"
              />
            </div>
            <div className="md:w-2/3">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <blockquote className="text-luxury-800 text-lg italic mb-6">
                "J'ai fait appel à Bargaoui Rideaux pour l'aménagement de mon salon et je suis enchantée du résultat. Le conseil personnalisé, la qualité des tissus et la finition impeccable ont dépassé mes attentes."
              </blockquote>
              <div>
                <p className="font-medium text-luxury-900">Sarah Mansour</p>
                <p className="text-luxury-600 text-sm">Tunis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Additional components to complete the homepage:

const InstagramFeed = () => (
  <section className="section-padding bg-white">
    <div className="container-luxury">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="heading-lg mb-4 slide-up">Suivez-nous sur Instagram</h2>
        <p className="text-luxury-600 slide-up stagger-1">
          Découvrez nos dernières réalisations et inspirations sur notre compte Instagram.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <a 
            key={item} 
            href="https://www.instagram.com/bargaoui_rideaux_tahar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block aspect-square overflow-hidden group slide-up"
          >
            <img 
              src={`https://images.unsplash.com/photo-1616047006789-b7af5afb8c2${item}`} 
              alt={`Inspiration de rideaux ${item}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </a>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <a 
          href="https://www.instagram.com/bargaoui_rideaux_tahar" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-luxury-800 font-medium hover:text-luxury-600 transition-colors"
        >
          <span>@bargaoui_rideaux_tahar</span>
          <ArrowRight className="ml-2" size={16} />
        </a>
      </div>
    </div>
  </section>
);

const ContactCTA = () => (
  <section className="section-padding bg-luxury-900 text-white">
    <div className="container-luxury">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block px-4 py-1 border border-white/20 text-white/80 uppercase tracking-wider text-xs mb-6 slide-up">
            Contactez-nous
          </span>
          <h2 className="heading-lg text-white mb-6 slide-up stagger-1">
            Prêt à transformer <br/>votre intérieur?
          </h2>
          <p className="text-white/80 mb-8 slide-up stagger-2">
            Prenez rendez-vous pour une consultation personnalisée dans notre showroom ou à votre domicile. Nos experts vous aideront à créer des rideaux parfaitement adaptés à votre espace.
          </p>
          
          <ul className="space-y-4 mb-8 slide-up stagger-3">
            <li className="flex items-start">
              <Phone className="text-luxury-300 mr-3 flex-shrink-0 mt-1" size={18} />
              <div>
                <p className="font-medium">Appelez-nous</p>
                <a href="tel:+21650929292" className="text-white/80 hover:text-white transition-colors">
                  +216 50 92 92 92
                </a>
              </div>
            </li>
            <li className="flex items-start">
              <Mail className="text-luxury-300 mr-3 flex-shrink-0 mt-1" size={18} />
              <div>
                <p className="font-medium">Envoyez-nous un email</p>
                <a href="mailto:contact@bargaoui-rideaux.tn" className="text-white/80 hover:text-white transition-colors">
                  contact@bargaoui-rideaux.tn
                </a>
              </div>
            </li>
            <li className="flex items-start">
              <MapPin className="text-luxury-300 mr-3 flex-shrink-0 mt-1" size={18} />
              <div>
                <p className="font-medium">Visitez notre showroom</p>
                <p className="text-white/80">
                  1143 Avenue UMA La Soukra, Ariana 2036
                </p>
              </div>
            </li>
          </ul>
          
          <div className="flex flex-col sm:flex-row gap-4 slide-up stagger-4">
            <Link 
              to="/contact" 
              className="btn-luxury bg-white text-luxury-900 hover:bg-white/90"
            >
              Demander un rendez-vous
            </Link>
            <Link 
              to="/about" 
              className="btn-luxury-outline text-white border-white hover:bg-white/10"
            >
              En savoir plus
            </Link>
          </div>
        </div>
        
        <div className="relative hidden lg:block">
          <div className="aspect-[4/5] overflow-hidden rounded-sm slide-up stagger-5">
            <img 
              src="https://oehbiqlfllyxpueofuob.supabase.co/storage/v1/object/public/products//showrom.jpg" 
              alt="Notre showroom"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-sm shadow-lg slide-up stagger-6">
            <p className="font-serif italic text-luxury-800">
              "Notre mission est de créer des espaces qui vous ressemblent."
            </p>
            <p className="text-luxury-600 text-sm mt-2">
              - Tahar Bargaoui, Fondateur
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// FAQ Section
const FAQSection = () => (
  <section className="section-padding bg-luxury-50">
    <div className="container-luxury">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="heading-lg mb-4 slide-up">Questions fréquentes</h2>
        <p className="text-luxury-600 slide-up stagger-1">
          Tout ce que vous devez savoir sur nos produits et services.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto divide-y divide-luxury-200">
        {[
          {
            question: "Comment se déroule une commande de rideaux sur mesure ?",
            answer: "Le processus commence par une consultation où nous discutons de vos besoins et préférences. Nous prenons ensuite les mesures précises de vos fenêtres, vous présentons une sélection de tissus et options de confection. Une fois votre choix finalisé, nous produisons vos rideaux et procédons à l'installation par notre équipe professionnelle."
          },
          {
            question: "Quel est le délai de livraison pour des rideaux sur mesure ?",
            answer: "Le délai de fabrication varie généralement entre 2 et 4 semaines selon la complexité du projet et la disponibilité des tissus. Nous vous informons du délai précis lors de la validation de votre commande."
          },
          {
            question: "Proposez-vous un service d'installation ?",
            answer: "Oui, nous offrons un service d'installation complet par notre équipe de professionnels. Ce service inclut la fixation des tringles, l'installation des rideaux et les ajustements nécessaires pour un résultat parfait."
          },
          {
            question: "Comment entretenir mes rideaux ?",
            answer: "Les instructions d'entretien varient selon le type de tissu. Nous fournissons avec chaque commande une fiche détaillée d'entretien. En général, nous recommandons un nettoyage professionnel pour préserver la qualité et la durabilité de vos rideaux de luxe."
          }
        ].map((faq, index) => (
          <div key={index} className="py-6 slide-up">
            <h3 className="text-lg font-medium text-luxury-900 mb-3">{faq.question}</h3>
            <p className="text-luxury-600">{faq.answer}</p>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12 slide-up">
        <Link 
          to="/faq" 
          className="inline-flex items-center text-luxury-800 font-medium hover:text-luxury-600 transition-colors"
        >
          <span>Voir toutes les questions fréquentes</span>
          <ArrowRight className="ml-2" size={16} />
        </Link>
      </div>
    </div>
  </section>
);

const Index = () => {
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

  // Schema for the Home page
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Bargaoui Rideaux Tahar",
    "description": "Créateur de rideaux et textiles d'ameublement de luxe sur mesure depuis 1998. Qualité, élégance et savoir-faire artisanal tunisien.",
    "image": "https://bargaoui-rideauxtahar.netlify.app/LOGO NOIR.png",
    "url": "https://bargaoui-rideauxtahar.netlify.app/",
    "telephone": "+216 50 92 92 92",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1143 Avenue UMA La Soukra",
      "addressLocality": "Ariana",
      "postalCode": "2036",
      "addressCountry": "TN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.8065,
      "longitude": 10.1815
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "09:00",
        "closes": "13:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/Bargaoui.Rideaux.Tahar",
      "https://www.instagram.com/bargaoui_rideaux_tahar"
    ]
  };

  return (
    <main>
      <Helmet>
        <title>Bargaoui Rideaux Tahar - Créateur de Rideaux de Luxe en Tunisie depuis 1998</title>
        <meta name="description" content="Bargaoui Rideaux Tahar, spécialiste des rideaux et textiles d'ameublement de luxe sur mesure depuis 1998. Qualité exceptionnelle, élégance et savoir-faire artisanal tunisien pour votre décoration intérieure." />
        <meta name="keywords" content="Bargaoui Rideaux, Bargaoui Rideaux Tahar, rideaux de luxe, textiles d'ameublement, rideaux sur mesure, voilage, décoration intérieure, Tunisie, rideaux Tunisie, ameublement Tunisie, rideaux haut de gamme" />
        <link rel="canonical" href="https://bargaoui-rideauxtahar.netlify.app/" />
        <script type="application/ld+json">
          {JSON.stringify(homeSchema)}
        </script>
      </Helmet>

      <Hero />
      
      {/* Features section */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="heading-lg mb-4">Pourquoi nous choisir</h2>
            <p className="text-luxury-600">
              Bargaoui Rideaux vous propose une expérience unique et un savoir-faire inégalé dans le domaine des rideaux de luxe.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass p-8 rounded-sm slide-up">
              <div className="bg-luxury-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Star className="text-luxury-800" size={24} />
              </div>
              <h3 className="heading-sm mb-4">Qualité Premium</h3>
              <p className="text-luxury-600 mb-6">
                Nous sélectionnons les tissus les plus nobles et utilisons des techniques de confection précises pour garantir des produits d'exception.
              </p>
              <ul className="space-y-3">
                {['Tissus haut de gamme', 'Finitions impeccables', 'Durabilité exceptionnelle'].map((item, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="text-luxury-800 mr-2 flex-shrink-0" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Feature 2 */}
            <div className="glass p-8 rounded-sm slide-up stagger-2">
              <div className="bg-luxury-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Zap className="text-luxury-800" size={24} />
              </div>
              <h3 className="heading-sm mb-4">Sur Mesure</h3>
              <p className="text-luxury-600 mb-6">
                Chaque projet est unique. Nous concevons des solutions personnalisées qui s'adaptent parfaitement à votre intérieur.
              </p>
              <ul className="space-y-3">
                {['Design personnalisé', 'Prise de mesures précise', 'Adaptation à vos besoins'].map((item, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="text-luxury-800 mr-2 flex-shrink-0" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Feature 3 */}
            <div className="glass p-8 rounded-sm slide-up stagger-3">
              <div className="bg-luxury-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="text-luxury-800" size={24} />
              </div>
              <h3 className="heading-sm mb-4">Service Complet</h3>
              <p className="text-luxury-600 mb-6">
                De la conception à l'installation, nous vous accompagnons à chaque étape pour vous garantir une satisfaction totale.
              </p>
              <ul className="space-y-3">
                {['Conseil personnalisé', 'Installation professionnelle', 'Service après-vente'].map((item, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="text-luxury-800 mr-2 flex-shrink-0" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <ProductShowcase />
      
      {/* About section */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-block px-4 py-1 border border-luxury-200 text-luxury-600 uppercase tracking-wider text-xs mb-6 slide-up">
                Notre histoire
              </span>
              <h2 className="heading-lg mb-6 slide-up stagger-1">
                Une passion familiale <br/>depuis 1998
              </h2>
              <p className="text-luxury-600 mb-6 slide-up stagger-2">
                Fondée par Tahar Bargaoui, notre maison perpétue la tradition et le savoir-faire artisanal tunisien dans la création de rideaux et textiles d'ameublement de luxe.
              </p>
              <p className="text-luxury-600 mb-8 slide-up stagger-3">
                Chaque création est le fruit d'une expertise transmise de génération en génération, associée à une vision contemporaine de l'élégance et du raffinement.
              </p>
              <Link 
                to="/about" 
                className="btn-luxury-outline text-luxury-800 border-luxury-800 hover:bg-luxury-50 slide-up stagger-4"
              >
                Découvrir notre histoire
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-sm slide-up">
                  <img 
                    src="https://oehbiqlfllyxpueofuob.supabase.co/storage/v1/object/public/products//Design%20sans%20titre%20(15).png" 
                    alt="Atelier Bargaoui Rideaux"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-luxury-100 rounded-full flex items-center justify-center p-6 text-center slide-up stagger-1">
                  <div>
                    <p className="text-4xl font-serif text-luxury-800 mb-1">25+</p>
                    <p className="text-luxury-600 text-sm">ans d'expertise</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <TestimonialSlider />
    
      <FAQSection />
      <Instagramfeed />
      <ContactCTA />
    </main>
  );
};

export default Index;


