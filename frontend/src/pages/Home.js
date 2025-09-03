import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const heroStyle = {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    marginBottom: '40px',
  };

  const featureStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginTop: '40px',
  };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '30px',
    backgroundColor: '#fff',
    textAlign: 'center',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    marginTop: '20px',
  };

  return (
    <div>
      <div style={heroStyle}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: '#343a40' }}>
          EvoMod Document Manager
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#6c757d', marginBottom: '30px' }}>
          Intelligent Document Management System with OCR and Full-Text Search
        </p>
        {isAuthenticated ? (
          <Link to="/dashboard" style={buttonStyle}>
            Go to Dashboard
          </Link>
        ) : (
          <div>
            <Link to="/login" style={{ ...buttonStyle, marginRight: '10px' }}>
              Login
            </Link>
            <Link to="/register" style={buttonStyle}>
              Get Started
            </Link>
          </div>
        )}
      </div>

      <div style={featureStyle}>
        <div style={cardStyle}>
          <h3>📁 Project Management</h3>
          <p>
            Organize your documents into projects for better categorization and management. 
            Create custom fields and metadata for each project.
          </p>
        </div>

        <div style={cardStyle}>
          <h3>🔍 OCR Technology</h3>
          <p>
            Automatic text extraction from images and PDF documents using advanced OCR technology. 
            Make your documents searchable and accessible.
          </p>
        </div>

        <div style={cardStyle}>
          <h3>🔎 Full-Text Search</h3>
          <p>
            Powerful search capabilities across all your documents. Find information quickly 
            with intelligent text matching and highlighting.
          </p>
        </div>

        <div style={cardStyle}>
          <h3>🔐 Secure Access</h3>
          <p>
            User authentication and role-based access control. Keep your documents secure 
            while maintaining easy access for authorized users.
          </p>
        </div>

        <div style={cardStyle}>
          <h3>📄 Multi-Format Support</h3>
          <p>
            Support for various document formats including PDF, DOC, DOCX, TXT, 
            and image formats (PNG, JPG, JPEG).
          </p>
        </div>

        <div style={cardStyle}>
          <h3>⚡ Fast & Efficient</h3>
          <p>
            Built with modern technologies for optimal performance. 
            FastAPI backend with React frontend for a smooth user experience.
          </p>
        </div>
      </div>

      <div style={{ marginTop: '60px', textAlign: 'center', padding: '40px', backgroundColor: '#e9ecef', borderRadius: '8px' }}>
        <h2>Ready to get started?</h2>
        <p>Upload your first document and experience the power of intelligent document management.</p>
        {!isAuthenticated && (
          <Link to="/register" style={buttonStyle}>
            Create Your Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;