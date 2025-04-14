import React from 'react';
import icon from '../assets/utils/yeezy.svg';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ProductsContainer } from '../components';
import { useQuery } from '@apollo/client';
import {
  GET_DEFAULT_TOP_PICKS,
  GET_USER_TOP_PICKS,
} from '../graphql/Queries/userQueries';
import Loading from '../assets/mui/Loading';
import { useSelector } from 'react-redux';
import MuiError from '../assets/mui/Alert';

const TopPicks = ({ cartPage }) => {
  const { userInfo } = useSelector((state) => state.user);
  const query = userInfo ? GET_USER_TOP_PICKS : GET_DEFAULT_TOP_PICKS;
  const { data, error, loading } = useQuery(query);

  const mapValue = userInfo
    ? data?.getTopPicksProducts
    : data?.getDefaultTopPicks;

  return (
    <div className="mt-10 md:mt-14 px-4 md:px-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <div className="flex items-center space-x-3">
          <img
            src={icon}
            alt="Top Pick Icon"
            className="w-10 md:w-12 rotate-45 drop-shadow"
          />
          <h3 className="text-[var(--clr-primary)] font-['Poppins'] text-2xl md:text-4xl font-extrabold tracking-tight">
            Top Picks
          </h3>
        </div>

        {/* View All Button */}
        {!cartPage && (
          <Link to="/shop">
            <p className="hidden md:flex items-center font-medium text-base md:text-lg text-[var(--clr-primary)] px-4 py-2 rounded-lg border border-[var(--clr-border)] hover:bg-[var(--clr-mocha-hover)] hover:text-[var(--clr-mocha)] transition-all duration-300 shadow-sm">
              View All <ChevronRightIcon className="ml-1" />
            </p>
          </Link>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <Loading />
      ) : error ? (
        <MuiError type="error" value="Something went wrong.." />
      ) : (
        <div
          className={`w-full overflow-x-auto whitespace-nowrap scroll-smooth px-2 py-4 rounded-2xl transition-all duration-300 ${
            cartPage
              ? 'bg-transparent shadow-none border-none'
              : 'bg-[var(--clr-white)] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[var(--clr-border)]'
          }`}
        >
          <div className="flex justify-center">
            <div className="inline-flex space-x-4 md:space-x-6 px-1">
              {mapValue?.map((item) => (
                <div
                  key={item.id}
                  className="inline-block w-60 md:w-64 flex-shrink-0"
                >
                  <ProductsContainer {...item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopPicks;
