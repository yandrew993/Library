import axios from "axios";
const apiRequest = axios.create({
  baseURL: "https://backend-rnhy.onrender.com/api",
  withCredentials: true,
  timout: 5000,
});
export default apiRequest;
