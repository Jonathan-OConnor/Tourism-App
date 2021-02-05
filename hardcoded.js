// define hardcoded variables
var bali = {
    "countryCode": "ID",
    "countryName": "Indonesia",
    "image": "https://d13k13wj6adfdf.cloudfront.net/urban_areas/bali-934e688d1a.jpg",
    "lat": "-8.65",
    "long": "115.21667",
    "name": "Bali",
    "nearestCity": "https://api.teleport.org/api/urban_areas/slug:bali/"
}
var paris = {
    'countryCode': "FR",
    'countryName': "France",
    'image': "https://d13k13wj6adfdf.cloudfront.net/urban_areas/paris-0ae0bb626e.jpg",
    'lat': "48.85341",
    'long': "2.3488",
    'name': "Paris",
    'nearestCity': "https://api.teleport.org/api/urban_areas/slug:paris/"
}

var mykonos = {
    'countryCode': "GR",
    'countryName': "Greece",
    'image': "Assets/Mykonos.jpg",
    'lat': "37.4467",
    'long': "25.3289",
    'name': "Mykonos",
    'nearestCity': "https://api.teleport.org/api/urban_areas/slug:athens/"
}

var cairo = {
    'countryCode': "EG",
    'countryName': "Egypt",
    'image': "https://d13k13wj6adfdf.cloudfront.net/urban_areas/cairo-ba88a8816b.jpg",
    'lat': "30.06263",
    'long': "31.24967",
    'name': "Cairo",
    'nearestCity': "https://api.teleport.org/api/urban_areas/slug:cairo/"
}

var auckland = {
    'countryCode': "NZ",
    'countryName': "New Zealand",
    'image': "https://d13k13wj6adfdf.cloudfront.net/urban_areas/auckland-d60b1ab66b.jpg",
    'lat': "-36.84853",
    'long': "174.76349",
    'name': "Auckland",
    'nearestCity': "https://api.teleport.org/api/urban_areas/slug:auckland/"
}

var tokyo = {
    'countryCode': "JP",
    'countryName': "Japan",
    'image': "https://d13k13wj6adfdf.cloudfront.net/urban_areas/tokyo-5d21b97864.jpg",
    'lat': "35.6895",
    'long': "139.69171",
    'name': "Tokyo",
    'nearestCity': "https://api.teleport.org/api/urban_areas/slug:tokyo/"
}
var rome = {
    'countryCode': "IT",
    'countryName': "Italy",
    'image': "https://d13k13wj6adfdf.cloudfront.net/urban_areas/rome-d6d22de42a.jpg",
    'lat': "41.89193",
    'long': "12.51133",
    'name': "Rome",
    'nearestCity': "https://api.teleport.org/api/urban_areas/slug:rome/"
}
var venice = {
    'countryCode': "IT",
    'countryName': "Italy",
    'image': "Assets/default_thumbnails/default6.jpg",
    'lat': "45.43713",
    'long': "12.33265",
    'name': "Venice",
    'nearestCity': "none"
}
var honolulu = {
    "countryCode": "US",
    'countryName': "United States",
    'image': "https://d13k13wj6adfdf.cloudfront.net/urban_areas/honolulu-624c07453d.jpg",
    'lat': "21.30694",
    'long': "-157.85833",
    'name': "Honolulu",
    'nearestCity': "https://api.teleport.org/api/urban_areas/slug:honolulu/"
}

var freiburg = {
    'countryCode': "DE",
    'countryName': "Germany",
    'image': "Assets/default_thumbnails/default7.jpg",
    'lat': "47.9959",
    'long': "7.85222",
    'name': "Freiburg im Breisgau",
    'nearestCity': "none"
}

var melbourne = {
    'countryCode': "AU",
    'countryName': "Australia",
    'image': "https://d13k13wj6adfdf.cloudfront.net/urban_areas/melbourne-17ca593856.jpg",
    'lat': "-37.814",
    'long': "144.96332",
    'name': "Melbourne",
    'nearestCity': "https://api.teleport.org/api/urban_areas/slug:melbourne/"
}

var santorini = {
    'countryCode': "GR",
    'countryName': "Greece",
    'image': "Assets/RecommendedPlaces/Santorini.jpg",
    'lat': "36.393154",
    'long': "25.4615",
    'name': "Santorini",
    'nearestCity': "https://api.teleport.org/api/urban_areas/slug:athens/"
}
// add event listeners
document.getElementById("Bali-button").addEventListener("click", buildBali)
document.getElementById("Paris-button").addEventListener("click", buildParis)
document.getElementById("Mykonos-button").addEventListener("click", buildMykonos)
document.getElementById("Cairo-button").addEventListener("click", buildCairo)
document.getElementById("Auckland-button").addEventListener("click", buildAuckland)
document.getElementById("Tokyo-button").addEventListener("click", buildTokyo)
document.getElementById("Rome-button").addEventListener("click", buildRome)
document.getElementById("Venice-button").addEventListener("click", buildVenice)
document.getElementById("Honolulu-button").addEventListener("click", buildHonolulu)
document.getElementById("Freiburg-button").addEventListener("click", buildFreiburg)
document.getElementById("Melbourne-button").addEventListener("click", buildMelbourne)
document.getElementById("Santorini-button").addEventListener("click", buildSantorini)


// get the information for the hardcoded page
function buildBali() {
    buildCityPage(bali)
}

function buildParis() {
    buildCityPage(paris)
}

function buildMykonos() {
    buildCityPage(mykonos)
}

function buildCairo() {
    buildCityPage(cairo)
}

function buildAuckland() {
    buildCityPage(auckland)
}

function buildTokyo() {
    buildCityPage(tokyo)
}
function buildRome() {
    buildCityPage(rome)
}

function buildVenice() {
    buildCityPage(venice)
}

function buildHonolulu() {
    buildCityPage(honolulu)
}
function buildFreiburg() {
    buildCityPage(freiburg)
}

function buildMelbourne() {
    buildCityPage(melbourne)
}

function buildSantorini() {
    buildCityPage(santorini)
}