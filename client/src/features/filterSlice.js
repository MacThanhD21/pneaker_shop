import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    size: null,
    brand: null,
    price: [],
    sort: null,
    color: null,
    searchQuery: '',
    gridView: true,
    listView: false,
    mobileMenu: false,
  },

  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addSize: (state, action) => {
      state.size = action.payload;
    },
    addBrand: (state, action) => {
      state.brand = action.payload;
    },
    addColor: (state, action) => {
      state.color = action.payload;
    },
    addPrice: (state, action) => {
      state.price = action.payload;
    },
    addSort: (state, action) => {
      state.sort = action.payload;
    },
    toggleListView: (state) => {
      state.listView = true;
      state.gridView = false;
    },
    toggleGridView: (state) => {
      state.gridView = true;
      state.listView = false;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenu = !state.mobileMenu;
    },
    clearFilters: (state) => {
      state.size = null;
      state.brand = null;
      state.price = [];
      state.sort = null;
      state.color = null;
      state.searchQuery = '';
    },
    removeSizeFilter: (state, action) => {
      state.size = null;
    },
    removePriceFilter: (state) => {
      state.price = [];
    },
    removeBrandFilter: (state, action) => {
      state.brand = null;
    },
    removeColorFilter: (state, action) => {
      state.color = null;
    },
  },
});

export const {
  setSearchQuery,
  addSize,
  addBrand,
  addPrice,
  addSort,
  addColor,
  toggleListView,
  toggleGridView,
  toggleMobileMenu,
  clearFilters,
  removeSizeFilter,
  removePriceFilter,
  removeBrandFilter,
  removeColorFilter,
  clearAllBrand,
} = filterSlice.actions;

export default filterSlice.reducer;
