import axios from "axios";

export const API = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export const BASE_URL = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const ENDPOINTS = {
  SESSIONS: "/sessions",
  SCHEME: "/scheme",
};

export const imageBase = "https://image.tmdb.org/t/p/original/";
