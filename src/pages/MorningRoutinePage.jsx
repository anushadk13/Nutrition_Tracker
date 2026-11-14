import Page from './Page.jsx';

export default function MorningRoutinePage({ activities, toggleActivity }) {
  return <Page title="Routine" eyebrow="Stay consistent with your plan">
    <p className="routine-note">A simple morning reset to help you begin the day feeling fresh, grounded, and consistent.</p>
    <div className="morning-routine-list">{activities.map((activity, index) => <button className="page-activity" key={activity.name} onClick={() => toggleActivity(index)}>
      <b>{activity.name}</b><span>{activity.duration ? `${activity.duration} min` : 'Daily'}</span><i>{activity.complete ? 'Completed ✓' : 'Mark complete'}</i>
    </button>)}</div>
    <h3>Daily reminders</h3>
    <p className="muted">Drink water throughout the day, complete your 10,000–12,000 steps, and take supplements as planned.</p>
  </Page>;
}
