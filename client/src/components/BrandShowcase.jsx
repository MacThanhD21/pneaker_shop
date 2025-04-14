import React from 'react';

const BrandShowcase = () => {
  const brands = [
    {
      id: 1,
      name: "Nike",
      logo: "https://cdn-icons-png.flaticon.com/512/732/732084.png",
      website: "https://www.nike.com"
    },
    {
      id: 2,
      name: "Adidas",
      logo: "https://cdn-icons-png.flaticon.com/512/731/731962.png",
      website: "https://www.adidas.com"
    },
    {
      id: 3,
      name: "Puma",
      logo: "https://cdn-icons-png.flaticon.com/512/731/731966.png",
      website: "https://www.puma.com"
    },
    {
      id: 4,
      name: "New Balance",
      logo: "https://cdn-icons-png.flaticon.com/512/731/731964.png",
      website: "https://www.newbalance.com"
    },
    {
      id: 5,
      name: "Converse",
      logo: "https://cdn-icons-png.flaticon.com/512/731/731965.png",
      website: "https://www.converse.com"
    }
  ];

  return (
    <section className="py-16 px-8 bg-white">
      <h2 className="text-4xl text-pink-600 text-center mb-12 font-bold drop-shadow-md">
        Thương Hiệu Hợp Tác
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
        {brands.map((brand) => (
          <a 
            href={brand.website} 
            key={brand.id} 
            target="_blank" 
            rel="noopener noreferrer"
            className="no-underline group"
          >
            <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <img 
                src={brand.logo} 
                alt={brand.name}
                className="w-32 h-16 object-contain mb-4 grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <h3 className="text-pink-600 text-lg font-medium text-center">
                {brand.name}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default BrandShowcase; 