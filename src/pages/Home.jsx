import { useContext, useEffect, useState } from 'react';

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton'
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
	const {searchValue} = useContext(SearchContext)
	const [items, setItems] = useState([])
  const [isLoadingPizzas, setIsLoadingPizzas] = useState(true)
	const [categoryId, setCategoryId] = useState(0)
	const [sortType, setSortType] = useState({
		name: 'популярности',
		sortProperty: 'rating'
	})
	const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
		setIsLoadingPizzas(true)

		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

    fetch(`https://630b7052f280658a59db7646.mockapi.io/pizzas?page=${currentPage}&limit=4&
			${category}${search}&sortBy=${sortType.sortProperty}&order=desc	
		`)
      .then(res => res.json())
      .then(arr => {
        setItems(arr);
        setIsLoadingPizzas(false);
      })
  }, [categoryId, sortType, searchValue, currentPage]);

	return (
		<div className='container'>
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)}/>
				<Sort value={sortType} onChangeSort={(id) => setSortType(id)}/>
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{
					isLoadingPizzas ? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
					: items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
				}
			</div>
			<Pagination onPageChange={num => setCurrentPage(num)}/>
		</div>
	)
}

export default Home