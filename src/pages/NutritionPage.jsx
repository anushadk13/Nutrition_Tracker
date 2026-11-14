import { useState } from 'react';
import Page from './Page.jsx';

const mealNames = ['Early Morning', 'Morning', 'Afternoon', 'Lunch', 'Evening', 'Dinner', 'Before Bedtime'];
const mealTimes = ['6:30 AM', '8:30 AM', '11:30 AM', '2:00 PM', '4:30 PM', '7:30 PM', '9:30 PM'];
const format = value => Math.round(value * 10) / 10;
const amountDetails = value => { const match = String(value).match(/^([\d.]+)\s*(.*)$/); return match ? { amount: Number(match[1]), unit: match[2] } : { amount: 1, unit: value }; };
const totals = (items, foods) => items.reduce((result, item) => {
  const food = foods[item.food];
  return food ? [0, 1, 2, 3, 4].map(index => result[index] + food[index + 3] * item.quantity) : result;
}, [0, 0, 0, 0, 0]);

export default function NutritionPage({ day, goals, plan, foods, add, updateQuantity, setQuantity, duplicate, remove }) {
  const [duplicateTargets, setDuplicateTargets] = useState({});
  const mealIcons = ['☀', '☀', '◒', '🥗', '☕', '☾', '✦'];
  return <Page title="Today's Meal Plan" eyebrow="Plan your meals for the day" className="nutrition-page">
    <div className="nutrition-remaining"><span>🔥</span><b>{Math.max(0, goals.calories - Math.round(day[0]))}</b> Kcal remaining</div>
    <div className="nutrition-top-stats"><div><b>{format(day[1])} g</b><small>Protein</small></div><div><b>{format(day[2])} g</b><small>Carbs</small></div><div><b>{format(day[4])} g</b><small>Fat</small></div><div><b>{format(day[3])} g</b><small>Fibre</small></div></div>
    <div className="nutrition-meals">{plan.map((items, meal) => {
      const mealTotals = totals(items, foods);
      const target = duplicateTargets[meal] ?? (meal === 4 ? 0 : 4);
      return <article className="nutrition-meal" key={meal}><div className="nutrition-meal-heading"><div className="meal-heading-copy"><span className="meal-icon">{mealIcons[meal]}</span><div><b>{mealNames[meal]}</b><small>{mealTimes[meal]}</small></div></div><strong>{Math.round(mealTotals[0])} Kcal</strong></div>{items.length ? items.map((item, itemIndex) => { const details = amountDetails(foods[item.food][2]); return <div className="nutrition-food" key={`${item.food}-${itemIndex}`}><div className="nutrition-food-info"><span>{foods[item.food][0]}</span><small>P {format(foods[item.food][4] * item.quantity)} g · C {format(foods[item.food][5] * item.quantity)} g</small></div><div className="quantity-controls" aria-label={`Adjust quantity of ${foods[item.food][0]}`}><button onClick={() => updateQuantity(meal, itemIndex, -1)} aria-label={`Decrease ${foods[item.food][0]} quantity`}>−</button><input type="number" min="0.1" step="1" value={format(details.amount * item.quantity)} onChange={event => setQuantity(meal, itemIndex, Number(event.target.value) / details.amount)} aria-label={`${foods[item.food][0]} amount`} /><span>{details.unit}</span><button onClick={() => updateQuantity(meal, itemIndex, 1)} aria-label={`Increase ${foods[item.food][0]} quantity`}>+</button></div><button className="remove-food" onClick={() => remove(meal, itemIndex)} aria-label={`Remove ${foods[item.food][0]}`}>×</button></div>; }) : <div className="empty-meal"><span>🍴</span><p>No foods planned yet.</p></div>}<div className="nutrition-meal-footer"><span className="nutrition-meal-macros">P {format(mealTotals[1])} g &nbsp; C {format(mealTotals[2])} g &nbsp; F {format(mealTotals[4])} g</span><div className="meal-actions"><button onClick={() => add(meal)}>＋ Add Food</button><select value={target} onChange={event => setDuplicateTargets(current => ({ ...current, [meal]: Number(event.target.value) }))} aria-label={`Choose meal to duplicate ${mealNames[meal]} to`}>{mealNames.map((name, index) => <option value={index} disabled={index === meal} key={name}>{name}</option>)}</select><button onClick={() => duplicate(meal, target)} disabled={target === meal}>▣ &nbsp;Duplicate</button></div></div></article>;
    })}</div>
  </Page>;
}
