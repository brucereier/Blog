import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import ArticlesList from './ArticlesList';
import BookReviews from './BookReviews';

function Writing() {
  const [totalData, setTotalData] = useState({ wordCount: 0, isLoading: true });
  const [publishedData, setPublishedData] = useState({ wordCount: 0, isLoading: true });

  useEffect(() => {
    let pollingId;

    const fetchWordCounts = async () => {
      try {
        const baseURL = process.env.REACT_APP_API_BASE_URL;
        const [totalResponse, publishedResponse] = await Promise.all([
          fetch(`${baseURL}/wordcount`).then(res => res.json()),
          fetch(`${baseURL}/publishedwordcount`).then(res => res.json())
        ]);

        setTotalData(totalResponse);
        setPublishedData(publishedResponse);

        // Poll again if either endpoint is still loading
        if (totalResponse.isLoading || publishedResponse.isLoading) {
          pollingId = setTimeout(fetchWordCounts, 5000);
        }
      } catch (error) {
        console.error('Error fetching word counts:', error);
      }
    };

    fetchWordCounts();

    // Cleanup any remaining timers on unmount
    return () => {
      if (pollingId) clearTimeout(pollingId);
    };
  }, []);
  const overallLoading = totalData.isLoading || publishedData.isLoading;

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2, textAlign: 'center' }}>
            <CardContent>
              {overallLoading ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                <>
                  <Typography variant="h5" gutterBottom>
                    Vaulted Word Count
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {totalData.wordCount}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2, textAlign: 'center' }}>
            <CardContent>
              {overallLoading ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                <>
                  <Typography variant="h5" gutterBottom>
                    Published Word Count
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {publishedData.wordCount}
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
