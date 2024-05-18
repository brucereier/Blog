import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { AccessAlarm } from '@mui/icons-material';

function App() {
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const fetchWordCount = async () => {
      try {
        const response = await axios.get('http://localhost:3001/wordcount');
        setWordCount(response.data.wordCount);
      } catch (error) {
        console.error('Error fetching word count:', error);
      }
    };

    fetchWordCount();

    //1 minute lol
    const intervalId = setInterval(fetchWordCount, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', textAlign: 'center' }}>
      <header className="App-header">
        <h1>Welcome to My React App</h1>
        <Button variant="contained" color="primary" startIcon={<AccessAlarm />}>
          Hello MUI
        </Button>
        <div>
          <h2>Word Count: {wordCount}</h2>
        </div>
      </header>
    </div>
  );
}

export default App;