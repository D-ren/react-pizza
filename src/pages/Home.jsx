import { useContext, useEffect, useState } from 'react';

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton'
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import axios from 'axios';

const Home = () => {
	const {searchValue} = useContext(SearchContext)
	const [items, setItems] = useState([])
  const [isLoadingPizzas, setIsLoadingPizzas] = useState(true)

	
	const {categoryId, sort, currentPage} = useSelector(state => state.filter)
	const sortType = sort.sortProperty
	const dispatch = useDispatch()

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id))
	}

	const onPageChange = number => {
		dispatch(setCurrentPage(number))
	}

  useEffect(() => {
		setIsLoadingPizzas(true)

		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		axios.get(`https://630b7052f280658a59db7646.mockapi.io/pizzas?page=${currentPage}&limit=4&
			${category}${search}&sortBy=${sortType}&order=desc	
		`)
			.then(res => {
				setItems(res.data)
				setIsLoadingPizzas(false);
			})
  }, [categoryId, sortType, searchValue, currentPage]);

	return (
		<div className='container'>
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onChangeCategory}/>
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{
					isLoadingPizzas ? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
					: items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
				}
			</div>
			<Pagination currentPage={currentPage} onPageChange={onPageChange}/>
		</div>
	)
}

export default Home