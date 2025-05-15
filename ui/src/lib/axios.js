import { meta } from "@eslint/js";
import axios from "axios";

const axiosinstance = axios.create({
  baseURL: meta.mode === "developement" ? "http://localhost:8000" : "/api",
  withCredentials: true,
});

export default axiosinstance;
