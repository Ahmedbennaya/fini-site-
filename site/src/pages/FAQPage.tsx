import { SetStateAction, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp, Phone, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';

// FAQ Accordion Component
const FAQItem = ({ question, answer, isOpen, toggleOpen, index }) => {
  return (
    <div 
      className={`border-b border-luxury-200 py-6 slide-up ${index > 0 ? `stagger-${index}` : ''}`}
    >
      <button 
        className="flex w-full justify-between items-center text-left"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-luxury-900">{question}</h3>
        {isOpen ? (
          <ChevronUp className="text-luxury-800 flex-shrink-0" size={20} />
        ) : (
          <ChevronDown className="text-luxury-800 flex-shrink-0" size={20} />
        )}
      </button>
      
      <div 
        className={`mt-3 text-luxury-600 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
};

// FAQ Categories
const FAQCategory = ({ title, description, faqs }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index: SetStateAction<number>) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="mb-16">
      <h2 className="heading-md mb-4 slide-up">{title}</h2>
      <p className="text-luxury-600 mb-8 slide-up stagger-1">{description}</p>
      
      <div className="divide-y divide-luxury-200">
        {faqs.map((faq: { question: unknown; answer: unknown; }, index: number) => (
          <FAQItem 
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            toggleOpen={() => toggleFAQ(index)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

// Contact CTA Section
const ContactCTA = () => (
  <section className="mb-16 p-8 md:p-12 bg-luxury-50 rounded-sm slide-up">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <h3 className="heading-sm mb-4">Vous ne trouvez pas votre réponse ?</h3>
        <p className="text-luxury-600 mb-6">
          Notre équipe est à votre disposition pour répondre à toutes vos questions concernant nos produits et services.
        </p>
        
        <ul className="space-y-4 mb-8">
          <li className="flex items-start">
            <Phone className="text-luxury-800 mr-3 flex-shrink-0 mt-1" size={18} />
            <div>
              <p className="font-medium">Appelez-nous</p>
              <a href="tel:+21650929292" className="text-luxury-600 hover:text-luxury-800 transition-colors">
                +216 50 92 92 92
              </a>
            </div>
          </li>
          <li className="flex items-start">
            <Mail className="text-luxury-800 mr-3 flex-shrink-0 mt-1" size={18} />
            <div>
              <p className="font-medium">Envoyez-nous un email</p>
              <a href="mailto:contact@bargaoui-rideaux.tn" className="text-luxury-600 hover:text-luxury-800 transition-colors">
                contact@bargaoui-rideaux.tn
              </a>
            </div>
          </li>
        </ul>
        
        <Link 
          to="/contact" 
          className="btn-luxury bg-luxury-800 text-white hover:bg-luxury-900"
        >
          Contactez-nous
        </Link>
      </div>
      
      <div className="hidden md:block">
        <img 
          src="https://oehbiqlfllyxpueofuob.supabase.co/storage/v1/object/public/products//photo-1557426272-fc759fdf7a8d.avif" 
          alt="Service client Bargaoui Rideaux"
          className="w-full h-64 object-cover rounded-sm"
        />
      </div>
    </div>
  </section>
);

const FAQPage = () => {
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

  // Schema for the FAQ page
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Comment se déroule une commande de rideaux sur mesure ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le processus commence par une consultation où nous discutons de vos besoins et préférences. Nous prenons ensuite les mesures précises de vos fenêtres, vous présentons une sélection de tissus et options de confection. Une fois votre choix finalisé, nous produisons vos rideaux et procédons à l'installation par notre équipe professionnelle."
        }
      },
      {
        "@type": "Question",
        "name": "Quel est le délai de livraison pour des rideaux sur mesure ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le délai de fabrication varie généralement entre 2 et 4 semaines selon la complexité du projet et la disponibilité des tissus. Nous vous informons du délai précis lors de la validation de votre commande."
        }
      },
      {
        "@type": "Question",
        "name": "Proposez-vous un service d'installation ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, nous offrons un service d'installation complet par notre équipe de professionnels. Ce service inclut la fixation des tringles, l'installation des rideaux et les ajustements nécessaires pour un résultat parfait."
        }
      }
    ]
  };

  // FAQ data organized by categories
  const faqData = [
    {
      title: "Produits et Services",
      description: "Tout ce que vous devez savoir sur notre gamme de produits et nos services.",
      faqs: [
        {
          question: "Quels types de rideaux proposez-vous ?",
          answer: "Notre gamme comprend des rideaux sur mesure pour tous les styles d'intérieur : rideaux opaques, voilages, doubles rideaux, rideaux à œillets, à plis plats, à plis flamands, rideaux de style américain, et bien d'autres. Nous proposons également des accessoires comme des embrasses, des tringles et des systèmes de motorisation."
        },
        {
          question: "Utilisez-vous des tissus ignifugés pour les projets commerciaux ?",
          answer: "Oui, nous disposons d'une large gamme de tissus ignifugés conformes aux normes de sécurité pour les établissements commerciaux, hôtels, restaurants et autres espaces publics. Ces tissus allient sécurité et esthétique pour répondre aux exigences des projets professionnels."
        },
        {
          question: "Proposez-vous d'autres textiles d'ameublement que les rideaux ?",
          answer: "Absolument ! Notre expertise s'étend à tous les textiles d'ameublement : coussins décoratifs, housses de canapé, jetés de lit, nappes, serviettes et linge de table, têtes de lit rembourrées et habillage de murs en tissu. Nous créons un ensemble cohérent pour votre intérieur."
        },
        {
          question: "Travaillez-vous avec des architectes d'intérieur ?",
          answer: "Oui, nous collaborons régulièrement avec des architectes d'intérieur et des décorateurs. Nous pouvons vous recommander des professionnels de confiance ou travailler en synergie avec votre propre architecte pour garantir une parfaite intégration de nos créations dans votre projet global."
        },
        {
          question: "Proposez-vous des solutions pour les grandes baies vitrées ?",
          answer: "Nous offrons plusieurs solutions adaptées aux grandes baies vitrées : rideaux grand format, panneaux japonais, stores bateau, rideaux motorisés pour plus de confort d'utilisation. Nos experts vous conseilleront sur la solution la plus adaptée à votre espace et à vos besoins."
        }
      ]
    },
    {
      title: "Commandes et Processus",
      description: "Informations sur le processus de commande, les délais et les installations.",
      faqs: [
        {
          question: "Comment se déroule une commande de rideaux sur mesure ?",
          answer: "Le processus commence par une consultation où nous discutons de vos besoins et préférences. Nous prenons ensuite les mesures précises de vos fenêtres, vous présentons une sélection de tissus et options de confection. Une fois votre choix finalisé, nous produisons vos rideaux et procédons à l'installation par notre équipe professionnelle."
        },
        {
          question: "Proposez-vous des visites à domicile pour la prise de mesures ?",
          answer: "Oui, nous proposons des visites à domicile pour la prise de mesures précises et pour mieux comprendre votre espace. Ce service est disponible sur rendez-vous à Tunis et ses environs. Pour les projets en dehors de cette zone, des frais de déplacement peuvent s'appliquer."
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
          question: "Puis-je commander des échantillons de tissus avant de me décider ?",
          answer: "Absolument ! Nous encourageons nos clients à commander des échantillons de tissus pour pouvoir apprécier la qualité, la texture et la couleur dans leur propre environnement. Vous pouvez demander jusqu'à 5 échantillons gratuits lors de votre première consultation."
        },
        {
          question: "Quel type de garantie offrez-vous sur vos produits ?",
          answer: "Tous nos produits bénéficient d'une garantie de 2 ans couvrant les défauts de fabrication. Cette garantie ne couvre pas l'usure normale ou les dommages résultant d'un mauvais entretien. Pour les systèmes motorisés, une garantie spécifique de 5 ans s'applique sur le moteur."
        }
      ]
    },
    {
      title: "Entretien et Durabilité",
      description: "Conseils pour préserver la beauté et la durabilité de vos rideaux et textiles.",
      faqs: [
        {
          question: "Comment entretenir mes rideaux ?",
          answer: "Les instructions d'entretien varient selon le type de tissu. Nous fournissons avec chaque commande une fiche détaillée d'entretien. En général, nous recommandons un nettoyage professionnel pour préserver la qualité et la durabilité de vos rideaux de luxe."
        },
        {
          question: "À quelle fréquence dois-je nettoyer mes rideaux ?",
          answer: "Pour maintenir vos rideaux en bon état, nous recommandons un nettoyage professionnel tous les 12 à 18 mois. Un dépoussiérage régulier à l'aide d'un aspirateur à faible puissance avec un embout à brosse douce est conseillé tous les mois pour éviter l'accumulation de poussière."
        },
        {
          question: "Les tissus que vous utilisez résistent-ils à la décoloration due au soleil ?",
          answer: "Nous proposons une sélection de tissus traités contre les UV qui offrent une meilleure résistance à la décoloration. Cependant, comme tous les textiles, une exposition prolongée au soleil direct peut entraîner une certaine décoloration au fil du temps. Pour les fenêtres très exposées, nous recommandons l'ajout d'une doublure protectrice."
        },
        {
          question: "Que faire si mes rideaux se froissent ?",
          answer: "Pour les légères froissures, une vapeur douce à distance peut suffire. Pour les plis plus marqués, nous recommandons un repassage à basse température avec un linge humide entre le fer et le tissu. Consultez toujours les instructions d'entretien spécifiques à votre tissu, car certaines matières ne doivent pas être repassées."
        },
        {
          question: "Proposez-vous un service de nettoyage pour les rideaux ?",
          answer: "Nous ne proposons pas directement ce service, mais nous travaillons avec des nettoyeurs professionnels spécialisés dans les textiles de luxe que nous pouvons vous recommander. Sur demande, nous pouvons également organiser la dépose, le nettoyage et la repose de vos rideaux."
        }
      ]
    },
    {
      title: "Prix et Paiement",
      description: "Informations sur nos tarifs, options de paiement et devis.",
      faqs: [
        {
          question: "Comment obtenir un devis pour mes rideaux sur mesure ?",
          answer: "Vous pouvez obtenir un devis en prenant rendez-vous dans notre showroom, en demandant une visite à domicile, ou en nous envoyant vos mesures et spécifications par email. Nos devis sont gratuits et valables pendant 30 jours."
        },
        {
          question: "Quels sont vos tarifs pour les rideaux sur mesure ?",
          answer: "Le prix des rideaux sur mesure varie en fonction de plusieurs facteurs : dimensions, type de tissu, complexité de la confection, options de doublure et accessoires. Nos tarifs commencent à partir de 150 dinars le mètre carré pour les voilages et 250 dinars le mètre carré pour les rideaux opaques, hors accessoires et installation."
        },
        {
          question: "Quelles sont vos conditions de paiement ?",
          answer: "Nous demandons un acompte de 50% à la commande pour lancer la fabrication, et le solde doit être réglé avant l'installation. Pour les projets importants, des échéanciers de paiement peuvent être négociés."
        },
        {
          question: "Quels modes de paiement acceptez-vous ?",
          answer: "Nous acceptons les paiements par carte bancaire, virement bancaire, espèces (dans la limite légale) et chèques. Pour les projets professionnels, nous pouvons établir une facture avec TVA."
        },
        {
          question: "Proposez-vous des facilités de paiement ?",
          answer: "Oui, pour les commandes importantes, nous proposons des solutions de paiement échelonné sans frais sur 3 ou 6 mois. Pour les projets très conséquents, nous travaillons avec des partenaires bancaires qui peuvent vous proposer des solutions de financement adaptées."
        }
      ]
    },
    {
      title: "Questions Techniques",
      description: "Réponses à vos questions techniques sur les rideaux et leur installation.",
      faqs: [
        {
          question: "Quelle est la différence entre les différents types de plis pour les rideaux ?",
          answer: "Les plis déterminent l'aspect et la tenue de vos rideaux. Les plis plats donnent un aspect moderne et épuré, les plis pincés (double ou triple) offrent un style plus classique et structuré, les plis flamands créent un effet ondulé très décoratif, tandis que les œillets donnent un style contemporain avec de larges vagues régulières."
        },
        {
          question: "Quelle est la hauteur idéale pour mes rideaux ?",
          answer: "Pour un effet optimal, nous recommandons d'installer les rideaux 10 à 15 cm au-dessus de la fenêtre et de les laisser toucher légèrement le sol ou reposer de 1 à 2 cm sur celui-ci. Pour un style plus dramatique, nous pouvons créer un effet 'puddle' où le tissu forme une petite flaque au sol."
        },
        {
          question: "Quelle largeur de tissu faut-il prévoir pour des rideaux ?",
          answer: "Pour obtenir un bel effet de drapé, il faut prévoir 2 à 2,5 fois la largeur de la tringle ou de la fenêtre pour des rideaux classiques, et 1,5 à 2 fois pour des rideaux à œillets. Pour les voilages, nous recommandons 2 à 3 fois la largeur pour un effet plus vaporeux."
        },
        {
          question: "Quels types de doublure proposez-vous ?",
          answer: "Nous proposons plusieurs types de doublures : standard pour une meilleure tenue du rideau, thermique pour l'isolation, occultante pour bloquer la lumière, acoustique pour atténuer le bruit, et interlining (molleton) pour un drapé plus luxueux et une meilleure isolation."
        },
        {
          question: "Proposez-vous des systèmes de rideaux motorisés ?",
          answer: "Oui, nous proposons des systèmes de motorisation pour rideaux qui peuvent être contrôlés par télécommande, smartphone ou intégrés à votre système domotique. Ces solutions sont idéales pour les grandes baies vitrées, les fenêtres difficiles d'accès ou simplement pour plus de confort."
        }
      ]
    }
  ];

  return (
    <main>
      <Helmet>
        <title>FAQ - Bargaoui Rideaux Tahar | Rideaux de Luxe en Tunisie</title>
        <meta 
          name="description" 
          content="Trouvez les réponses à toutes vos questions sur les rideaux sur mesure, l'entretien des textiles et nos services. Bargaoui Rideaux Tahar, expert en décoration textile depuis 1998." 
        />
        <meta 
          name="keywords" 
          content="FAQ rideaux, questions fréquentes, rideaux sur mesure, entretien rideaux, Bargaoui Rideaux, Tunisie" 
        />
        <link rel="canonical" href="https://bargaoui-rideauxtahar.netlify.app/faq" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-luxury-100">
        <div className="container-luxury relative z-10">
          <div className="max-w-2xl">
            <h1 className="heading-xl mb-6 slide-up">Questions Fréquentes</h1>
            <p className="text-luxury-600 text-lg mb-0 slide-up stagger-1">
              Trouvez les réponses à toutes vos questions concernant nos produits, services et processus.
            </p>
          </div>
        </div>
        {/* Add the hero image */}
        <div className="absolute inset-0">
          <img
            src="https://oehbiqlfllyxpueofuob.supabase.co/storage/v1/object/public/products//photo-1557426272-fc759fdf7a8d.avif"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div> {/* Optional overlay */}
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white py-4 border-b border-luxury-100">
        <div className="container-luxury">
          <nav className="flex text-sm">
            <Link to="/" className="text-luxury-600 hover:text-luxury-800">Accueil</Link>
            <span className="mx-2 text-luxury-400">/</span>
            <span className="text-luxury-900">FAQ</span>
          </nav>
        </div>
      </div>

      {/* FAQ Content */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          {/* Navigation */}
          <div className="hidden lg:block mb-12 sticky top-24 z-30 bg-white pb-4 border-b border-luxury-200 slide-up">
            <h2 className="sr-only">Categories</h2>
            <nav className="flex flex-wrap gap-2 md:gap-4">
              {faqData.map((category, index) => (
                <a 
                  key={index}
                  href={`#${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-block px-4 py-2 border border-luxury-200 rounded-sm text-luxury-800 hover:bg-luxury-50 hover:border-luxury-300 transition-all"
                >
                  {category.title}
                </a>
              ))}
            </nav>
          </div>

          {/* FAQ Categories */}
          <div className="max-w-3xl mx-auto">
            {faqData.map((category, index) => (
              <div 
                key={index} 
                id={category.title.toLowerCase().replace(/\s+/g, '-')}
                className="scroll-mt-32"
              >
                <FAQCategory 
                  title={category.title}
                  description={category.description}
                  faqs={category.faqs}
                />
              </div>
            ))}

            <ContactCTA />
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQPage;