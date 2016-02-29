# LocateMyPhoto

Immagina di avere un applicazione che ti permette di posizionare le tue foto su una mappa in base a dove le hai scattate: questa è LocateMyPhoto.

### Screenshot

![](path/to/image)

## Info

Difficoltà: 2.  

Tempo di sviluppo: 30 minuti.

Tecnologie e API utilizzate:
* API 1
* API 2

## Specifiche

Hai appena scattato una foto e decidi di aggiungere la sua posizione su LocateMyPhoto. Una volta aperta l'app hai una mappa e un pulsante a forma di più. Premendo il bottone compare una schermata da cui puoi scegliere o scattare una foto. Sotto di questa puoi usare la geolocazione per aggiungere la tua posizione, oppure puoi inserire l'indirizzo a cui è stata fatta. Premendo aggiungi la foto viene mostrata sulla mappa nel punto corrispondente.

## Prerequisiti

È necessario scaricare la libreria JavaScript [leaflet.js]("http://leafletjs.org") e inserire i file leaflet.js e leaflet.css nella vostra cartella.

## Carta d'identità

Oltre alle informazioni basilari, questa volta dobbiamo richiedere il permesso per la geolocazione; possiamo fare questo specificando nei permessi il campo `geolocation`.

```js
{
  "name": "locateMyPhoto",
  "description": "Posiziona le tue foto sulla mappa",
  "launch_path": "/index.html",
  "icons": {
    "16": "/icons/icon16x16.png",
    "48": "/icons/icon48x48.png",
    "60": "/icons/icon60x60.png",
    "128": "/icons/icon128x128.png"
  },
  "developer": {
    "name": "nicokant",
    "url": "http://nicokant.xyz"
  },
  "permissions":
   {
     "geolocation": {}
   }
}
```

## La struttura

In questo esempio abbiamo una pagina con:

* una mappa
* un pulsante

ti ricordo che gli elementi `<script>` e `<style>` non sono visibili all'utente.


```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1">
    <link rel='stylesheet' href='leaflet.css'>
    <script src='leaflet.js'></script>
    <title>Locate my photo</title>
    <style>
      
      img{
        max-width: 300px;
      }
      
      .leaflet-map-pane img{
        height: 100px;
      }
      
      #map { height: 180px; }
    </style>
  </head>

  <body>
    <!-- dove andremo a piazzare la mappa -->
    <div id="map"></div>
    <!-- il pulsante per scegliere la foto -->
    <button id='getPhoto'>Select Photo</button>
    <script src="app.js"></script>
  </body>
</html>
```

## La logica dell'applicazione

Stavolta c'è una novità! Vedi la prima riga del file `app.js`?

A `window.onload` associamo una funzione, nel browser ci sono alcuni oggetti che vengono detti globali e sono sempre disponibili anche quando non li definisci come variabili con il codice JavaScript.

Esercizio: trova gli oggetti globali a cui puoi accedere tramite JavaScript nel browser.

Come avrai capito abbiamo chiesto che quando la pagina viene caricata dal browser venga eseguita la funzione che dichiariamo.

```js
window.onload = function(){
   /* riferimento alla mappa nel DOM*/
   var map = L.map('map').setView([45.610465, 9.3704044], 13);

   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

   /* riferimento al pulsante nel DOM*/
   var button = document.getElementById('getPhoto');
   
   /* cosa fare quando clicco il pulsante*/
   button.onclick = function(){
     var activity = new MozActivity({
       name: "pick",
       data: {
         type: "image/jpeg"
       }
     });
    
    activity.onsuccess = function(){
      console.log(this.result.blob)
      var temp = document.createElement("div");
      document.body.appendChild(temp)
      var img = document.createElement('img');
      img.src = window.URL.createObjectURL(this.result.blob);
      temp.appendChild(img);
      
      temp.innerHTML += "<br><label>Dov'è stata scattata?</label><input placeholder='Indirizzo'><button id='here'>Qui</button><button id='getPosition'>Aggiungi alla mappa</button>";
    
      (document.querySelector('#getPosition')).onclick = function(){
        getCoords((document.querySelector('input')).value, img, map, temp);
      }
      
      var geo = document.querySelector('#here')
      geo.onclick = function(){
        navigator.geolocation.getCurrentPosition(function(pos){
          var popup = L.popup()
            .setLatLng([pos.coords.latitude,
          pos.coords.longitude])
            .setContent("<img src='"+ img.src +"'><br>scattata qui")
            .openOn(map);
          map.setView([pos.coords.latitude,
          pos.coords.longitude])
          document.body.removeChild(temp);
        });
      }
      
    }
  }
}

function getCoords(addr, img, map, temp){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://nominatim.openstreetmap.org/search/'+addr+'?format=json');
   xhr.onload = function(){
     var json = JSON.parse(xhr.responseText)[0];
     var popup = L.popup()
            .setLatLng([json.lat,
          json.lon])
            .setContent("<img src='"+ img.src +"'><br>scattata qui")
            .openOn(map);
          map.setView([json.lat,
          json.lon])
          document.body.removeChild(temp);
   }
   xhr.send();
}
```

Per il momento passiamo oltre ad alcune cose e andiamo a `button.onclick`; dichiariamo la funzione da eseguire quando il pulsante viene premuto.

Cosa è `MozActivity`? Le *MozActivity* sono delle azioni che Firefox OS mette a disposizione, in particolare noi vogliamo usare la `pick` activity su un file di tipo `jpeg`.

```js
/* crea una activity
 * che è una azione *pick* (sceglie un file)
 * su un file di tipo `image` nel formato `jpeg`
 */
var activity = new MozActivity({
  name: "pick",
  data: {
    type: "image/jpeg"
  }
});
```

Esattamente come una richiesta `XMLHttpRequest` questo è un oggetto asincrono e dobbiamo pensare a cosa succederà se l'utente sceglie una foto (esattamente come nel caso il server risponde alla richiesta).

```js
activity.onsuccess = function () {
  /* the photo is stored in the 
   * this.result variable
   */
  this.result.blob;
  ...
}
```

Possiamo quindi creare una immagine dal *blob* e mostrarla inserendola nel DOM.

```js
var img = document.createElement('img');
img.src = window.URL.createObjectURL(this.result.blob);
```

Ed inserire il pulsante ed un input per far inserire l'indirizzo all'utente.

```js
var temp = document.createElement("div");
document.body.appendChild(temp)
var img = document.createElement('img');
img.src = window.URL.createObjectURL(this.result.blob);
temp.appendChild(img);
temp.innerHTML += "<br><label for="indirizzo_input">Dov'è stata scattata?</label><input id="indirizzo_input" placeholder='Indirizzo'><button id='here'>Qui</button><button id='getPosition'>Aggiungi alla mappa</button>";
```

Adesso che abbiamo inserito i nuovi elementi dell'interfaccia (`input` e `button`) dobbiamo renderli interattivi:

rinchiudere del codice nelle parentesi tonde fa in modo che venga eseguito immediatamente senza controllare che la linea di codice sia veramente finita.

Quindi questo codice

```js
(document.querySelector('#getPosition')).onclick = function(){
  getCoords((document.querySelector('input')).value, img, map, temp);
}
```

ha lo stesso risultato che questo

```js
var position_button = document.querySelector('#getPosition')
position_button.onclick = function(){
  getCoords((document.querySelector('input')).value, img, map, temp);
}
```

Questo perché nel primo esempio l'oggetto ritornato da `document.querySelector('#getPosition')` viene usato immediatamente senza mantenerlo nella variabile `position_button`.

Quindi quando clicciamo il nuovo pulsante viene eseguita la funzione `getCoords`.


## La Grafica

Qualche dritta su come rendere bellissima l'applicazione

## Esercizi
Qualche suggerimento per ampliare e migliorare l'app realizzata
