//Variables constantes
const apiKey = '0f240948bebe063e14528f450a77842f'
const previewHome = [0, 1, 2, 3, 4]
const previewAll = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
let currentPage = 1

//iniciador
const initialize = () => {
  displayMovies('popular-movies', 'popular', previewHome)
  displayMovies('top-rated-movies', 'top_rated', previewHome)
  displayMovies('upcoming-movies', 'upcoming', previewHome)
  displayMovies('now-playing-movies', 'now_playing', previewHome)
  getTheme()
}

// SELECCION DE TEMA
const theme = document.getElementById('theme')

const toggleMode = sheet => {
  theme.href = sheet
  let parsedData = JSON.stringify(sheet)
  window.localStorage.setItem("sheet", parsedData)
}

const getTheme = () => {
  let selectedTheme = window.localStorage.getItem("sheet")
  theme.href = selectedTheme ? JSON.parse(selectedTheme) : theme.href
}

// LLENAR HOME
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

// MODAL
const toggleModal = movieId => {
  const modal = document.querySelector(".modal")
  modal.classList.toggle("show-modal")
  const closeButton = document.querySelector(".close-button")
  const windowOnClick = event => {
    if (event.target === modal) {
      toggleModal(movieId)
      fillModal(movieId)
    }
  }
  closeButton.addEventListener("click", toggleModal)
  window.addEventListener("click", windowOnClick)
  document.title = 'TMDb'
}

const fillModal = movieId => {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    .then(res => res.json())
    .then(res => printMovieDetails(res))
}

const printMovieDetails = movie => {
  document.title = `${movie.title} - TMDb`
  let modalHeader = document.getElementById('modal-header')
  modalHeader.innerHTML = ''
  modalHeader.style.backgroundImage = "url(" + `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` + ")"
  let movieTitle = document.getElementById('movie-title')
  movieTitle.innerHTML = `<p>${movie.title}</p>`
  let tagline = document.createElement('span')
  tagline.innerText = `${movie.tagline}`
  movieTitle.appendChild(tagline)
  let figure = document.createElement('figure')
  figure.classList.add('movie-poster')
  let moviePoster = document.createElement('img')
  moviePoster.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`
  figure.appendChild(moviePoster)
  modalHeader.appendChild(figure)

  let movieInfo = document.getElementById('movie-info')
  movieInfo.innerHTML = ''

  let overview = document.createElement('p')
  overview.classList.add('overview')
  overview.innerText = `${movie.overview}`
  movieInfo.appendChild(overview)

  let releaseDate = document.createElement('h3')
  releaseDate.classList.add('modalHeading')
  releaseDate.innerText = `RELEASE DATE`
  movieInfo.appendChild(releaseDate)

  let date = document.createElement('p')
  date.innerText = moment(movie.release_date, 'YYYY-MM-DD').format('Do MMM YYYY')
  movieInfo.appendChild(date)

  let genres = document.createElement('h3')
  genres.classList.add('modalHeading')
  genres.innerText = `GENRES`
  movieInfo.appendChild(genres)

  let genreList = document.createElement('p')
  genreList.innerText = movie.genres.map(({name}) => name).join(', ')
  movieInfo.appendChild(genreList)
}

// BOTÓN LOAD MORE
const setButton = category => {
  const container = document.getElementById("btn-container")
  container.innerHTML = ''
  const loadMoreNode = document.createElement("button")
  loadMoreNode.innerText = "Give me more"
  loadMoreNode.onclick = () => {
    currentPage++
    selectCategory(category)
    return currentPage
  }
  container.appendChild(loadMoreNode)
  let pageNumber = document.getElementById('page-number')
  pageNumber.innerText = `Page ${currentPage}`
}

const createButton = keywords => {
  const container = document.getElementById("btn-container")
  container.innerHTML = ''
  const loadMoreNode = document.createElement("button")
  loadMoreNode.innerText = "Give me more"
  loadMoreNode.onclick = () => {
    currentPage++
    searchMovie(keywords)
    return currentPage
  }
  container.appendChild(loadMoreNode)
  let pageNumber = document.getElementById('page-number')
  pageNumber.innerText = `Page ${currentPage}`
}

// BÚSQUEDA
const handleKeyPress = event => {
  if (event.code === 'Enter') {
    const modal = document.querySelector(".modal")
    modal.classList.remove("show-modal")
    let menu = document.getElementById('menu')
    menu.classList.remove('open')
    menu.classList.add('closed')
    let hamburger = document.getElementById('hamburger')
    hamburger.classList.remove('close-icon')
    searchMovie()
  }
}

const searchMovie = () => {
  let input = document.getElementById('search-input')
  let keywords = input.value
  createButton(keywords)

  if (input.value !== "") {
    document.title = 'Search Results - TMDb'
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keywords}`)
      .then(res => res.json())
      .then(res => printSearchResults(res, res.results))
    }
}

const printSearchResults = (mov, movies) => {
  const container = document.getElementById('search-results-list')
  container.innerHTML = ''
  let hideCategories = document.getElementById('categories-div')
  hideCategories.classList.add('hide')
  let resultsDiv = document.getElementById('search-results-div')
  resultsDiv.classList.remove('hide')
  let resultsContainer = document.getElementById('search-results')
  resultsContainer.classList.remove('hide')
  let totalResults = document.getElementById('total-results')
  totalResults.innerText = `${mov.total_results} results`
  titleName()
  movies.forEach(movie => {
    let li = document.createElement('li')
    let anchor = document.createElement('a')
    let figure = document.createElement('figure')
    let image = document.createElement('img')
    let movieTitle = document.createElement('figcaption')
    image.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    movieTitle.innerText = movie.title
    figure.appendChild(image)
    figure.appendChild(movieTitle)
    anchor.appendChild(figure)
    anchor.onclick = () => {
      let movieId = movie.id
      toggleModal(movieId)
      fillModal(movieId)
    }
    li.appendChild(anchor)
    container.appendChild(li)
  })
}

// MOSTRAR MENU MOBILE
const toggleMenu = () => {
  let menu = document.getElementById('menu')
  menu.classList.toggle('open')
  menu.classList.toggle('closed')
  let hamburger = document.getElementById('hamburger')
  hamburger.classList.toggle('close-icon')
}

// LLENAR CATEGORÍAS
const selectCategory = category => {
  fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&page=${currentPage}`)
    .then(res => res.json())
    .then(res => printCategoryResults(res, res.results))
    titleName(category)
    setButton(category)
}

const printCategoryResults = (mov, movies) => {
  closeModal()
  closeMenu()
  const container = document.getElementById('search-results-list')
  container.innerHTML = ''
  let hideCategories = document.getElementById('categories-div')
  hideCategories.classList.add('hide')
  let resultsDiv = document.getElementById('search-results-div')
  resultsDiv.classList.remove('hide')
  let resultsContainer = document.getElementById('search-results')
  resultsContainer.classList.remove('hide')
  let totalResults = document.getElementById('total-results')
  totalResults.innerText = `${mov.total_results} results`
  movies.forEach(movie => {
    let li = document.createElement('li')
    let anchor = document.createElement('a')
    let figure = document.createElement('figure')
    let image = document.createElement('img')
    let movieTitle = document.createElement('figcaption')
    image.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    movieTitle.innerText = movie.title
    figure.appendChild(image)
    figure.appendChild(movieTitle)
    anchor.appendChild(figure)
    anchor.onclick = () => {
      let movieId = movie.id
      toggleModal(movieId)
      fillModal(movieId)
    }
    li.appendChild(anchor)
    container.appendChild(li)
  })
}

// TÍTULOS
const titleName = category => {
  const title = document.getElementById('title')
  switch (category) {
    case "popular":
      title.innerText = "Popular Movies";
      document.title = "Popular Movies - TMDb";
      break;
    case "top_rated":
      title.innerText = "Top Movies";
      document.title = "Top Movies - TMDb";
      break;
    case "upcoming":
      title.innerText = "Upcoming Movies"
      document.title = "Upcoming Movies - TMDb"
      break;
    case "now_playing":
      title.innerText = "Now Playing Movies"
      document.title = "Now Playing Movies - TMDb"
      break;
    default:
      title.innerText = "Search Results"
  }
}

// AUXILIARES xd
const closeModal = () => {
  const modal = document.querySelector(".modal")
  modal.classList.remove("show-modal")
}

const closeMenu = () => {
  let menu = document.getElementById('menu')
  if (menu.classList.contains('open')) {
    toggleMenu()
  }
}