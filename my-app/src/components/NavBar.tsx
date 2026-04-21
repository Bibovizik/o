import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar: React.FC = () => {
  const { user } = useAuth();

  return (
    <nav className="navbar navbar-dark bg-black border-bottom border-secondary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src="/logo.png"
            alt="Logo"
            width="100"
            height="100"
            className="d-inline-block align-top me-2"
          />
        </Link>

        <div className="navbar-nav flex-row me-auto gap-3 fs-5">
          <NavLink className="nav-link" to="/" end>
            Store
          </NavLink>
          <NavLink className="nav-link" to="/catalog">
            Catalog
          </NavLink>
          <NavLink className="nav-link" to="/library">
            Library
          </NavLink>
        </div>

        {user ? (
          <Link to="/profile">
            <img
              src="/user-icon.png"
              alt="User Profile"
              width="40"
              height="40"
              className="rounded-circle border border-secondary"
            />
          </Link>
        ) : (
          <Link className="btn btn-outline-info" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
