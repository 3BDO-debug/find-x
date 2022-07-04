import axiosInstance from "./axios";

export const bookingRequestAdder = async (requestData) =>
  axiosInstance({
    method: "post",
    url: "/booking/booking-requests-data",
    data: requestData,
  }).then((response) => response.data);

export const bookingRequestsFetcher = async (userType, userId) =>
  axiosInstance
    .get(
      `/booking/booking-requests-data?user_type=${userType}&user_id=${userId}`
    )
    .then((response) => response.data);
