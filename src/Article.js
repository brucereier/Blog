// Article.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

function Article() {
  const { key } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/article/${encodeURIComponent(key)}`);
        setContent(response.data.content);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [key]);

  return (
    <Box sx={{ padding: 4 }}>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <ReactMarkdown>{content}</ReactMarkdown>
      )}
    </Box>
  );
}

export default Article;
