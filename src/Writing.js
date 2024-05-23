import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { AccessAlarm } from '@mui/icons-material';

function Writing() {
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
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      <header>
        <h1>Writing Page</h1>
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

export default Writing;