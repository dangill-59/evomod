import React, { useState } from 'react';
import { searchAPI } from '../services/api';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setHasSearched(true);
      const response = await searchAPI.search(query);
      setResults(response.data.results);
    } catch (err) {
      setError(err.response?.data?.detail || 'Search failed');
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
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
  };

  const searchBarStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
  };

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  return (
    <div>
      <h1>Search Documents</h1>
      <p>Search across all your documents using full-text search with OCR capabilities.</p>

      <form onSubmit={handleSearch} style={searchBarStyle}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search query..."
          style={{ ...inputStyle, flex: 1 }}
        />
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

      {hasSearched && (
        <div>
          <h3>Search Results for: "{query}"</h3>
          <p>{results.length} document(s) found</p>
          
          {results.length === 0 ? (
            <div style={cardStyle}>
              <p>No documents found matching your search query.</p>
              <p>Try using different keywords or check your spelling.</p>
            </div>
          ) : (
            results.map((document) => (
              <div key={document.id} style={cardStyle}>
                <h4>{document.filename}</h4>
                <p>
                  <strong>Project ID:</strong> {document.project_id} | 
                  <strong> Owner ID:</strong> {document.owner_id}
                </p>
                
                {document.content && (
                  <div>
                    <h5>Content Preview:</h5>
                    <div 
                      style={{ 
                        fontStyle: 'italic', 
                        color: '#666',
                        maxHeight: '150px',
                        overflow: 'hidden',
                        backgroundColor: '#fff',
                        padding: '10px',
                        border: '1px solid #eee',
                        borderRadius: '4px'
                      }}
                      dangerouslySetInnerHTML={{
                        __html: highlightText(
                          document.content.substring(0, 400) + 
                          (document.content.length > 400 ? '...' : ''),
                          query
                        )
                      }}
                    />
                  </div>
                )}
                
                {document.metadata && Object.keys(document.metadata).length > 0 && (
                  <div>
                    <h5>Metadata:</h5>
                    <pre style={{ fontSize: '12px', color: '#666' }}>
                      {JSON.stringify(document.metadata, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {!hasSearched && (
        <div style={cardStyle}>
          <h3>How to Search</h3>
          <ul>
            <li>Enter keywords to search within document content</li>
            <li>Search is case-insensitive</li>
            <li>Use specific terms for better results</li>
            <li>OCR extracted text from images and PDFs is searchable</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;