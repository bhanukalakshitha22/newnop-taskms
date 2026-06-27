import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <Link to="/tasks" className="navbar-brand">TaskFlow</Link>
      {user && (
        <div className="navbar-user">
          <span>{user.name}</span>
          <span className="role-badge">{user.role}</span>
          <button
            className="btn-secondary"
            onClick={() => { logout(); navigate('/login'); }}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
