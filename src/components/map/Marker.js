import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
// next
import { useRouter } from "next/router";
import Image from "next/image";
// material
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Paper,
  Popover,
  Skeleton,
  Typography,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
// apis
import { placesImagesFetcher } from "src/apis/places";
//
import { CarouselBasic1, CarouselControlsArrowsBasic1 } from "../carousel";
import Slider from "react-slick";

Marker.propTypes = {
  place: PropTypes.object,
};

function Marker({ place }) {
  const { id, title, address } = place;
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { push } = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(async () => {
    setLoading(true);
    await placesImagesFetcher(id)
      .then((placeImagesResponse) => setImages(placeImagesResponse))
      .catch((error) => console.log(error, "marker place images api"));
    setLoading(false);
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentIndex(next),
    adaptiveHeight: true,
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <>
      <IconButton
        color="primary"
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <PlaceIcon />
      </IconButton>
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handleClose}
      >
        <Card sx={{ maxWidth: 345, zIndex: 1000000 }}>
          {loading ? (
            <Skeleton height={400} width={400} />
          ) : (
            <>
              <CardMedia height="240">
                <>
                  <Slider ref={carouselRef} {...settings}>
                    {images ? (
                      _.map(images, (image) => (
                        <Box
                          component="img"
                          height={300}
                          width={400}
                          borderRadius="none"
                          src={image.image_url}
                          alt={title}
                        />
                      ))
                    ) : (
                      <Box
                        component="img"
                        height={300}
                        width={400}
                        borderRadius="none"
                        src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png"
                        alt={title}
                      />
                    )}
                  </Slider>
                  <CarouselControlsArrowsBasic1
                    index={currentIndex}
                    total={4}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                  />
                </>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {address}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => push(`/place/${id}`)} size="small">
                  View
                </Button>
              </CardActions>
            </>
          )}
        </Card>
      </Popover>
    </>
  );
}

export default Marker;
