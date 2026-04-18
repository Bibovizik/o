import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Store from './components/Store';
import './App.css';
import Login from './components/Login';
import Profile from './components/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import AxiosSetup from './components/AxiosSetup';

function App() {
  const { user } = useAuth();
  return (
      <Router>
        <AxiosSetup>
        <nav className="navbar navbar-dark bg-primary p-3">
          <div className="d-flex align-items-center">
            <img src="/logo.png" alt="Logo" width="100" height="100" className="d-inline-block align-top me-2" />
            <Link className="navbar-brand" to="/">Store</Link>
          </div>
          <div className="navbar-nav flex-row gap-3">
            <Link className="nav-link" to="/catalog">Catalog</Link>
            <Link className="nav-link" to="/library">Library</Link>
          </div>
          <div className="ms-auto">
            {user ? (
              <div className="d-flex align-items-center">
                <Link to="/profile">
                  <img src="/user-icon.png" alt="User Icon" width="40" height="40" className="img-thumbnail border" />
                </Link>
              </div>
            ) : (
              <Link className="btn btn-outline-light" to="/login">Login</Link>
            )}
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
        </AxiosSetup>
      </Router>
  );
}

export default App;