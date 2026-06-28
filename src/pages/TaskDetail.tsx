import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { tasksApi } from '../api/tasks';
import type { Task } from '../types';
import { useAuth } from '../auth/AuthContext';
import { useToast } from '../components/Toast';

function formatDate(iso?: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString();
}

export function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useToast();
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    tasksApi
      .getById(id)
      .then(setTask)
      .catch((e) => setError(e?.response?.data?.message ?? 'Failed to load task'))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    if (!task) return;
    if (!confirm(`Delete task "${task.title}"?`)) return;
    try {
      await tasksApi.remove(task._id);
      toast('Task deleted');
      navigate('/tasks');
    } catch (e: any) {
      setError(e?.response?.data?.message ?? 'Delete failed');
    }
  }

  if (loading) return <div className="page-loading">Loading…</div>;
  if (error) return <div className="error">{error}</div>;
  if (!task) return null;

  const canDelete = user?.role === 'admin' || task.createdBy._id === user?._id;

  return (
    <>
      <div className="page-header">
        <div>
          <Link to="/tasks">← Back to all tasks</Link>
          <h1 style={{ marginTop: 6 }}>{task.title}</h1>
        </div>
        <div className="actions">
          <button className="btn-secondary" onClick={() => navigate(`/tasks/${task._id}/edit`)}>Edit</button>
          {canDelete && <button className="btn-danger" onClick={handleDelete}>Delete</button>}
        </div>
      </div>

      <div className="card">
        <div className="chips-row" style={{ marginBottom: 14 }}>
          <span className={`chip chip-priority-${task.priority}`}>{task.priority}</span>
          <span className={`chip chip-status-${task.status.replace(' ', '.')}`}>{task.status}</span>
        </div>

        <p style={{ whiteSpace: 'pre-wrap', marginBottom: 22, color: 'var(--text)' }}>
          {task.description || <em style={{ color: 'var(--text-muted)' }}>No description provided.</em>}
        </p>

        <div className="detail-row"><span className="label">Due date</span><span>{formatDate(task.dueDate)}</span></div>
        <div className="detail-row"><span className="label">Assigned to</span><span>{task.assignedTo ? `${task.assignedTo.name} · ${task.assignedTo.email}` : 'Unassigned'}</span></div>
        <div className="detail-row"><span className="label">Created by</span><span>{task.createdBy.name} · {task.createdBy.email}</span></div>
        <div className="detail-row"><span className="label">Created</span><span>{formatDate(task.createdAt)}</span></div>
        <div className="detail-row"><span className="label">Last updated</span><span>{formatDate(task.updatedAt)}</span></div>
      </div>
    </>
  );
}
