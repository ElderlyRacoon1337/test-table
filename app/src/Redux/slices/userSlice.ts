import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type UserParams = {
  currentPage: number;
  perPage: number;
  sortBy: 'id' | 'title' | 'body' | '';
  searchValue: string;
};

export const getData = createAsyncThunk<User[]>('user', async () => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts`
  );
  return data;
});

export const getPage = createAsyncThunk<User[], UserParams>(
  'user/getPage',
  async (params) => {
    const { currentPage, perPage, sortBy, searchValue } = params;
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?q=${searchValue}&_limit=${perPage}&_page=${currentPage}&_sort=${sortBy}&_order=${
        sortBy == 'id' ? 'desc' : ''
      }`
    );
    return data;
  }
);

interface User {
  id: number;
  title: string;
  body: string;
}

interface UserState {
  data: User[];
  currentPage: number;
  perPage: number;
  totalCount: number;
  searchValue: string;
}

const initialState: UserState = {
  data: [],
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  searchValue: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.totalCount = action.payload.length;
    });

    builder.addCase(getPage.pending, (state) => {
      state.data = [];
    });
    builder.addCase(getPage.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getPage.rejected, (state) => {
      state.data = [];
    });
  },
});

export const { setCurrentPage, setSearchValue } = userSlice.actions;

export default userSlice.reducer;
