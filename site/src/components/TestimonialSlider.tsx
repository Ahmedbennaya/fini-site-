
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

// Mock testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Sophie Laurent',
    role: 'Designer d\'intérieur',
    content: 'Les rideaux de Bargaoui sont d\'une qualité exceptionnelle. Ils ont transformé les intérieurs de mes clients avec élégance et raffinement.',
    image: 'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?q=80&w=2574&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Marc Dubois',
    role: 'Architecte',
    content: 'Je recommande Bargaoui Rideaux à tous mes clients. Leur professionnalisme et la qualité de leurs produits sont incomparables.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Amira Ben Ali',
    role: 'Propriétaire de villa',
    content: 'Après avoir essayé plusieurs fournisseurs, Bargaoui Rideaux s\'est démarqué par son service exceptionnel et ses créations uniques.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop'
  }
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const nextSlide = () => {
    if (animating) return;
    setDirection('next');
    setAnimating(true);
    setTimeout(() => {
      setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
      setAnimating(false);
    }, 300);
  };

  const prevSlide = () => {
    if (animating) return;
    setDirection('prev');
    setAnimating(true);
    setTimeout(() => {
      setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <section className="section-padding bg-white">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">Ce que disent nos clients</h2>
          <p className="text-luxury-600 max-w-2xl mx-auto">
            Découvrez l'expérience de nos clients qui ont fait confiance à notre expertise et notre savoir-faire.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="relative overflow-hidden h-[600px] md:h-[400px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 flex flex-col md:flex-row items-center gap-8 transition-all duration-500 ease-in-out ${
                  index === current 
                    ? 'opacity-100 translate-x-0' 
                    : direction === 'next'
                      ? 'opacity-0 translate-x-full'
                      : 'opacity-0 -translate-x-full'
                }`}
              >
                <div className="w-full md:w-1/2 h-64 md:h-auto">
                  <div className="relative h-full">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="h-full w-full object-cover rounded-sm"
                    />
                    <div className="absolute inset-0 bg-luxury-900/20"></div>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 text-left">
                  <Quote className="text-luxury-300 mb-4" size={48} />
                  <p className="text-luxury-800 text-lg md:text-xl italic mb-6">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-0.5 bg-luxury-400 mr-4"></div>
                    <div>
                      <h4 className="font-medium text-luxury-900">{testimonial.name}</h4>
                      <p className="text-luxury-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-luxury-300 flex items-center justify-center text-luxury-600 hover:bg-luxury-100 transition-all"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={18} />
            </button>
            
            {/* Indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === current ? 'bg-luxury-800 w-4' : 'bg-luxury-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-luxury-300 flex items-center justify-center text-luxury-600 hover:bg-luxury-100 transition-all"
              aria-label="Next testimonial"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
