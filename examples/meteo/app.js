var button = document.getElementById('press-me');
var display = document.getElementById('display');
button.addEventListener('click', prendiPrevisioni);

function prendiPrevisioni() {
  var richiesta = new XMLHttpRequest();
  richiesta.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=Vimercate&appid=00c07e0126d63bd4cd9247ce6f9d2b6b&units=metric', true);
  richiesta.addEventListener('load', function () {
    var risp = JSON.parse(richiesta.responseText);
    console.log(risp);
    display.innerHTML = 'Previsioni: ' + risp.weather[0].main + '<br>';
    display.innerHTML += 'Velocità del vento: ' + risp.wind.speed + '</br>';
    display.innerHTML += 'Temperatura: ' + risp.main.temp + '</br>';
    display.innerHTML += 'Umidità: ' + risp.main.humidity + '</br>';
    display.innerHTML += 'Pressione: ' + risp.main.pressure + '</br>';
    display.innerHTML += 'Copertura: ' + risp.clouds.all + '%</br>';

    getRandomImage(risp.weather[0].main);
  });

  richiesta.send();
}

prendiPrevisioni();

function getRandomImage(tag) {
  var richiesta = new XMLHttpRequest();
  var url = 'https://api.flickr.com/services/rest/?';
  url += '&method=flickr.photos.search&api_key=7fa379ce9df4cceb87e682d300270f31';
  url += '&tags=' + tag + ',weather,nature';
  url += '&format=json';
  richiesta.open('GET', url, true);
  richiesta.onload = function () {
    eval(richiesta.responseText);
  };

  richiesta.send();
}

function jsonFlickrApi(rsp) {

  if (rsp.stat != 'ok') {
    return;
  }

  var photos = rsp.photos.photo;
  var rnd = Math.floor(Math.random() * (100));

  var photo = photos[rnd];

  var bg = document.getElementById('background');
  if (innerWidth > innerHeight) {
    bg.style.width = '100%';
  }else {
    bg.style.height = '100%';
  }

  bg.src = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
}
