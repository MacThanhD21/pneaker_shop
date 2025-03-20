export const formatVNDPrice = (price) => {
  if (!price) return '0 ₫';
  
  // Convert to number and round to 2 decimal places
  const numPrice = parseFloat(price).toFixed(0);
  
  // Split the number into groups of 3 from right to left
  const formattedPrice = numPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
  return `${formattedPrice} ₫`;
}; 