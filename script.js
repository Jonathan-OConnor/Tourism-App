var userCity

async function search(event) {
    event.preventDefault()
    // prevent search if nothing has been typed.
    if (document.getElementById("userCity").value !== "") {
        var resultList
        // get search results for the user
        await cityNames(document.getElementById("userCity").value).then(r => resultList = r)
        // hide other pages
        document.getElementById("results").innerHTML = ""
        document.getElementById("userCity").value = ""
        showSearchPage()
    } else if (document.getElementById("navbarSearch").value !== "") {
        var resultList
        // get search results for the user
        await cityNames(document.getElementById("navbarSearch").value).then(r => resultList = r)
        // hide other pages
        document.getElementById("results").innerHTML = ""
        document.getElementById("navbarSearch").value = ""
        showSearchPage()
    }

    // FUNCTION THAT MAKES SEARCH RESULTS PAGE
    for (var i = 0; i < resultList.length; i++) {
        var bodyText = `${resultList[i].name} - ${resultList[i].countryName}`
        var backgroundImage = resultList[i].image

        var column = document.createElement("div")
        column.setAttribute("class", " col-12-xsm col-sm-6 col-lg-4")

        var card = document.createElement("div")
        card.setAttribute("style", `position: relative; margin-right: 15px; width: 100%; height: 250px; background-image: url("${backgroundImage}"); background-position: center; background-size: cover; margin-top: 20px;`)

        var cardBody = document.createElement("div")
        cardBody.setAttribute("class", "card-body")
        cardBody.setAttribute("style", "margin: 0; top: 50%; left: 50%; position: absolute; -ms-transform: translate(-50%,-50%); transform: translate(-50%, -50%);")

        var text = document.createElement("button")
        text.setAttribute("class", "btn btn-primary")
        var test = JSON.stringify(resultList[i])
        text.setAttribute("onClick", `buildCityPage(${test})`)
        text.innerText = bodyText

        column.appendChild(card)
        card.appendChild(cardBody)
        cardBody.appendChild(text)
        document.getElementById("results").appendChild(column)
    }
    // 
    console.log(resultList)
}

function buildCityPage(cityObject) {
    userCity = cityObject

    checkIfFav()


    // build weather
    makeWeather(cityObject.name, cityObject.countryCode)

    // build currency
    getCurrency(cityObject.countryCode)

    // build interesting places
    getPlaces(cityObject.long, cityObject.lat)

    // navigate to city page
    showCityPage()

    // build map
    buildMap(cityObject.lat, cityObject.long)
}

async function cityNames(userCity) {
    var list = []

    // get at most 9 cities which roughly match the name searched
    var apiData = await fetch(`https://secure.geonames.org/searchJSON?name=${userCity}&fuzzy=0.8&cities=cities5000&maxRows=9&username=JonathanO`).then(r => r.json())
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
            var image = `Assets/default_thumbnails/default${Math.floor(Math.random() * 10) + 1}.jpg`
        }
        list[i]["image"] = image
    }

    return list
}
// functions to navigate pages
function showHomePage() {

    document.querySelector('#homepage').classList.remove("d-none")
    document.querySelector('#favourites').classList.add('d-none')
    document.querySelector('#search-results').classList.add('d-none')
    document.querySelector('#city-information').classList.add('d-none')
    document.querySelector('#not-homepage').classList.add('d-none')
    console.log('clicked ')
}

function showSearchPage() {

    document.querySelector('#homepage').classList.add("d-none")
    document.querySelector('#favourites').classList.add('d-none')
    document.querySelector('#search-results').classList.remove('d-none')
    document.querySelector('#city-information').classList.add('d-none')
    document.querySelector('#not-homepage').classList.remove('d-none')
    console.log('clicked ')
}

function showFavouritesPage() {
    buildFavs()
    document.querySelector('#homepage').classList.add("d-none")
    document.querySelector('#favourites').classList.remove('d-none')
    document.querySelector('#search-results').classList.add('d-none')
    document.querySelector('#city-information').classList.add('d-none')
    document.querySelector('#not-homepage').classList.remove('d-none')
    console.log('clicked ')
}

function showCityPage() {
    document.querySelector('#homepage').classList.add("d-none")
    document.querySelector('#favourites').classList.add('d-none')
    document.querySelector('#search-results').classList.add('d-none')
    document.querySelector('#city-information').classList.remove('d-none')
    document.querySelector('#not-homepage').classList.remove('d-none')
    console.log('clicked ')
}


// functions used to get weather data for the city
async function makeWeather(city, stateCode) {


    var cityApi = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)},${stateCode}&appid=c18d1c67b725426cb4da6690f0f0a919`).then(r => r.json())
    var cityLon = cityApi.coord.lon;
    var cityLat = cityApi.coord.lat;

    // takes the name of the city and display it a value of CityName
    document.querySelector('#cityName').innerHTML = cityApi.name

    getCityData(cityLon, cityLat);
    // cities.push(city);
    //  addCity();

    // console.log(city);   
}

async function getCityData(lon, lat) {
    var cityDataApi = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=c18d1c67b725426cb4da6690f0f0a919`).then(r => r.json())

    var temperature = cityDataApi.current.temp;
    var humadity = cityDataApi.current.humidity;
    var windSpeed = cityDataApi.current.wind_speed;
    var uvIndex = cityDataApi.current.uvi;
    var icon = cityDataApi.current.weather[0].icon;


    if (uvIndex >= 0 && uvIndex <= 2) {
        document.querySelector('#UVIndex').style.backgroundColor = "green";
        document.querySelector('#UVIndex').style.color = "white";
    }
    else if (uvIndex >= 3 && uvIndex <= 5) {
        document.querySelector('#UVIndex').style.backgroundColor = "yellow";
        document.querySelector('#UVIndex').style.color = "black";
    }
    else if (uvIndex >= 6 && uvIndex <= 7) {
        document.querySelector('#UVIndex').style.backgroundColor = "orange";
    }
    else if (uvIndex >= 11 && uvIndex <= 10) {
        document.querySelector('#UVIndex').style.backgroundColor = "red";
        document.querySelector('#UVIndex').style.color = "white";
    }
    else if (uvIndex >= 11) {
        document.querySelector('#UVIndex').style.backgroundColor = "purple";
    }
    var dayOneForecast = {
        dateOne: moment().add(1, 'days').format('MMMM Do YYYY'),
        temp: cityDataApi.daily[1].temp.day,
        humi: cityDataApi.daily[1].humidity,
        icon: cityDataApi.daily[1].weather[0].icon
    }

    var dayTwoForecast = {
        dateTwo: moment().add(2, 'days').format('MMMM Do YYYY'),
        temp: cityDataApi.daily[2].temp.day,
        humi: cityDataApi.daily[2].humidity,
        icon: cityDataApi.daily[2].weather[0].icon
    }

    var dayThreeForecast = {
        dateThree: moment().add(3, 'days').format('MMMM Do YYYY'),
        temp: cityDataApi.daily[3].temp.day,
        humi: cityDataApi.daily[3].humidity,
        icon: cityDataApi.daily[3].weather[0].icon
    }

    var dayFourForecast = {
        dateFour: moment().add(4, 'days').format('MMMM Do YYYY'),
        temp: cityDataApi.daily[4].temp.day,
        humi: cityDataApi.daily[4].humidity,
        icon: cityDataApi.daily[4].weather[0].icon
    }

    var dayFiveForecast = {
        dateFive: moment().add(5, 'days').format('MMMM Do YYYY'),
        temp: cityDataApi.daily[5].temp.day,
        humi: cityDataApi.daily[5].humidity,
        icon: cityDataApi.daily[5].weather[0].icon
    }

    showCurrentWeather(temperature, humadity, windSpeed, uvIndex, icon)

    dayOne(dayOneForecast.dateOne, `https://openweathermap.org/img/wn/${dayOneForecast.icon}.png`, dayOneForecast.temp, dayOneForecast.humi)

    dayTwo(dayTwoForecast.dateTwo, `https://openweathermap.org/img/wn/${dayTwoForecast.icon}.png`, dayTwoForecast.temp, dayTwoForecast.humi)

    dayThree(dayThreeForecast.dateThree, `https://openweathermap.org/img/wn/${dayThreeForecast.icon}.png`, dayThreeForecast.temp, dayThreeForecast.humi)

    dayFour(dayFourForecast.dateFour, `https://openweathermap.org/img/wn/${dayFourForecast.icon}.png`, dayFourForecast.temp, dayFourForecast.humi)

    dayFive(dayFiveForecast.dateFive, `https://openweathermap.org/img/wn/${dayFiveForecast.icon}.png`, dayFiveForecast.temp, dayFiveForecast.humi)

}


function showCurrentWeather(temp, hum, wind, uv, icon) {

    var dateNow = moment().format('MMMM Do YYYY');
    document.querySelector('#dateNow').innerHTML = dateNow;

    //document.querySelector('#cityName').innerHTML = userCity;
    document.querySelector('#temperature').innerHTML = temp
    document.querySelector('#humidity').innerHTML = hum
    document.querySelector('#windSpeed').innerHTML = wind
    document.querySelector('#UVIndex').innerHTML = uv
    document.querySelector('#icon').src = `https://openweathermap.org/img/wn/${icon}.png`

}


function dayOne(dateDayOne, icon, temp, humi) {
    document.querySelector('#dateOne').innerHTML = dateDayOne;
    document.querySelector('#iconOne').src = icon;
    document.querySelector('#tempOne').innerHTML = temp;
    document.querySelector('#humiOne').innerHTML = humi;
}

function dayTwo(dateDayTwo, icon, temp, humi) {
    document.querySelector('#dateTwo').innerHTML = dateDayTwo;
    document.querySelector('#iconTwo').src = icon;
    document.querySelector('#tempTwo').innerHTML = temp;
    document.querySelector('#humiTwo').innerHTML = humi;
}

function dayThree(dateDayThree, icon, temp, humi) {
    document.querySelector('#dateThree').innerHTML = dateDayThree;
    document.querySelector('#iconThree').src = icon;
    document.querySelector('#tempThree').innerHTML = temp;
    document.querySelector('#humiThree').innerHTML = humi;
}

function dayFour(dateDayFour, icon, temp, humi) {
    document.querySelector('#dateFour').innerHTML = dateDayFour;
    document.querySelector('#iconFour').src = icon;
    document.querySelector('#tempFour').innerHTML = temp;
    document.querySelector('#humiFour').innerHTML = humi;
}

function dayFive(dateDayFive, icon, temp, humi) {
    document.querySelector('#dateFive').innerHTML = dateDayFive;
    document.querySelector('#iconFive').src = icon;
    document.querySelector('#tempFive').innerHTML = temp;
    document.querySelector('#humiFive').innerHTML = humi;
}


//  function to make map
function buildMap(lat, lng) {
    //clear previous map
    document.getElementById("mapContainer").innerHTML = ""

    // build new map element
    var mapDiv = document.createElement("div")
    mapDiv.setAttribute("class", 'container col w-100')
    mapDiv.id = 'map'
    mapDiv.setAttribute("style", 'width: 1000px; height: 300px;')

    // append new map element to the map container
    document.getElementById("mapContainer").appendChild(mapDiv)

    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleGdvbGRtYW45OCIsImEiOiJja2tvY21tODIwZnhhMm9udjRvZmpieWtuIn0.TexdX_a_a6lxPC5SGJAIaA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [lng, lat], // starting position [lng, lat]
        pitch: 60,
        bearing: -60,
        zoom: 10, // starting zoom
        antialias: true,
        //["heatmap-density"]: .1,
    });

    map.on('load', function () {
        // Insert the layer beneath any symbol layer.
        var layers = map.getStyle().layers;

        var labelLayerId;
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                labelLayerId = layers[i].id;
                break;
            }
        }

        map.addLayer(
            {
                'id': '3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#aaa',

                    // use an 'interpolate' expression to add a smooth transition effect to the
                    // buildings as the user zooms in
                    'fill-extrusion-height': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'height']
                    ],
                    'fill-extrusion-base': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'min_height']
                    ],
                    'fill-extrusion-opacity': 0.6
                }
            },
            labelLayerId
        );
    });
}

async function getPlaces(lon, lat) {
    document.querySelector('#touristSites').innerHTML = ""
    popularURL = `https://api.opentripmap.com/0.1/en/places/radius?apikey=5ae2e3f221c38a28845f05b6e8aa796e24785137e8a2f08be2186c12&radius=5000&lon=${lon}&lat=${lat}&rate=3h`
    popularData = await fetch(popularURL).then(r => r.json())
    var popularLocations = 5
    for (var i = 0; i < popularLocations; i++) {
        var locationName = popularData.features[i].properties.name
        var wikiData = popularData.features[i].properties.wikidata
        document.querySelector('#touristSites').innerHTML += `
        <ul class="list-group">
            <li class="list-group-item">${locationName}</li>
            <a class="list-group-item" href="http://www.wikidata.org/entity/${wikiData}">http://www.wikidata.org/entity/${wikiData}</a>
        </ul>
        `
    }

}
var favList = []
if (localStorage.favList) {
    favList = JSON.parse(localStorage.favList)
}

function favouritedButton() {

    if (document.getElementById("favouritesButton").className === "far fa-star") {
        document.getElementById('favouritesButton').removeAttribute('class')
        document.getElementById('favouritesButton').setAttribute('class', 'fas fa-star')

        favList.push(userCity)
        localStorage.favList = JSON.stringify(favList)

    }
    else if (document.getElementById("favouritesButton").className === "fas fa-star") {
        document.getElementById('favouritesButton').removeAttribute('class')
        document.getElementById('favouritesButton').setAttribute('class', 'far fa-star')
        var checkList = []
        for (var i = 0; i < favList.length; i++) {
            checkList.push(JSON.stringify(favList[i]))
        }
        checkList = checkList.filter(function (item) {
            return item !== JSON.stringify(userCity)
        })
        favList = []
        for (var i = 0; i < checkList.length; i++) {
            favList.push(JSON.parse(checkList[i]))
        }
        localStorage.favList = JSON.stringify(favList)

    }
}

function checkIfFav() {
    var checkList = []
    for (var i = 0; i < favList.length; i++) {
        checkList.push(JSON.stringify(favList[i]))
    }

    if (checkList.includes(JSON.stringify(userCity)) == true) {
        document.getElementById('favouritesButton').removeAttribute('class')
        document.getElementById('favouritesButton').setAttribute('class', 'fas fa-star')
    }
    else {
        document.getElementById('favouritesButton').removeAttribute('class')
        document.getElementById('favouritesButton').setAttribute('class', 'far fa-star')
    }
}


function buildFavs() {
    document.getElementById("favouritesCards").innerHTML = ''

    if (favList.length == 0) {
        var errorMsg = document.createElement("p")
        errorMsg.innerText = "Sorry, it doesn't look like you have any favourites :("
        document.getElementById("favouritesCards").appendChild(errorMsg)

    } else {
        for (var i = 0; i < favList.length; i++) {
            var bodyText = `${favList[i].name} - ${favList[i].countryName}`
            var backgroundImage = favList[i].image

            var column = document.createElement("div")
            column.setAttribute("class", " col-12-xsm col-sm-6 col-lg-4")

            var card = document.createElement("div")
            card.setAttribute("style", `position: relative; margin-right: 15px; width: 100%; height: 250px; background-image: url("${backgroundImage}"); background-position: center; background-size: cover; margin-top: 20px;`)

            var cardBody = document.createElement("div")
            cardBody.setAttribute("class", "card-body")
            cardBody.setAttribute("style", "margin: 0; top: 50%; left: 50%; position: absolute; -ms-transform: translate(-50%,-50%); transform: translate(-50%, -50%);")

            var text = document.createElement("button")
            text.setAttribute("class", "btn btn-primary")
            var test = JSON.stringify(favList[i])
            text.setAttribute("onClick", `buildCityPage(${test})`)
            text.innerText = bodyText

            column.appendChild(card)
            card.appendChild(cardBody)
            cardBody.appendChild(text)
            document.getElementById("favouritesCards").appendChild(column)
        }
    }

}

document.getElementById("btnFavourite").addEventListener("click", showFavouritesPage)