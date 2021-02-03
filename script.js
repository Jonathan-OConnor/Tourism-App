var userCity

async function search(event) {
    event.preventDefault()
    // 
    // prevent search if nothing has been typed.
    if (document.getElementById("userCity").value !== "") {
        var resultList
        // get search results for the user
        await cityNames(document.getElementById("userCity").value).then(r => resultList = r)
        // hide other pages
        showSearchPage()
        
        // FUNCTION THAT MAKES SEARCH RESULTS PAGE GOES HERE

        // 
        console.log(resultList)
    }

}

async function cityNames(userCity) {
    var list = []

    // get at most 9 cities which roughly match the name searched
    var apiData = await fetch(`http://api.geonames.org/searchJSON?name=${userCity}&fuzzy=0.8&cities=cities5000&maxRows=9&username=JonathanO`).then(r => r.json())
    var resultData = apiData.geonames

    // store the important information about a city as an object. Put this object into a list
    for (var i = 0; i < resultData.length; i++) {
        var result = { 'name': resultData[i].name, 'countryName': resultData[i].countryName, 'countryCode': resultData[i].countryCode, 'lat': resultData[i].lat, 'long': resultData[i].lng, 'nearestCity': '' }
        list.push(result)
    }

    // search if the city is near a large urban area. If it is, add the nearest urban area to the city object in the list
    for (var i = 0; i < list.length; i++) {
        var nearestCityData = await fetch(`https://api.teleport.org/api/locations/${list[i].lat},${list[i].long}`).then(r => r.json())
        var nearestCity = nearestCityData._embedded["location:nearest-urban-areas"]
        if (nearestCity.length > 0) {
            var nearestCenter = nearestCity[0]._links[`location:nearest-urban-area`].href

        } else {
            var nearestCenter = "none"
        }
        list[i]["nearestCity"] = nearestCenter
    }

    // get a photo of the nearest urban center or a random stock photo if there is no nearest urban center
    for (var i = 0; i < list.length; i++) {
        if (list[i]["nearestCity"] !== "none") {
            var imageData = await fetch(`${list[i].nearestCity}images/`).then(r => r.json())
            var image = imageData.photos[0].image.mobile
        } else {
            var image = `Assets/default_thumbnails/default${Math.floor(Math.random() * 10) + 1}`
        }
        list[i]["image"] = image
    }

    return list
}

function showHomePage(){
  
    document.querySelector('#homepage').classList.remove("d-none")
    document.querySelector('#favourites').classList.add('d-none')
    document.querySelector('#search-results').classList.add('d-none')
    document.querySelector('#city-information').classList.add('d-none')
    console.log('clicked ')
}

function showSearchPage(){
  
    document.querySelector('#homepage').classList.add("d-none")
    document.querySelector('#favourites').classList.add('d-none')
    document.querySelector('#search-results').classList.remove('d-none')
    document.querySelector('#city-information').classList.add('d-none')
    console.log('clicked ')
}

function showFavouritesPage(){

    document.querySelector('#homepage').classList.add("d-none")
    document.querySelector('#favourites').classList.remove('d-none')
    document.querySelector('#search-results').classList.add('d-none')
    document.querySelector('#city-information').classList.add('d-none')
    console.log('clicked ')

}
