import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://fake.api",
  timeout: 1000,
});

export default axiosClient;
