import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import React from 'react';
export const PriceSlider = ({ value, onChangeCommitted, onChange }) => {
  return (
    <Box sx={{ width: '100%', color: '#e45d5d' }}>
      <Slider
        sx={{
          color: '#e45d5d',
          height: '0.5vh',
          width: '100%',
        }}
        value={value}
        min={100000}
        max={5000000}
        step={50000}
        onChange={onChange}
        onChangeCommitted={onChangeCommitted}
        valueLabelDisplay='auto'
      />
    </Box>
  );
};
