import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';
import styles from './Search.module.scss'

const Search = () => {
	const dispatch = useDispatch()
	const [value, setValue] = useState('')

	const updateSearchValue = useCallback(
		debounce(str => {
			dispatch(setSearchValue(str))
		}, 600),
		[]
	);

	const onChangeInput = event => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	}

	return (
		<input
			value={value} 
			className={styles.root} 
			placeholder='Поиск пиццы'
			onChange={event => onChangeInput(event)}
		/>
	)
}

export default Search;