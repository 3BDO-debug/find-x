import axiosInstance from "./axios";

export const placesFetcher = async () =>
  axiosInstance.get("/places/places-data").then((response) => response.data);

export const userPlacesAdder = async (requestData) =>
  axiosInstance({
    method: "post",
    url: "/places/user-places-data",
    data: requestData,
  }).then((response) => response.data);

export const userPlacesFetcher = async () =>
  axiosInstance
    .get("/places/user-places-data")
    .then((response) => response.data);

export const placeDetailsFetcher = async (placeId) =>
  axiosInstance
    .get(`/places/place-data/${placeId}`)
    .then((response) => response.data);

export const placesImagesFetcher = async (placeId) =>
  axiosInstance
    .get(`/places/places-images-data?placeId=${placeId}`)
    .then((response) => response.data);

export const placesImagesAdder = async (requestData) =>
  axiosInstance({
    method: "post",
    url: "/places/places-images-data",
    data: requestData,
  }).then((response) => response.data);
