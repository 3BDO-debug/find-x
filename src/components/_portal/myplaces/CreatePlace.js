import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import closeFill from "@iconify/icons-eva/close-fill";
import { Icon } from "@iconify/react";
// material
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Button,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  MenuItem,
  Box,
  Typography,
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import HelpIcon from "@mui/icons-material/Help";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import CelebrationIcon from "@mui/icons-material/Celebration";
// apis
import { placesImagesAdder, userPlacesAdder } from "src/apis/places";
//
import { DialogAnimate } from "src/components/animate";
import { QuillEditor } from "src/components/editor";
import { UploadMultiFile } from "src/components/upload";
import { MIconButton } from "src/components/@material-extend";

CreatePlace.propTypes = {
  isTriggered: PropTypes.bool,
  closeHandler: PropTypes.func,
  setRefreshData: PropTypes.func,
};
function CreatePlace({ isTriggered, closeHandler, setRefreshData }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const uploadImagesHandler = async (place) => {
    const mapper = values.images.map((image, index) => {
      const data = new FormData();
      data.append("placeId", place.id);
      data.append("image", image);
      placesImagesAdder(data).catch((error) => console.log("uploader", error));
    });

    await Promise.all(mapped);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      phone: "",
      address: "",
      longitude: "",
      latitude: "",
      category: "",
      pricing: 1,
      pricingOption: "Per hour",
      description: "",
      images: [],
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Place title is required"),
      phone: Yup.string().required("Place phone number is required"),
      address: Yup.string().required("Place address is required"),
      longitude: Yup.string().required(
        "Place longitude is required, if you found trouble getting place longitude reach us for more help"
      ),
      latitude: Yup.string().required(
        "Place latitude is required, if you found trouble getting place longitude reach us for more help"
      ),
      category: Yup.string().required("Please select place category"),
      pricing: Yup.number()
        .min(1, "You cant set price less than 1 EGP")
        .required(
          "Please set a price for the place and don't forget to choose the pricing option (per hour- per day)"
        ),
      pricingOption: Yup.string().required(
        "Please choose price option either per hour or per day"
      ),
      description: Yup.string().required("Place description is required"),
      images: Yup.mixed().required(
        "You must at least upload one image for the place"
      ),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      const data = new FormData();
      for (const [key, value] of Object.entries(values)) {
        data.append(key, value);
      }
      let placeResponseData;
      await userPlacesAdder(data)
        .then((placeResponse) => {
          placeResponseData = placeResponse;
        })
        .catch((error) =>
          enqueueSnackbar(`Something wrong happened-${error}`, {
            variant: "error",
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            ),
          })
        );
      await uploadImagesHandler(placeResponseData);

      resetForm();
      setSubmitting(false);
      enqueueSnackbar("Place created successfully", {
        variant: "success",
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      });
      closeHandler();
      setRefreshData(true);
    },
  });

  const {
    dirty,
    values,
    setFieldValue,
    isSubmitting,
    getFieldProps,
    touched,
    errors,
    handleSubmit,
  } = formik;

  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      setFieldValue(
        "images",
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFieldValue]
  );

  const handleRemoveAll = () => {
    setFieldValue("images", []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images.filter((_file) => _file !== file);
    setFieldValue("images", filteredItems);
  };

  return (
    <DialogAnimate open={isTriggered} onClose={closeHandler} maxWidth="md">
      <DialogTitle>Create new place</DialogTitle>
      <DialogContent>
        <Paper sx={{ padding: "30px 0px 0px 0px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                label="Title"
                value={values.title}
                onChange={(event) => setFieldValue("title", event.target.value)}
                {...getFieldProps("title")}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                label="Phone"
                value={values.phone}
                onChange={(event) => setFieldValue("phone", event.target.value)}
                {...getFieldProps("phone")}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <PhoneIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                label="Address"
                value={values.address}
                onChange={(event) =>
                  setFieldValue("address", event.target.value)
                }
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
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                label="Longitude"
                value={values.longitude}
                onChange={(event) =>
                  setFieldValue("longitude", event.target.value)
                }
                {...getFieldProps("longitude")}
                error={Boolean(touched.longitude && errors.longitude)}
                helperText={touched.longitude && errors.longitude}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Click for more information on how to find longitude of a place">
                        <IconButton
                          onClick={() =>
                            window.open(
                              "https://support.google.com/maps/answer/18539?hl=en&co=GENIE.Platform%3DDesktop",
                              "__blank"
                            )
                          }
                        >
                          <HelpIcon />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                label="Latitude"
                value={values.latitude}
                onChange={(event) =>
                  setFieldValue("latitude", event.target.value)
                }
                {...getFieldProps("latitude")}
                error={Boolean(touched.latitude && errors.latitude)}
                helperText={touched.latitude && errors.latitude}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Click for more information on how to find latitude of a place">
                        <IconButton
                          onClick={() =>
                            window.open(
                              "https://support.google.com/maps/answer/18539?hl=en&co=GENIE.Platform%3DDesktop",
                              "__blank"
                            )
                          }
                        >
                          <HelpIcon />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                label="Category"
                value={values.category}
                onChange={(event) =>
                  setFieldValue("category", event.target.value)
                }
                error={Boolean(touched.category && errors.category)}
                helperText={touched.category && errors.category}
                select
                fullWidth
              >
                <MenuItem value="workspace">
                  <Box display="flex" alignItems="center">
                    <WorkspacesIcon sx={{ mr: 1 }} />
                    <Typography variant="subtitle1">Workspace</Typography>
                  </Box>
                </MenuItem>
                <MenuItem value="weeding-hall">
                  <Box display="flex" alignItems="center">
                    <CelebrationIcon sx={{ mr: 1 }} />
                    <Typography variant="subtitle1">Weeding hall</Typography>
                  </Box>
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                label="Price"
                value={values.pricing}
                onChange={(event) =>
                  setFieldValue("pricing", event.target.value)
                }
                error={Boolean(touched.pricing && errors.pricing)}
                helperText={touched.pricing && errors.pricing}
                fullWidth
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography>EGP</Typography>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                label="Price per (hour-day)"
                value={values.pricingOption}
                onChange={(event) =>
                  setFieldValue("pricingOption", event.target.value)
                }
                error={Boolean(touched.pricingOption && errors.pricingOption)}
                helperText={touched.pricingOption && errors.pricingOption}
                select
                fullWidth
              >
                <MenuItem selected value="Per hour">
                  Per hour
                </MenuItem>
                <MenuItem value="Per day">Per day</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: "-20px" }}>
              <Typography variant="subtitle1">Description</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <QuillEditor
                id="place-description"
                value={values.description}
                onChange={(value) => setFieldValue("description", value)}
              />
              <FormHelperText
                error
                sx={{ px: 2 }}
                {...getFieldProps("description")}
              >
                {touched.description && errors.description}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: "-20px" }}>
              <Typography variant="subtitle1">Images</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <UploadMultiFile
                showPreview={true}
                files={values.images}
                onDrop={handleDropMultiFile}
                onRemove={handleRemove}
                onRemoveAll={handleRemoveAll}
              />
              <FormHelperText error sx={{ px: 2 }} {...getFieldProps("images")}>
                {touched.images && errors.images}
              </FormHelperText>
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>Cancel</Button>
        <LoadingButton
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={!dirty}
          variant="contained"
        >
          Create
        </LoadingButton>
      </DialogActions>
    </DialogAnimate>
  );
}

export default CreatePlace;
