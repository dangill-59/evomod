import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Layout = ({ children }) => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navStyle = {
    backgroundColor: '#343a40',
    padding: '1rem',
    marginBottom: '2rem',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginRight: '1rem',
    padding: '0.5rem',
  };

  const buttonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div>
      <nav style={navStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Link to="/" style={{ ...linkStyle, fontSize: '1.25rem', fontWeight: 'bold' }}>
              EvoMod Document Manager
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/dashboard" style={linkStyle}>
                  Dashboard
                </Link>
                <Link to="/projects" style={linkStyle}>
                  Projects
                </Link>
                <Link to="/documents" style={linkStyle}>
                  Documents
                </Link>
                <Link to="/search" style={linkStyle}>
                  Search
                </Link>
              </>
            )}
          </div>
          <div>
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'white', marginRight: '1rem' }}>
                  Welcome, {user?.username || 'User'}
                </span>
                <button onClick={handleLogout} style={buttonStyle}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" style={linkStyle}>
                  Login
                </Link>
                <Link to="/register" style={linkStyle}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <div style={{ padding: '0 2rem' }}>{children}</div>
    </div>
  );
};

export default Layout;