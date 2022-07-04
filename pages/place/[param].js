import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Icon } from "@iconify/react";
import { useRecoilValue } from "recoil";
// next
import { useRouter } from "next/router";
import NextLink from "next/link";
// material
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardActions,
  InputBase,
  Avatar,
  IconButton,
  Skeleton,
  Grid,
  Stack,
  Tooltip,
  Fab,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import InfoIcon from "@mui/icons-material/Info";
import StarRateIcon from "@mui/icons-material/StarRate";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// atoms
import { userState } from "src/recoil/atoms/auth";
// apis
import { placeDetailsFetcher } from "src/apis/places";
// layouts
import MainLayout from "src/layouts/main";
// components
import Page from "src/components/Page";
import { CarouselBasic1 } from "src/components/carousel";
import Map from "src/components/map/Map";
import { MotionInView, varFadeInUp } from "src/components/animate";
import Scrollbar from "src/components/Scrollbar";
import ReviewCard from "src/components/_place-details/ReviewCard";
import Label from "src/components/Label";
import BookingForm from "src/components/_place-details/BookingForm";
import Markdown from "src/components/Markdown";
import PleaseLogin from "src/components/PleaseLogin";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: "100%",
});

const SectionCard = ({ children }) => (
  <Card sx={{ padding: 3, marginTop: 1, marginBottom: 4 }}>{children}</Card>
);

const InfoItem = ({ icon, description }) => (
  <Grid item xs={12} sm={6} md={6} lg={6}>
    <Stack direction="row">
      {icon}
      <Typography variant="h6">{description}</Typography>
    </Stack>
  </Grid>
);

// ----------------------------------------------------------------------

function PlaceDetailsPage() {
  const router = useRouter();
  const { param } = router.query;
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingForm, triggerBookingForm] = useState(false);
  const user = useRecoilValue(userState);
  const [pleaseLogin, triggerPleaseLogin] = useState(false);

  useEffect(async () => {
    if (param) {
      setLoading(true);
      await placeDetailsFetcher(param)
        .then((placeDetailsResponse) => setPlace(placeDetailsResponse))
        .catch((error) => console.log("place details api", error));
      setLoading(false);
    }
  }, [param]);

  console.log("here", place);

  return (
    <>
      <MainLayout>
        <RootStyle title="Find-X : Place name" id="move_top">
          <Container sx={{ pt: 14 }}>
            {loading ? (
              <Skeleton height={500} />
            ) : (
              <Card sx={{ marginBottom: 10, height: "490px" }}>
                <Paper
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "transparent",
                  }}
                >
                  <CarouselBasic1
                    images={_.map(place?.place_images, (placeImage) =>
                      placeImage.image_url
                        ? placeImage.image_url
                        : placeImage.image
                    )}
                  />
                  <Box padding={3} position="relative" top="-110px">
                    <Typography variant="h3" color="primary.contrastText">
                      {place?.place.name}
                    </Typography>
                  </Box>
                </Paper>
              </Card>
            )}
            {loading ? (
              <Skeleton height={500} />
            ) : (
              <SectionCard>
                <Stack direction="row" width="100%" alignItems="center">
                  <Typography
                    variant="h3"
                    sx={{ textAlign: "left", marginBottom: 3 }}
                  >
                    Info
                  </Typography>
                  {place?.place.is_site_featured && (
                    <Stack
                      direction="row"
                      sx={{ width: "100%" }}
                      justifyContent="flex-end"
                    >
                      <Tooltip title="Site featured label means that the data had been fetched and scraped from google maps which means that some data may be missing.">
                        <InfoIcon color="info" sx={{ marginRight: 1 }} />
                      </Tooltip>

                      <Label variant="ghost" color="info">
                        Site featured
                      </Label>
                    </Stack>
                  )}
                </Stack>

                <Grid container spacing={3} padding={3}>
                  <InfoItem
                    icon={
                      <StarRateIcon
                        sx={{ marginRight: 1, color: "rgb(250, 175, 0)" }}
                      />
                    }
                    description={place?.place_reviews?.length}
                  />
                  <InfoItem
                    icon={
                      <PlaceIcon
                        sx={{ marginRight: 1, color: "text.secondary" }}
                      />
                    }
                    description={place?.place.address}
                  />

                  {place?.place.phone_number && (
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <NextLink
                        href="tel: 01017003476"
                        style={{ cursor: "pointer" }}
                      >
                        <Tooltip title="Click to directly call">
                          <Stack
                            direction="row"
                            sx={{ width: "100%" }}
                            sx={{ cursor: "pointer" }}
                          >
                            <PhoneIcon
                              sx={{ marginRight: 1, color: "text.secondary" }}
                            />
                            <Typography variant="h6">
                              {place?.place.phone_number}
                            </Typography>
                          </Stack>
                        </Tooltip>
                      </NextLink>
                    </Grid>
                  )}
                  {!place?.place.is_site_featured && (
                    <InfoItem
                      icon={
                        <LocalOfferIcon
                          sx={{ marginRight: 1, color: "text.secondary" }}
                        />
                      }
                      description={place?.place.pricing}
                    />
                  )}
                </Grid>
              </SectionCard>
            )}
            {loading ? (
              <Skeleton height={600} />
            ) : (
              place && (
                <MotionInView variants={varFadeInUp}>
                  <SectionCard>
                    <Typography
                      variant="h3"
                      sx={{ textAlign: "left", marginBottom: 3 }}
                    >
                      location
                    </Typography>
                    <Map
                      singleMode
                      longitude={place?.place.longitude}
                      latitude={place?.place.latitude}
                      place={
                        place && {
                          id: place.place.id,
                          title: place.place.name,
                          address: place.place.address,
                        }
                      }
                    />
                  </SectionCard>
                </MotionInView>
              )
            )}
            {loading ? (
              <Skeleton height={500} />
            ) : (
              <MotionInView variants={varFadeInUp}>
                <SectionCard>
                  <Typography variant="h3" sx={{ marginBottom: 3 }}>
                    Description
                  </Typography>

                  <Markdown>{place?.place.description}</Markdown>
                </SectionCard>
              </MotionInView>
            )}
            {loading ? (
              <Skeleton height={400} />
            ) : (
              <MotionInView variants={varFadeInUp}>
                <SectionCard>
                  <Typography variant="h3">Reviews</Typography>
                  {place?.place_reviews.length > 0 ? (
                    <Scrollbar
                      sx={{
                        display: "flex",
                        flexDirection: "column",

                        marginTop: 3,
                        height: "300px",
                      }}
                    >
                      {_.map(place?.place_reviews, (placeReview) => (
                        <ReviewCard
                          avatar={placeReview.avatar_url}
                          name={placeReview.author_name}
                          timestamp={placeReview.relative_time}
                          review={placeReview.review}
                        />
                      ))}
                    </Scrollbar>
                  ) : (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      margin="20px 0px 20px 0px"
                    >
                      <Typography variant="body1">
                        This place don't have reviews yet, review it now ✍️
                      </Typography>
                    </Box>
                  )}
                  <CardActions>
                    <InputBase
                      fullWidth
                      placeholder="Write a review"
                      startAdornment={<Avatar sx={{ marginRight: 3 }} />}
                      endAdornment={
                        <IconButton
                          onClick={() => {
                            if (user) {
                            } else {
                              triggerPleaseLogin(true);
                            }
                          }}
                        >
                          <SendIcon />
                        </IconButton>
                      }
                    />
                  </CardActions>
                </SectionCard>
              </MotionInView>
            )}
            <BookingForm
              isTriggered={bookingForm}
              closeHandler={() => triggerBookingForm(false)}
              placeId={place?.place.id}
            />
            <PleaseLogin />
          </Container>
        </RootStyle>
      </MainLayout>
      {!place?.place.is_site_featured && (
        <Fab
          sx={{
            position: "sticky",
            bottom: "20px",
            right: "20px",
            float: "right",
          }}
          variant="extended"
          onClick={() => {
            if (user) {
              triggerBookingForm(true);
            } else {
              triggerPleaseLogin(true);
            }
          }}
        >
          <Icon icon="eva:edit-2-outline" width={25} />
          Book now
        </Fab>
      )}
    </>
  );
}

export default PlaceDetailsPage;
