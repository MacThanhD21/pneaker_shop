import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { ClickAwayListener } from '@mui/material';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_BY_TITLE } from '../graphql/Queries/productQueries';

const SearchBar = ({ display }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showNoResults, setShowNoResults] = useState(false);

  const { data: searchData } = useQuery(GET_PRODUCTS_BY_TITLE, {
    variables: { searchQuery: searchValue },
    skip: !searchValue,
  });

  const onChange = (e) => {
    setSearchValue(e.target.value);
  };

  const closeDropDown = () => {
    setFilteredData([]);
    setSearchValue('');
    setShowNoResults(false);
  };

  useEffect(() => {
    if (searchValue === '') {
      setFilteredData([]);
      setShowNoResults(false);
    } else {
      setFilteredData(searchData?.getProductsByTitle || []);
      setShowNoResults(searchValue.length > 0 && (!searchData?.getProductsByTitle || searchData.getProductsByTitle.length === 0));
    }
  }, [searchData?.getProductsByTitle, searchValue]);

  return (
    <Wrapper display={display}>
      <InputContainer>
        <IconContainer>
          <SearchIcon />
        </IconContainer>
        <Input
          type='text'
          value={searchValue}
          placeholder='Search for brand or model'
          data={searchData}
          onChange={onChange}
        />
      </InputContainer>
      {(filteredData?.length > 0 || showNoResults) && (
        <ClickAwayListener onClickAway={closeDropDown}>
          <ResultContainer empty={showNoResults}>
            {filteredData?.length > 0 ? (
              filteredData?.map((value, index) => (
                <Result key={index}>
                  <Link to={`/shop/${value.id}`}>{value.title}</Link>
                </Result>
              ))
            ) : (
              <NoResults>Không có sản phẩm nào</NoResults>
            )}
          </ResultContainer>
        </ClickAwayListener>
      )}
    </Wrapper>
  );
};

export default SearchBar;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: ${(props) => (props.display ? 'flex' : 'none')};
  margin: 1rem 0;
`;
const InputContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 400px;
`;
const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 15px;
  color: #db7093;
  z-index: 1;
`;
const Input = styled.input`
  background: linear-gradient(to right, #fff5f5, #ffe4e1);
  border: 2px solid #db7093;
  border-radius: 12px;
  font-size: 16px;
  padding: 12px 20px 12px 45px;
  width: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(219, 112, 147, 0.1);

  &:focus {
    outline: none;
    border-color: #e75480;
    box-shadow: 0 4px 8px rgba(219, 112, 147, 0.2);
  }

  &::placeholder {
    color: #db7093;
    opacity: 0.7;
    font-size: 14px;
  }
`;
const ResultContainer = styled.div`
  height: ${props => props.empty ? 'auto' : '20vh'};
  background: linear-gradient(to bottom, #fff5f5, #ffe4e1);
  box-shadow: 0 4px 15px rgba(219, 112, 147, 0.2);
  width: 100%;
  max-width: 400px;
  margin-top: 0.5rem;
  border-radius: 10px;
  overflow: hidden;
  overflow-y: scroll;
  z-index: 1;
  border: 1px solid rgba(219, 112, 147, 0.2);

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #db7093;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }
`;
const Result = styled.p`
  margin: 0;
  padding: 12px 20px;
  font-size: 14px;
  display: flex;
  color: #e75480;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(219, 112, 147, 0.1);

  &:last-child {
    border-bottom: none;
  }

  a {
    color: #e75480;
    text-decoration: none;
    width: 100%;
    transition: all 0.3s ease;

    &:hover {
      color: #db7093;
      transform: translateX(5px);
    }
  }

  &:hover {
    background-color: rgba(219, 112, 147, 0.1);
  }
`;

const NoResults = styled.div`
  padding: 1.5rem;
  text-align: center;
  color: #666;
  font-size: 0.95rem;
  font-weight: 500;
`;
