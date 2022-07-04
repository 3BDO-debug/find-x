import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { useSnackbar } from "notistack";
import closeFill from "@iconify/icons-eva/close-fill";
import { Icon } from "@iconify/react";
// next
import { useRouter } from "next/router";
// material
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Paper,
  Stack,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EditIcon from "@mui/icons-material/Edit";
// apis
import { bookingRequestAdder } from "src/apis/booking";
// atoms
import { userState } from "src/recoil/atoms/auth";
//
import { DialogAnimate } from "../animate";
import LoginIcon from "src/assets/LoginIcon";
import PleaseLogin from "../PleaseLogin";
import { MIconButton } from "src/components/@material-extend";

BookingForm.propTypes = {
  isTriggered: PropTypes.bool,
  closeHandler: PropTypes.func,
  placeId: PropTypes.number,
};

function BookingForm({ isTriggered, closeHandler, placeId }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const user = useRecoilValue(userState);
  const { push } = useRouter();
  const [editEmail, setEditEmail] = useState(false);
  const [editPhone, setEditPhone] = useState(false);

  const formik = useFormik({
    initialValues: {
      phone: "",
      email: "",
      notes: "",
    },
    validationSchema: Yup.object().shape({
      notes: Yup.string().required("Notes is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const data = new FormData();
      data.append("notes", values.notes);
      data.append("phone", editPhone ? values.phone : user?.phone);
      data.append("email", editEmail ? values.email : user?.email);
      data.append("placeId", placeId);
      await bookingRequestAdder(data)
        .then(() =>
          enqueueSnackbar("Booked successfuly", {
            variant: "success",
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            ),
          })
        )
        .catch((error) =>
          enqueueSnackbar(`Something wrong happened---${error}`, {
            variant: "error",
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            ),
          })
        );
      resetForm();
      closeHandler();
    },
  });

  const {
    values,
    getFieldProps,
    dirty,
    isSubmitting,
    setFieldValue,
    errors,
    touched,
    handleSubmit,
  } = formik;

  return (
    <DialogAnimate open={isTriggered} onClose={closeHandler} maxWidth="sm">
      <DialogTitle>
        <Stack direction="column">
          <Typography variant="h4">
            {user ? "Book Now" : "You have to login first"}
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Paper sx={{ padding: "30px 0px 0px 0px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                value={user?.first_name}
                label="First name"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                value={user?.last_name}
                label="Last name"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                label="Phone number"
                value={editPhone ? values.phone : user?.phone}
                onChange={(event) => setFieldValue("phone", event.target.value)}
                fullWidth
                type="tel"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setEditPhone(true)}>
                        <EditIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                label="Email"
                type="email"
                value={editEmail ? values.email : user?.email}
                onChange={(event) => setFieldValue("email", event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setEditEmail(true)}>
                        <EditIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                label="Government ID"
                value={user?.gov_id}
                disabled
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CreditCardIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                label="Booking notes"
                {...getFieldProps("notes")}
                onChange={(event) => setFieldValue("notes", event.target.value)}
                rows={3}
                error={Boolean(touched.notes && errors.notes)}
                helperText={touched.notes && errors.notes}
                fullWidth
                multiline
              />
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>cancel</Button>
        <LoadingButton
          disabled={!dirty}
          loading={isSubmitting}
          onClick={handleSubmit}
          variant="contained"
        >
          Book Now
        </LoadingButton>
      </DialogActions>
    </DialogAnimate>
  );
}

export default BookingForm;
