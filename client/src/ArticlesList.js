// ArticlesList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ArticlesList() {
  const [importantArticles, setImportantArticles] = useState([]);
  const [nonImportantArticles, setNonImportantArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const baseURL = process.env.REACT_APP_API_BASE_URL
        console.log(baseURL);
        const PublishedArticlesURL = baseURL + '/published-articles';
        const response = await axios.get(PublishedArticlesURL);
        setImportantArticles(response.data.importantArticles);
        setNonImportantArticles(response.data.nonImportantArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleCardClick = (key) => {
    navigate(`/article/${encodeURIComponent(key)}`);
  };

  const renderArticles = (articles) => (
    <Grid container spacing={4}>
      {articles.map((article, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
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
              <Typography variant="subtitle1" color="textSecondary">
                {article.date}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Important Articles
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        renderArticles(importantArticles)
      )}
      <Typography variant="h4" gutterBottom sx={{ marginTop: 4 }}>
        Throwaway Articles
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        renderArticles(nonImportantArticles)
      )}
    </Box>
  );
}

export default ArticlesList;
