import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Privacy = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Add schema markup for better SEO
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Politique de Confidentialité | Bargaoui Rideaux',
      'description': 'Découvrez notre politique de confidentialité et comment nous protégeons vos données personnelles chez Bargaoui Rideaux.',
      'publisher': {
        '@type': 'Organization',
        'name': 'Bargaoui Rideaux Tahar',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://bargaoui-rideauxtahar.netlify.app/LOGO NOIR.png'
        }
      },
      'inLanguage': 'fr-FR',
      'datePublished': '2025-04-06',
      'dateModified': '2025-04-06'
    });
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <main className="pt-32 pb-20">
      <Helmet>
        <title>Politique de Confidentialité | Bargaoui Rideaux Tahar</title>
        <meta name="description" content="Découvrez notre politique de confidentialité et comment nous protégeons vos données personnelles chez Bargaoui Rideaux, créateur de rideaux de luxe en Tunisie." />
        <meta name="keywords" content="politique de confidentialité, protection des données, confidentialité, Bargaoui Rideaux, rideaux Tunisie, RGPD, vie privée" />
        <link rel="canonical" href="https://bargaoui-rideauxtahar.netlify.app/privacy" />
        <meta property="og:title" content="Politique de Confidentialité | Bargaoui Rideaux Tahar" />
        <meta property="og:description" content="Découvrez notre politique de confidentialité et comment nous protégeons vos données personnelles chez Bargaoui Rideaux, créateur de rideaux de luxe en Tunisie." />
        <meta property="og:url" content="https://bargaoui-rideauxtahar.netlify.app/privacy" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Politique de Confidentialité | Bargaoui Rideaux Tahar" />
        <meta name="twitter:description" content="Découvrez notre politique de confidentialité et comment nous protégeons vos données personnelles chez Bargaoui Rideaux." />
      </Helmet>

      <div className="container-luxury max-w-4xl">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-luxury-700 hover:text-luxury-900 transition-colors mb-6">
            <ArrowLeft size={16} className="mr-2" />
            <span>Retour à l'accueil</span>
          </Link>
          
          <h1 className="heading-xl mb-8">Politique de Confidentialité</h1>
          <p className="text-luxury-600">Dernière mise à jour : 6 avril 2025</p>
        </div>

        <div className="prose prose-luxury max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-serif text-luxury-900 mb-4">Introduction</h2>
            <div className="bg-luxury-50 p-6 rounded-sm mb-6">
              <p>
                Bienvenue sur la page de politique de confidentialité de Bargaoui Rideaux. Nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles. Cette politique de confidentialité vous informe sur la manière dont nous recueillons, utilisons, partageons et protégeons vos informations lorsque vous visitez notre site web (https://bargaoui-rideauxtahar.netlify.app) ou lorsque vous interagissez avec nous par d'autres moyens.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 id="qui-sommes-nous" className="text-2xl font-serif text-luxury-900 mb-4">1. Qui sommes-nous</h2>
            <p>
              Bargaoui Rideaux Tahar est un créateur de rideaux et textiles d'ameublement de luxe établi en Tunisie depuis 1998. Notre siège social est situé à :
            </p>
            <p className="pl-4 border-l-2 border-luxury-200 my-4">
              1143 Avenue UMA La Soukra<br />
              Ariana 2036<br />
              Tunisie
            </p>
            <p>
              Pour toute question concernant cette politique de confidentialité ou nos pratiques en matière de données, veuillez nous contacter à :
            </p>
            <ul>
              <li>Email : <a href="mailto:privacy@bargaoui-rideaux.tn" className="text-luxury-700 hover:text-luxury-900">privacy@bargaoui-rideaux.tn</a></li>
              <li>Téléphone : <a href="tel:+21650929292" className="text-luxury-700 hover:text-luxury-900">+216 50 92 92 92</a></li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 id="donnees-collectees" className="text-2xl font-serif text-luxury-900 mb-4">2. Les données que nous collectons</h2>
            <p>
              Nous pouvons collecter les types d'informations suivants :
            </p>
            <h3 className="text-xl font-serif text-luxury-800 mt-6 mb-3">Informations personnelles</h3>
            <ul>
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Adresse postale complète</li>
              <li>Préférences de conception et spécifications pour les produits</li>
              <li>Historique des commandes et des achats</li>
            </ul>
            <h3 className="text-xl font-serif text-luxury-800 mt-6 mb-3">Informations techniques</h3>
            <ul>
              <li>Adresse IP</li>
              <li>Type et version du navigateur</li>
              <li>Type d'appareil et système d'exploitation</li>
              <li>Données de localisation approximative (pays, ville)</li>
              <li>Pages visitées sur notre site et durée de la visite</li>
              <li>Source de référence (comment vous avez trouvé notre site)</li>
              <li>Identifiants de cookies</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 id="collecte-donnees" className="text-2xl font-serif text-luxury-900 mb-4">3. Comment nous collectons vos données</h2>
            <p>
              Nous collectons vos données personnelles par différents moyens :
            </p>
            <ul>
              <li><strong>Formulaires de contact</strong> : lorsque vous nous contactez via le formulaire sur notre site</li>
              <li><strong>Inscription</strong> : lorsque vous créez un compte sur notre site</li>
              <li><strong>Commandes</strong> : lorsque vous passez une commande ou demandez un devis</li>
              <li><strong>Consultation en magasin</strong> : lorsque vous visitez notre showroom et fournissez vos coordonnées</li>
              <li><strong>Consentement aux cookies</strong> : via les cookies et technologies similaires sur notre site</li>
              <li><strong>Communications</strong> : lorsque vous nous contactez par téléphone, email ou réseaux sociaux</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 id="utilisation-donnees" className="text-2xl font-serif text-luxury-900 mb-4">4. Comment nous utilisons vos données</h2>
            <p>
              Nous utilisons vos données personnelles pour les finalités suivantes :
            </p>
            <ul>
              <li>Fournir nos services et produits (création et installation de rideaux sur mesure)</li>
              <li>Traiter et livrer vos commandes</li>
              <li>Gérer votre compte client</li>
              <li>Communiquer avec vous concernant vos demandes, commandes ou questions</li>
              <li>Vous informer sur nos produits, services et offres spéciales (avec votre consentement)</li>
              <li>Personnaliser votre expérience sur notre site</li>
              <li>Améliorer notre site et nos offres de produits</li>
              <li>Assurer la sécurité de notre site et prévenir la fraude</li>
              <li>Respecter nos obligations légales et réglementaires</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 id="bases-legales" className="text-2xl font-serif text-luxury-900 mb-4">5. Bases légales du traitement</h2>
            <p>
              Nous traitons vos données personnelles sur les bases légales suivantes :
            </p>
            <ul>
              <li><strong>Exécution d'un contrat</strong> : lorsque le traitement est nécessaire à l'exécution d'un contrat auquel vous êtes partie ou à l'exécution de mesures précontractuelles prises à votre demande</li>
              <li><strong>Intérêts légitimes</strong> : lorsque le traitement est nécessaire aux fins des intérêts légitimes poursuivis par Bargaoui Rideaux (comme l'amélioration de nos services)</li>
              <li><strong>Obligation légale</strong> : lorsque le traitement est nécessaire au respect d'une obligation légale à laquelle nous sommes soumis</li>
              <li><strong>Consentement</strong> : lorsque vous avez donné votre consentement au traitement de vos données personnelles pour une ou plusieurs finalités spécifiques (comme pour l'envoi de communications marketing)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 id="partage-donnees" className="text-2xl font-serif text-luxury-900 mb-4">6. Partage de vos données personnelles</h2>
            <p>
              Nous pouvons partager vos données personnelles avec :
            </p>
            <ul>
              <li><strong>Prestataires de services</strong> : entreprises qui nous fournissent des services comme l'hébergement web, le traitement des paiements, la livraison et l'installation</li>
              <li><strong>Conseillers professionnels</strong> : avocats, banquiers, auditeurs et assureurs qui fournissent des services de conseil</li>
              <li><strong>Autorités fiscales et réglementaires</strong> : lorsque la loi l'exige</li>
              <li><strong>Partenaires commerciaux</strong> : uniquement avec votre consentement explicite</li>
            </ul>
            <p>
              Nous exigeons que tous les tiers respectent la sécurité de vos données personnelles et les traitent conformément à la loi. Nous ne permettons pas à nos prestataires de services tiers d'utiliser vos données personnelles à leurs propres fins.
            </p>
          </section>

          <section className="mb-10">
            <h2 id="transferts-internationaux" className="text-2xl font-serif text-luxury-900 mb-4">7. Transferts internationaux de données</h2>
            <p>
              Nous opérons principalement en Tunisie, mais certains de nos prestataires de services peuvent être situés à l'extérieur de la Tunisie, notamment dans l'Union européenne et aux États-Unis.
            </p>
            <p>
              Lorsque nous transférons vos données personnelles en dehors de la Tunisie, nous nous assurons qu'un niveau de protection similaire leur est accordé en veillant à ce que l'un des mécanismes suivants soit mis en œuvre :
            </p>
            <ul>
              <li>Transfert vers des pays reconnus comme offrant un niveau de protection adéquat</li>
              <li>Utilisation de clauses contractuelles spécifiques approuvées</li>
              <li>Adhésion de nos prestataires à des programmes de certification reconnus</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 id="conservation-donnees" className="text-2xl font-serif text-luxury-900 mb-4">8. Conservation des données</h2>
            <p>
              Nous ne conserverons vos données personnelles que le temps nécessaire pour atteindre les finalités pour lesquelles nous les avons collectées, y compris pour satisfaire aux exigences légales, comptables ou de reporting.
            </p>
            <p>
              Pour déterminer la période de conservation appropriée, nous prenons en compte :
            </p>
            <ul>
              <li>La quantité, la nature et la sensibilité des données personnelles</li>
              <li>Le risque potentiel de préjudice résultant d'une utilisation ou divulgation non autorisée</li>
              <li>Les finalités pour lesquelles nous traitons vos données personnelles</li>
              <li>Les exigences légales applicables</li>
            </ul>
            <p>
              En général, nous conservons vos données :
            </p>
            <ul>
              <li>Données clients (commandes, factures) : 10 ans (obligation légale fiscale)</li>
              <li>Données de contact et marketing : 3 ans après votre dernier contact avec nous</li>
              <li>Données de navigation et cookies : maximum 13 mois</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 id="droits-legaux" className="text-2xl font-serif text-luxury-900 mb-4">9. Vos droits légaux</h2>
            <p>
              Selon les lois applicables sur la protection des données, vous disposez des droits suivants :
            </p>
            <ul>
              <li><strong>Droit d'accès</strong> : obtenir une copie des données personnelles que nous détenons sur vous</li>
              <li><strong>Droit de rectification</strong> : demander la correction des données inexactes</li>
              <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données personnelles dans certaines circonstances</li>
              <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données personnelles dans certaines circonstances</li>
              <li><strong>Droit à la limitation du traitement</strong> : demander la restriction du traitement de vos données</li>
              <li><strong>Droit à la portabilité des données</strong> : recevoir vos données dans un format structuré, couramment utilisé et lisible par machine</li>
              <li><strong>Droit de retirer votre consentement</strong> : retirer votre consentement à tout moment pour les traitements basés sur celui-ci</li>
            </ul>
            <p>
              Pour exercer l'un de ces droits, veuillez nous contacter à <a href="mailto:privacy@bargaoui-rideaux.tn" className="text-luxury-700 hover:text-luxury-900">privacy@bargaoui-rideaux.tn</a>. Nous répondrons à votre demande dans un délai d'un mois maximum.
            </p>
          </section>

          <section className="mb-10">
            <h2 id="cookies" className="text-2xl font-serif text-luxury-900 mb-4">10. Cookies et technologies similaires</h2>
            <p>
              Notre site utilise des cookies et technologies similaires pour améliorer votre expérience de navigation et nous aider à comprendre comment vous utilisez notre site.
            </p>
            <h3 className="text-xl font-serif text-luxury-800 mt-6 mb-3">Types de cookies que nous utilisons :</h3>
            <ul>
              <li><strong>Cookies nécessaires</strong> : indispensables au fonctionnement du site</li>
              <li><strong>Cookies analytiques/de performance</strong> : nous permettent de reconnaître et de compter le nombre de visiteurs et de voir comment les visiteurs se déplacent sur notre site</li>
              <li><strong>Cookies de fonctionnalité</strong> : utilisés pour vous reconnaître lorsque vous revenez sur notre site</li>
              <li><strong>Cookies de ciblage</strong> : enregistrent votre visite sur notre site, les pages que vous avez visitées et les liens que vous avez suivis</li>
            </ul>
            <p>
              Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour vous alerter lorsque des cookies sont envoyés. Cependant, certaines parties du site peuvent ne pas fonctionner correctement si vous désactivez les cookies.
            </p>
          </section>

          <section className="mb-10">
            <h2 id="securite-donnees" className="text-2xl font-serif text-luxury-900 mb-4">11. Sécurité des données</h2>
            <p>
              Nous avons mis en place des mesures de sécurité appropriées pour empêcher que vos données personnelles ne soient accidentellement perdues, utilisées ou consultées de manière non autorisée, modifiées ou divulguées. Ces mesures comprennent :
            </p>
            <ul>
              <li>Chiffrement des données sensibles</li>
              <li>Accès limité aux données personnelles sur la base du "besoin de savoir"</li>
              <li>Procédures pour faire face à toute violation de données présumée</li>
              <li>Formation régulière du personnel sur la protection des données</li>
              <li>Évaluation périodique de l'efficacité de nos mesures de sécurité</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 id="liens-tiers" className="text-2xl font-serif text-luxury-900 mb-4">12. Liens vers des sites tiers</h2>
            <p>
              Notre site peut inclure des liens vers des sites web, plug-ins et applications tiers. Cliquer sur ces liens ou activer ces connexions peut permettre à des tiers de collecter ou partager des données vous concernant. Nous ne contrôlons pas ces sites web tiers et ne sommes pas responsables de leurs déclarations de confidentialité. Nous vous encourageons à lire la politique de confidentialité de chaque site que vous visitez.
            </p>
          </section>

          <section className="mb-10">
            <h2 id="marketing-direct" className="text-2xl font-serif text-luxury-900 mb-4">13. Marketing direct</h2>
            <p>
              Nous pouvons utiliser vos données personnelles pour vous envoyer des informations sur nos produits et services qui pourraient vous intéresser. Vous recevrez des communications marketing de notre part uniquement si :
            </p>
            <ul>
              <li>Vous nous avez demandé des informations</li>
              <li>Vous avez acheté des produits ou services chez nous</li>
              <li>Vous nous avez fourni vos coordonnées et avez consenti à recevoir des communications marketing</li>
            </ul>
            <p>
              Vous pouvez nous demander d'arrêter de vous envoyer des messages marketing à tout moment en :
            </p>
            <ul>
              <li>Cliquant sur le lien de désabonnement dans tout email marketing</li>
              <li>Nous contactant directement à <a href="mailto:privacy@bargaoui-rideaux.tn" className="text-luxury-700 hover:text-luxury-900">privacy@bargaoui-rideaux.tn</a></li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 id="modifications" className="text-2xl font-serif text-luxury-900 mb-4">14. Modifications de cette politique de confidentialité</h2>
            <p>
              Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. La dernière version sera toujours disponible sur notre site web. Les modifications importantes feront l'objet d'une notification visible sur notre site ou par email direct.
            </p>
          </section>

          <section className="mb-10">
            <h2 id="contact" className="text-2xl font-serif text-luxury-900 mb-4">15. Contact</h2>
            <p>
              Pour toute question concernant cette politique de confidentialité ou nos pratiques en matière de données, veuillez nous contacter à :
            </p>
            <div className="bg-luxury-50 p-6 rounded-sm mt-4">
              <p className="font-medium">Bargaoui Rideaux Tahar</p>
              <p>1143 Avenue UMA La Soukra<br />
              Ariana 2036<br />
              Tunisie</p>
              <p className="mt-4">
                Email : <a href="mailto:privacy@bargaoui-rideaux.tn" className="text-luxury-700 hover:text-luxury-900">privacy@bargaoui-rideaux.tn</a><br />
                Téléphone : <a href="tel:+21650929292" className="text-luxury-700 hover:text-luxury-900">+216 50 92 92 92</a>
              </p>
            </div>
          </section>

          {/* Table of contents for better navigation */}
          <aside className="fixed right-8 top-1/3 bg-white shadow-md rounded-sm p-4 hidden lg:block max-w-xs">
            <h4 className="text-lg font-serif text-luxury-900 mb-4">Table des matières</h4>
            <nav>
              <ul className="text-sm space-y-2">
                <li><a href="#qui-sommes-nous" className="text-luxury-700 hover:text-luxury-900">1. Qui sommes-nous</a></li>
                <li><a href="#donnees-collectees" className="text-luxury-700 hover:text-luxury-900">2. Les données collectées</a></li>
                <li><a href="#collecte-donnees" className="text-luxury-700 hover:text-luxury-900">3. Comment nous collectons vos données</a></li>
                <li><a href="#utilisation-donnees" className="text-luxury-700 hover:text-luxury-900">4. Comment nous utilisons vos données</a></li>
                <li><a href="#bases-legales" className="text-luxury-700 hover:text-luxury-900">5. Bases légales du traitement</a></li>
                <li><a href="#partage-donnees" className="text-luxury-700 hover:text-luxury-900">6. Partage de vos données</a></li>
                <li><a href="#transferts-internationaux" className="text-luxury-700 hover:text-luxury-900">7. Transferts internationaux</a></li>
                <li><a href="#conservation-donnees" className="text-luxury-700 hover:text-luxury-900">8. Conservation des données</a></li>
                <li><a href="#droits-legaux" className="text-luxury-700 hover:text-luxury-900">9. Vos droits légaux</a></li>
                <li><a href="#cookies" className="text-luxury-700 hover:text-luxury-900">10. Cookies</a></li>
                <li><a href="#securite-donnees" className="text-luxury-700 hover:text-luxury-900">11. Sécurité des données</a></li>
                <li><a href="#liens-tiers" className="text-luxury-700 hover:text-luxury-900">12. Liens vers des sites tiers</a></li>
                <li><a href="#marketing-direct" className="text-luxury-700 hover:text-luxury-900">13. Marketing direct</a></li>
                <li><a href="#modifications" className="text-luxury-700 hover:text-luxury-900">14. Modifications</a></li>
                <li><a href="#contact" className="text-luxury-700 hover:text-luxury-900">15. Contact</a></li>
              </ul>
            </nav>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Privacy;