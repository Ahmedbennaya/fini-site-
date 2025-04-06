import { useEffect } from 'react';
import SEO from '@/components/SEO'; // Import the SEO component
import { ArrowRight, Award, Users, History, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
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

  // Timeline data
  const timeline = [
    {
      year: '1949',
      title: 'Fondation',
      description: 'Création de Bargaoui Rideaux par Mohamed Bargaoui, entrepreneur passionné par les textiles et la décoration d\'intérieur.'
    },
    {
      year: '2005',
      title: 'Expansion',
      description: 'Ouverture du premier showroom à Tunis et développement de collections exclusives pour une clientèle exigeante.'
    },
    {
      year: '2012',
      title: 'Innovation',
      description: 'Introduction de techniques modernes et de nouveaux matériaux tout en préservant le savoir-faire artisanal.'
    },
    {
      year: '2018',
      title: 'Excellence',
      description: 'Reconnaissance nationale et internationale pour la qualité exceptionnelle et le design innovant de nos créations.'
    },
    {
      year: 'Aujourd\'hui',
      title: 'Héritage',
      description: 'Perpétuation de l\'excellence et du savoir-faire transmis de génération en génération.'
    }
  ];

  // Schema for the About page
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Bargaoui Rideaux Tahar",
      "description": "Créateur de rideaux et textiles d'ameublement de luxe sur mesure depuis 1998. Qualité, élégance et savoir-faire artisanal tunisien.",
      "image": "https://bargaoui-rideauxtahar.netlify.app/LOGO NOIR.png",
      "url": "https://bargaoui-rideauxtahar.netlify.app/about",
      "foundingDate": "1998",
      "founder": {
        "@type": "Person",
        "name": "Tahar Bargaoui"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Avenue Habib Bourguiba",
        "addressLocality": "Tunis",
        "addressRegion": "Tunis",
        "postalCode": "1000",
        "addressCountry": "TN"
      }
    }
  };

  return (
    <main>
      {/* SEO Component */}
      <SEO
        title="À Propos de Bargaoui Rideaux Tahar | Notre Histoire et Valeurs"
        description="Découvrez l'histoire de Bargaoui Rideaux Tahar, créateur tunisien de rideaux de luxe depuis 1998. Notre passion, nos valeurs et notre savoir-faire artisanal au service de votre intérieur."
        keywords="Bargaoui Rideaux, histoire, savoir-faire, rideaux sur mesure, artisanat tunisien, textile de luxe, Tunisie"
        canonicalUrl="/about"
        schemaData={aboutSchema}
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-luxury-950/40 mix-blend-multiply z-10"></div>
          <img 
            src="https://oehbiqlfllyxpueofuob.supabase.co/storage/v1/object/public/products//photo-1616486338812-3dadae4b4ace.avif"
            alt="Atelier Bargaoui Rideaux"
            className="object-cover object-center w-full h-full"
          />
        </div>
        
        <div className="container-luxury relative z-20">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 border border-white/20 text-white/80 uppercase tracking-wider text-xs mb-6 slide-up">
              Notre histoire
            </span>
            <h1 className="heading-xl text-white mb-6 slide-up stagger-1">
  L'excellence <br />depuis 1949
</h1>
<p className="text-white/90 text-lg mb-10 max-w-xl slide-up stagger-2">
  Fondée en juin 1949 par Mohamed Bargaoui, Bargaoui Rideaux est une entreprise familiale spécialisée dans la confection et la décoration d'intérieur.
</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="relative">
                <img 
                    src="https://oehbiqlfllyxpueofuob.supabase.co/storage/v1/object/public/products//image_fx%20(6).jpg" 

                  alt="Showroom Bargaoui Rideaux" 
                  className="rounded-sm slide-up"
                />
                <div className="absolute -bottom-8 -right-8 w-2/3 z-10">
                  <img 
                  src="https://oehbiqlfllyxpueofuob.supabase.co/storage/v1/object/public/products//image_fx%20(5).jpg" 

                    alt="Détail d'un rideau" 
                    className="rounded-sm border-8 border-white shadow-xl slide-up stagger-2"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <span className="inline-block px-4 py-1 border border-luxury-200 text-luxury-600 uppercase tracking-wider text-xs mb-6 slide-up">
                Notre mission
              </span>
              <h2 className="heading-lg mb-6 slide-up stagger-1">
                Créer des espaces qui inspirent
              </h2>
              <p className="text-luxury-600 mb-6 slide-up stagger-2">
                Chez Bargaoui Rideaux, nous croyons que les rideaux ne sont pas de simples accessoires, mais des éléments essentiels qui transforment un espace et lui confèrent caractère et élégance.
              </p>
              <p className="text-luxury-600 mb-8 slide-up stagger-3">
                Notre mission est de créer des pièces uniques qui reflètent la personnalité et le style de nos clients, tout en apportant confort et esthétique à leur environnement quotidien.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start slide-up stagger-4">
                  <div className="mr-4 mt-1">
                    <CheckCircle2 className="text-luxury-800" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-luxury-900 mb-1">Savoir-faire artisanal</h4>
                    <p className="text-sm text-luxury-600">Expertise transmise de génération en génération</p>
                  </div>
                </div>
                
                <div className="flex items-start slide-up stagger-5">
                  <div className="mr-4 mt-1">
                    <CheckCircle2 className="text-luxury-800" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-luxury-900 mb-1">Matériaux nobles</h4>
                    <p className="text-sm text-luxury-600">Sélection rigoureuse des meilleurs tissus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-secondary">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="heading-lg mb-4 slide-up">Nos valeurs</h2>
            <p className="text-luxury-600 slide-up stagger-1">
              Ces principes guident chacune de nos actions et sont au cœur de notre engagement envers l'excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-sm shadow-sm slide-up stagger-1">
              <div className="bg-luxury-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Award className="text-luxury-800" size={24} />
              </div>
              <h3 className="heading-sm mb-4">Excellence</h3>
              <p className="text-luxury-600">
                Nous visons l'excellence dans chaque détail, de la sélection des matériaux à la finition de nos créations.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-sm shadow-sm slide-up stagger-2">
              <div className="bg-luxury-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Users className="text-luxury-800" size={24} />
              </div>
              <h3 className="heading-sm mb-4">Service client</h3>
              <p className="text-luxury-600">
                Nous plaçons la satisfaction de nos clients au centre de notre approche, avec un accompagnement personnalisé et attentif.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-sm shadow-sm slide-up stagger-3">
              <div className="bg-luxury-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <History className="text-luxury-800" size={24} />
              </div>
              <h3 className="heading-sm mb-4">Tradition</h3>
              <p className="text-luxury-600">
                Nous honorons les techniques traditionnelles tout en embrassant l'innovation pour créer des pièces intemporelles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="heading-lg mb-4 slide-up">Notre parcours</h2>
            <p className="text-luxury-600 slide-up stagger-1">
              De nos modestes débuts à notre position actuelle de leader, découvrez les moments clés qui ont façonné notre histoire.
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 h-full w-px bg-luxury-200 transform md:translate-x-px"></div>
            
            {/* Timeline events */}
            {timeline.map((event, index) => (
              <div 
                key={index}
                className={`relative flex flex-col md:flex-row items-center mb-12 last:mb-0 slide-up ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-7 h-7 bg-white border-2 border-luxury-800 rounded-full transform -translate-x-3 md:-translate-x-3.5 z-10"></div>
                
                {/* Content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-white p-6 rounded-sm shadow-sm border border-luxury-100">
                    <span className="inline-block px-4 py-1 bg-luxury-100 text-luxury-800 rounded-full text-sm font-medium mb-4">
                      {event.year}
                    </span>
                    <h3 className="heading-sm mb-3">{event.title}</h3>
                    <p className="text-luxury-600">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-secondary">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="heading-lg mb-4 slide-up">Notre équipe</h2>
            <p className="text-luxury-600 slide-up stagger-1">
              Découvrez les artisans et experts passionnés qui perpétuent notre tradition d'excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-sm overflow-hidden shadow-sm slide-up stagger-1">
              <div className="aspect-[4/3]">
                <img 
                  src="https://oehbiqlfllyxpueofuob.supabase.co/storage/v1/object/public/products//408139586_2050489678664386_388047952161963732_n_kwvpxy.jpg" 
                  alt="Tahar Bargaoui - Fondateur" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="heading-sm mb-1">Tahar Bargaoui</h3>
                <p className="text-luxury-600 text-sm mb-4">Fondateur</p>
                <p className="text-luxury-600">
                  Avec plus de 40 ans d'expérience dans le textile, Tahar a fondé Bargaoui Rideaux pour partager sa passion pour l'artisanat de qualité.
                </p>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-white rounded-sm overflow-hidden shadow-sm slide-up stagger-2">
              <div className="aspect-[4/3]">
                <img 
                  src="https://oehbiqlfllyxpueofuob.supabase.co/storage/v1/object/public/products//242185550_4244420348946302_4524954644133877537_n.jpg" 
                  alt="Mohamed Ali Attiya" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="heading-sm mb-1">Mohamed Ali Attiya</h3>
                <p className="text-luxury-600 text-sm mb-4">directeur général</p>
                <p className="text-luxury-600">
                Avec une expertise approfondie dans le domaine du textile, Mohamed Ali Attiya dirige Bargaoui Rideaux avec une vision stratégique et un engagement envers l’excellence..
                </p>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className="bg-white rounded-sm overflow-hidden shadow-sm slide-up stagger-3">
              <div className="aspect-[4/3]">
                <img 
                  src="https://oehbiqlfllyxpueofuob.supabase.co/storage/v1/object/public/products//133082169_1736787693155249_6303303625634809209_n.jpg" 
                  alt="Islem Tlili" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="heading-sm mb-1">Islem Tlili</h3>
                <p className="text-luxury-600 text-sm mb-4">architecture d’intérieur</p>
                <p className="text-luxury-600">
                Avec une expertise en architecture d’intérieur, Islem Tlili apporte une touche contemporaine et raffinée aux créations de Bargaoui Rideaux, alliant esthétique et fonctionnalité..
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-luxury-950/70 mix-blend-multiply z-10"></div>
          <img 
            src="https://oehbiqlfllyxpueofuob.supabase.co/storage/v1/object/public/products//photo-1513694203232-719a280e022f.avif"
            alt="Atelier Bargaoui Rideaux"
            className="object-cover object-center w-full h-full"
          />
        </div>
        
        <div className="container-luxury relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg text-white mb-6 slide-up">
              Faites partie de notre histoire
            </h2>
            <p className="text-white/80 text-lg mb-10 slide-up stagger-1">
              Découvrez comment notre expertise peut transformer votre intérieur et créer un espace qui vous ressemble.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 slide-up stagger-2">
              <Link 
                to="/contact" 
                className="btn-luxury bg-white text-luxury-900 hover:bg-white/90"
              >
                Contactez-nous
              </Link>
              <Link 
                to="/products" 
                className="btn-luxury-outline text-white border-white hover:bg-white/10"
              >
                Nos collections
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
