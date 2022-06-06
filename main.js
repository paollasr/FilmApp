import {
  API
} from "./services/api.js"
import {
  LocalStorage
} from "./services/localStorage.js"

const moviesContainer = document.querySelector('.movies') //reference to <div class="movies"></div>
const form = document.querySelector('form')
const input = document.querySelector('input')
const searchButton = document.querySelector('.searchIcon') //reference to <img class="searchIcons">
const checkboxInput = document.querySelector('input[type="checkbox"]') // reference to the checkbox input on htlm document

checkboxInput.addEventListener('change', checkCheckboxStatus)
searchButton.addEventListener('click', searchMovie)
form.addEventListener('submit', function(event) {
  event.preventDefault()
  searchMovie()
})

function checkCheckboxStatus() {
  const isChecked = checkboxInput.checked
  if (isChecked) {
    cleanAllMovies()
    const movies = LocalStorage.getFavoriteMovies() || []
    movies.forEach(movie => renderMovie(movie))
  } else {
    cleanAllMovies()
    getAllpopularmovies()
  }
}

async function searchMovie() {
    const inputValue = input.value
    if (inputValue != '') {
      cleanAllMovies()
      const movies = await API.searchMovieByName(inputValue)
      movies.forEach(movie => renderMovie(movie))
      }
      else {
        getAllpopularmovies()
      }
    }

    function cleanAllMovies() {
      moviesContainer.innerHTML = ''
    }


    //Frist array created for 3 movies objects containing image, title, rating, year, description, isFavorited.To load and test the design
    // const movies = [
    //   {
    //     image: 'https://img.elo7.com.br/product/original/3FBA809/big-poster-filme-batman-2022-90x60-cm-lo002-poster-batman.jpg',
    //     title: 'Batman',
    //     rating: 9.2,
    //     year: 2022,
    //     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    //     isFavorited: false
    //   },
    //   {
    //     image: 'https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg',
    //     title: 'Avengers',
    //     rating: 9.2,
    //     year: 2019,
    //     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    //     isFavorited: false
    //   },
    //   {
    //     image: 'https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg',
    //     title: 'Doctor Strange',
    //     rating: 9.2,
    //     year: 2022,
    //     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    //     isFavorited: true
    //   },
    // ]

    function FavoriteButtonPressed(event, movie) {
      const favoriteState = {
    favorited: 'images/heart-fill.svg',
    notFavorited: 'images/heart.svg'
  }
      if (event.target.src.includes(favoriteState.notFavorited)) { //if favorite state is current save to save ToLocalStorage
        event.target.src = favoriteState.favorited
        LocalStorage.saveToLocalStorage(movie)
      } else {
        event.target.src = favoriteState.notFavorited //if not then remove from localStorage
        LocalStorage.removeFromLocalStorage(movie.id)
      }
    }

    async function getAllpopularmovies() {
      const movies = await API.getPopularMovies()
      movies.forEach(movie => renderMovie(movie))

    }

    window.onload = async function() {
      getAllpopularmovies()
    }


    function renderMovie(movie) {
     const { id, title, poster_path, vote_average, release_date, overview } = movie

      const isFavorited = LocalStorage.checkMovieIsFavorited(id)
      const year = new Date(release_date).getFullYear()
      const image = `https://image.tmdb.org/t/p/w500${poster_path}`

      const movieElement = document.createElement('div')
      movieElement.classList.add('movie')
      moviesContainer.appendChild(movieElement)

      const movieInformations = document.createElement('div')
      movieInformations.classList.add('movie-informations')

      const movieImageContainer = document.createElement('div')
      movieImageContainer.classList.add('movie-image')
      const movieImage = document.createElement('img')
      movieImage.src = image
      movieImage.alt = `${title} Poster`
      movieImageContainer.appendChild(movieImage)
      movieInformations.appendChild(movieImageContainer)

      const movieTextContainer = document.createElement('div')
      movieTextContainer.classList.add('movie-text')
      const movieTitle = document.createElement('h4')
      movieTitle.textContent = `${title} (${year})`
      movieTextContainer.appendChild(movieTitle)
      movieInformations.appendChild(movieTextContainer)

      const informations = document.createElement('div')
      informations.classList.add('movie-informations')
      movieTextContainer.appendChild(informations)

      const ratingContainer = document.createElement('div')
      ratingContainer.classList.add('rating')

      const starImage = document.createElement('img')
      starImage.src = 'images/star.png'
      starImage.alt = 'Star'

      const movieRate = document.createElement('span')
      movieRate.classList.add('movie-rate')
      movieRate.textContent = vote_average

      ratingContainer.appendChild(starImage)
      ratingContainer.appendChild(movieRate)
      informations.appendChild(ratingContainer)

      const favorite = document.createElement('div')
      favorite.classList.add('favorite')
      const favoriteImage = document.createElement('img')
      favoriteImage.src = isFavorited ? 'images/heart-fill.svg' : 'images/heart.svg'
      favoriteImage.alt = 'Heart'
      favoriteImage.classList.add('favoriteImage')
      favoriteImage.addEventListener('click', (event) => FavoriteButtonPressed(event, movie))

      const favoriteText = document.createElement('span')
      favoriteText.classList.add('movie-favorite')
      favoriteText.textContent = 'Favoritar'

      favorite.appendChild(favoriteImage)
      favorite.appendChild(favoriteText)
      informations.appendChild(favorite)

      const movieDescriptionContainer = document.createElement('div')
      movieDescriptionContainer.classList.add('movie-description')

      const movieDescription = document.createElement('span')
      movieDescription.textContent = overview

      movieDescriptionContainer.appendChild(movieDescription)

      movieElement.appendChild(movieInformations)
      movieElement.appendChild(movieDescriptionContainer)
    }
