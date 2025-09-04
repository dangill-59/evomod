import React, { useState, useEffect } from 'react';
import { documentsAPI, projectsAPI } from '../services/api';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [projectId, setProjectId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch projects when component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.list();
        setProjects(response.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      }
    };

    fetchProjects();
  }, []);

  // Helper function to get project name by ID
  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : `Project ID: ${projectId}`;
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || !projectId) {
      setError('Please select a file and choose a project');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await documentsAPI.upload(
        parseInt(projectId),
        selectedFile,
        {}
      );
      setDocuments([...documents, response.data]);
      setSelectedFile(null);
      setProjectId('');
      setShowUploadForm(false);
    } catch (err) {
      console.error('Upload document error:', err);
      let errorMessage = 'Failed to upload document';
      
      if (err.response?.data?.detail) {
        if (Array.isArray(err.response.data.detail)) {
          errorMessage = err.response.data.detail.map(e => e.msg).join(', ');
        } else {
          errorMessage = err.response.data.detail;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px 0',
    backgroundColor: '#f8f9fa',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Documents</h1>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          style={buttonStyle}
        >
          {showUploadForm ? 'Cancel' : 'Upload Document'}
        </button>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

      {showUploadForm && (
        <div style={cardStyle}>
          <h3>Upload New Document</h3>
          <form onSubmit={handleFileUpload}>
            <div>
              <label>Project:</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                required
                style={inputStyle}
              >
                <option value="">Select a project...</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              {projects.length === 0 && (
                <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>
                  No projects available. Create a project first to upload documents.
                </p>
              )}
            </div>
            <div>
              <label>Select File:</label>
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                required
                style={inputStyle}
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
              />
            </div>
            {selectedFile && (
              <div style={{ marginBottom: '15px' }}>
                <p>Selected file: {selectedFile.name}</p>
                <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            )}
            <button type="submit" disabled={loading} style={buttonStyle}>
              {loading ? 'Uploading...' : 'Upload Document'}
            </button>
          </form>
        </div>
      )}

      <div>
        {documents.length === 0 ? (
          <div style={cardStyle}>
            <p>No documents uploaded yet. Upload your first document to get started!</p>
            <p>Supported formats: PDF, DOC, DOCX, TXT, PNG, JPG, JPEG</p>
          </div>
        ) : (
          documents.map((document) => (
            <div key={document.id} style={cardStyle}>
              <h3>{document.filename}</h3>
              <p>Project: {getProjectName(document.project_id)}</p>
              <p>Uploaded by: User ID {document.owner_id}</p>
              {document.content && (
                <div>
                  <h4>Extracted Text (first 200 characters):</h4>
                  <p style={{ fontStyle: 'italic', color: '#666' }}>
                    {document.content.substring(0, 200)}
                    {document.content.length > 200 ? '...' : ''}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Documents;