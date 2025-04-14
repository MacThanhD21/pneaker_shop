import React, { useState, useEffect } from 'react';
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
        <section className="py-16 px-8 bg-gradient-to-b from-pink-50 to-rose-50 overflow-hidden">
            <h2 className="text-4xl font-bold text-center text-rose-600 mb-12">
                Bộ Sưu Tập Nổi Bật
            </h2>
            <div className="max-w-7xl mx-auto px-4 relative">
                <div className="relative overflow-hidden px-10">
                    <div 
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)` }}
                    >
                        {collections.map((collection) => (
                            <div 
                                key={collection.id}
                                className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-shrink-0 w-1/3 mx-2"
                            >
                                <img 
                                    src={collection.image} 
                                    alt={collection.title}
                                    className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                                    <h3 className="text-2xl font-semibold mb-2">{collection.title}</h3>
                                    <p className="text-base mb-4 opacity-90">{collection.description}</p>
                                    <Link to={collection.link} className="no-underline">
                                        <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                                            Xem Thêm
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-rose-500/80 text-white flex items-center justify-center hover:bg-rose-500 transition-colors duration-300"
                    >
                        ❮
                    </button>
                    <button 
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-rose-500/80 text-white flex items-center justify-center hover:bg-rose-500 transition-colors duration-300"
                    >
                        ❯
                    </button>
                </div>
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: Math.ceil(collections.length / itemsPerSlide) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index * itemsPerSlide)}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                index === Math.floor(currentIndex / itemsPerSlide) 
                                    ? 'bg-rose-500' 
                                    : 'bg-gray-300 hover:bg-rose-300'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollections;