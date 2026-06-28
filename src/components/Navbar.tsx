import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useToast } from './Toast';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <header className="navbar">
      <Link to="/tasks" className="navbar-brand">TaskFlow</Link>
      {user && (
        <div className="navbar-user">
          <span>{user.name}</span>
          <span className="role-badge">{user.role}</span>
          <button
            className="btn-secondary"
            onClick={() => { logout(); toast('You have been logged out'); navigate('/login'); }}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
