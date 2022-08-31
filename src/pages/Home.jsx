import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock';
import { useEffect, useState } from 'react';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton'

const Home = () => {
	const [items, setItems] = useState([])
  const [isLoadingPizzas, setIsLoadingPizzas] = useState(true)

  useEffect(() => {
    fetch('https://630b7052f280658a59db7646.mockapi.io/pizzas')
      .then(res => res.json())
      .then(arr => {
        setItems(arr);
        setIsLoadingPizzas(false);
      })
  }, []);

	return (
		<>
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{
					isLoadingPizzas ? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
					: items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
				}
			</div>
		</>
	)
}

export default Home