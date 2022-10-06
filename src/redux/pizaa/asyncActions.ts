import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchPizzasArgs, Pizza } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>('pizza/fetchPizzas', async (params) => {
	const {category, search, currentPage, sortType} = params;
	const {data} = await axios.get<Pizza[]>(
		`https://630b7052f280658a59db7646.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=desc&${search}`
	)

	return data;
}
)