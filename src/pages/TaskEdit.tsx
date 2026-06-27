import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { tasksApi } from '../api/tasks';
import { TaskForm } from '../components/TaskForm';
import type { Task, TaskFormValues } from '../types';

export function TaskEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    tasksApi.getById(id).then(setTask).catch((e) =>
      setError(e?.response?.data?.message ?? 'Failed to load task')
    );
  }, [id]);

  if (error) return <div className="error">{error}</div>;
  if (!task) return <div className="page-loading">Loading…</div>;

  const initial: Partial<TaskFormValues> = {
    title: task.title,
    description: task.description ?? '',
    priority: task.priority,
    status: task.status,
    dueDate: task.dueDate ?? '',
    assignedTo: task.assignedTo?._id ?? '',
  };

  async function handleSubmit(v: TaskFormValues) {
    await tasksApi.update(task!._id, {
      title: v.title,
      description: v.description,
      priority: v.priority,
      status: v.status,
      dueDate: v.dueDate || undefined,
      assignedTo: v.assignedTo || undefined,
    });
    navigate(`/tasks/${task!._id}`);
  }

  return (
    <>
      <div className="page-header"><h1>Edit task</h1></div>
      <TaskForm
        initial={initial}
        submitLabel="Save changes"
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/tasks/${task._id}`)}
      />
    </>
  );
}
