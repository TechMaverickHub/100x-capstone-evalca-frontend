import { useAuth } from '../context/AuthContext';
import '../App.css';

function SuperAdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <div>
              <h1 className="app-title">Lekha - Super Admin</h1>
              <p className="app-subtitle">Administration Dashboard</p>
            </div>
            <div className="header-actions">
              <span className="user-name">{user?.first_name} {user?.last_name}</span>
              <button className="logout-button" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="app-main">
          <div className="dashboard-placeholder">
            <h2>Super Admin Dashboard</h2>
            <p>This is the super admin dashboard. Additional admin features will be implemented here.</p>
          </div>
        </main>

        <footer className="app-footer">
          <p>© 2024 Lekha. AI-Powered Learning Platform for CA Students.</p>
        </footer>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;

