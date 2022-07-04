import React from "react";
import PropTypes from "prop-types";
// material
import { Avatar, Card, Grid, Paper, Box, Typography } from "@mui/material";

ServiceCard.propTypes = {
  service: PropTypes.object,
  bgColor: PropTypes.string,
};

function ServiceCard({ service, bgColor }) {
  const { title, icon, body } = service;

  return (
    <Card>
      <Paper sx={{ display: "flex", flexDirection: "column" }}>
        <Avatar
          src={icon}
          alt={title}
          variant="rounded"
          sx={{ width: "500px", height: "350px", zIndex: 9 }}
        />
        <Box padding={3} sx={{ backgroundColor: bgColor }} minHeight={200}>
          <Typography variant="h4" color="primary.contrastText">
            {title}
          </Typography>
          <Typography
            sx={{ marginTop: 3 }}
            variant="body2"
            color="primary.contrastText"
          >
            {body}
          </Typography>
        </Box>
      </Paper>
    </Card>
  );
}

export default ServiceCard;
