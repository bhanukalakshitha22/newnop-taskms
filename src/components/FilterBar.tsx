import { TASK_PRIORITIES, TASK_STATUSES, TaskPriority, TaskStatus } from '../types';
import type { SortDir, SortField, TaskListFilters } from '../api/tasks';

interface Props {
  value: TaskListFilters;
  onChange: (next: TaskListFilters) => void;
}

const SORT_OPTIONS: { label: string; sortBy: SortField; sortDir: SortDir }[] = [
  { label: 'Newest first',      sortBy: 'createdAt', sortDir: 'desc' },
  { label: 'Oldest first',      sortBy: 'createdAt', sortDir: 'asc'  },
  { label: 'Due date ↑',        sortBy: 'dueDate',   sortDir: 'asc'  },
  { label: 'Due date ↓',        sortBy: 'dueDate',   sortDir: 'desc' },
  { label: 'Priority: High→Low',sortBy: 'priority',  sortDir: 'desc' },
  { label: 'Priority: Low→High',sortBy: 'priority',  sortDir: 'asc'  },
  { label: 'Title A→Z',         sortBy: 'title',     sortDir: 'asc'  },
];

function sortKey(f: TaskListFilters) {
  return `${f.sortBy ?? 'createdAt'}_${f.sortDir ?? 'desc'}`;
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
      <div className="field">
        <label>Sort by</label>
        <select
          value={sortKey(value)}
          onChange={(e) => {
            const opt = SORT_OPTIONS.find(o => `${o.sortBy}_${o.sortDir}` === e.target.value);
            if (opt) onChange({ ...value, sortBy: opt.sortBy, sortDir: opt.sortDir });
          }}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={`${o.sortBy}_${o.sortDir}`} value={`${o.sortBy}_${o.sortDir}`}>{o.label}</option>
          ))}
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
