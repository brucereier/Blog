import React from 'react';
import { Card, CardContent, CardMedia, Typography} from '@mui/material';

function ProjectCard({ image, title, link, description }) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        width: '100%',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
          cursor: 'pointer',
        },
        '&:hover .learn-more': {
          display: 'block',
        },
      }}
      onClick={() => window.open(link, '_blank')}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{ width: { xs: '100%', sm: 150 }, height: { xs: 150, sm: 150 }, objectFit: 'cover' }}
      />
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: { xs: 'center', sm: 'flex-start' },
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
