import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { PriceSlider } from '../assets/mui/PriceSlider';
import { useDispatch } from 'react-redux';
import { addPrice } from '../features/filterSlice';
import { useToggle } from '../utils/customHooks';
import { formatVNDPrice } from '../utils/formatPrice';

const PriceChart = () => {
  const [sliderValue, setSliderValue] = useState([100000, 5000000]);
  const dispatch = useDispatch();
  const { menuState, handleToggle } = useToggle();

  const handlePriceSlider = (e) => {
    setSliderValue(e.target.value);
  };

  const handleCommit = () => {
    dispatch(addPrice(sliderValue));
  };

  return (
    <Wrapper>
      <SizeTitle>
        Price Range
        {menuState ? (
          <ArrowDropUpIcon
            style={{ cursor: 'pointer' }}
            onClick={handleToggle}
          />
        ) : (
          <ArrowDropDownIcon
            style={{ cursor: 'pointer' }}
            onClick={handleToggle}
          />
        )}
      </SizeTitle>
      {menuState && (
        <div>
          <PriceContainer>
            <Price>{formatVNDPrice(100000)}</Price>
            <Price>{formatVNDPrice(5000000)}</Price>
          </PriceContainer>
          <PriceSlider
            value={sliderValue}
            onChange={handlePriceSlider}
            onChangeCommitted={handleCommit}
            min={100000}
            max={5000000}
            step={100000}
          />
          <InputContainer>
            <InputGroup>
              <Label>From</Label>
              <PriceInput 
                value={formatVNDPrice(sliderValue[0])}
                readOnly
              />
            </InputGroup>
            <InputGroup>
              <Label>To</Label>
              <PriceInput 
                value={formatVNDPrice(sliderValue[1])}
                readOnly
              />
            </InputGroup>
          </InputContainer>
        </div>
      )}
    </Wrapper>
  );
};

export default PriceChart;

const Wrapper = styled.div`
  border-bottom: 2px solid var(--clr-border);
  padding: 1rem 0;
`;

const SizeTitle = styled.h4`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  margin-bottom: 1.5rem;
  color: var(--clr-primary-2);
  font-size: 1.1rem;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Price = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--clr-gray-2);
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const Label = styled.label`
  color: var(--clr-gray-2);
  font-size: 0.9rem;
  font-weight: 500;
`;

const PriceInput = styled.input`
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--clr-border);
  padding: 0.5rem;
  font-size: 0.9rem;
  background-color: var(--clr-white);
  color: var(--clr-gray-2);
`;
