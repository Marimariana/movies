// BUSCAR PELICULA

const searchMovie = () => {
    let input = document.getElementById('search-input')
    let movieName = input.value
  
    if (input.value !== "") {
      input.value = ''
      // aca va funcion de recorrer api
    }
}

const handleKeyPress = event => {
    if (event.code === 'Enter') {
        searchMovie()
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