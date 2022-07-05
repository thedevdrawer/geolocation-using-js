class Geolocation {
    // on success
    successCallback(position){
        let result = document.querySelector("#result") // get the result div
        result.style.display = "block" // show the result div
        result.innerText = "Lat: " + position.coords.latitude + ", Long: " + position.coords.longitude // display the latitude and longitude

let mapContainer = document.querySelector("#map") // get the map container
mapContainer.style.display = "block" // show the map container

const map = L.map("map").setView(
    [position.coords.latitude, position.coords.longitude],
    13
) // create a map and set the view to the user's location

const tiles = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
).addTo(map) // add the tiles to the map

const marker = L.marker([
    position.coords.latitude,
    position.coords.longitude
]).addTo(map) // add a marker to the map
    }

    // on error
    errorCallback(error){
        let result = document.querySelector("#result") // get the result div
        result.style.display = "block" // show the result div
        if(error.code == 1) { // if the user denied the request
            result.innerText = "You have not given permission to access your location."
        }else if(error.code == 2) { // if the position is unavailable
            result.innerText = "Your location is unavailable."
        }else if(error.code == 3) { // if the request times out
            result.innerText = "The request to get your location timed out."
        }else{ // if something else went wrong
            result.innerText = "An unknown error occurred."
        }
    }


    showPosition(){
        if(navigator.geolocation) { // if the browser supports geolocation
            navigator.geolocation.getCurrentPosition(
                this.successCallback,
                this.errorCallback
            ) // get the user's location
            let result = document.querySelector("#result")
            result.style.display = "block"
            result.innerText = "Getting the position information..."
        }else{
            alert('Your browser does not support geolocation') // if the browser doesn't support geolocation
        }
    }
}

const showPosition = document.querySelector("#showPosition")
showPosition.addEventListener("click", function (e) {
    e.preventDefault()
    let result = document.querySelector("#result")
    result.style.display = "block"
    new Geolocation().showPosition() // show the user's location
})