import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ArticlesList() {
  const [importantArticles, setImportantArticles] = useState([]);
  const [nonImportantArticles, setNonImportantArticles] = useState([]);
  const [bookReviews, setBookReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseURL = process.env.REACT_APP_API_BASE_URL;
        const [articlesRes, reviewsRes] = await Promise.all([
          fetch(`${baseURL}/published-articles`),
          fetch(`${baseURL}/book-reviews`),
        ]);
        const articlesData = await articlesRes.json();
        const reviewsData = await reviewsRes.json();
        setImportantArticles(articlesData.importantArticles);
        setNonImportantArticles(
          articlesData.nonImportantArticles.filter(
            (article) => !article.title.includes('Book Review')
          )
        );
        setBookReviews(reviewsData.bookReviews);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCardClick = (key) => {
    navigate(`/article/${encodeURIComponent(key)}`);
  };

  const renderCard = (item) => (
    <Grid item xs={12} sm={6} md={4} key={item.key}>
      <Card
        onClick={() => handleCardClick(item.key)}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          borderRadius: '15px',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // vertically centers the content
          }}
        >
          <Typography variant="h6">
            {item.title}{item.author ? ` by ${item.author}` : ''}
          </Typography>
          <Typography variant="body2">{item.date}</Typography>
          <Typography variant="body2">Read Count: {item.readCount}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const tabsData = [
    { label: 'Important', items: importantArticles },
    { label: 'Throwaway', items: nonImportantArticles },
    { label: 'Book Review', items: bookReviews },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)} centered>
        {tabsData.map((data, idx) => (
          <Tab key={idx} label={data.label} />
        ))}
      </Tabs>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          {tabsData[tab].label} Articles
        </Typography>
        <Grid container spacing={2}>
          {tabsData[tab].items.map(renderCard)}
        </Grid>
      </Box>
    </Box>
  );
}

export default ArticlesList;
