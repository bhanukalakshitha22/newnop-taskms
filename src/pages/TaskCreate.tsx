import { useNavigate } from 'react-router-dom';
import { TaskForm } from '../components/TaskForm';
import { tasksApi } from '../api/tasks';
import type { TaskFormValues } from '../types';

export function TaskCreate() {
  const navigate = useNavigate();

  async function handleSubmit(v: TaskFormValues) {
    await tasksApi.create({
      title: v.title,
      description: v.description,
      priority: v.priority,
      status: v.status,
      dueDate: v.dueDate || undefined,
      assignedTo: v.assignedTo || undefined,
    });
    navigate('/tasks');
  }

  return (
    <>
      <div className="page-header">
        <h1>New task</h1>
      </div>
      <TaskForm
        submitLabel="Create task"
        onSubmit={handleSubmit}
        onCancel={() => navigate('/tasks')}
      />
    </>
  );
}
