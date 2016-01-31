window.onload = function(){
  
   var map = L.map('map').setView([45.610465, 9.3704044], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

   var button = document.getElementById('getPhoto');
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
