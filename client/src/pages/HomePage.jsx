import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/client';
import { GET_ACTIVE_BANNERS } from '../graphql/Queries/bannerQueries';
import { Header, Navbar, TopPicks, FeaturedCollections, BrandShowcase, NewArrivals, SpecialOffers, CustomerReviews, ShoeCareTips, Newsletter, FadeInSection, Footer, PopupBanner, SummerCollectionBanner, LimitedEditionBanner, TrendingBanner } from '../components';
import Loading from '../assets/mui/Loading';
import MuiError from '../assets/mui/Alert';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { loading, error, data } = useQuery(GET_ACTIVE_BANNERS);

  useEffect(() => {
    if (data?.getActiveBanners) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % data.getActiveBanners.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [data]);

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
        <div className="banner relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {banners.map((banner) => (
              <div key={banner.id} className="w-full flex-shrink-0">
                <a href={banner.link || '#'} className="block">
                  <img 
                    src={banner.image}
                    alt={banner.title}
                    className="w-full max-h-[500px] object-cover object-top"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h2 className="text-2xl font-bold text-white mb-2">{banner.title}</h2>
                    {banner.description && (
                      <p className="text-white/90">{banner.description}</p>
                    )}
                  </div>
                </a>
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
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
