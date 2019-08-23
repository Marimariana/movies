<<<<<<< HEAD
//menu mobile
=======
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
<<<<<<< HEAD
>>>>>>> ff50d8dbad7167ab1d2aa656265f924e46a5eda5
=======

// MOSTRAR MENU MOBILE
const toggleMenu = () => {
    let menu = document.getElementById('menu')
    menu.classList.toggle('open')
    menu.classList.toggle('closed')
    let hamburger = document.getElementById('hamburger')
    hamburger.classList.toggle('close-icon')
}
>>>>>>> de5f8557add5a48584eda004c9b5e950100e438f
