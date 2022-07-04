import { forwardRef } from "react";
import PropTypes from "prop-types";
// material
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { varFadeIn } from "./animate";

// ----------------------------------------------------------------------

const Logo = forwardRef(({ sx }, ref) => {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <motion.img
      src="/static/home/ic_hustle.png"
      variants={varFadeIn}
      style={{ maxWidth: "70px" }}
    />
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
};

export default Logo;
