import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../lib/api';

// Fetch all menu items
export const fetchMenuItems = createAsyncThunk(
  'menu/fetchMenuItems',
  async (category, thunkApi) => {
    try {
      // Fetch full menu so client has complete catalog for instant search & filtering
      const res = await api.get('/menu?limit=100');
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch menu items'
      );
    }
  }
);

const filterDishes = (masterList, selectedCategory, searchQuery) => {
  const query = (searchQuery || '').toLowerCase().trim();
  let list = masterList || [];

  if (query) {
    // If user is searching, search across the entire catalog for matching name, description, or category
    return list.filter(
      (item) =>
        item.name?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query)
    );
  }

  if (selectedCategory && selectedCategory !== 'All') {
    list = list.filter((item) => item.category === selectedCategory);
  }

  return list;
};

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menuItems: [],
    allMenuItems: [], // Full catalog
    masterMenuItems: [], // Master copy of all dishes
    categories: ['All'],
    loading: false,
    error: null,
    selectedCategory: 'All',
    searchQuery: '',
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      // Clear search when selecting a new category
      state.searchQuery = '';
      state.menuItems = filterDishes(
        state.masterMenuItems,
        action.payload,
        ''
      );
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.menuItems = filterDishes(
        state.masterMenuItems,
        state.selectedCategory,
        action.payload
      );
    },
    clearMenuItems: (state) => {
      state.menuItems = [];
      state.allMenuItems = [];
      state.masterMenuItems = [];
      state.categories = ['All'];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.loading = false;
        const dishes = action.payload.data || [];
        state.masterMenuItems = dishes;
        state.allMenuItems = dishes;

        // Extract unique categories
        const uniqueCategories = [
          'All',
          ...new Set(dishes.map((item) => item.category).filter(Boolean)),
        ];
        state.categories = uniqueCategories;

        // Apply filtering
        state.menuItems = filterDishes(
          dishes,
          state.selectedCategory,
          state.searchQuery
        );
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default menuSlice.reducer;
export const { setSelectedCategory, setSearchQuery, clearMenuItems } =
  menuSlice.actions;




// 100 api => 100 refresh() ;

//request 

// url request method alag - alag

//response common