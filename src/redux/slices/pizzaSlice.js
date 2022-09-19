import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzas', async (params) => {
    const {category, search, currentPage, sortType} = params;
    const {data} = await axios.get(
      `https://630b7052f280658a59db7646.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=desc&${search}`
    )

    return data
  }
)

const initialState = {
  items: [],
  status: '', // loading | success | error
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
		setItems(state, action) {
			state.items = action.payload
		}
  },
  extraReducers: {
    [fetchPizzas.pending] (state) {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled] (state, action) {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected] (state) {
      state.items = [];
      state.status = 'error';
    }
  }
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer