import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { TaskList } from './pages/TaskList';
import { TaskDetail } from './pages/TaskDetail';
import { TaskCreate } from './pages/TaskCreate';
import { TaskEdit } from './pages/TaskEdit';
import { useAuth } from './auth/AuthContext';

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="container">{children}</div>
    </>
  );
}

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/tasks" replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/tasks" replace /> : <Register />} />

      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Shell><TaskList /></Shell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks/new"
        element={
          <ProtectedRoute>
            <Shell><TaskCreate /></Shell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks/:id"
        element={
          <ProtectedRoute>
            <Shell><TaskDetail /></Shell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks/:id/edit"
        element={
          <ProtectedRoute>
            <Shell><TaskEdit /></Shell>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/tasks" replace />} />
    </Routes>
  );
}
