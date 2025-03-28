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
       <video
          src="/Tahar vedio.mp4" // Updated to use the Tahar video from the public folder
          className="object-cover object-center w-full h-full"
          autoPlay
          loop
          muted
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

          <h1
            className={`heading-xl text-white mb-6 slide-up ${
              loaded ? 'show' : ''
            } stagger-2`}
          >
            L'art du rideau, <br />
            <span className="italic">l'élégance de votre intérieur</span>
          </h1>

          <p
            className={`text-white/90 text-lg mb-10 max-w-xl slide-up ${
              loaded ? 'show' : ''
            } stagger-3`}
          >
            Découvrez l'excellence et le savoir-faire de Bargaoui Rideaux, où
            chaque création est pensée pour sublimer votre espace de vie avec
            élégance et raffinement.
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
