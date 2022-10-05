import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Sort = {
	name: string,
	sortProperty: 'rating' | 'price' | 'title',
}

interface FilterSliceState {
	searchValue: string,
  categoryId: number,
	currentPage: number,
	sort: Sort,
}

const initialState: FilterSliceState = {
	searchValue: '',
  categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности',
		sortProperty: 'rating'
	}
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload
		},
		setSort(state, action: PayloadAction<Sort>) {
			state.sort = action.payload
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload
		}
  },
})

export const { setCategoryId, setSort, setCurrentPage, setSearchValue } = filterSlice.actions

export default filterSlice.reducer