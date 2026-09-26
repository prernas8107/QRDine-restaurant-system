import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../lib/api';

export const login = createAsyncThunk('/auth/login', async (data, thunkApi) => {
  try {
    const res = await api.post('/auth/login', data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(
      error.response?.data?.message || error.message || 'Login failed'
    );
  }
});

export const register = createAsyncThunk(
  '/auth/register',
  async (data, thunkApi) => {
    try {
      const res = await api.post('/auth/register', data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message || 'Registration failed'
      );
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: null,
    name: localStorage.getItem('name') || null,
    role: localStorage.getItem('role') || null,
    email: null,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: null,
  },
  reducers: {
    logout: (state) => {
      state.name = null;
      state.email = null;
      state.role = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('name');
      localStorage.removeItem('role');
      localStorage.removeItem('refreshToken');
      state.refreshToken = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.name = action.payload.data.name;
        state.email = action.payload.data.email;
        state.accessToken = action.payload.accessToken;
        state.role = action.payload.data.role;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        localStorage.setItem('role', action.payload.data.role);
        localStorage.setItem('name', action.payload.data.name);
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// console.log(authSlice);

export default authSlice.reducer;
export const { logout } = authSlice.actions;
//auth //tables //menu
//authSlice
//tableSlice
//menuSlice =>