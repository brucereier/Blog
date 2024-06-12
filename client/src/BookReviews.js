import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function BookReviews() {
  const [bookReviews, setBookReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookReviews = async () => {
      try {
        const baseURL = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(`${baseURL}/book-reviews`);
        const data = await response.json();
        setBookReviews(data.bookReviews);
      } catch (error) {
        console.error('Error fetching book reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookReviews();
  }, []);

  const handleCardClick = (key) => {
    navigate(`/article/${encodeURIComponent(key)}`);
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h4" component="div" gutterBottom>
        Book Reviews
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {bookReviews.map((review, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                onClick={() => handleCardClick(review.key)}
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
                  <Typography variant="h6">{review.title} by {review.author}</Typography>
                  <Typography variant="body2">{review.date}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default BookReviews;
