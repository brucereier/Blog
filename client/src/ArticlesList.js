// ArticlesList.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

function ArticlesList() {
  const [importantArticles, setImportantArticles] = useState([]);
  const [nonImportantArticles, setNonImportantArticles] = useState([]);

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

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h4" component="div" gutterBottom>
        Important Articles
      </Typography>
      <Grid container spacing={4}>
        {importantArticles.map((article, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
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
            <Card>
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
