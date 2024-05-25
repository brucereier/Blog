// Header.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Tabs, Tab, Toolbar, Typography, Box, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);
  const [totalWordCount, setTotalWordCount] = useState(0);
  const [publishedWordCount, setPublishedWordCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value === "/writing") {
      setLoading(true);
      const fetchWordCounts = async () => {
        try {
          const baseURL = process.env.REACT_APP_API_BASE_URL;
          const totalWordCountURL = baseURL + '/wordcount';
          const publishedWordCountURL = baseURL + '/publishedwordcount';
          const [totalResponse, publishedResponse] = await Promise.all([
            axios.get(totalWordCountURL),
            axios.get(publishedWordCountURL)
          ]);
          setTotalWordCount(totalResponse.data.wordCount);
          setPublishedWordCount(publishedResponse.data.wordCount);
        } catch (error) {
          console.error('Error fetching word counts:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchWordCounts();
    }
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Bruce Reier
        </Typography>
        {value === '/writing' && (
          <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
            {loading ? (
              <CircularProgress color="inherit" size={24} />
            ) : (
              <>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginRight: 2 }}>
                  Vaulted Word Count: {totalWordCount}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Published Word Count: {publishedWordCount}
                </Typography>
              </>
            )}
          </Box>
        )}
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
        >
          <Tab
            label="Software"
            value="/"
            sx={{
              color: value === '/' ? 'white' : 'inherit',
              '&.Mui-selected': {
                color: 'white',
              },
            }}
          />
          <Tab
            label="Writing"
            value="/writing"
            sx={{
              color: value === '/writing' ? 'white' : 'inherit',
              '&.Mui-selected': {
                color: 'white',
              },
            }}
          />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
