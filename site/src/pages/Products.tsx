import { useState, useEffect } from 'react';
import { CheckCircle2, ChevronRight, Filter, X, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO'; // Importing the SEO component

// Mock product categories
const categories = [
  { id: 'all', name: 'categories.all' },
  { id: 'premium', name: 'categories.premium' },
  { id: 'classic', name: 'categories.classic' },
  { id: 'voilages', name: 'categories.voilages' },
  { id: 'textiles', name: 'categories.textiles' },
  { id: 'tringles-rideaux', name: 'categories.tringles-rideaux' }, // New category
  { id: 'embrasses-rideaux', name: 'categories.embrasses-rideaux' }, // New category
  { id: 'accessoires-rideaux', name: 'categories.accessoires-rideaux' } // New category
];

// Mock materials
const materials = [
  { id: 'all-materials', name: 'materials.all' },
  { id: 'velours', name: 'materials.velours' },
  { id: 'soie', name: 'materials.soie' },
  { id: 'lin', name: 'materials.lin' },
  { id: 'coton', name: 'materials.coton' },
  { id: 'synthetique', name: 'materials.synthetique' },
  { id: 'tringles-rideaux', name: 'materials.tringles-rideaux' }, // New material
  { id: 'embrasses-rideaux', name: 'materials.embrasses-rideaux' }, // New material
  { id: 'accessoires-rideaux', name: 'materials.accessoires-rideaux' } // New material
];

// Mock product data
const products = [
  {
    id: 1,
    name: 'Velours Royal',
    description: 'Un velours épais qui apporte chaleur et élégance à votre espace.',
    price: '150 DT / m', // Updated price
    image: 'https://www.247curtains.co.uk/media/catalog/product/m/t/mtm_curtain_cyrus_crushed_velvet_royal_blue_cutout_pdp_1.jpg',
    category: 'premium',
    material: 'velours'
  },
  {
    id: 2,
    name: 'Soie Lumineuse',
    description: 'Rideau en soie pure avec des reflets lumineux qui subliment la lumière naturelle.',
    price: '450 DT / m²', // Updated price
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ1URjns2D0rYBqD1b_Anf0piSnkXlC4gjCdBuxPFGgtenR5U7j_Y4Cf0m0M1aoLTb1PU&usqp=CAU',
    category: 'premium',
    material: 'soie'
  },
  {
    id: 3,
    name: 'Lin Contemporain',
    description: 'Un lin de qualité supérieure pour un style contemporain et intemporel.',
    price: '270 DT / m', // Updated price
    image: 'https://i.etsystatic.com/11003179/r/il/8189ae/6109438072/il_340x270.6109438072_pvh7.jpg',
    category: 'classic',
    material: 'lin'
  },
  {
    id: 4,
    name: 'Voilage Élégance',
    description: 'Voilage délicat qui filtre la lumière tout en préservant votre intimité.',
    price: '225 DT / m', // Updated price
    image: 'https://www.bouchara.com/media/catalog/product/0/9/09009652_2010_2_3.jpg?quality=100&bg-color=255,255,255&fit=bounds&height=655&width=475&canvas=475:655',
    category: 'voilages',
    material: 'synthetique'
  },
  {
    id: 5,
    name: 'Coton Naturel',
    description: 'Rideau en coton naturel, idéal pour un style épuré et écologique.',
    price: '255 DT / m', // Updated price
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSavzkeyoIuwWRoAlgbDzV1ExCLXlW2nkiA6Qxp-E_QYX_3_x6lH_c7Scmio6epP7d_NbE&usqp=CAU',
    category: 'classic',
    material: 'coton'
  },
  {
    id: 6,
    name: 'Textile Jacquard',
    description: 'Textile d\'ameublement avec motifs jacquard pour un intérieur sophistiqué.',
    price: '390 DT / m', // Updated price
    image: 'https://sino-silk.com/wp-content/uploads/2024/01/what-is-jacquard-fabric-1.jpeg',
    category: 'Jacquard',
    material: 'Jacquard'
  },{
    id: 7,
    name: 'Tringle Élégante',
    description: 'Tringle en métal robuste pour un support élégant et durable.',
    price: '390 DT / m', 
    image: 'https://www.cdiscount.com/pdt2/0/4/0/4/700x700/dou1725321076040/rw/douceur-d-interieur-kit-de-tringle-a-rideaux-ext.jpg',
    category: 'tringles-rideaux',
    material: 'tringles-rideaux'
  },
  {
    id: 8,
    name: 'Embrasse Classique',
    description: 'Embrasse en tissu raffiné pour une touche élégante à vos rideaux.',
    price: '390 DT / m', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfGd8B_ybeSVI5WO2SlO1Cse7crN-9V91inVDFIaFvng6cGu9LzmP6hRxrrKtiz4e_N1A&usqp=CAU',
    category: 'embrasses-rideaux',
    material: 'embrasses-rideaux'
  },
  {
    id: 9,
    name: 'accessoires-rideaux',
    description: 'Anneaux en plastique résistant pour un accrochage facile et discret.',
    price: '390 DT / m', 
    image: 'https://ae01.alicdn.com/kf/H5e046594f1414527888f8092898cdbd0t.jpg',
    category: 'accessoires-rideaux',
    material: 'accessoires-rideaux'
  }
  
];

const Products = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('all-materials');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState<number[]>([]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const productId = parseInt(entry.target.id.replace('product-', ''));
            setVisibleProducts(prev => [...prev, productId]);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all product elements
    document.querySelectorAll('[id^="product-"]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Filter products based on selected category, material, and search query
  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const materialMatch = selectedMaterial === 'all-materials' || product.material === selectedMaterial;
    const searchMatch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && materialMatch && searchMatch;
  });

  // Dynamic SEO title, description, and image based on search query
  const seoTitle = searchQuery
    ? `${searchQuery} | Bargaoui Rideaux Tahar`
    : 'Produits | Bargaoui Rideaux Tahar';
  const seoDescription = searchQuery
    ? `Découvrez les produits correspondant à "${searchQuery}" dans notre collection de rideaux de luxe, voilages, et textiles d'ameublement.`
    : "Découvrez notre collection de rideaux de luxe, voilages, et textiles d'ameublement sur mesure. Qualité exceptionnelle et savoir-faire artisanal tunisien.";
  const seoImage =
    filteredProducts.length > 0
      ? filteredProducts[0].image
      : 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=2574&auto=format&fit=crop';

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Produits | Bargaoui Rideaux Tahar",
    "description": seoDescription,
    "itemListElement": filteredProducts.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": product.name,
      "image": product.image,
      "url": `/products/${product.id}`,
    })),
  };



  return (
    <main className="pt-24">
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords="rideaux de luxe, voilages, textiles d'ameublement, Bargaoui Rideaux, Tunisie"
        canonicalUrl="/products"
        imageUrl={seoImage}
        schemaData={schemaData}
      />

      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-luxury-950/40 mix-blend-multiply z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=2574&auto=format&fit=crop" 
            alt="Collections Bargaoui Rideaux"
            className="object-cover object-center w-full h-full"
          />
        </div>
        
        <div className="container-luxury relative z-20">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 border border-white/20 text-white/80 uppercase tracking-wider text-xs mb-6 slide-up">
              {t('navigation.products')}
            </span>
            <h1 className="heading-xl text-white mb-6 slide-up stagger-1">
              {t('products.title')}
            </h1>
            <p className="text-white/90 text-lg mb-10 max-w-xl slide-up stagger-2">
              {t('products.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container-luxury">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Desktop Filters */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-4">{t('products.categories')}</h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full text-left px-4 py-2 rounded-sm transition-all ${
                            selectedCategory === category.id
                              ? 'bg-luxury-100 text-luxury-900 font-medium'
                              : 'text-luxury-600 hover:bg-luxury-50'
                          }`}
                        >
                          {t(category.name)}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-4">{t('products.materials')}</h3>
                  <ul className="space-y-2">
                    {materials.map((material) => (
                      <li key={material.id}>
                        <button
                          onClick={() => setSelectedMaterial(material.id)}
                          className={`w-full text-left px-4 py-2 rounded-sm transition-all ${
                            selectedMaterial === material.id
                              ? 'bg-luxury-100 text-luxury-900 font-medium'
                              : 'text-luxury-600 hover:bg-luxury-50'
                          }`}
                        >
                          {t(material.name)}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-4">{t('products.needHelp')}</h3>
                  <p className="text-luxury-600 mb-4">
                    {t('products.expertsAvailable')}
                  </p>
                  <Link 
                    to={`/categories/${selectedCategory}`}
                    className="btn-luxury-outline w-full flex justify-center"
                  >
                    {t('buttons.viewDetails')}
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Mobile Filters Button */}
            <div className="lg:hidden flex items-center justify-between mb-6">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center px-4 py-2 border border-luxury-200 rounded-sm text-luxury-800"
              >
                <Filter size={18} className="mr-2" />
                {t('products.filters')}
              </button>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('products.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-luxury-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-luxury-500 focus:border-luxury-500 w-full"
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-400" />
              </div>
            </div>
            
            {/* Mobile Filters Sidebar */}
            <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${mobileFiltersOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-luxury-950/50 backdrop-blur-sm"
                onClick={() => setMobileFiltersOpen(false)}
              ></div>
              
              {/* Sidebar content */}
              <div className={`absolute top-0 right-0 w-80 h-full bg-white shadow-xl transform transition-transform duration-300 ${mobileFiltersOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 h-full overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-medium">{t('products.filters')}</h3>
                    <button 
                      onClick={() => setMobileFiltersOpen(false)}
                      className="text-luxury-600"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="mb-8">
                    <div className="relative mb-6">
                      <input
                        type="text"
                        placeholder={t('products.search')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-luxury-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-luxury-500 focus:border-luxury-500 w-full"
                      />
                      <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-400" />
                    </div>
                    
                    <h4 className="font-medium mb-3">{t('products.categories')}</h4>
                    <ul className="space-y-2 mb-6">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <button
                            onClick={() => setSelectedCategory(category.id)}
                            className={`w-full text-left px-4 py-2 rounded-sm transition-all ${
                              selectedCategory === category.id
                                ? 'bg-luxury-100 text-luxury-900 font-medium'
                                : 'text-luxury-600 hover:bg-luxury-50'
                            }`}
                          >
                            {t(category.name)}
                          </button>
                        </li>
                      ))}
                    </ul>
                    
                    <h4 className="font-medium mb-3">{t('products.materials')}</h4>
                    <ul className="space-y-2">
                      {materials.map((material) => (
                        <li key={material.id}>
                          <button
                            onClick={() => setSelectedMaterial(material.id)}
                            className={`w-full text-left px-4 py-2 rounded-sm transition-all ${
                              selectedMaterial === material.id
                                ? 'bg-luxury-100 text-luxury-900 font-medium'
                                : 'text-luxury-600 hover:bg-luxury-50'
                            }`}
                          >
                            {t(material.name)}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-auto">
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="btn-luxury w-full"
                    >
                      {t('buttons.applyFilters')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="flex-1">
              {/* Desktop Search Bar */}
              <div className="hidden lg:flex justify-between items-center mb-8">
                <div className="relative w-80">
                  <input
                    type="text"
                    placeholder={t('products.search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-luxury-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-luxury-500 focus:border-luxury-500 w-full"
                  />
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-400" />
                </div>
                
                <div className="text-luxury-600">
                  {filteredProducts.length} {filteredProducts.length === 1 
                    ? t('products.results') 
                    : t('products.results_plural')}
                </div>
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center">
                  <h3 className="text-xl font-medium mb-4">{t('products.noProductsFound')}</h3>
                  <p className="text-luxury-600 mb-6">
                    {t('products.tryModifying')}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedMaterial('all-materials');
                      setSearchQuery('');
                    }}
                    className="btn-luxury-outline"
                  >
                    {t('buttons.resetFilters')}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id}
                      id={`product-${product.id}`}
                      className={`glass rounded-sm overflow-hidden group transition-all duration-500 ${
                        visibleProducts.includes(product.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                      }`}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-medium">{product.name}</h3>
                          <span className="text-luxury-800 font-medium">{product.price}</span>
                        </div>
                        <p className="text-luxury-600 mb-4">{product.description}</p>
                        <Link
                          to={`/materials/${product.material}`}
                          className="text-luxury-800 flex items-center group"
                        >
                          <span className="border-b border-luxury-300 group-hover:border-luxury-800 transition-all">
                            {t('buttons.viewDetails')}
                          </span>
                          <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-secondary">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1 border border-luxury-200 text-luxury-600 uppercase tracking-wider text-xs mb-6 slide-up">
                {t('products.customService')}
              </span>
              <h2 className="heading-lg mb-6 slide-up stagger-1">
                {t('products.cantFind')}
              </h2>
              <p className="text-luxury-600 mb-6 slide-up stagger-2">
                {t('products.customDescription')}
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start slide-up stagger-3">
                  <div className="mr-4 mt-1">
                    <CheckCircle2 className="text-luxury-800" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-luxury-900">{t('products.customConsultation')}</h4>
                    <p className="text-luxury-600">{t('products.consultationDesc')}</p>
                  </div>
                </li>
                
                <li className="flex items-start slide-up stagger-4">
                  <div className="mr-4 mt-1">
                    <CheckCircle2 className="text-luxury-800" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-luxury-900">{t('products.customFabrication')}</h4>
                    <p className="text-luxury-600">{t('products.fabricationDesc')}</p>
                  </div>
                </li>
                
                <li className="flex items-start slide-up stagger-5">
                  <div className="mr-4 mt-1">
                    <CheckCircle2 className="text-luxury-800" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-luxury-900">{t('products.professionalInstallation')}</h4>
                    <p className="text-luxury-600">{t('products.installationDesc')}</p>
                  </div>
                </li>
              </ul>
              
              <Link 
                to="/contact" 
                className="btn-luxury inline-block slide-up stagger-6"
              >
                {t('buttons.requestQuote')}
              </Link>
            </div>
            
            <div className="relative slide-up">
              <img 
                src="https://images.unsplash.com/photo-1575329133220-8507848a835d?q=80&w=2574&auto=format&fit=crop" 
                alt="Service sur mesure" 
                className="rounded-sm shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-sm shadow-xl max-w-xs">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} filled={true} />
                    ))}
                  </div>
                  <span className="ml-2 text-luxury-800 font-medium">5.0</span>
                </div>
                <p className="text-luxury-600 italic text-sm">
                  "Un service exceptionnel et des rideaux magnifiques qui ont transformé mon salon. Merci à toute l'équipe !"
                </p>
                <p className="text-luxury-800 font-medium text-sm mt-2">- Sophie Laurent</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// Star component for ratings
const Star = ({ filled }: { filled: boolean }) => (
  <svg 
    className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
    />
  </svg>
);

export default Products;
