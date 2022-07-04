import React, { useEffect, useState } from "react";
import _ from "lodash";
// recoil
import { useRecoilState, useRecoilValue } from "recoil";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Divider,
  Grid,
  Skeleton,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
// atoms
import { placesAtom, placesPaginationAtom } from "src/recoil/atoms/places";
// selectors
import { paginatedMappedPlaces as paginatedMappedPlacesSelector } from "src/recoil/selectors/places";
// apis
import { placesFetcher, placesImagesFetcher } from "src/apis/places";
// layouts
import MainLayout from "src/layouts/main";
// components
import Page from "src/components/Page";
import { Container } from "@mui/material";
import FilterTabs from "src/components/_places/FilterTabs";
import Map from "src/components/map/Map";
import PlaceCard from "src/components/PlaceCard";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: "100%",
});

// ----------------------------------------------------------------------

function PlacesPage() {
  const [places, setPlaces] = useRecoilState(placesAtom);
  const paginatedMappedPlaces = useRecoilValue(paginatedMappedPlacesSelector);
  const [loading, setLoading] = useState(false);
  const [placesPagination, setPlacesPagination] =
    useRecoilState(placesPaginationAtom);
  const [fetchingMore, setFetchingMore] = useState(false);

  const handleMore = () => {
    setFetchingMore(true);
    if (placesPagination >= places.length) {
      setPlacesPagination(places.length);
    } else {
      setPlacesPagination(placesPagination + 10);
    }
    setFetchingMore(false);
  };

  useEffect(async () => {
    setLoading(true);
    await placesFetcher()
      .then((placesResponse) => setPlaces(placesResponse))
      .catch((error) => console.log("Places api call", error));
    setLoading(false);
  }, []);

  return (
    <MainLayout>
      <RootStyle
        title="Find-X : Explore workspaces, meeting rooms &amp; weeding halls near you."
        id="move_top"
      >
        <Container sx={{ pt: 14 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <FilterTabs />
          </Box>
          <Box marginTop={3}>
            {loading ? <Skeleton height={600} /> : <Map />}
          </Box>

          <Box marginTop={4} marginBottom={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h3">Discover places</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} marginBottom={4}>
                <Divider />
              </Grid>
              {loading ? (
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Box display="flex" justifyContent="center">
                    <CircularProgress />
                  </Box>
                </Grid>
              ) : (
                _.map(paginatedMappedPlaces, (place, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={index === 0 ? 12 : 6}
                    md={index === 0 ? 8 : 4}
                    lg={index === 0 ? 8 : 4}
                  >
                    <PlaceCard place={place} />
                  </Grid>
                ))
              )}
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box display="flex" justifyContent="center">
                  {fetchingMore ? (
                    <CircularProgress />
                  ) : (
                    <Button onClick={handleMore}>Load more</Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </RootStyle>
    </MainLayout>
  );
}

export default PlacesPage;
