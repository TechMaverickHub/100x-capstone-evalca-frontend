import { useState } from 'react';
import { registerUser } from '../services/api';
import './Register.css';

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    if (!formData.email || !formData.password || !formData.first_name || !formData.last_name) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser(formData);
      
      if (response.status_code === 200 || response.status_code === 201) {
        setSuccess(true);
        setTimeout(() => {
          onSwitchToLogin();
        }, 2000);
      } else {
        throw new Error('Registration failed: Invalid response format');
      }
    } catch (err) {
      console.error('Registration Error:', err);
      const errorMessage = err.response?.data?.data?.detail || 
                          err.response?.data?.message || 
                          err.message || 
                          'Failed to register. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Sign up for Lekha</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="auth-error">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="auth-success">
              <span className="success-icon">✓</span>
              <p>Registration successful! Redirecting to login...</p>
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                className="form-input"
                placeholder="First name"
                value={formData.first_name}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="last_name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                className="form-input"
                placeholder="Last name"
                value={formData.last_name}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading || success}
          >
            {loading ? 'Creating Account...' : success ? 'Success!' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <button
              type="button"
              className="auth-link"
              onClick={onSwitchToLogin}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;






