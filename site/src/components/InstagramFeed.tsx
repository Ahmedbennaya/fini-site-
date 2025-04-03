import { InstagramEmbed } from 'react-social-media-embed';

const InstagramFeed = () => (
  <section className="section-padding bg-white">
    <div className="container-luxury">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="heading-lg mb-4 slide-up">Suivez-nous sur Instagram</h2>
        <p className="text-luxury-600 slide-up stagger-1">
          Découvrez nos dernières réalisations et inspirations sur notre compte Instagram.
        </p>
      </div>

      {/* Instagram Embed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex justify-center">
          <InstagramEmbed
            url="https://www.instagram.com/reel/Co9jWavI46k/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
            width={328}
            captioned
          />
        </div>
        <div className="flex justify-center">
          <InstagramEmbed
            url="https://www.instagram.com/reel/Co63i9Ngnyh/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
            width={328}
            captioned
          />
        </div>
        <div className="flex justify-center">
          <InstagramEmbed
            url="https://www.instagram.com/reel/Cow1xvXITmI/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
            width={328}
            captioned
          />
        </div>
      </div>

      {/* Instagram CTA */}
      <div className="text-center mt-8">
        <a
          href="https://www.instagram.com/bargaoui_rideaux_tahar"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-luxury-800 font-medium hover:text-luxury-600 transition-colors"
        >
          <span>@bargaoui_rideaux_tahar</span>
        </a>
      </div>
    </div>
  </section>
);

export default InstagramFeed;