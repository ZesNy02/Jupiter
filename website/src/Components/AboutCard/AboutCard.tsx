import { FC } from "react";
import "./AboutCard.css";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface AboutCardProps {
  image: string;
  name: string;
  semester: string;
}

const AboutCard: FC<AboutCardProps> = ({ image, name, semester }) => {
  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{
            objectFit: "cover",
            borderRadius: "100%",
            width: "12rem",
            aspectRatio: 1,
            padding: "1rem",
          }}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h5" component="div" gutterBottom>
            {name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {semester}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default AboutCard;
