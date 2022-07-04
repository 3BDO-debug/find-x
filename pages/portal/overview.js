import React from "react";
import _ from "lodash";
// material
import { Box, Container, Grid, Typography } from "@mui/material";
// layouts
import DashboardLayout from "src/layouts/dashboard";
//
import OverviewCard from "src/components/_portal/overview/OverviewCard";
// assets
import PlacesIcon from "src/assets/portal/PlacesIcon";
import ReservationsIcon from "src/assets/portal/ReservationsIcon";
import WelcomeCard from "src/components/_portal/overview/WelcomeCard";

// ----------------------------------------------------------------------

const overviewCardsData = [
  {
    title: "Total Places",
    info: "512",
    icon: <PlacesIcon />,
  },
  { title: "Total Reservations", info: 200, icon: <ReservationsIcon /> },
];

// ----------------------------------------------------------------------

function OverviewPage() {
  return (
    <DashboardLayout>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box display="flex" flexDirection="column">
              <Typography variant="h3">Hi 👋</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <WelcomeCard />
          </Grid>
          {_.map(overviewCardsData, (overviewCard, index) => (
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <OverviewCard key={index} data={overviewCard} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </DashboardLayout>
  );
}

export default OverviewPage;
