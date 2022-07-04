import React, { useState } from "react";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
// material
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// layouts
import MainLayout from "src/layouts/main";
//
import { UploadAvatar } from "src/components/upload";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";

function UserInfo() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <MainLayout>
      <Paper sx={{ height: "100%" }}>
        <Container sx={{ pt: 14 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <HeaderBreadcrumbs
                heading="Personal info"
                links={[
                  { name: "Profile", href: `/profile/2` },
                  { name: "Personal info" },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Card>
                <CardHeader title="Profile photo" />
                <CardContent>
                  <UploadAvatar
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
                </CardContent>
                <CardActions sx={{ padding: 2 }}>
                  <LoadingButton
                    sx={{ marginLeft: "auto" }}
                    variant="contained"
                  >
                    Update
                  </LoadingButton>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Card>
                <CardHeader title="User info" />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <TextField label="First name" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <TextField label="Last name" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <TextField label="Email" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <TextField label="Username" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <TextField label="Phone number" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <TextField
                        label="Address"
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
                        type="password"
                        label="Password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                onClick={() => setShowPassword((prev) => !prev)}
                              >
                                <Icon
                                  icon={showPassword ? eyeFill : eyeOffFill}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions sx={{ padding: 2 }}>
                  <LoadingButton
                    variant="contained"
                    sx={{ marginLeft: "auto" }}
                  >
                    Update
                  </LoadingButton>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </MainLayout>
  );
}

export default UserInfo;
