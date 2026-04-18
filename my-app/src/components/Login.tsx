import { isAxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import type { User } from "../types/User";

const isUser = (value: unknown): value is User => {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "username" in value &&
    "email" in value
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
      const response = await api.post<unknown>('/user/login', { email, password });
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
        setErrorMessage('Login failed. Check the API connection and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center min-vh-100 py-4">
      <h1>Login</h1>
      <p>This is the login page. You can implement your login form here.</p>
      <input 
        type="text" 
        className="form-control mb-2" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password" 
        className="form-control mb-2" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary mt-3" disabled={isSubmitting} onClick={handleLogin}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
      {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
        <div className="mt-3">
          <p>Don't have an account? <a href="#">Sign up</a></p>
          <p>Forgot your password? <a href="#">Reset password</a></p>
        </div>    
      </div>    
  );
};

export default Login;
