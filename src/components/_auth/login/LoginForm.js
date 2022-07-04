import React, { useState } from "react";
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
// recoil
import { useRecoilState } from "recoil";
// material
import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
// apis
import { loginRequest, userInfoRequest } from "src/apis/auth";
// atoms
import { userState } from "src/recoil/atoms/auth";
// components
import { MIconButton } from "src/components/@material-extend";

// ---------------------------------------------------------------

function LoginForm() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useRecoilState(userState);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const data = new FormData();
      _.forOwn(values, (value, key) => data.append(key, value));
      await loginRequest(data)
        .then(
          async () =>
            await userInfoRequest()
              .then((userInfoResponse) => {
                setUser(userInfoResponse);
                router.push("/");
                enqueueSnackbar("Login success", {
                  variant: "success",
                  action: (key) => (
                    <MIconButton
                      size="small"
                      onClick={() => closeSnackbar(key)}
                    >
                      <Icon icon={closeFill} />
                    </MIconButton>
                  ),
                });
              })
              .catch((error) =>
                enqueueSnackbar(
                  `Something wrong happened but user logged in successfully----${error}`,
                  {
                    variant: "error",
                    action: (key) => (
                      <MIconButton
                        size="small"
                        onClick={() => closeSnackbar(key)}
                      >
                        <Icon icon={closeFill} />
                      </MIconButton>
                    ),
                  }
                )
              )
        )
        .catch((error) =>
          enqueueSnackbar(`Something wrong happened----${error}`, {
            variant: "errpr",
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            ),
          })
        );
    },
  });

  const {
    values,
    setFieldValue,
    getFieldProps,
    isSubmitting,
    touched,
    errors,
    dirty,
    handleSubmit,
  } = formik;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField
            label="Username or Email"
            value={values.username}
            onChange={(event) => setFieldValue("username", event.target.value)}
            {...getFieldProps("username")}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
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
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
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
            fullWidth
            type="submit"
            onClick={handleSubmit}
            disabled={!dirty}
            loading={isSubmitting}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Login
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginForm;
