import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px',
    backgroundColor: '#f8f9fa',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    marginTop: '10px',
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the Intelligent Document Management System!</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
        <div style={cardStyle}>
          <h3>Projects</h3>
          <p>Organize your documents into projects for better management and categorization.</p>
          <a href="/projects" style={buttonStyle}>
            Manage Projects
          </a>
        </div>
        
        <div style={cardStyle}>
          <h3>Documents</h3>
          <p>Upload, view, and manage your documents with automatic OCR text extraction.</p>
          <a href="/documents" style={buttonStyle}>
            Manage Documents
          </a>
        </div>
        
        <div style={cardStyle}>
          <h3>Search</h3>
          <p>Perform full-text search across all your documents to quickly find what you need.</p>
          <a href="/search" style={buttonStyle}>
            Search Documents
          </a>
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#e9ecef', borderRadius: '8px' }}>
        <h3>Quick Stats</h3>
        <p>• User: {user?.username || 'Unknown'}</p>
        <p>• System: Intelligent Document Management</p>
        <p>• Features: OCR, Full-text Search, Project Management</p>
      </div>
    </div>
  );
};

export default Dashboard;