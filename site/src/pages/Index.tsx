
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import TestimonialSlider from '@/components/TestimonialSlider';
import { ArrowRight, Check, ShieldCheck, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  return (
    <main>
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
              <Link to="/about" className="inline-flex items-center text-luxury-800 font-medium slide-up stagger-4">
                <span className="border-b border-luxury-300 hover:border-luxury-800 transition-all">Découvrir notre histoire</span>
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
            
            <div className="order-1 lg:order-2 relative">
  <div className="relative z-10 slide-up ">
   
  </div>
  <div className="relative z-10 slide-up">
    <img 
      src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2127&auto=format&fit=crop" 
      alt="Détail d'un tissu"
      className="rounded-sm border-8 border-white shadow-xl"
    />
  </div>
</div>

          </div>
        </div>
      </section>
      
      <TestimonialSlider />
      
      {/* CTA section */}
      <section className="relative py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-luxury-950/70 mix-blend-multiply z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2558&auto=format&fit=crop" 
            alt="Interior with luxury curtains"
            className="object-cover object-center w-full h-full"
          />
        </div>
        
        <div className="container-luxury relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg text-white mb-6 slide-up">
              Transformez votre intérieur avec nos créations sur mesure
            </h2>
            <p className="text-white/80 text-lg mb-10 slide-up stagger-1">
              Prenez rendez-vous avec nos experts pour un conseil personnalisé et une estimation gratuite.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 slide-up stagger-2">
              <Link 
                to="/contact" 
                className="btn-luxury bg-white text-luxury-900 hover:bg-white/90"
              >
                Prendre rendez-vous
              </Link>
              <Link 
                to="/products" 
                className="btn-luxury-outline text-white border-white hover:bg-white/10"
              >
                Découvrir nos collections
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
