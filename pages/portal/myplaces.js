import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Icon } from "@iconify/react";
// next
import dynamic from "next/dynamic";
// material
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
} from "@mui/material";
// apis
import { userPlacesFetcher } from "src/apis/places";
// layouts
import DashboardLayout from "src/layouts/dashboard";
//
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import PlaceCard from "src/components/PlaceCard";
import EmptyIcon from "src/assets/portal/EmptyIcon";

const CreatePlace = dynamic(
  () => import("src/components/_portal/myplaces/CreatePlace"),
  {
    ssr: false,
  }
);

function MyPlacesPage() {
  const [loading, setLoading] = useState(false);
  const [userPlaces, setUserPlaces] = useState([]);
  const [createPlace, triggerCreatePlace] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(async () => {
    setLoading(true);
    await userPlacesFetcher()
      .then((userPlacesResponse) => setUserPlaces(userPlacesResponse))
      .catch((error) => console.log("myplaces", error));
    setLoading(false);
  }, [refreshData]);

  return (
    <DashboardLayout>
      <Container>
        <HeaderBreadcrumbs
          heading="My places"
          links={[
            { name: "Overview", href: "/portal/overview" },
            { name: "My places" },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Icon icon="akar-icons:plus" />}
              onClick={() => triggerCreatePlace(true)}
            >
              Create place
            </Button>
          }
        />
        <Grid container spacing={3}>
          {!loading && userPlaces.length === 0 && (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">
                  You didn't create place yet.
                </Typography>

                <EmptyIcon width="700" height="500" />
              </Paper>
            </Grid>
          )}
          {loading ? (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            </Grid>
          ) : (
            _.map(userPlaces, (userPlace, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={index === 0 ? 12 : 6}
                md={index === 0 ? 8 : 4}
                lg={index === 0 ? 8 : 4}
              >
                <PlaceCard place={userPlace} />
              </Grid>
            ))
          )}
        </Grid>
        <CreatePlace
          isTriggered={createPlace}
          closeHandler={() => triggerCreatePlace(false)}
          setRefreshData={setRefreshData}
        />
      </Container>
    </DashboardLayout>
  );
}

export default MyPlacesPage;
