console.log('start')
var lat = null;
var lon = null;

navigator.geolocation.getCurrentPosition(function(position) {
  lat = position.coords.latitude; 
  lon = position.coords.longitude;
});

var but = document.getElementById("press-me");
var input = document.querySelector("input[name=address]");
but.onclick = function(){
	if(lat != null){
		decodePosition(input.value);
	}else{
		warn("Non posso cercare le indicazioni se non attivi la Geolocazione!")
	}
	
}

function decodePosition(address){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', ' http://nominatim.openstreetmap.org/search/?q='+encodeURI(address)+'&format=json', true);
	xhr.onload = getIndicazioniStradali;
	xhr.send();
}

function getIndicazioniStradali(ric){
	console.log();
	elat = JSON.parse(ric.target.responseText)[0].lat;
	elon = JSON.parse(ric.target.responseText)[0].lon;
	var http = "http://openls.geog.uni-heidelberg.de/route?start="+lon+","+lat+"&end="+elon+","+elat+"&via=&lang=it&distunit=KM&routepref=Bicycle&weighting=Shortest&avoidAreas=&useTMC=false&noMotorways=false&noTollways=false&noUnpavedroads=false&noSteps=false&noFerries=false&instructions=true";
	
	console.log(http)
	var xhr = new XMLHttpRequest({mozSystem:true});
	xhr.open('GET', http, true);
	xhr.onload = function(){
		
		parser = new DOMParser();
		xmlDoc = parser.parseFromString(xhr.response,"text/xml");
		console.log(xmlDoc);
	}
	xhr.send()
}