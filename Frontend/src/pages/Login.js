/**
 * pages/Login.js
 * ---------------------------------------------------------------
 * Simple login form UI.
 * Calls POST /login via api.js.
 * Does NOT implement authentication logic – that's the backend's job.
 * ---------------------------------------------------------------
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await loginUser({ username, password });
      // On success navigate to home (backend handles auth token)
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="page-wrapper d-flex justify-content-center align-items-center"
      style={{ minHeight: 'calc(100vh - 80px)' }}
    >
      <div className="glass-card glow-border p-5 animate-in" style={{ maxWidth: 440, width: '100%' }}>
        {/* Header */}
        <div className="text-center mb-4">
          <div style={{ fontSize: '3rem', marginBottom: 8 }}>♿</div>
          <h2
            style={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #00d4ff, #00e676)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome Back
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '.9rem' }}>
            Sign in to the Accessible Campus Navigation System
          </p>
        </div>

        <form onSubmit={handleLogin}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label" style={{ color: 'var(--accent)', fontWeight: 600 }}>
              Username
            </label>
            <input
              type="text"
              className="form-acns"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="login-username"
              autoComplete="username"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label" style={{ color: 'var(--accent)', fontWeight: 600 }}>
              Password
            </label>
            <input
              type="password"
              className="form-acns"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="login-password"
              autoComplete="current-password"
            />
          </div>

          {/* Error */}
          {error && (
            <div
              className="mb-3 p-3 rounded"
              style={{ background: 'rgba(255,82,82,.12)', color: 'var(--danger)' }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn-acns btn-acns-primary w-100"
            disabled={loading}
            id="login-submit-btn"
          >
            {loading ? '⏳ Signing in…' : '🔑 Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
