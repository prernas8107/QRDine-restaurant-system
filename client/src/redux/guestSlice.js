import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../lib/api';

const initialState = {
  sessionToken: null,
  loading: false,
  error: null,
};

//session creation thunk
export const session = createAsyncThunk('/session', async (data, thunkApi) => {
  try {
    const res = await api.post('/session', data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(
      error.response?.data?.message || error.message || 'Session creation failed'
    );
  }
});

const guestSlice = createSlice({
  name: 'guest',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(session.pending, () => {})
      .addCase(session.fulfilled, (state, action) => {
        console.log(action.payload);
        state.sessionToken = action.payload.data.sessionToken;
        localStorage.setItem('sessionToken', action.payload.data.sessionToken);
      })
      .addCase(session.rejected, () => {});
  },
});

export default guestSlice.reducer;