import React from "react";
// material
import { styled } from "@mui/material/styles";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  Paper,
  Avatar,
  Button,
} from "@mui/material";
// components
import {
  MotionInView,
  varFadeInDown,
  varFadeInLeft,
  varFadeInRight,
} from "src/components/animate";

// ---------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up("md")]: {
    paddingBottom: theme.spacing(15),
  },
}));

// ---------------------------------------

function About() {
  return (
    <RootStyle>
      <Container>
        <MotionInView variants={varFadeInDown}>
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            Discover more with Find-X
          </Typography>
        </MotionInView>
        <Box marginTop={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={!2} md={6} lg={6}>
              <MotionInView variants={varFadeInLeft}>
                <Card>
                  <Avatar
                    src="/static/home/space_1.jpg"
                    variant="rounded"
                    sx={{
                      width: "100%",
                      height: "400px",
                      filter: "brightness(50%)",
                    }}
                  />
                  <Paper
                    sx={{
                      display: "flex",
                      position: "absolute",
                      top: 0,
                      flexDirection: "column",
                      backgroundColor: "transparent",
                      padding: 8,
                    }}
                  >
                    <Typography variant="h2" color="white">
                      Places where you can discover your thoughts
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: 4, width: "fit-content" }}
                    >
                      Find now
                    </Button>
                  </Paper>
                </Card>
              </MotionInView>
            </Grid>
            <Grid item xs={12} sm={!2} md={6} lg={6}>
              <MotionInView variants={varFadeInRight}>
                <Card>
                  <Avatar
                    src="/static/home/space_2.jpg"
                    variant="rounded"
                    sx={{
                      width: "100%",
                      height: "400px",
                      filter: "brightness(50%)",
                    }}
                  />
                  <Paper
                    sx={{
                      display: "flex",
                      position: "absolute",
                      top: 0,
                      flexDirection: "column",
                      backgroundColor: "transparent",
                      padding: 8,
                    }}
                  >
                    <Typography variant="h2" color="white">
                      Be more productive at places you love
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        marginTop: 4,
                        width: "fit-content",
                        color: (theme) =>
                          theme.palette.getContrastText(
                            theme.palette.common.white
                          ),
                        bgcolor: "common.white",
                        "&:hover": { bgcolor: "grey.300" },
                      }}
                    >
                      Discover now
                    </Button>
                  </Paper>
                </Card>
              </MotionInView>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </RootStyle>
  );
}

export default About;
