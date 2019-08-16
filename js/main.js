// BUSCAR PELICULA

const searchMovie = () => {
    let input = document.getElementById('search-input')
    let movieName = input.value
  
    if (input.value !== "") {
      input.value = ''
      console.log('funciono')
      // aca va funcion de recorrer api
    }
}

const handleKeyPress = event => {
    if (event.code === 'Enter') {
        searchMovie()
    }
}