import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/axios';
import { isAxiosError } from 'axios';
import type { User } from '../types/User';

const isUser = (value: unknown): value is User => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'username' in value &&
    'email' in value
  );
};
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login, refreshUser } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await api.post<unknown>('/user/login', {
        email,
        password,
      });
      const user = isUser(response.data) ? response.data : await refreshUser();

      if (user) {
        if (isUser(response.data)) {
          login(response.data);
        }
        navigate('/profile');
        return;
      }

      navigate('/');
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        setErrorMessage('Invalid email or password.');
      } else {
        setErrorMessage(
          'Login failed. Check the API connection and try again.',
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-vh-100 bg-black d-flex align-items-center justify-content-center px-3">
      <div
        className="w-100 bg-dark border border-secondary rounded-3 p-5 shadow-lg"
        style={{ maxWidth: '440px' }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-white" style={{ letterSpacing: '3px' }}>
            TOKITO
          </h2>
          <p className="text-secondary mb-0">Welcome back to the store</p>
        </div>

        <hr className="border-secondary" />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void handleLogin();
          }}
          className="mt-4"
        >
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label text-secondary small text-uppercase"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-control bg-black text-white border-secondary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="form-label text-secondary small text-uppercase"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control bg-black text-white border-secondary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && (
            <div className="alert alert-danger py-2 small mb-3">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-info w-100 py-2 fw-bold mb-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Signing in…
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="text-secondary">New to Tokito? </span>
          <Link to="/register" className="text-info text-decoration-none">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
