import debounce from 'lodash.debounce';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/filter/slice';
import styles from './Search.module.scss'

const Search: FC = () => {
	const dispatch = useDispatch()
	const [value, setValue] = useState('')

	const updateSearchValue = useCallback(
		debounce((str: any) => {
			dispatch(setSearchValue(str))
		}, 600),
		[]
	);

	const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
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