import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#333',
        color: 'white',
        py: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Anschrift
            </Typography>
            <Typography>
              Hochschule Mannheim<br />
              Paul-Wittsack Straße 10<br />
              68163 Mannheim
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
            <Typography variant="h6" gutterBottom>
              Kontakt
            </Typography>
            <Typography>
              E-Mail: lenny.zesewitz@gmail.com
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;