import debounce from 'lodash.debounce';
import { useCallback, useContext, useState } from 'react';
import { SearchContext } from '../../App';
import styles from './Search.module.scss'

const Search = () => {
	const {setSearchValue} = useContext(SearchContext)
	const [value, setValue] = useState('')

	const updateSearchValue = useCallback(
		debounce(str => {
			setSearchValue(str)
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