import React from "react";
// material
import { Container, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
// components
import {
  MotionInView,
  varFadeIn,
  varFadeInDown,
  varFadeInLeft,
  varFadeInRight,
  varFadeInUp,
} from "src/components/animate";
import ServiceCard from "./ServiceCard";
import { Box } from "@mui/system";

// ---------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up("md")]: {
    paddingBottom: theme.spacing(15),
  },
}));

// ---------------------------------------
const services = [
  {
    icon: "https://a0.muscache.com/im/pictures/aff9e173-b551-44e4-80f3-bd9b9d632f8b.jpg?im_w=720",
    title: "Workspaces",
    body: "Find all workspaces near your geo location, and save yourself the time and effort to think for your meeting planning.",
  },
  {
    icon: "https://a0.muscache.com/im/pictures/2f5a15c7-2170-420a-9c48-9ac88a80a7fa.jpg?im_w=720",
    title: "Meeting rooms",
    body: "On map nearby meeting rooms finder with live contact with the host.",
  },
  {
    icon: "https://a0.muscache.com/im/pictures/a1617dd0-7140-4c64-814f-384d174a78be.jpg?im_w=720",
    title: "Weeding halls",
    body: "Scroll through the best offers for the nearby weeding halls.",
  },
];
// ---------------------------------------

function Services() {
  const serviceAnimationFinder = (index) => {
    let variants;
    let bgColor;
    if (index === 0) {
      variants = varFadeInRight;
      bgColor = "rgb(222, 49, 81)";
    } else if (index === 1) {
      variants = varFadeIn;
      bgColor = "rgb(188, 26, 110)";
    } else {
      variants = varFadeInLeft;
      bgColor = "rgb(217, 59, 48)";
    }
    return [variants, bgColor];
  };

  return (
    <RootStyle>
      <Container>
        <MotionInView variants={varFadeInUp}>
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
            Find-X
          </Typography>
        </MotionInView>
        <MotionInView variants={varFadeInDown}>
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            What Find-X offers you ?
          </Typography>
        </MotionInView>
        <Box marginTop={12}>
          <Grid container spacing={3}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <MotionInView variants={serviceAnimationFinder(index)[0]}>
                  <ServiceCard
                    service={service}
                    bgColor={serviceAnimationFinder(index)[1]}
                  />
                </MotionInView>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </RootStyle>
  );
}

export default Services;
