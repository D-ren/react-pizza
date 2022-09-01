import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock';
import { useEffect, useState } from 'react';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton'

const Home = ({searchValue}) => {
	const [items, setItems] = useState([])
  const [isLoadingPizzas, setIsLoadingPizzas] = useState(true)
	const [categoryId, setCategoryId] = useState(0)
	const [sortType, setSortType] = useState({
		name: 'популярности',
		sortProperty: 'rating'
	})

  useEffect(() => {
		setIsLoadingPizzas(true)

		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

    fetch(`https://630b7052f280658a59db7646.mockapi.io/pizzas?
			${category}${search}&sortBy=${sortType.sortProperty}&order=desc	
		`)
      .then(res => res.json())
      .then(arr => {
        setItems(arr);
        setIsLoadingPizzas(false);
      })
		
		window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue]);

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
		</div>
	)
}

export default Home