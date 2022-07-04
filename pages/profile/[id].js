import React from "react";
import _ from "lodash";
import { useRecoilValue } from "recoil";
// next
import { useRouter } from "next/router";
// material
import {
  Container,
  Paper,
  Grid,
  Box,
  Typography,
  Divider,
} from "@mui/material";
// recoil
import { userState } from "src/recoil/atoms/auth";
//
import MainLayout from "src/layouts/main";
import ProfileNavCard from "src/components/_user-profile/ProfileNavCard";

function UserProfile() {
  const { query } = useRouter();
  const user = useRecoilValue(userState);

  const navCardsData = [
    {
      title: "Personal info",
      description:
        "View &amp; edit your personal info which will be visible to the places provider and other users.",
      icon: "carbon:account",
      link: `/profile/info/${query?.id}`,
    },
    {
      title: "My reviews",
      description: "View your reviews for the places you viewed and visited.",
      icon: "ic:outline-reviews",
      link: `/profile/reviews/${query?.id}`,
    },
    {
      title: "Explore places",
      description:
        "Explore best offers on the nearby workspaces & weeding halls.",
      icon: "ri:compass-discover-line",
      link: "/places",
    },
    {
      title: `${
        user?.is_host
          ? "Go to service provider portal"
          : "Become a service provider"
      }`,
      description: `${
        user?.is_host
          ? "View my service provider portal."
          : "Join our service provider programm and list your workspaces & weeding halls and create offers to attract users to your place."
      }`,
      icon: `${
        user?.is_host
          ? "ant-design:dashboard-outlined"
          : "vscode-icons:file-type-light-codeowners"
      }`,
      link: `${user?.is_host ? "/portal/overview" : ""}`,
    },
    {
      title: "Need a help ?",
      description: "Get in touch with us, we always happy to listen from you.",
      icon: "bx:bx-support",
      link: "",
    },
  ];

  return (
    <MainLayout>
      <Paper sx={{ height: "100%" }}>
        <Container sx={{ pt: 14, marginBottom: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box display="flex" flexDirection="column">
                <Typography variant="h3">Account</Typography>
                <Typography variant="body1">
                  Hey {`${user?.first_name} ${user?.last_name}`}, what you would
                  like to explore today 🚀
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Divider />
            </Grid>
          </Grid>
          <Grid container spacing={3} marginTop={7}>
            {_.map(navCardsData, (navCard) => (
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <ProfileNavCard data={navCard} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Paper>
    </MainLayout>
  );
}

export default UserProfile;
