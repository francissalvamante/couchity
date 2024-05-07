import axios from "axios";

const Authorization =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWJiMjY3MDgzMzJlNTAxZWNiM2UwMzM1NTNkMmFhZSIsInN1YiI6IjY2MjYwMmZiMjU4ODIzMDE3ZDkyOGM4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uNDBHppvqDwjq4Qz0PbWrdxV2LcsQcIZzho2P9ycFhE";
const BASE_URL = "https://api.themoviedb.org/3/movie";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie";
const headers = {
  Accept: "application/json",
  Authorization,
};

export const getPopular = async () => {
  const { data } = await axios({
    method: "get",
    url: `${BASE_URL}/popular?language=en-US&page=1`,
    headers,
  });

  return data.results.slice(0, 10);
};

export const getNowPlaying = async () => {
  const { data } = await axios({
    method: "get",
    url: `${BASE_URL}/now_playing?language=en-US&page=1`,
    headers,
  });

  return data.results;
};

export const getUpcoming = async () => {
  const { data } = await axios({
    method: "get",
    url: `${BASE_URL}/upcoming?language=en-US&page=1`,
    headers,
  });

  return data.results;
};

export const getDetails = async (id) => {
  const { data } = await axios({
    method: "get",
    url: `${BASE_URL}/${id}`,
    headers,
  });

  return data;
};

export const getReviews = async (id) => {
  const { data } = await axios({
    method: "get",
    url: `${BASE_URL}/${id}/reviews`,
    headers,
  });

  return data.results;
};

export const getCredits = async (id) => {
  const {
    data: { cast, crew },
  } = await axios({
    method: "get",
    url: `${BASE_URL}/${id}/credits`,
    headers,
  });

  return { cast, crew };
};

export const getVideos = async (id) => {
  const { data } = await axios({
    method: "get",
    url: `${BASE_URL}/${id}/videos`,
    headers,
  });

  return data.results;
};

export const searchMovies = async (queryParams) => {
  const { data } = await axios({
    method: "get",
    url: SEARCH_URL + `?query=${queryParams}`,
    headers,
  });

  return data.results;
};
