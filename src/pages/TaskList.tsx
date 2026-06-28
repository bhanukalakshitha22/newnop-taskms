import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tasksApi, TaskListFilters } from '../api/tasks';
import type { Task } from '../types';
import { TaskCard } from '../components/TaskCard';
import { FilterBar } from '../components/FilterBar';

export function TaskList() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<TaskListFilters>({});

  useEffect(() => {
    const handle = setTimeout(() => {
      setLoading(true);
      tasksApi
        .list(filters)
        .then(setTasks)
        .catch((e) => setError(e?.response?.data?.message ?? 'Failed to load tasks'))
        .finally(() => setLoading(false));
    }, 200);
    return () => clearTimeout(handle);
  }, [filters]);

  const counts = useMemo(() => {
    const c = { Open: 0, 'In Progress': 0, Testing: 0, Done: 0 } as Record<string, number>;
    for (const t of tasks) c[t.status] = (c[t.status] ?? 0) + 1;
    return c;
  }, [tasks]);

  return (
    <>
      <div className="page-header">
        <h1>Tasks</h1>
        <button className="btn-primary" onClick={() => navigate('/tasks/new')}>+ New task</button>
      </div>

      <div className="stats-row">
        <div className="stat-card"><span className="stat-num">{tasks.length}</span><span className="stat-label">Total</span></div>
        <div className="stat-card stat-open"><span className="stat-num">{counts.Open}</span><span className="stat-label">Open</span></div>
        <div className="stat-card stat-inprogress"><span className="stat-num">{counts['In Progress']}</span><span className="stat-label">In Progress</span></div>
        <div className="stat-card stat-testing"><span className="stat-num">{counts.Testing}</span><span className="stat-label">Testing</span></div>
        <div className="stat-card stat-done"><span className="stat-num">{counts.Done}</span><span className="stat-label">Done</span></div>
      </div>

      <FilterBar value={filters} onChange={setFilters} />

      {error && <div className="error">{error}</div>}
      {loading ? (
        <div className="page-loading">Loading tasks…</div>
      ) : tasks.length === 0 ? (
        <div className="empty">
          No tasks match the current filters.<br />
          <button className="btn-primary" style={{ marginTop: 12 }} onClick={() => navigate('/tasks/new')}>Create your first task</button>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map((t) => <TaskCard key={t._id} task={t} />)}
        </div>
      )}
    </>
  );
}
