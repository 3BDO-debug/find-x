import Slider from "react-slick";
import PropTypes from "prop-types";
import { useState, useRef } from "react";
// material
import { useTheme } from "@mui/material/styles";
import { Box, Card } from "@mui/material";
// axios
import { mainUrl } from "src/apis/axios";
//
import {
  CarouselControlsArrowsIndex,
  CarouselControlsArrowsBasic1,
} from "./controls";

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object,
};

function CarouselItem({ image }) {
  return (
    <Box
      component="img"
      alt="carousel image"
      src={image}
      sx={{
        width: "100%",
        height: 480,
        objectFit: "cover",
        borderBottom: "none",
        filter: "brightness(50%)",
      }}
    />
  );
}

export default function CarouselBasic1({ images }) {
  const theme = useTheme();
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(
    theme.direction === "rtl" ? MOCK_CAROUSELS.length - 1 : 0
  );

  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === "rtl"),
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
    <Card>
      <Slider ref={carouselRef} {...settings}>
        {images && images.length > 0 ? (
          images?.map((image, index) => (
            <CarouselItem key={index} image={image} />
          ))
        ) : (
          <CarouselItem image="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png" />
        )}
      </Slider>

      <CarouselControlsArrowsBasic1
        index={currentIndex}
        total={4}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </Card>
  );
}
