import { TASK_PRIORITIES, TASK_STATUSES, TaskPriority, TaskStatus } from '../types';
import type { TaskListFilters } from '../api/tasks';

interface Props {
  value: TaskListFilters;
  onChange: (next: TaskListFilters) => void;
}

export function FilterBar({ value, onChange }: Props) {
  return (
    <div className="filter-bar">
      <div className="field field-search">
        <label>Search title</label>
        <input
          type="text"
          placeholder="Type to search…"
          value={value.q ?? ''}
          onChange={(e) => onChange({ ...value, q: e.target.value })}
        />
      </div>
      <div className="field">
        <label>Status</label>
        <select
          value={value.status ?? ''}
          onChange={(e) => onChange({ ...value, status: (e.target.value || undefined) as TaskStatus | undefined })}
        >
          <option value="">All</option>
          {TASK_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="field">
        <label>Priority</label>
        <select
          value={value.priority ?? ''}
          onChange={(e) => onChange({ ...value, priority: (e.target.value || undefined) as TaskPriority | undefined })}
        >
          <option value="">All</option>
          {TASK_PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <button
        className="btn-secondary"
        onClick={() => onChange({})}
        style={{ height: 38 }}
      >
        Reset
      </button>
    </div>
  );
}
