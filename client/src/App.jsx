import React, { useState } from 'react';
import DocumentViewer from './DocViewer';
import './App.css';

function App() {
  const [showViewer, setShowViewer] = useState(false);

  return (
    <div className="library-container" style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
        <h1>The Reader's Nook</h1>
        <div>
          <button style={{ marginRight: '1rem' }}>Login</button>
          <button>Register</button>
        </div>
      </header>
      
      <main style={{ marginTop: '4rem', textAlign: 'center', color: '#666' }}>
        {!showViewer ? (
          <>
            <h2>A world of words awaits...</h2>
            <p>Ready for Module 2!</p>
            <button 
              style={{ padding: '0.5rem 1rem', marginTop: '1rem', cursor: 'pointer' }}
              onClick={() => setShowViewer(true)}
            >
              Upload Document
            </button>
          </>
        ) : (
          <DocumentViewer />
        )}
      </main>
    </div>
  );
}

export default App;