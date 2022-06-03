const localStorageKey = 'favoriteMovies'

function getFavoriteMovies(){
  return JSON.parse(localStorage.getItem('favoriteMovies'))
}

function saveToLocalStorage(){
  const movies = getFavoriteMovies() || []
  movies.push(movie)
  const moviesJSON = JSON.stringify(movies) //converte favor movie(s) to json
  localStorage.setItem('favoriteMovies, moviesJSON') //save fav movies to localStorage
}

function checkMovieIsFavorited(id) {
  const movies = getFavoriteMovies() || []
  return movies.find(movie => movie.id == id)
}

function removeFromLocalStorage(id){
  const movies = getFavoriteMovies() || []
  const findMovie = movies.find(movie => movie.id == id)
  const newMovies = movies.filter(movie => movie.id != findMovie.id)
  localStorage.setItem('favoriteMovies', JSON.stringify(newMovies))

}

export const LocalStorage = {
  getFavoriteMovies,
  saveToLocalStorage,
  checkMovieIsFavorited,
  removeFromLocalStorage
}