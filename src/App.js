import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendQuery = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('https://bioclean-backend.onrender.com/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: query })
      });

      const data = await response.json();
      setResults(data.top_matches || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults(['Something went wrong. Please try again.']);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1>BioClean AI Query</h1>
      <input
        style={styles.input}
        type="text"
        placeholder="Ask your question here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button style={styles.button} onClick={sendQuery}>
        {loading ? 'Searching...' : 'Submit'}
      </button>

      <div style={styles.resultSection}>
        <h2>Top Matches:</h2>
        <ul>
          {results.map((text, idx) => (
            <li key={idx} style={styles.listItem}>{text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: 'auto',
    padding: 20,
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    padding: '10px 20px',
    fontSize: 16,
    cursor: 'pointer',
  },
  resultSection: {
    marginTop: 30,
    textAlign: 'left',
  },
  listItem: {
    fontSize: 16,
    padding: '6px 0',
  }
};

export default App;
