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
      <div 
        className="flex justify-between items-center mb-4 p-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h5 className="text-base font-medium text-gray-900">{title}</h5>
        <KeyboardArrowDownIcon 
          className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      <div className={`overflow-hidden transition-all duration-300 px-2 ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
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
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold">Đã xảy ra lỗi</h2>
          <p className="mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shop - Sneaker Shop</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-sm sticky top-8 h-fit w-full md:w-[30%] md:min-w-[300px]">
            <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-red-500 rounded"></span>
              Bộ lọc
            </h4>
            
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
              <button className="flex-1 py-3 px-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors">
                Áp dụng
              </button>
              <button className="flex-1 py-3 px-4 bg-white text-gray-900 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Đặt lại
              </button>
            </div>
          </div>

          <div className="w-full md:w-[70%]">
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
          </div>
        </div>

        <div className="flex justify-center mt-4 md:ml-40">
          <PaginationMUI page={page} getPage={getPage} numOfPages={numOfPages} />
        </div>
      </div>
    </>
  );
};

export default ShopPage;
