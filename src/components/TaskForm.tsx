import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { usersApi } from '../api/users';
import type { TaskFormValues, User } from '../types';
import { TASK_PRIORITIES, TASK_STATUSES } from '../types';

interface Props {
  initial?: Partial<TaskFormValues>;
  submitLabel: string;
  onSubmit: (values: TaskFormValues) => Promise<void>;
  onCancel: () => void;
}

const empty: TaskFormValues = {
  title: '',
  description: '',
  priority: 'Medium',
  status: 'Open',
  dueDate: '',
  assignedTo: '',
};

export function TaskForm({ initial, submitLabel, onSubmit, onCancel }: Props) {
  const { user } = useAuth();
  const [values, setValues] = useState<TaskFormValues>({ ...empty, ...initial });
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user?.role === 'admin') {
      usersApi.list().then(setUsers).catch(() => undefined);
    }
  }, [user]);

  const handleChange = (k: keyof TaskFormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await onSubmit(values);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Failed to save task');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      {error && <div className="error">{error}</div>}

      <div className="field">
        <label>Title *</label>
        <input value={values.title} onChange={handleChange('title')} required maxLength={200} />
      </div>

      <div className="field">
        <label>Description</label>
        <textarea
          rows={4}
          value={values.description}
          onChange={handleChange('description')}
          placeholder="Optional context, acceptance criteria, links…"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div className="field">
          <label>Priority</label>
          <select value={values.priority} onChange={handleChange('priority')}>
            {TASK_PRIORITIES.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Status</label>
          <select value={values.status} onChange={handleChange('status')}>
            {TASK_STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div className="field">
          <label>Due date</label>
          <input
            type="date"
            value={values.dueDate ? values.dueDate.slice(0, 10) : ''}
            onChange={(e) => setValues((v) => ({
              ...v,
              dueDate: e.target.value ? new Date(e.target.value).toISOString() : '',
            }))}
          />
        </div>
        <div className="field">
          <label>Assigned to</label>
          {user?.role === 'admin' ? (
            <select value={values.assignedTo} onChange={handleChange('assignedTo')}>
              <option value="">Unassigned</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
              ))}
            </select>
          ) : (
            <select value={values.assignedTo} onChange={handleChange('assignedTo')}>
              <option value="">Unassigned</option>
              <option value={user!._id}>Me ({user!.email})</option>
            </select>
          )}
        </div>
      </div>

      <div className="actions" style={{ justifyContent: 'flex-end', marginTop: 8 }}>
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  );
}
