import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ArticlesList() {
  const [importantArticles, setImportantArticles] = useState([]);
  const [nonImportantArticles, setNonImportantArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const baseURL = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(`${baseURL}/published-articles`);
        const data = await response.json();
        setImportantArticles(data.importantArticles);
        setNonImportantArticles(data.nonImportantArticles.filter(article => !article.title.includes('Book Review')));
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleCardClick = (key) => {
    navigate(`/article/${encodeURIComponent(key)}`);
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h4" component="div" gutterBottom>
        Important Articles
      </Typography>
      <Grid container spacing={4}>
        {importantArticles.map((article, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              onClick={() => handleCardClick(article.key)}
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6">{article.title}</Typography>
                <Typography variant="body2">{article.date}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" component="div" gutterBottom sx={{ marginTop: 4 }}>
        Throwaway Articles
      </Typography>
      <Grid container spacing={4}>
        {nonImportantArticles.map((article, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              onClick={() => handleCardClick(article.key)}
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6">{article.title}</Typography>
                <Typography variant="body2">{article.date}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ArticlesList;
