import { useMemo, useState } from 'react';

const meals = ['Early Morning', 'Morning', 'Mid Afternoon', 'Lunch', 'Evening', 'Dinner'];
const categories = ['Protein', 'Dairy', 'Grains & carbs', 'Fruit', 'Vegetables', 'Nuts & seeds', 'Fats & other'];
const foods = [
  ['Tofu', 0, '100 g', 140, 15.1, 0.8, 5.9, 7.2], ['Protein powder', 0, '35 g', 136, 26, 0, 0, 0],
  ['Greek yogurt', 1, '100 g', 55, 10.8, 3.7, 0, 0.2], ['Eggs', 0, '2 eggs', 127, 12.6, 0.3, 0, 8.5],
  ['Lentils', 0, '100 g', 360, 24, 40.3, 19.3, 2.3], ['High-protein bread', 2, '2 slices', 200, 13.3, 22.2, 4.6, 7.3],
  ['Rice', 2, '100 g', 340, 7, 74, 1, 1], ['Oats', 2, '100 g', 380, 13, 55.3, 9, 10.8],
  ['Protein noodles', 2, '100 g', 344, 24.9, 50.5, 2.2, 10], ['Sweet potato', 2, '100 g', 86, 1.6, 20.1, 3, 0.1],
  ['Potato', 2, '100 g', 77, 2, 17.5, 2.2, 0.1], ['Apple', 3, '1 medium', 95, 0.5, 25.1, 4.4, 0.3],
  ['Banana', 3, '1 medium', 105, 1.3, 27, 3.1, 0.4], ['Papaya', 3, '100 g', 43, 0.5, 10.8, 1.7, 0.3],
  ['Mixed berries', 3, '100 g', 50, 0.7, 12, 5, 0.3], ['Strawberries', 3, '100 g', 32, 0.7, 7.7, 2, 0.3],
  ['Carrot', 4, '100 g', 41, 0.9, 9.6, 2.8, 0.2], ['Green beans', 4, '100 g', 31, 1.8, 7, 2.7, 0.1],
  ['Broccoli', 4, '100 g', 34, 2.8, 6.6, 2.6, 0.4], ['Cabbage', 4, '100 g', 25, 1.3, 5.8, 2.5, 0.1],
  ['Cauliflower', 4, '100 g', 25, 1.9, 5, 2, 0.3], ['Spinach', 4, '100 g', 23, 2.9, 3.6, 2.2, 0.4],
  ['Pumpkin', 4, '100 g', 26, 1, 6.5, 0.5, 0.1], ['Tomato', 4, '100 g', 18, 0.9, 3.9, 1.2, 0.2],
  ['Chia seeds', 5, '100 g', 437, 23.8, 3.1, 33.2, 29.8], ['Pumpkin seeds', 5, '100 g', 559, 30.2, 10.7, 6, 49.1],
  ['Almonds', 5, '1 almond', 7, 0.25, 0.25, 0.15, 0.6], ['Olive oil', 6, '15 ml', 121, 0.2, 0, 0, 13.8],
  ['Honey', 6, '25 g', 84, 0, 20.5, 0, 0],
];
const initialPlan = [[ ], [['Greek yogurt', 1]], [['Honey', 1]], [['Tofu', 1], ['Rice', 1], ['Lentils', 1], ['Olive oil', 1]], [['Oats', 1], ['Greek yogurt', 1]], [['Protein noodles', 1], ['Tofu', 1]]];
const toPlan = () => initialPlan.map((items) => items.map(([name, quantity]) => ({ food: foods.findIndex(([foodName]) => foodName === name), quantity })));
const totals = (items) => items.reduce((result, item) => { const food = foods[item.food]; return food ? [0, 1, 2, 3, 4].map((i) => result[i] + food[i + 3] * item.quantity) : result; }, [0, 0, 0, 0, 0]);
const format = (value) => Math.round(value * 10) / 10;

export default function App() {
  const [tab, setTab] = useState('plan'); const [goal, setGoal] = useState(1600); const [plan, setPlan] = useState(toPlan); const [picker, setPicker] = useState(null);
  const day = useMemo(() => totals(plan.flat()), [plan]);
  const updateMeal = (meal, update) => setPlan((current) => current.map((items, index) => index === meal ? update(items) : items));
  return <main>
    <header className="row"><h1>Vegetarian nutrition planner</h1><span className="muted">Saved on this device</span></header>
    <nav className="tabs">{['plan', 'vitamins', 'tracker', 'foods'].map((name) => <button className={tab === name ? 'active' : ''} onClick={() => setTab(name)} key={name}>{name[0].toUpperCase() + name.slice(1)}</button>)}</nav>
    {tab === 'plan' && <PlanView day={day} goal={goal} setGoal={setGoal} plan={plan} add={setPicker} remove={(meal, item) => updateMeal(meal, (items) => items.filter((_, index) => index !== item))} />}
    {tab === 'vitamins' && <section className="card"><div className="big">Vitamins & minerals</div><p className="muted">Micronutrient tracking is ready to extend with the full nutrition database.</p></section>}
    {tab === 'tracker' && <section className="card"><div className="big">Daily tracker</div><p className="muted">Today: {Math.round(day[0])} kcal · {format(day[1])} g protein</p><button className="primary">Submit day</button></section>}
    {tab === 'foods' && <FoodTable />}
    {picker !== null && <FoodPicker onClose={() => setPicker(null)} add={(food) => { updateMeal(picker, (items) => [...items, { food, quantity: 1 }]); setPicker(null); }} />}
  </main>;
}

function PlanView({ day, goal, setGoal, plan, add, remove }) {
  const metrics = [['Calories', Math.round(day[0]), `${goal} kcal`], ['Protein', format(day[1]), '100 g'], ['Carbs', format(day[2]), 'g'], ['Fibre', format(day[3]), 'g'], ['Fat', format(day[4]), 'g']];
  return <><section className="card"><div className="metric-grid">{metrics.map(([label, value, target]) => <div className="metric" key={label}><strong>{value}</strong><span>{label} / {target}</span></div>)}</div><div className="bar"><i style={{ width: `${Math.min(100, day[0] / goal * 100)}%` }} /></div><div className="row"><span className={Math.abs(day[0] - goal) <= goal * .05 ? 'ok' : 'bad'}>{Math.round(Math.abs(day[0] - goal))} kcal {day[0] < goal ? 'still to add' : 'over'}</span><button>Auto-fit</button></div></section>{plan.map((items, meal) => <section className="card" key={meals[meal]}><div className="row"><h2>{meals[meal]}</h2><span className="muted">{Math.round(totals(items)[0])} kcal</span></div>{items.map((item, index) => <div className="item row" key={`${item.food}-${index}`}><span>{foods[item.food][0]} <span className="muted">{foods[item.food][2]}</span></span><button onClick={() => remove(meal, index)}>✕</button></div>)}<div className="item"><button onClick={() => add(meal)}>+ Add foods</button></div></section>)}<section className="card muted">Daily calorie goal <input type="number" value={goal} onChange={(event) => setGoal(Number(event.target.value) || 1600)} /> kcal · Daily protein target 100 g</section></>;
}

function FoodTable() { return <section className="card scroll"><table><thead><tr><th>Food</th><th>Serving</th><th>Calories</th><th>Protein</th><th>Carbs</th><th>Fibre</th><th>Fat</th></tr></thead><tbody>{foods.map((food) => <tr key={food[0]}><td>{food[0]}</td><td>{food[2]}</td><td>{food[3]}</td><td>{food[4]} g</td><td>{food[5]} g</td><td>{food[6]} g</td><td>{food[7]} g</td></tr>)}</tbody></table></section>; }
function FoodPicker({ onClose, add }) { const [filter, setFilter] = useState('all'); const visible = foods.filter((food) => filter === 'all' || food[1] === Number(filter)); return <div className="modal" onClick={(event) => event.target === event.currentTarget && onClose()}><div className="sheet"><div className="row"><h2>Add food</h2><select value={filter} onChange={(event) => setFilter(event.target.value)}><option value="all">All categories</option>{categories.map((category, index) => <option value={index} key={category}>{category}</option>)}</select></div>{visible.map((food) => <button className="food-line" key={food[0]} onClick={() => add(foods.indexOf(food))}><span>{food[0]} <span className="muted">{food[2]}</span></span><span className="muted">{food[3]} kcal</span></button>)}<button onClick={onClose}>Cancel</button></div></div>; }
