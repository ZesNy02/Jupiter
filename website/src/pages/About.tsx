import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Container, Box } from '@mui/material';

const teamMembers = [
  { name: 'Cedric Herrmann', semester: '5IB', image: '/profiles/cedric.png' },
  { name: 'Noah Schneymann', semester: '4IB', image: '/profiles/noah.png' },
  { name: 'Mustafa Dal', semester: '5IB', image: '/profiles/mustafa.png' },
  { name: 'Cécile Hilsenbek', semester: '7D', image: '/profiles/cecile.jpg' },
  { name: 'Lenny Zesewitz', semester: '4IB', image: '/profiles/lenny.jpg' },
  { name: 'Paul Waßmuth', semester: '4IB', image: '/profiles/paul.png' },
  { name: 'Vincent R.', semester: '4IB', image: '/profiles/vincent.png' }
];

const AboutUs = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ my: 4 }}>
        Über uns
      </Typography>
      <Grid container spacing={3}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
              <Box
                sx={{
                  width: '8em',
                  height: '8em',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  mb: 2
                }}
              >
                <CardMedia
                  component="img"
                  image={member.image}
                  alt={member.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5" component="div" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {member.semester}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AboutUs;