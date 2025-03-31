import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FeaturedCollections = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerSlide = 3;
    const collections = [
        {
            id: 1,
            title: "Summer Vibes",
            description: "Giày thể thao mùa hè",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3",
            link: "/collections/summer"
        },
        {
            id: 2,
            title: "Street Style",
            description: "Giày sneaker thời trang",
            image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3",
            link: "/collections/street"
        },
        {
            id: 3,
            title: "Running",
            description: "Giày chạy bộ chuyên nghiệp",
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3",
            link: "/collections/running"
        },
        {
            id: 4,
            title: "Basketball",
            description: "Giày bóng rổ chuyên nghiệp",
            image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3",
            link: "/collections/basketball"
        },
        {
            id: 5,
            title: "Tennis",
            description: "Giày tennis đẳng cấp",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3",
            link: "/collections/tennis"
        },
        {
            id: 6,
            title: "Football",
            description: "Giày đá bóng chuyên nghiệp",
            image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3",
            link: "/collections/football"
        },
        {
            id: 7,
            title: "Golf",
            description: "Giày golf cao cấp",
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3",
            link: "/collections/golf"
        },
        {
            id: 8,
            title: "Skateboarding",
            description: "Giày trượt ván thời trang",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3",
            link: "/collections/skateboarding"
        },
        {
            id: 9,
            title: "Hiking",
            description: "Giày leo núi chuyên dụng",
            image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3",
            link: "/collections/hiking"
        },
        {
            id: 10,
            title: "Training",
            description: "Giày tập luyện đa năng",
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3",
            link: "/collections/training"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex >= collections.length - itemsPerSlide ? 0 : prevIndex + itemsPerSlide
            );
        }, 3000);

        return () => clearInterval(timer);
    }, [collections.length, itemsPerSlide]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex >= collections.length - itemsPerSlide ? 0 : prevIndex + itemsPerSlide
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex <= 0 ? collections.length - itemsPerSlide : prevIndex - itemsPerSlide
        );
    };

    return (
        <Section>
            <SectionTitle>Bộ Sưu Tập Nổi Bật</SectionTitle>
            <SliderContainer>
                <SliderWrapper>
                    <SliderTrack style={{ transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)` }}>
                        {collections.map((collection) => (
                            <CollectionCard key={collection.id}>
                                <CollectionImage src={collection.image} alt={collection.title} />
                                <CollectionInfo>
                                    <h3>{collection.title}</h3>
                                    <p>{collection.description}</p>
                                    <StyledLink to={collection.link}>
                                        <Button>Xem Thêm</Button>
                                    </StyledLink>
                                </CollectionInfo>
                            </CollectionCard>
                        ))}
                    </SliderTrack>
                    <NavButton prev onClick={prevSlide}>❮</NavButton>
                    <NavButton next onClick={nextSlide}>❯</NavButton>
                    <DotsContainer>
                        {Array.from({ length: Math.ceil(collections.length / itemsPerSlide) }).map((_, index) => (
                            <Dot
                                key={index}
                                active={index === Math.floor(currentIndex / itemsPerSlide)}
                                onClick={() => setCurrentIndex(index * itemsPerSlide)}
                            />
                        ))}
                    </DotsContainer>
                </SliderWrapper>
            </SliderContainer>
        </Section>
    );
};

export default FeaturedCollections;

const Section = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(to bottom, #fff5f5, #ffe4e1);
  overflow: hidden;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #db7093;
  margin-bottom: 3rem;
  text-shadow: 2px 2px 4px rgba(219, 112, 147, 0.2);
`;

const SliderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
`;

const SliderWrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding: 0 40px;
`;

const SliderTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
`;

const CollectionCard = styled.div`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(219, 112, 147, 0.2);
  transition: all 0.3s ease;
  flex: 0 0 calc(100% / 3);
  margin: 0 10px;

  @media (max-width: 1024px) {
    flex: 0 0 calc(100% / 2);
  }

  @media (max-width: 768px) {
    flex: 0 0 100%;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(219, 112, 147, 0.3);
  }
`;

const CollectionImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${CollectionCard}:hover & {
    transform: scale(1.05);
  }
`;

const CollectionInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    margin-bottom: 1rem;
    opacity: 0.9;
  }
`;

const Button = styled.button`
  background: linear-gradient(45deg, #db7093, #e75480);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(219, 112, 147, 0.3);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(219, 112, 147, 0.8);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    background: rgba(219, 112, 147, 1);
  }

  ${props => props.prev ? 'left: 0;' : 'right: 0;'}
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#db7093' : '#ddd'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #db7093;
  }
`; 