import React from 'react';
import { FaInstagram, FaFacebook, FaTiktok, FaPinterest } from 'react-icons/fa';

const InstagramFeed = () => {
  const socialMedia = [
    {
      platform: 'Instagram',
      username: '@bargaoui_rideaux_tahar',
      url: 'https://www.instagram.com/bargaoui_rideaux_tahar',
      icon: <FaInstagram className="text-4xl mb-4" />,
      color: 'from-purple-500 to-pink-500',
      hoverColor: 'hover:from-purple-600 hover:to-pink-600'
    },
    {
      platform: 'Facebook',
      username: 'Bargaoui Rideaux',
      url: 'https://www.facebook.com/Bargaoui.Rideaux.Tahar',
      icon: <FaFacebook className="text-4xl mb-4" />,
      color: 'from-blue-600 to-blue-800',
      hoverColor: 'hover:from-blue-700 hover:to-blue-900'
    },
    {
      platform: 'TikTok',
      username: '@bargaoui_rideaux',
      url: 'https://www.tiktok.com/@bargaouirideaux',
      icon: <FaTiktok className="text-4xl mb-4" />,
      color: 'from-black to-gray-800',
      hoverColor: 'hover:from-black hover:to-gray-900'
    },
    {
      platform: 'Pinterest',
      username: 'bargaouirideaux',
      url: 'https://www.pinterest.com/BargaouiRideauxTahar/',
      icon: <FaPinterest className="text-4xl mb-4" />,
      color: 'from-red-600 to-red-800',
      hoverColor: 'hover:from-red-700 hover:to-red-900'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="heading-lg mb-4 slide-up">Suivez-nous sur les réseaux sociaux</h2>
          <p className="text-luxury-600 slide-up stagger-1">
            Découvrez nos dernières réalisations et restez connectés avec nous sur tous nos réseaux sociaux.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialMedia.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block rounded-lg p-8 text-center text-white bg-gradient-to-br ${social.color} ${social.hoverColor} transition-all transform hover:scale-105 hover:shadow-xl`}
            >
              <div className="flex flex-col items-center justify-center">
                {social.icon}
                <h3 className="text-xl font-bold mb-2">{social.platform}</h3>
                <p className="text-sm">{social.username}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Recent Posts Preview - Optional */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Nos publications récentes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* First Image Card */}
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow w-full h-full">
              <img 
                src="https://oehbiqlfllyxpueofuob.supabase.co/storage/v1/object/public/products//Design%20sans%20titre%20(17).png" 
                alt="Publication récente" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Second Image Card */}
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow w-full h-full">
              <img 
                src="https://oehbiqlfllyxpueofuob.supabase.co/storage/v1/object/public/products//Design%20sans%20titre%20(18).png" 
                alt="Publication récente" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Third Image Card */}
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow w-full h-full">
              <img 
                src="https://oehbiqlfllyxpueofuob.supabase.co/storage/v1/object/public/products//Design%20sans%20titre%20(19).png" 
                alt="Publication récente" 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Fourth Image Card */}
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow w-full h-full">
              <img 
                src="https://oehbiqlfllyxpueofuob.supabase.co/storage/v1/object/public/products//Design%20sans%20titre%20(20).png" 
                alt="Publication récente" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>

        {/* Global CTA */}
        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/bargaoui_rideaux_tahar"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-luxury-800 text-white rounded-md hover:bg-luxury-700 transition-colors inline-flex items-center font-medium"
          >
            <span>Suivez toutes nos activités</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;