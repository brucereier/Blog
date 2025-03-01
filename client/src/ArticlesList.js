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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ArticlesList() {
  const [importantArticles, setImportantArticles] = useState([]);
  const [nonImportantArticles, setNonImportantArticles] = useState([]);
  const [bookReviews, setBookReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    <Grid item xs={12} key={item.key}>
      <Card
        onClick={() => handleCardClick(item.key)}
        sx={{
          cursor: 'pointer',
          borderRadius: '15px', // Rounded corners
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)', // Pronounced shadow
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        <CardContent>
          <Typography variant="h6">
            {item.title}
            {item.author ? ` by ${item.author}` : ''}
          </Typography>
          <Typography variant="body2">{item.date}</Typography>
          <Typography variant="body2">Read Count: {item.readCount}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isMobile) {
    return (
      <Box sx={{ mt: 4 }}>
        <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)} centered>
          <Tab label="Important" />
          <Tab label="Book Reviews" />
          <Tab label="Throwaway" />
        </Tabs>
        <Box sx={{ mt: 2 }}>
          {tab === 0 && (
            <>
              <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
                Important Articles
              </Typography>
              <Grid container spacing={2}>
                {importantArticles.map(renderCard)}
              </Grid>
            </>
          )}
          {tab === 1 && (
            <>
              <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
                Book Reviews
              </Typography>
              <Grid container spacing={2}>
                {bookReviews.map(renderCard)}
              </Grid>
            </>
          )}
          {tab === 2 && (
            <>
              <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
                Throwaway Articles
              </Typography>
              <Grid container spacing={2}>
                {nonImportantArticles.map(renderCard)}
              </Grid>
            </>
          )}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {[
          { title: 'Important Articles', items: importantArticles },
          { title: 'Book Reviews', items: bookReviews },
          { title: 'Throwaway Articles', items: nonImportantArticles },
        ].map(({ title, items }) => (
          <Grid item xs={12} md={4} key={title}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
              {title}
            </Typography>
            <Grid container spacing={2}>
              {items.map(renderCard)}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ArticlesList;
