import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import ArticlesList from './ArticlesList';

function Writing() {
  const [totalWordCount, setTotalWordCount] = useState(0);
  const [publishedWordCount, setPublishedWordCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchWordCounts = async () => {
      try {
        const baseURL = process.env.REACT_APP_API_BASE_URL;
        const [totalResponse, publishedResponse] = await Promise.all([
          fetch(`${baseURL}/wordcount`).then(res => res.json()),
          fetch(`${baseURL}/publishedwordcount`).then(res => res.json()),
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

  const renderWordCountCard = (title, count, loadingText) => (
    <Grid item xs={12} md={6}>
      <Card
        sx={{
          p: 2,
          textAlign: 'center',
          borderRadius: '20px',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
        }}
      >
        <CardContent>
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress color="inherit" size={24} />
              <Typography variant="body1" ml={2}>
                {loadingText}
              </Typography>
            </Box>
          ) : (
            <>
              <Typography variant="h5" gutterBottom>
                {title}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {count}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        {renderWordCountCard('Vaulted Word Count', totalWordCount, 'Fetching Vaulted Word Count...')}
        {renderWordCountCard('Published Word Count', publishedWordCount, 'Fetching Published Word Count...')}
      </Grid>
      <ArticlesList />
    </Box>
  );
}

export default Writing;
