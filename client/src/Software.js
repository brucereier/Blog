import React from 'react';
import { Card, CardContent, Avatar, Typography, IconButton, Box, Grid } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import ProjectCard from './ProjectCard';


const tools = ['React', 'Firestore', 'Python', 'Blazor', 'C#', 'SQL Server', 'Express.js', 'Node.js', 'PostgreSQL', 'TensorFlow', 'FastAPI'];
const projects = [
    {
        image: '/metabob.gif',
        title: 'Meta SWE Intern',
        description: 'Incoming Summer 2025',
        tools: []
    },
    {
        image: '/classmate.jpeg',
        title: 'classmate',
        link: 'https://classmate.lol',
        description: 'Building a website that makes course registration easier for college students by providing advanced course filtering and allowing students to connect with their friends.',
        tools: ['React', 'Firestore', 'Python']
    },
    {
        image: '/garmin.jpeg',
        title: 'Garmin SWE Intern',
        link: 'https://www.garmin.com/en-US/',
        description: 'Built a web application to facilitate the creation, approval, and deployment of subscription plans into Garmin\'s system.',
        tools: ['Blazor', 'C#', 'SQL Server']
    },
    {
        image: '/luminary.png',
        title: 'Luminary',
        link: 'https://appteamcarolina.com/#apps',
        description: 'Backend development on an iOS app providing accessible navigation on college campuses.',
        tools: ['Express.js', 'Node.js', 'PostgreSQL']
    },
    {
        image: '/research.jpeg',
        title: 'Undergraduate AI Research',
        link: 'https://tarheels.live/compressivenetworks/andrew-bruce-research-project/',
        description: 'Researching the most efficient Machine Learning pipeline for classifying whether or not stained WSIs are melanocytic or not. Mainly focusing on CNNs for feature extraction.',
        tools: ['Python', 'TensorFlow']
    },
    {
        image: '/bruce.jpeg',
        title: 'Personal Portfolio',
        link: 'https://github.com/brucereier/Blog',
        description: 'Developed a personal portfolio to display software projects/experiences and writing projects.',
        tools: ['React', 'Express.js', 'Node.js']
    },
    {
        image: '/astraloq.png',
        title: 'Astraloq',
        link: 'https://github.com/brucereier/hacknc2024',
        description: 'Created a web application to allow amatuer astronomers to see events near them and to connect with fellow hobbyists. Made for HackNC 2024.',
        tools: ['React', 'FastAPI', 'PostgreSQL']
    }
];

function Software() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
                padding: 2,
                paddingTop: 4,
            }}
        >
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    padding: 4,
                    boxShadow: 3,
                    width: '100%',
                    maxWidth: '1200px',
                    marginBottom: 4,
                }}
            >
                <Avatar
                    alt="Bruce Reier"
                    src="/bruce.jpeg"
                    sx={{
                        width: 300,
                        height: 300,
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
                        marginLeft: { md: 4 },
                    }}
                >
                    <Typography variant="h4" component="div" gutterBottom>
                        Bruce Reier
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: { xs: 'center', md: 'flex-start' },
                            marginBottom: 2,
                        }}
                    >
                        <IconButton
                            aria-label="LinkedIn"
                            href="https://www.linkedin.com/in/brucereier"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ fontSize: 40 }}
                        >
                            <LinkedInIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton
                            aria-label="GitHub"
                            href="https://github.com/brucereier"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ fontSize: 40 }}
                        >
                            <GitHubIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton
                            aria-label="Email"
                            href="mailto:bpreier@unc.edu"
                            sx={{ fontSize: 40 }}
                        >
                            <EmailIcon fontSize="inherit" />
                        </IconButton>
                    </Box>
                    <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                        Hey! I'm Bruce, a Software Developer studying Computer Science and Math at UNC Chapel Hill. I'll be interning at Meta in Menlo Park this upcoming summer. I'm interested in all things tech, but specifically full stack development. You can check out some of my projects/experience below. Outside of developing I enjoy weightlifting, reading/writing, and watching the Chicago Bears/Cubs. Feel free to connect with me or reach out to me to chat!
                    </Typography>
                </CardContent>
            </Card>
            <Card
                sx={{
                    width: '100%',
                    maxWidth: '1200px',
                    padding: 4,
                    boxShadow: 3,
                    textAlign: 'center',
                    marginBottom: 4,
                }}
            >
                <Typography variant="h4" component="div" gutterBottom>
                    Skills
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {tools.map((tool) => {
                        const iconName = tool.replace(/\./g, '-').replace(/#/g, '%23') + '.png';
                        const iconPath = `/icons/${iconName}`;
                        return (
                            <Grid
                                item
                                key={tool}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 0.5, // Reduced gap to bring icon and text closer
                                    width: 'auto',
                                }}
                            >
                                <img
                                    src={iconPath}
                                    alt={tool}
                                    style={{
                                        width: 45,
                                        height: 45,
                                        objectFit: 'contain',
                                    }}
                                />
                                <Typography variant="body1" color="text.primary" sx={{ marginLeft: 0.5 }}>
                                    {tool}
                                </Typography>
                            </Grid>
                        );
                    })}
                </Grid>
            </Card>
            <Card
                sx={{
                    width: '100%',
                    maxWidth: '1200px',
                    padding: 4,
                    boxShadow: 3,
                    textAlign: 'center',
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
                                tools={project.tools}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Card>
        </Box>
    );
}

export default Software;
