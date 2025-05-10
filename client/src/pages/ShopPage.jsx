import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  BrandChart,
  ColorChart,
  Navbar,
  PriceChart,
  ProductList,
  ShopHeader,
  SizeChart,
  Filter,
  Sort,
  ViewToggle,
} from '../components';
import { GET_PRODUCTS_PAGINATION } from '../graphql/Queries/productQueries';
import Loading from '../assets/mui/Loading';
import MuiError from '../assets/mui/Alert';
import { PaginationMUI } from '../assets/mui/PaginationMUI';
import { Helmet } from 'react-helmet-async';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const FilterSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="mb-6 pb-6 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0">
      <button 
        className="w-full flex justify-between items-center mb-4 p-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`filter-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <h5 className="text-base font-medium text-gray-900">{title}</h5>
        <KeyboardArrowDownIcon 
          className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      <div 
        id={`filter-${title.toLowerCase().replace(/\s+/g, '-')}`}
        className={`overflow-hidden transition-all duration-300 px-2 ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}
      >
        {children}
      </div>
    </div>
  );
};

const ShopPage = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);

  const { size, brand, price, sort, color } = useSelector(
    (state) => state.filter
  );

  const getPage = (value) => {
    setPage(value);
  };

  const { data, loading, error } = useQuery(GET_PRODUCTS_PAGINATION, {
    variables: {
      page,
      productsFiltersInput: {
        size,
        color,
        brand,
        price,
        sort,
        rates: filteredProducts?.rates,
      },
    },
    fetchPolicy: 'network-only',
  });

  const products = data?.getProductsPagination?.products;
  const numOfPages = data?.getProductsPagination?.numOfPages;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [products]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    if (size || brand || color || price.length > 0) {
      setPage(1);
    }
  }, [size, brand, color, price.length]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" role="status" aria-label="Loading products">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-red-500" aria-hidden="true"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center" role="alert">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold">Đã xảy ra lỗi</h2>
          <p className="mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  // Generate schema markup for the product list
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products?.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.title,
        "image": product.image,
        "description": product.description,
        "brand": {
          "@type": "Brand",
          "name": product.brand
        },
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "VND",
          "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        }
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>Shop Premium Sneakers & Athletic Shoes | Browse Our Collection</title>
        <meta name="description" content="Explore our extensive collection of premium sneakers and athletic shoes. Filter by size, brand, color, and price to find your perfect pair. Free shipping on all orders." />
        <meta name="keywords" content="sneakers, athletic shoes, premium footwear, sports shoes, running shoes, basketball shoes, lifestyle sneakers" />
        <link rel="canonical" href="https://yourdomain.com/shop" />
        
        {/* Schema.org markup for Product List */}
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <aside className="bg-white p-6 rounded-xl shadow-sm sticky top-8 h-fit w-full md:w-[30%] md:min-w-[300px]" aria-label="Product filters">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-red-500 rounded" aria-hidden="true"></span>
              Bộ lọc
            </h2>
            
            <FilterSection title="Kích cỡ">
              <SizeChart />
            </FilterSection>

            <FilterSection title="Thương hiệu">
              <BrandChart />
            </FilterSection>

            <FilterSection title="Giá">
              <PriceChart />
            </FilterSection>

            <FilterSection title="Màu sắc">
              <ColorChart />
            </FilterSection>

            <div className="flex gap-4 mt-6 px-2">
              <button 
                className="flex-1 py-3 px-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                aria-label="Apply filters"
              >
                Áp dụng
              </button>
              <button 
                className="flex-1 py-3 px-4 bg-white text-gray-900 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                aria-label="Reset filters"
              >
                Đặt lại
              </button>
            </div>
          </aside>

          <section className="w-full md:w-[70%]" aria-label="Product listing">
            <ShopHeader filteredProducts={filteredProducts} />
            {products?.length < 1 ? (
              <MuiError
                width='40%'
                type='warning'
                alignItems='center'
                value={'No product is matching your result'}
              />
            ) : (
              <div>
                <ProductList
                  data={data}
                  filteredProducts={filteredProducts}
                  error={error}
                />
              </div>
            )}
          </section>
        </div>

        <nav className="flex justify-center mt-4 md:ml-40" aria-label="Product pagination">
          <PaginationMUI page={page} getPage={getPage} numOfPages={numOfPages} />
        </nav>
      </main>
    </>
  );
};

export default ShopPage;
