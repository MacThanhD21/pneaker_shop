import React from 'react';
import styled from 'styled-components';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useDispatch, useSelector } from 'react-redux';
import { addBrand, removeBrandFilter } from '../features/filterSlice';
import { useToggle } from '../utils/customHooks';

const BrandChart = () => {
  const filters = useSelector((state) => state.filter);

  const { menuState, handleToggle } = useToggle();
  const dispatch = useDispatch();

  const { brand } = filters;

  const handleSelect = (e) => {
    const name = e.target.name;
    const isChecked = e.target.checked;

    if (!isChecked) {
      dispatch(removeBrandFilter(name));
      return;
    }
    dispatch(addBrand(name));
  };

  const brands = ['Giày Dunk', 'Giày Jordan', 'Giày Yeezy', 'Giày Puma'];

  const displayBrandName = (brandName) => {
    return brandName.replace(/^Giày\s+/i, '');
  };

  return (
    <Wrapper>
      <BrandTitle>
        Brand
        {menuState ? (
          <ArrowDropUpIcon
            onClick={handleToggle}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <ArrowDropDownIcon
            onClick={handleToggle}
            style={{ cursor: 'pointer' }}
          />
        )}
      </BrandTitle>

      {menuState && (
        <BrandContainer>
          {brands.map((item) => (
            <Brand key={item}>
              <BrandInput
                name={item}
                onChange={handleSelect}
                type='checkbox'
                checked={brand === item}
              />
              <Label>{displayBrandName(item)}</Label>
            </Brand>
          ))}
        </BrandContainer>
      )}
    </Wrapper>
  );
};

export default BrandChart;

const Wrapper = styled.div`
  border-bottom: 2px solid var(--clr-border);
`;
const BrandTitle = styled.h4`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
`;

const BrandInput = styled.input`
  height: 20px;
  width: 10%;
  padding: 10px;
  accent-color: #e74c3c;
  margin-right: 10px;
  margin-bottom: 1rem;
`;

const BrandContainer = styled.div``;
const Brand = styled.div``;

const Label = styled.label`
  font-weight: 500;
`;
