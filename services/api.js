//import { apiKey } from "../environment/key.js" ${apiKey}

async function searchMovieByName(title) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=96fcc77bf657167dde3f9019c2f3e385&query=${title}&language=en-US&page=1`
  const fetchResponse = await fetch(url)
  const { results } = await fetchResponse.json()
  return results
}

async function getPopularMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=96fcc77bf657167dde3f9019c2f3e385&language=en-US&page=1`
  const fetchResponse = await fetch(url)
  const { results } = await fetchResponse.json()
  return results
}

export const API = {
  searchMovieByName,
  getPopularMovies
}
