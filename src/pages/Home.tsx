import { FC, useEffect } from 'react';
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton'
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { RootState, useAppDispatch } from '../redux/store';

const Home: FC = () => {
	const {items, status} = useSelector((state: RootState) => state.pizza)
	const {categoryId, sort, currentPage, searchValue} = useSelector((state: RootState) => state.filter)
	const sortType = sort.sortProperty
	const dispatch = useAppDispatch()

	const onChangeCategory = (id: number) => {
		dispatch(setCategoryId(id))
	}

	const onPageChange = (page: number) => {
		dispatch(setCurrentPage(page))
	}

	const getPizzas = async () => {
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `search=${searchValue}` : ''

		dispatch(fetchPizzas({category, search, currentPage: String(currentPage), sortType}))
  };

	useEffect(() => {
		getPizzas()
	}, [categoryId, sortType, searchValue, currentPage])

	const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
	const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj}/>)

	return (
		<div className='container'>
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onChangeCategory}/>
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
				{
					status === 'error' ? (<h2>Произошла ошибка</h2>) : (
						<div className="content__items">
							{
								status === 'loading' ? skeletons : pizzas
							}
						</div>
					)	
				}

			<Pagination currentPage={currentPage} onPageChange={onPageChange}/>
		</div>
	)
}

export default Home