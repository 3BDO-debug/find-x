import axios from "axios";

// https://nurseryx.pythonanywhere.com  http://127.0.0.1:8000 https://nursery-x.herokuapp.com/

export const mainUrl = "http://127.0.0.1:8000";

const axiosInstance = axios.create({
  baseURL: mainUrl,
  headers: {
    Authorization:
      typeof window !== "undefined" && localStorage.getItem("access_token")
        ? `JWT  ${localStorage.getItem("access_token")}`
        : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

const customInstance = axios.create({
  baseURL: mainUrl,
  timeout: 20000,
  headers: {
    Authorization:
      typeof window !== "undefined" && localStorage.getItem("access_token")
        ? `JWT  ${localStorage.getItem("access_token")}`
        : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (error.response.status === 401) {
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return customInstance
            .post("/api/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem("access_token", response.data.access);
              localStorage.setItem("refresh_token", response.data.refresh);

              axiosInstance.defaults.headers.Authorization = `JWT  ${response.data.access}`;
              originalRequest.headers.Authorization = `JWT  ${response.data.access}`;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        console.log("Refresh token not available.");
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;
