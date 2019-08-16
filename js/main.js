<<<<<<< HEAD
//menu mobile
=======
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
>>>>>>> ff50d8dbad7167ab1d2aa656265f924e46a5eda5
