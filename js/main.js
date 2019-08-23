//Variables constantes
const apiKey = '0f240948bebe063e14528f450a77842f'
const previewHome = [0, 1, 2, 3]

//iniciador
const initialize = () => {
 movieModal('popular-movies','popular', previewHome)
 movieModal('top-rated-movies','top_rated', previewHome)
 movieModal('upcoming-movies','upcoming', previewHome)
 movieModal('now-playing-movies','now_playing', previewHome)
}

//Función que recorre el objeto, extrae y appendea los elementos que se necesitan fetch -> DOM
const movieModal = (id, category, numberMovies) => {
  const container = document.getElementById(id)
  fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
    .then(res=>res.json())
      .then(res=>{
        numberMovies.forEach(num=>{
          let li = document.createElement('li')
          let anchor = document.createElement('a')
          let figure = document.createElement('figure')
          let image = document.createElement('img')
          let movieTitle = document.createElement('figcaption')
          image.src = `https://image.tmdb.org/t/p/w300${res.results[num].poster_path}`
          movieTitle.innerText = res.results[num].original_title
          figure.appendChild(image)
          figure.appendChild(movieTitle)
          anchor.appendChild(figure)
          anchor.onclick = () => {
            let movieId = res.results[num].id
            openModal(movieId)
          }
          li.appendChild(anchor)
          container.appendChild(li)
        })
      })
  }

  //modal de información
  const openModal = (movieId) => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    .then(res=>res.json())
      .then(res=>{
        console.log(res) //esta sustrayendo al objeto, pero no he podido appendear
      })

  }
  
  const viewPopularMovies = () => {
    movieModal('popular-movies','popular',[0, 1, 2, 3, 4, 5, 6, 7, 8])
  }