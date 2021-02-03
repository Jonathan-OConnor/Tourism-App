function showHomePage(){
    event.preventDefault()
    document.querySelector('#homepage').classList.remove("d-none")
    document.querySelector('#favourites').classList.add('d-none')
    document.querySelector('#search-results').classList.add('d-none')
    document.querySelector('#city-information').classList.add('d-none')
    console.log('clicked ')
}

function showSearchPage(){
    event.preventDefault()
    document.querySelector('#homepage').classList.add("d-none")
    document.querySelector('#favourites').classList.add('d-none')
    document.querySelector('#search-results').classList.remove('d-none')
    document.querySelector('#city-information').classList.add('d-none')
    console.log('clicked ')
}

function showFavouritesPage(){
    event.preventDefault()
    document.querySelector('#homepage').classList.add("d-none")
    document.querySelector('#favourites').classList.remove('d-none')
    document.querySelector('#search-results').classList.add('d-none')
    document.querySelector('#city-information').classList.add('d-none')
    console.log('clicked ')

}
