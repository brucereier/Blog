import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";

function Article() {
  const { key } = useParams();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const baseURL = process.env.REACT_APP_API_BASE_URL;
        const response = await axios.get(`${baseURL}/article/${encodeURIComponent(key)}`);
        setContent(response.data.content);

        const keyWithoutPrefix = key.replace('published/', '').replace('.md', '');
        const isImportant = keyWithoutPrefix.startsWith('I');
        const datePart = isImportant ? keyWithoutPrefix.substring(1, keyWithoutPrefix.indexOf(' ')) : keyWithoutPrefix.substring(0, keyWithoutPrefix.indexOf(' '));
        const titlePart = keyWithoutPrefix.substring(keyWithoutPrefix.indexOf(' ') + 1);

        setDate(datePart);
        setTitle(titlePart);
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
        <>
          <Typography variant="h2" align="center" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            {date}
          </Typography>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </>
      )}
    </Box>
  );
}

export default Article;
