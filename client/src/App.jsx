import React from 'react';
import './App.css';

function App() {
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
        <h2>A World of Words awaits...</h2>
        <p>No PDFs or EPUBs found currently!</p>
        <button style={{ padding: '0.5rem 1rem', marginTop: '1rem', cursor: 'pointer' }}>
          Upload Document
        </button>
      </main>
    </div>
  );
}

export default App;