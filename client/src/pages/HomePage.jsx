import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/client';
import { GET_ACTIVE_BANNERS } from '../graphql/Queries/bannerQueries';
import { Header, Navbar, TopPicks, FeaturedCollections, BrandShowcase, NewArrivals, SpecialOffers, CustomerReviews, ShoeCareTips, Newsletter, FadeInSection, Footer, PopupBanner, SummerCollectionBanner, LimitedEditionBanner, TrendingBanner } from '../components';
import Loading from '../assets/mui/Loading';
import MuiError from '../assets/mui/Alert';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { loading, error, data } = useQuery(GET_ACTIVE_BANNERS);

  useEffect(() => {
    if (data?.getActiveBanners) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % data.getActiveBanners.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [data]);

  const handleImageClick = (banner) => {
    setSelectedImage(banner);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  if (loading) return <Loading />;
  if (error) return <MuiError message={error.message} />;

  const banners = data?.getActiveBanners || [];

  return (
    <>
      <Helmet>
        <title>Pneaker Shop - Home</title>
        <meta name="description" content="Welcome to Pneaker Shop - Your Ultimate Sneaker Destination" />
      </Helmet>

      {/* <PopupBanner /> */}
      <main className='section-center'>
        <Navbar />
        <div className="banner relative overflow-hidden w-full h-[250px] md:h-[300px] lg:h-[350px]">
          <div 
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {banners.map((banner) => (
              <div key={banner.id} className="w-full flex-shrink-0 h-full">
                <div 
                  onClick={() => handleImageClick(banner)}
                  className="block h-full cursor-pointer"
                >
                  <img 
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4 lg:p-5">
                    <div className="flex justify-between items-end">
                      <div>
                        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-1">{banner.title}</h2>
                        {banner.description && (
                          <p className="text-xs md:text-sm lg:text-base text-white/90">{banner.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Fixed position button */}
          <div className="absolute bottom-3 md:bottom-4 lg:bottom-5 right-3 md:right-4 lg:right-5 z-10">
            <a 
              href="/shop" 
              className="inline-block bg-white text-black px-4 py-2 rounded-md text-sm md:text-base font-medium hover:bg-gray-100 transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              Khám phá ngay
            </a>
          </div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Modal for full-size image */}
        {showModal && selectedImage && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <div 
              className="relative max-w-7xl max-h-[90vh] w-full"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
                {selectedImage.description && (
                  <p className="text-white/90">{selectedImage.description}</p>
                )}
              </div>
            </div>
          </div>
        )}

        <Header />
        
        <section aria-label="Top Picks">
          <FadeInSection>
            <TopPicks />
          </FadeInSection>
        </section>

        <section aria-label="Brand Showcase">
          <FadeInSection delay={0.15}>
            <BrandShowcase />
          </FadeInSection>
        </section>

        <section aria-label="New Arrivals">
          <FadeInSection delay={0.2}>
            <NewArrivals />
          </FadeInSection>
        </section>

        <section aria-label="Special Offers">
          <FadeInSection delay={0.25}>
            <SpecialOffers />
          </FadeInSection>
        </section>

        <section aria-label="Customer Reviews">
          <FadeInSection delay={0.3}>
            <CustomerReviews />
          </FadeInSection>
        </section>

        <section aria-label="Shoe Care Tips">
          <FadeInSection delay={0.35}>
            <ShoeCareTips />
          </FadeInSection>
        </section>

        <section aria-label="Newsletter">
          <FadeInSection delay={0.4}>
            <Newsletter />
          </FadeInSection>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default HomePage;
