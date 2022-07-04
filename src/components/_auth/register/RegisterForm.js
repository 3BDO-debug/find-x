import React, { useCallback, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useSnackbar } from "notistack";
import closeFill from "@iconify/icons-eva/close-fill";
import _ from "lodash";
// next
import { useRouter } from "next/router";
// material
import {
  Box,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  FormHelperText,
  Tooltip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CreditCardIcon from "@mui/icons-material/CreditCard";
// apis
import { registerRequest } from "src/apis/auth";
// components
import { UploadAvatar } from "src/components/upload";
import { MIconButton } from "src/components/@material-extend";

// ------------------------------------------------------

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();

  const fomrik = useFormik({
    initialValues: {
      profilePic: null,
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      phone: "",
      govId: "",
      address: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      profilePic: Yup.mixed().required("Profile pic is required"),
      firstname: Yup.string().required("First name is required"),
      lastname: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      username: Yup.string().required("Username is required"),
      phone: Yup.number().required("Phone number is required"),
      govId: Yup.string().required("Government ID is required"),
      address: Yup.string().required("Address is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const data = new FormData();
      _.forOwn(values, (value, key) =>
        data.append(key, key === "profilePic" ? value.file : value)
      );

      await registerRequest(data)
        .then(() => {
          router.push("/auth/login");
          enqueueSnackbar("Account created", {
            variant: "success",
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            ),
          });
        })
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
      setSubmitting(false);
    },
  });

  const {
    values,
    setFieldValue,
    getFieldProps,
    isSubmitting,
    dirty,
    touched,
    errors,
    handleSubmit,
  } = fomrik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue("profilePic", {
          file: file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [setFieldValue]
  );

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <UploadAvatar
            accept="image/*"
            file={values.profilePic}
            onDrop={handleDrop}
            error={Boolean(touched.profilePic && errors.profilePic)}
            caption={
              <Typography
                variant="caption"
                sx={{
                  mt: 2,
                  mx: "auto",
                  display: "block",
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif
              </Typography>
            }
          />
          <FormHelperText error sx={{ px: 2 }} {...getFieldProps("profilePic")}>
            {touched.profilePic && errors.profilePic}
          </FormHelperText>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            label="First name"
            value={values.firstname}
            onChange={(event) => setFieldValue("firstname", event.target.value)}
            {...getFieldProps("firstname")}
            error={Boolean(touched.firstname && errors.firstname)}
            helperText={touched.firstname && errors.firstname}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            label="Last name"
            value={values.firstname}
            onChange={(event) => setFieldValue("lastname", event.target.value)}
            {...getFieldProps("lastname")}
            error={Boolean(touched.lastname && errors.lastname)}
            helperText={touched.lastname && errors.lastname}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <TextField
            label="Email address"
            value={values.firstname}
            onChange={(event) => setFieldValue("email", event.target.value)}
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <TextField
            label="Username"
            value={values.username}
            onChange={(event) => setFieldValue("username", event.target.value)}
            {...getFieldProps("username")}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <TextField
            label="Phone"
            value={values.phone}
            onChange={(event) => setFieldValue("phone", event.target.value)}
            {...getFieldProps("phone")}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField
            label="Government ID"
            value={values.govId}
            onChange={(event) => setFieldValue("govId", event.target.value)}
            {...getFieldProps("govId")}
            error={Boolean(touched.govId && errors.govId)}
            helperText={touched.govId && errors.govId}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Please enter the number written on your Government ID">
                    <IconButton>
                      <CreditCardIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField
            label="Address"
            value={values.address}
            onChange={(event) => setFieldValue("address", event.target.value)}
            {...getFieldProps("address")}
            error={Boolean(touched.address && errors.address)}
            helperText={touched.address && errors.address}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <LocationOnIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={(event) => setFieldValue("password", event.target.value)}
            {...getFieldProps("password")}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <LoadingButton
            type="submit"
            variant="contained"
            disabled={!dirty}
            onClick={handleSubmit}
            loading={isSubmitting}
            endIcon={<SendIcon />}
            fullWidth
          >
            Register now
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RegisterForm;
