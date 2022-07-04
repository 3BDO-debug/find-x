import React from "react";
import PropTypes from "prop-types";
// material
import { Box, Paper, Typography } from "@mui/material";

function OverviewCard({ data }) {
  const { title, info, icon } = data;
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
      }}
      elevation={1}
    >
      <Box display="flex" flexDirection="column">
        <Typography variant="h3">{info}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Box
        width="120px"
        height="120px"
        borderRadius="50%"
        backgroundColor="rgb(244, 246, 248)"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {icon}
      </Box>
    </Paper>
  );
}

export default OverviewCard;
