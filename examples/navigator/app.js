var lat, var lon;
navigator.geolocation.getCurrentPosition(function(position) {
  lat = position.coords.latitude; 
  lon = position.coords.longitude;
});

var but = document.getElementById("press-me");
var input = document.querySelector("input[name=address]");
but.onclick = function(){
	decodePosition(input.value);
}

function decodePosition(address){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', ' http://nominatim.openstreetmap.org/search/?q='+URIEncode(address)+'&format=json', true);
	xhr.send();
}