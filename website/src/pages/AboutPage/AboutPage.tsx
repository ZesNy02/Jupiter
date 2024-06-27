import { FC } from "react";
import { Grid, Typography, Container } from "@mui/material";
import "./AboutPage.css";
import AboutCard from "../../Components/AboutCard/AboutCard";

const teamMembers = [
  { name: "Cedric Herrmann", semester: "5IB", image: "/profiles/cedric.png" },
  { name: "Noah Schneymann", semester: "4IB", image: "/profiles/noah.png" },
  { name: "Mustafa Dal", semester: "5IB", image: "/profiles/mustafa.png" },
  { name: "Cécile Hilsenbek", semester: "7D", image: "/profiles/cecile.jpg" },
  { name: "Lenny Zesewitz", semester: "4IB", image: "/profiles/lenny.jpg" },
  { name: "Paul Waßmuth", semester: "4IB", image: "/profiles/paul.png" },
  { name: "Vincent R.", semester: "4IB", image: "/profiles/vincent.png" },
];
interface AboutPageProps {}

const AboutPage: FC<AboutPageProps> = ({}) => {
  return (
    <>
      <Container maxWidth="lg" sx={{ height: "fit-content" }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{ my: 4 }}
        >
          Über uns
        </Typography>
        <Grid container spacing={3}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <AboutCard
                name={member.name}
                image={member.image}
                semester={member.semester}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default AboutPage;
