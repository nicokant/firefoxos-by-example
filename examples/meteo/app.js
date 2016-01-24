var button = document.getElementById("press-me");
var display = document.getElementById("display");
button.addEventListener('click', prendiPrevisioni);

function prendiPrevisioni(){
  var richiesta = new XMLHttpRequest();
  richiesta.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Vimercate&appid=00c07e0126d63bd4cd9247ce6f9d2b6b&units=metric", true);
  richiesta.addEventListener('load', function(){
    var risp = JSON.parse(richiesta.responseText);
    console.log(risp);
    display.innerHTML = "Previsioni: "+risp.weather[0].main+"<br>";
    display.innerHTML += "Velocità del vento: "+risp.wind.speed+"</br>";
    display.innerHTML += "Temperatura: "+risp.main.temp+"</br>";
    display.innerHTML += "Umidità: "+risp.main.humidity+"</br>";
    display.innerHTML += "Pressione: "+risp.main.pressure+"</br>";
    display.innerHTML += "Copertura: "+risp.clouds.all+"%</br>";
  });
  richiesta.send();
}

prendiPrevisioni();