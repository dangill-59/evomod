import React, { useState } from 'react';
import { projectsAPI } from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const response = await projectsAPI.create(
        newProject.name,
        newProject.description,
        {}
      );
      setProjects([...projects, response.data]);
      setNewProject({ name: '', description: '' });
      setShowCreateForm(false);
    } catch (err) {
      console.error('Create project error:', err);
      let errorMessage = 'Failed to create project';
      
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
        <h1>Projects</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          style={buttonStyle}
        >
          {showCreateForm ? 'Cancel' : 'Create New Project'}
        </button>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

      {showCreateForm && (
        <div style={cardStyle}>
          <h3>Create New Project</h3>
          <form onSubmit={handleCreateProject}>
            <div>
              <label>Project Name:</label>
              <input
                type="text"
                value={newProject.name}
                onChange={(e) =>
                  setNewProject({ ...newProject, name: e.target.value })
                }
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                style={{ ...inputStyle, height: '100px' }}
              />
            </div>
            <button type="submit" disabled={loading} style={buttonStyle}>
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </form>
        </div>
      )}

      <div>
        {projects.length === 0 ? (
          <div style={cardStyle}>
            <p>No projects yet. Create your first project to get started!</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} style={cardStyle}>
              <h3>{project.name}</h3>
              <p>{project.description || 'No description provided'}</p>
              <button style={buttonStyle}>View Documents</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;