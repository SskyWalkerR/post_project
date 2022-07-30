import axios from "axios";
import { baseURL } from "../config/constanst";

export const publicAxiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
