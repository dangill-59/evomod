import React, { useState } from 'react';
import { documentsAPI } from '../services/api';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [projectId, setProjectId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || !projectId) {
      setError('Please select a file and enter a project ID');
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
      setError(err.response?.data?.detail || 'Failed to upload document');
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
              <label>Project ID:</label>
              <input
                type="number"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                required
                style={inputStyle}
                placeholder="Enter the project ID where this document belongs"
              />
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
              <p>Project ID: {document.project_id}</p>
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