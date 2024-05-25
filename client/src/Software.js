// Software.js
import React from 'react';
import { Card, CardContent, Avatar, Typography, IconButton, Box, Grid } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import ProjectCard from './ProjectCard';

const projects = [
  {
    image: '/classmate.jpeg',
    title: 'classmate',
    link: 'https://classmate.lol',
    description: 'Building a website to make course registration easier for college students through a social network and advanced course filters. Using React for the front-end and a firestore database with 100k+ documents to manage relations between users and to store data.',
  },
  {
    image: '/garmin.jpeg',
    title: 'Garmin SWE Intern',
    link: 'https://www.garmin.com/en-US/',
    description: 'Working on the subscriptions team building a Blazor application that allows authorized users to add Products and Plans to Garmin\'s internal system. Using SQL Server and terraform to and calling various internal APIs to collect and transfer data.',
  },{
    image: '/luminary.png', // Update with actual image path
    title: 'Luminary',
    link: 'https://appteamcarolina.com/#apps',
    description: 'Backend development on an iOS app designed to provide accessible navigation on college campuses. Writing a custom API to allow communication between the app and a PostgreSQL database containing geospatial data.',
  },
  {
    image: '/research.jpeg',
    title: 'Undergraduate AI Research',
    link: 'https://tarheels.live/compressivenetworks/andrew-bruce-research-project/',
    description: 'Researching the most efficient Machine Learning pipeline for classifying whether or not stained WSIs contain melanoma. Implementing various CNNs as feature extractors and quantifying their performance with 5-fold cross validation.'
  },
  {
    image: '/react.svg',
    title: 'Personal Portfolio',
    link: '',
    description: 'Developed portfolio with React to showcase software and writing projects. Over-engineered writing section to use Node.js server that links to my writing vault stored in an AWS S3 bucket to load new articles, allowing for website changes that do not require any modifications to the code.'
  },
];

function Software() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
        padding: 2,
        paddingTop: 4, // Add some top padding
      }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          padding: 4,
          boxShadow: 3,
          width: '100%', // Make the card full width
          maxWidth: '1200px', // Add a maximum width for the card
          marginBottom: 4,
        }}
      >
        <Avatar
          alt="Bruce Reier"
          src="/bruce.jpeg" // Corrected path to the image
          sx={{
            width: 300, // Increased size
            height: 300, // Increased size
            margin: 2,
            boxShadow: 2,
          }}
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
            marginLeft: { md: 4 }, // Add some left margin for larger screens
          }}
        >
          <Typography variant="h4" component="div" gutterBottom>
            Bruce Reier
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' },
              marginBottom: 2, // Increased margin bottom
            }}
          >
            <IconButton
              aria-label="LinkedIn"
              href="https://www.linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontSize: 40 }} // Increased size
            >
              <LinkedInIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="GitHub"
              href="https://github.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontSize: 40 }} // Increased size
            >
              <GitHubIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="Email"
              href="mailto:your.email@example.com"
              sx={{ fontSize: 40 }} // Increased size
            >
              <EmailIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
            Hey! I'm Bruce, a rising junior at UNC Chapel Hill double majoring in Computer Science and Mathematics with a minor in Data Science. I'm pursuing a career in Software Engineering and have experience in full stack development through my role at classmate and my summer internship at Garmin. I also have interest in Computer Science research, specifically how Artificial Intelligence can be leveraged to solve problems previously thought to be outside of the scope of Computer Science. When I'm not developing, I'm likely reading/writing, at the gym, or watching the Chicago Bears. Feel free to connect with me or check out my projects through the links throughout this site!
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          width: '100%', // Make the card full width
          maxWidth: '1200px', // Add a maximum width for the card
          padding: 4,
          boxShadow: 3,
          textAlign: 'center', // Center the header
        }}
      >
        <Typography variant="h4" component="div" gutterBottom>
          Projects/Experience
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {projects.map((project, index) => (
            <Grid item xs={12} md={6} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
              <ProjectCard
                image={project.image}
                title={project.title}
                link={project.link}
                description={project.description}
              />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
}

export default Software;
