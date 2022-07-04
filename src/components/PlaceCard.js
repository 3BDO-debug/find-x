import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
// next
import NextLink from "next/link";
// apis
import { placesImagesFetcher } from "src/apis/places";
// material
import { Card, Paper, Box, Typography, Skeleton } from "@mui/material";
//
import { CarouselBasic1 } from "./carousel";

PlaceCard.propTypes = {
  place: PropTypes.object,
};

function PlaceCard({ place }) {
  const { id, name, description, slug } = place;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    await placesImagesFetcher(id)
      .then((placeImagesResponse) => setImages(placeImagesResponse))
      .catch((error) => console.log("place images api", error));
    setLoading(false);
  }, [place]);

  return (
    <>
      {loading ? (
        <Skeleton height={473} />
      ) : (
        <Card sx={{ cursor: "pointer", height: "473px" }}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CarouselBasic1
              images={_.map(images, (image) =>
                image.image_url ? image.image_url : image.image
              )}
            />

            <NextLink href={`/place/${slug ? slug : id}`}>
              <Box padding={3} top="-140px" position="relative">
                <Typography variant="h4" color="primary.contrastText">
                  {name}
                </Typography>
                <p
                  style={{
                    margin: 0,
                    lineHeight: 1.5714285714285714,
                    fontSize: "0.875rem",
                    fontFamily: "Public Sans,sans-serif",
                    fontWeight: 400,
                    color: "#fff",
                    width: "280px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textoverflow: "ellipsis",
                  }}
                  dangerouslySetInnerHTML={{ __html: description }}
                ></p>
              </Box>
            </NextLink>
          </Paper>
        </Card>
      )}
    </>
  );
}

export default PlaceCard;
