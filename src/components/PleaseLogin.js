import React from "react";
import PropTypes from "prop-types";
// material
import {
  Grid,
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
//
import LoginIcon from "src/assets/LoginIcon";
import { DialogAnimate } from "./animate";

PleaseLogin.propTypes = {
  isTriggered: PropTypes.bool,
  closeHandler: PropTypes.func,
};

function PleaseLogin({ isTriggered, closeHandler }) {
  return (
    <DialogAnimate opem={isTriggered} onClose={closeHandler}>
      <DialogTitle>You have to login.</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box>
              <LoginIcon />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button variant="contained" onClick={() => push("/auth/login")}>
          Login
        </Button>
      </DialogActions>
    </DialogAnimate>
  );
}

export default PleaseLogin;
