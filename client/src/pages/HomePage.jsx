import React from 'react';
import { Header, Navbar, TopPicks, FeaturedCollections, BrandShowcase, NewArrivals, SpecialOffers, CustomerReviews, ShoeCareTips, Newsletter, FadeInSection, Footer, PopupBanner, SummerCollectionBanner, LimitedEditionBanner, TrendingBanner } from '../components';

const HomePage = () => {
  return (
    <>
      {/* <PopupBanner /> */}
      <main className='section-center'>
        <Navbar />
        <Header />
        <FadeInSection>
          <TopPicks />
        </FadeInSection>
        {/* <FadeInSection delay={0.1}>
          <FeaturedCollections />
        </FadeInSection> */}
        <FadeInSection delay={0.15}>
          <BrandShowcase />
        </FadeInSection>
        <FadeInSection delay={0.2}>
          <NewArrivals />
        </FadeInSection>
        <FadeInSection delay={0.25}>
          <SpecialOffers />
        </FadeInSection>
        <FadeInSection delay={0.3}>
          <CustomerReviews />
        </FadeInSection>
        <FadeInSection delay={0.35}>
          <ShoeCareTips />
        </FadeInSection>
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
