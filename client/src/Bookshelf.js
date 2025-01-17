import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, IconButton, Paper, TextField } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const BOOKS_PER_PAGE = 8;

const colorPairs = [
  { primary: '#e5e5e5', secondary: '#000000' },
  { primary: '#14213d', secondary: '#FFFFFF' },
  { primary: '#fca311', secondary: '#000000' },
  { primary: '#e07a5f', secondary: '#FFFFFF' },
  { primary: '#81b29a', secondary: '#000000' },
  { primary: '#2a9d8f', secondary: '#FFFFFF' },
  { primary: '#6d6875', secondary: '#000000' },
  { primary: '#ffcdb2', secondary: '#000000' },
  { primary: '#d62828', secondary: '#FFFFFF' },
  { primary: '#273631', secondary: '#FFFFFF' },
  { primary: '#64cddb', secondary: '#FFFFFF' },
  { primary: '#778beb', secondary: '#000000' },
];

const getColorPair = (title) => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colorPairs.length;
  return colorPairs[index];
};

function Bookshelf() {
  const [bookReviews, setBookReviews] = useState([]);
  const [filteredBookReviews, setFilteredBookReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedReviewContent, setSelectedReviewContent] = useState('');
  const [loadingReview, setLoadingReview] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBookReviews = async () => {
      try {
        const baseURL = process.env.REACT_APP_API_BASE_URL;
        const response = await axios.get(`${baseURL}/book-reviews`);
        const reviews = response.data.bookReviews.map(review => ({
          ...review,
          colorPair: getColorPair(review.title),
        }));
        setBookReviews(reviews);
        setFilteredBookReviews(reviews);
      } catch (error) {
        console.error('Error fetching book reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookReviews();
  }, []);

  useEffect(() => {
    const filteredReviews = bookReviews.filter(review =>
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBookReviews(filteredReviews);
    setCurrentIndex(0);
  }, [searchQuery, bookReviews]);

  const getVisibleBooks = () => {
    if (filteredBookReviews.length <= BOOKS_PER_PAGE) {
      return filteredBookReviews;
    }

    const end = (currentIndex + BOOKS_PER_PAGE) % filteredBookReviews.length;
    if (end >= currentIndex) {
      return filteredBookReviews.slice(currentIndex, end);
    } else {
      return [...filteredBookReviews.slice(currentIndex), ...filteredBookReviews.slice(0, end)];
    }
  };

  const scrollLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredBookReviews.length) % filteredBookReviews.length);
  };

  const scrollRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredBookReviews.length);
  };

  const fetchReviewContent = async (key) => {
    setLoadingReview(true);
    try {
      const baseURL = process.env.REACT_APP_API_BASE_URL;
      const response = await axios.get(`${baseURL}/article/${encodeURIComponent(key)}`);
      setSelectedReviewContent(response.data.content);
    } catch (error) {
      console.error('Error fetching review content:', error);
    } finally {
      setLoadingReview(false);
    }
  };

  const handleBookClick = (review) => {
    setSelectedReview(review);
    fetchReviewContent(review.key);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" component="div" gutterBottom>
        Bookshelf
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
        <TextField
          label="Search Books"
          variant="outlined"
          sx={{ width: 880 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconButton onClick={scrollLeft}>
              <ArrowBackIosIcon />
            </IconButton>
            <Box
              sx={{
                display: 'flex',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                padding: 2,
                borderRadius: 1,
                height: 500,
                width: 950,
                justifyContent: 'center',
                padding: '20px',
              }}
            >
              {getVisibleBooks().map((review, index) => {
                const { primary, secondary } = review.colorPair;
                return (
                  <Box
                    key={index}
                    sx={{
                      display: 'inline-flex',
                      width: 110,
                      height: '100%',
                      backgroundColor: primary,
                      color: secondary,
                      margin: '0 10px',
                      textAlign: 'center',
                      whiteSpace: 'normal',
                      overflow: 'hidden',
                      boxShadow: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: 6,
                      },
                    }}
                    onClick={() => handleBookClick(review)}
                  >
                    <Typography
                      sx={{
                        fontSize: '2.4rem',
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        fontFamily: 'Playfair Display, serif',
                        textTransform: 'uppercase',
                      }}
                    >
                      {review.title}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
            <IconButton onClick={scrollRight}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
          {selectedReview && (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
              <Paper sx={{ padding: 4, width: 'calc(100% - 100px)', maxWidth: 900 }}>
                <Typography variant="h4" component="div" gutterBottom>
                  Review: {selectedReview.title} by {selectedReview.author}
                </Typography>
                {loadingReview ? (
                  <CircularProgress />
                ) : (
                  <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-wrap' }}>
                    {selectedReviewContent}
                  </Typography>
                )}
              </Paper>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default Bookshelf;
