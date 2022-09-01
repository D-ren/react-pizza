import styles from './Search.module.scss'

const Search = ({searchValue, setSearchValue}) => {
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