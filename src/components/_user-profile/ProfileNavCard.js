import React from "react";
import { Icon } from "@iconify/react";
import PropTypes from "prop-types";
// next
import { useRouter } from "next/router";
// material
import { Box, Paper, Typography } from "@mui/material";

ProfileNavCard.propTypes = {
  data: PropTypes.object,
};

function ProfileNavCard({ data }) {
  const { icon, title, description, link } = data;
  const { push } = useRouter();

  const clickHandler = () => push(link);

  return (
    <Paper
      onClick={clickHandler}
      elevation={7}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: 2,
        cursor: "pointer",
        height: "200px",
      }}
    >
      <Box marginBottom={4}>
        <Icon icon={icon} width={40} height={40} />
      </Box>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="caption">{description}</Typography>
    </Paper>
  );
}

export default ProfileNavCard;
