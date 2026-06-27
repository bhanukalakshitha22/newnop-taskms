import { Link } from 'react-router-dom';
import type { Task } from '../types';

function formatDate(iso?: string | null) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function TaskCard({ task }: { task: Task }) {
  return (
    <Link to={`/tasks/${task._id}`} className="task-card" style={{ color: 'inherit', textDecoration: 'none' }}>
      <div className="chips-row">
        <span className={`chip chip-priority-${task.priority}`}>{task.priority}</span>
        <span className={`chip chip-status-${task.status.replace(' ', '.')}`}>{task.status}</span>
      </div>
      <h3>{task.title}</h3>
      <p className="desc">{task.description?.slice(0, 120) || 'No description.'}</p>
      <div className="meta">
        Due {formatDate(task.dueDate)} · Assigned to {task.assignedTo?.name ?? 'unassigned'}
      </div>
    </Link>
  );
}
