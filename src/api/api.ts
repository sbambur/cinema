import axios from "axios";

export const API = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export const HALLS_URL = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const ENDPOINTS = {
  HALLS: "/halls",
};

export const imageBase = "https://image.tmdb.org/t/p/original/";
