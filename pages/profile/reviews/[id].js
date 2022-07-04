import React from "react";
// material
import {
  Container,
  Paper,
  Grid,
  Divider,
  Card,
  CardHeader,
  Typography,
  CardContent,
} from "@mui/material";
// layouts
import MainLayout from "src/layouts/main";
//
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Scrollbar from "src/components/Scrollbar";

// --------------------------------------------------------------------------

const UserReviewCard = () => {
  return (
    <Card variant="outlined" sx={{ margin: "10px 0 10px 0" }}>
      <CardHeader
        title={
          <Typography variant="subtitle1">
            Reivew for Maddar workspace
          </Typography>
        }
        subheader={<Typography variant="caption">21 dec, 2021</Typography>}
        disableTypography
      />
      <CardContent>
        <Typography variant="body2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make
        </Typography>
      </CardContent>
    </Card>
  );
};

// --------------------------------------------------------------------------

function UserReviews() {
  return (
    <MainLayout>
      <Paper sx={{ height: "100%" }}>
        <Container sx={{ pt: 14 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <HeaderBreadcrumbs
                heading="User reviews (50)"
                links={[
                  { name: "Profile", href: `/profile/${1}` },
                  { name: "User reviews" },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Scrollbar
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "400px",
                }}
              >
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
                <UserReviewCard />
              </Scrollbar>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </MainLayout>
  );
}

export default UserReviews;
