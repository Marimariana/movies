//Variables constantes
const apiKey = '0f240948bebe063e14528f450a77842f'
const previewHome = [0, 1, 2, 3, 4]
const previewAll = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
const currentPage = 1

//iniciador
const initialize = () => {
  displayMovies('popular-movies', 'popular', previewHome)
  displayMovies('top-rated-movies', 'top_rated', previewHome)
  displayMovies('upcoming-movies', 'upcoming', previewHome)
  displayMovies('now-playing-movies', 'now_playing', previewHome)
}

//Función que recorre el objeto, extrae y appendea los elementos que se necesitan fetch -> DOM
const displayMovies = (id, category, numberMovies) => {
  const container = document.getElementById(id)
  container.innerHTML = ''
  fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
    .then(res => res.json())
    .then(res => {
      numberMovies.forEach(num => {
        let li = document.createElement('li')
        let anchor = document.createElement('a')
        let figure = document.createElement('figure')
        let image = document.createElement('img')
        let movieTitle = document.createElement('figcaption')
        image.src = `https://image.tmdb.org/t/p/w300${res.results[num].poster_path}`
        movieTitle.innerText = res.results[num].title
        figure.appendChild(image)
        figure.appendChild(movieTitle)
        anchor.appendChild(figure)
        anchor.onclick = () => {
          let movieId = res.results[num].id
          toggleModal(movieId)
          fillModal(movieId)
        }
        li.appendChild(anchor)
        container.appendChild(li)
      })
    })
}

//modal de información
const toggleModal = (movieId) => {
  const modal = document.querySelector(".modal")
  modal.classList.toggle("show-modal")
  const closeButton = document.querySelector(".close-button")
  const windowOnClick = event => {
    if (event.target === modal) {
      toggleModal()
    }
  }
  closeButton.addEventListener("click", toggleModal)
  window.addEventListener("click", windowOnClick)
}

const fillModal = (movieId) => {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      let modalHeader = document.getElementById('modal-header')
      modalHeader.innerHTML = ''
      let movieTitle = document.getElementById('movie-title')
      movieTitle.innerHTML = `<p>${res.title}</p>`
      let figure = document.createElement('figure')
      figure.classList.add('movie-poster')
      let moviePoster = document.createElement('img')
      moviePoster.src = `https://image.tmdb.org/t/p/w300${res.poster_path}`
      figure.appendChild(moviePoster)
      modalHeader.appendChild(figure)

      let movieInfo = document.getElementById('movie-info')
      movieInfo.innerHTML = ''

      let overview = document.createElement('p')
      overview.classList.add('overview')
      overview.innerText = `${res.overview}`
      movieInfo.appendChild(overview)

      let genres = document.createElement('h3')
      genres.classList.add('modalHeading')
      genres.innerText = `GENRES`
      movieInfo.appendChild(genres)

      let genreList = document.createElement('p')
      movieInfo.appendChild(genreList)

      let releaseDate = document.createElement('h3')
      releaseDate.classList.add('modalHeading')
      releaseDate.innerText = `RELEASE DATE`
      movieInfo.appendChild(releaseDate)

      let date = document.createElement('p')
      date.innerText = moment(res.release_date, 'YYYY-MM-DD').format('Do MMM YYYY')
      movieInfo.appendChild(date)
    })
}

const viewPopularMovies = () => {
  const home = document.getElementById('home')
  home.innerHTML = ''
  displayMovies('popular-movies', 'popular', previewAll)
}

const searchMovie = (numberMovies) => {
  let input = document.getElementById('search-input')
  let keywords = input.value

  if (input.value !== "") {
    input.value = ''
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keywords}&page=${currentPage}`)
    .then(res => res.json())
    .then(res => {
      const searchResults = res.results
      console.log(searchResults)
      const container = document.getElementById('search-results-list')
      container.innerHTML = ''
      let hideCategories = document.getElementById('estolovamosaborrar')
      hideCategories.classList.toggle('hide')
      let resultsContainer = document.getElementById('search-results')
      resultsContainer.classList.toggle('hide')
      numberMovies.forEach(num => {
        let li = document.createElement('li')
        let anchor = document.createElement('a')
        let figure = document.createElement('figure')
        let image = document.createElement('img')
        let movieTitle = document.createElement('figcaption')
        image.src = `https://image.tmdb.org/t/p/w300${searchResults[num].poster_path}`
        movieTitle.innerText = searchResults[num].title
        figure.appendChild(image)
        figure.appendChild(movieTitle)
        anchor.appendChild(figure)
        anchor.onclick = () => {
          let movieId = searchResults[num].id
          toggleModal(movieId)
          fillModal(movieId)
        }
        li.appendChild(anchor)
        container.appendChild(li)
    })  
    })
  }
}

const handleKeyPress = event => {
  if (event.code === 'Enter') {
    searchMovie(previewAll)
  }
}

// MOSTRAR MENU MOBILE
const toggleMenu = () => {
  let menu = document.getElementById('menu')
  menu.classList.toggle('open')
  menu.classList.toggle('closed')
  let hamburger = document.getElementById('hamburger')
  hamburger.classList.toggle('close-icon')
}