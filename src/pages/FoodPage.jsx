import { useState } from 'react';
import Page from './Page.jsx';

export default function FoodPage({ foods }) {
  const [query, setQuery] = useState('');
  const visible = foods.filter(food => food[0].toLowerCase().includes(query.toLowerCase()));
  const categories = ['Protein', 'Dairy', 'Grains & carbs', 'Fruit', 'Vegetables', 'Nuts & seeds', 'Fats & other'];
  const grouped = categories.map((category, categoryIndex) => ({ category, items: visible.filter(food => food[1] === categoryIndex) })).filter(group => group.items.length);
  return <Page title="Food" eyebrow="Food items & nutritional values"><input className="food-search" placeholder="Search food items..." value={query} onChange={event => setQuery(event.target.value)} /><div className="food-list">{grouped.map(group => <section className="food-category card" key={group.category}><h3>{group.category}</h3><div className="food-table-wrap"><table className="food-table"><thead><tr><th>Food item</th><th>Quantity</th><th>Calories</th><th>Carbs</th><th>Protein</th><th>Fat</th><th>Fibre</th></tr></thead><tbody>{group.items.map(food => <tr key={food[0]}><td>{food[0]}</td><td>{food[2]}</td><td>{food[3]} Kcal</td><td>{food[5]} g</td><td>{food[4]} g</td><td>{food[7]} g</td><td>{food[6]} g</td></tr>)}</tbody></table></div></section>)}</div></Page>;
}
