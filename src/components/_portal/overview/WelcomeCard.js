import React from "react";
// material
import { Box, Button, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// assets
import WelcomeIcon from "src/assets/portal/WelcomeIcon";

function WelcomeCard() {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        display: "flex",
        padding: 3,
        borderRadius: 2,
        backgroundColor: theme.palette.primary.light,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        width="50%"
        padding={2}
        justifyContent="center"
      >
        <Typography sx={{ mb: 2 }} variant="h4">
          Welcome back,<br></br> Abdelrahman
        </Typography>
        <Typography variant="body2">
          Attitude is a choice. Happiness is a choice. Optimism is a choice.
          Kindness is a choice. Giving is a choice. Respect is a choice.
          Whatever choice you make makes you. Choose wisely
        </Typography>
        <Button
          onClick={() => window.open("https://codehustle.live", "__blank")}
          sx={{ width: "130px", mt: 5 }}
          variant="contained"
        >
          Learn more
        </Button>
      </Box>
      <Box width={250} height={250} display="flex">
        <WelcomeIcon />
      </Box>
    </Paper>
  );
}

export default WelcomeCard;
