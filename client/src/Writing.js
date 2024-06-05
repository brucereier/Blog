// Writing.js
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import ArticlesList from './ArticlesList';
import BookReviews from './BookReviews';

function Writing() {
  const [totalWordCount, setTotalWordCount] = useState(0);
  const [publishedWordCount, setPublishedWordCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchWordCounts = async () => {
      try {
        const baseURL = process.env.REACT_APP_API_BASE_URL;
        const totalWordCountURL = baseURL + '/wordcount';
        const publishedWordCountURL = baseURL + '/publishedwordcount';
        const [totalResponse, publishedResponse] = await Promise.all([
          fetch(totalWordCountURL).then(res => res.json()),
          fetch(publishedWordCountURL).then(res => res.json())
        ]);
        setTotalWordCount(totalResponse.wordCount);
        setPublishedWordCount(publishedResponse.wordCount);
      } catch (error) {
        console.error('Error fetching word counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWordCounts();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2, textAlign: 'center' }}>
            <CardContent>
              {loading ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                <>
                  <Typography variant="h5" gutterBottom>
                    Vaulted Word Count
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {totalWordCount}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2, textAlign: 'center' }}>
            <CardContent>
              {loading ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                <>
                  <Typography variant="h5" gutterBottom>
                    Published Word Count
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {publishedWordCount}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ArticlesList />
      <BookReviews />
    </Box>
  );
}

export default Writing;
