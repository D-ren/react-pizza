import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

type FetchPizzasArgs = Record<string, string>

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>('pizza/fetchPizzas', async (params) => {
    const {category, search, currentPage, sortType} = params;
    const {data} = await axios.get<Pizza[]>(
      `https://630b7052f280658a59db7646.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=desc&${search}`
    )

    return data;
  }
)

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

type Pizza = {
  id: string,
  title: string,
  price: number,
  imageUrl: string,
  sizes: number[],
  types: number[],
  rating: number
}

interface PizzaSliceState {
  items: Pizza[],
  status: Status
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload
		}
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  }
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer