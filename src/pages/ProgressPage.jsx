import Page from './Page.jsx';

const point = (value, min, max, height) => height - ((value - min) / Math.max(1, max - min)) * height;

function AnalyticsChart({ logs }) {
  if (!logs.length) return <div className="chart-empty">Submit your first day from Home to start tracking calories and weight.</div>;
  const width = 680; const height = 210; const padding = 28;
  const calories = logs.map(log => log.calories); const weights = logs.map(log => log.weight);
  const calorieMin = Math.min(...calories, 0); const calorieMax = Math.max(...calories, 1600); const weightMin = Math.min(...weights) - 1; const weightMax = Math.max(...weights) + 1;
  const x = index => padding + (index * (width - padding * 2)) / Math.max(1, logs.length - 1);
  const caloriePoints = logs.map((log, index) => `${x(index)},${point(log.calories, calorieMin, calorieMax, height - padding)}`).join(' ');
  const weightPoints = logs.map((log, index) => `${x(index)},${point(log.weight, weightMin, weightMax, height - padding)}`).join(' ');
  return <div className="analytics"><div className="chart-legend"><span><i className="legend-calories" /> Calories</span><span><i className="legend-weight" /> Weight</span></div><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Calories and weight over submitted days"><line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} className="chart-axis" /><polyline points={caloriePoints} className="chart-line chart-calories" /><polyline points={weightPoints} className="chart-line chart-weight" />{logs.map((log, index) => <g key={log.date}><circle cx={x(index)} cy={point(log.calories, calorieMin, calorieMax, height - padding)} r="4" className="chart-dot chart-calories" /><circle cx={x(index)} cy={point(log.weight, weightMin, weightMax, height - padding)} r="4" className="chart-dot chart-weight" /></g>)}</svg><div className="chart-labels">{logs.map(log => <small key={log.date}>{log.label.split(',').slice(0, 2).join(',')}</small>)}</div></div>;
}

export default function ProgressPage({ logs }) {
  return <Page title="Progress" eyebrow="Your consistency at a glance"><h3 className="analytics-title">Analytics</h3><AnalyticsChart logs={logs} /><h3>Submitted days</h3>{logs.length ? <div className="submitted-days">{logs.slice().reverse().map(log => <div className="submitted-day" key={log.date}><b>{log.label}</b><span>{log.calories} Kcal</span><span>{log.weight} kg</span></div>)}</div> : <p className="muted">No submitted days yet.</p>}</Page>;
}
