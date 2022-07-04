import React from "react";
import PropTypes from "prop-types";
// material
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { MotionInView, varFadeInUp } from "../animate";

ReviewCard.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  timestamp: PropTypes.string,
  review: PropTypes.string,
};

function ReviewCard({ avatar, name, timestamp, review }) {
  return (
    <MotionInView variants={varFadeInUp}>
      <Card
        sx={{
          boxShadow: "none",
          border: "1px solid lightgray",
          borderRadius: "8px",
          margin: "30px 0px 30px 0px",
        }}
      >
        <CardHeader
          avatar={<Avatar src={avatar} alt={name} />}
          title={name}
          subheader={timestamp}
        />
        <CardContent>
          <Typography variant="body2">{review}</Typography>
        </CardContent>
      </Card>
    </MotionInView>
  );
}

export default ReviewCard;
