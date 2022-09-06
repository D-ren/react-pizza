import { useContext } from 'react';
import { SearchContext } from '../../App';
import styles from './Search.module.scss'

const Search = () => {
	const {searchValue, setSearchValue} = useContext(SearchContext)

	return (
		<input
			value={searchValue} 
			className={styles.root} 
			placeholder='Поиск пиццы'
			onChange={event => setSearchValue(event.target.value)}
		/>
	)
}

export default Search;