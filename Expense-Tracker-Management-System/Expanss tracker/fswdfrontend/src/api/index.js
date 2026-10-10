import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
      console.error('request error : ', error);
      Promise.reject(error)
}
);

api.interceptors.response.use(
  (response) => {
    return response.data.accessToken;
  },
  (error) => {
    console.error("response Error :", error);
    return Promise.reject(error);
  }
);

export default api;
