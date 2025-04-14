import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from '@mui/icons-material';
import { ClickAwayListener } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_BY_TITLE } from '../graphql/Queries/productQueries';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../features/filterSlice';

const SearchBar = ({ display }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showNoResults, setShowNoResults] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: searchData, loading } = useQuery(GET_PRODUCTS_BY_TITLE, {
    variables: { searchQuery: searchValue },
    skip: !searchValue,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      dispatch(setSearchQuery(searchValue));
      navigate('/shop');
    }
  };

  const onChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    
    if (value === '') {
      setFilteredData([]);
      setShowNoResults(false);
    }
  };

  useEffect(() => {
    if (searchData?.getProductsByTitle) {
      setFilteredData(searchData.getProductsByTitle);
      setShowNoResults(searchData.getProductsByTitle.length === 0);
    }
  }, [searchData]);

  const closeDropDown = () => {
    setFilteredData([]);
    setSearchValue('');
    setShowNoResults(false);
  };

  return (
    <div className={`w-full max-w-md ${!display && 'hidden'}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex w-full items-center">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchValue}
            onChange={onChange}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 shadow-sm transition-all duration-200 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100 hover:border-gray-300"
          />
          <button
            type="submit"
            className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 text-white transition-all duration-200 hover:bg-red-600 hover:shadow-md"
          >
            <SearchIcon style={{ fontSize: '18px' }} />
          </button>
        </div>

        {(filteredData?.length > 0 || showNoResults || loading) && (
          <ClickAwayListener onClickAway={closeDropDown}>
            <div className="absolute left-0 right-0 top-full mt-1.5 max-h-[40vh] w-full overflow-y-auto rounded-lg bg-white p-2 shadow-lg ring-1 ring-gray-100">
              {loading ? (
                <div className="py-2 text-center text-sm text-gray-500">Đang tìm kiếm...</div>
              ) : filteredData?.length > 0 ? (
                filteredData.map((product, index) => (
                  <Link
                    key={index}
                    to={`/shop/${product.id}`}
                    className="flex items-center gap-3 rounded-lg p-2.5 transition-all duration-200 hover:bg-gray-50"
                  >
                    <img
                      src={product.image || '/placeholder.jpg'}
                      alt={product.title}
                      className="h-12 w-12 rounded-lg object-cover shadow-sm"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-800">{product.title}</h3>
                      <p className="text-xs font-semibold text-red-500">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(product.price)}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="py-2 text-center text-sm text-gray-500">Không có sản phẩm nào</div>
              )}
            </div>
          </ClickAwayListener>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
