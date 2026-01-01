import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import TeacherDashboard from './pages/TeacherDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import { USER_ROLES } from './constants';
import './App.css';

const AppContent = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [authPage, setAuthPage] = useState('login'); // 'login' or 'register'

  if (loading) {
    return (
      <div className="app">
        <div className="app-container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return authPage === 'login' ? (
      <Login onSwitchToRegister={() => setAuthPage('register')} />
    ) : (
      <Register onSwitchToLogin={() => setAuthPage('login')} />
    );
  }

  // Route based on user role
  if (user?.role_id === USER_ROLES.SUPERADMIN) {
    return <SuperAdminDashboard />;
  }

  // Default to teacher dashboard
  return <TeacherDashboard />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
