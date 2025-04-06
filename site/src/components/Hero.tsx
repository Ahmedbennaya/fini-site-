import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Debugging animation-related logic
  const animationObject = { loaded };

  if (loaded) {
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-gradient-to-b from-luxury-950/50 to-luxury-900/80 mix-blend-multiply z-10"
          aria-hidden="true"
        ></div>
        {/* Préchargement de la vidéo avec dimensions explicites pour éviter le CLS */}
        <video
          src="https://oehbiqlfllyxpueofuob.supabase.co/storage/v1/object/public/products//Tahar%20vedio.mp4"
          className="object-cover object-center w-full h-full"
          autoPlay
          loop
          muted
          preload="auto"
          width="1920"
          height="1080"
          poster="/LOGO NOIR.png" // Ajout d'un poster pour éviter le CLS pendant le chargement
        />
      </div>

      {/* Content */}
      <div className="container-luxury relative z-20 mt-16 md:mt-0">
        <div className="max-w-3xl">
          <div className={`slide-up ${loaded ? 'show' : ''} stagger-1`}>
            <span className="inline-block px-4 py-1 border border-white/20 text-white/80 uppercase tracking-wider text-xs mb-6">
              Maison de rideaux de luxe depuis 1998
            </span>
          </div>

          <h1 className="heading-xl text-white mb-6 slide-up stagger-1">
            L'excellence <br />depuis 1949
          </h1>
          <p className="text-white/90 text-lg mb-10 max-w-xl slide-up stagger-2">
            Fondée en juin 1949 par Mohamed Bargaoui, Bargaoui Rideaux est une entreprise familiale spécialisée dans la confection et la décoration d'intérieur.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 slide-up ${
              loaded ? 'show' : ''
            } stagger-4`}
          >
            <button
              onClick={() => navigate('/products')}
              className="btn-luxury bg-white text-luxury-900 hover:bg-white/90"
            >
              Découvrir nos collections
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="btn-luxury-outline text-white border-white hover:bg-white/10"
            >
              Prendre rendez-vous
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center slide-up ${
          loaded ? 'show' : ''
        } stagger-5`}
      >
        <span className="text-white/70 text-sm mb-2">Découvrez</span>
        <div className="animate-bounce">
          <ChevronRight className="text-white/70 rotate-90" size={20} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
