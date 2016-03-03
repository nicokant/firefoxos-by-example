window.onload = function () {

  var map = L.map('map').setView([45.610465, 9.3704044], 13);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

  var button = document.getElementById('getPhoto');
  button.onchange = function (e) {
    $('#modal').modal('show');
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function () {
      var temp = document.createElement('div');
      $('#modal-content').empty();
      document.getElementById('modal-content').appendChild(temp);
      temp.innerHTML = "<div class='container-fluid'><div class='row-fluid'>" +
        "<div class='col-md-6 col-lg-6'><img src='"+this.result+"'></div>" +
        "<div class='col-md-6 col-lg-6'>" +
          "<div class='input-group'>" +
          "<label>Dov'è stata scattata?</label><br />" +
          "<div class='btn-group'><button class='btn' id='here'>Qui</button>" +
          "<button class='btn' id='getPosition'>Aggiungi alla mappa</button></div><br />" +
          "<input id='addr' class='form-control' placeholder='Indirizzo'>" +
        "</div></div>" +
      "</div></div>";

      var img = new Image();
      img.src = this.result;

      (document.querySelector('#getPosition')).onclick = function () {
        getCoords((document.querySelector('#addr')).value, img, map, temp);
        return;
      };

      var geo = document.querySelector('#here');
      geo.onclick = function () {
        navigator.geolocation.getCurrentPosition(function (pos) {
          var popup = L.popup()
            .setLatLng([
              pos.coords.latitude,
              pos.coords.longitude,
            ])
            .setContent("<img src='" + img.src + "'><br>scattata qui")
            .openOn(map);
          map.setView(
            [pos.coords.latitude,
            pos.coords.longitude,
          ]);
          $('#modal').modal('hide');
        });
      };

    };

    reader.readAsDataURL(file);
  };
};

function getCoords(addr, img, map, temp) {
  var xhr = new XMLHttpRequest();
  console.log(addr)
  addr = encodeURIComponent(addr);
  xhr.open('GET', 'http://nominatim.openstreetmap.org/search/' + addr + '?format=json');
  xhr.onload = function () {
    var json = JSON.parse(xhr.responseText)[0];
    var popup = L.popup()
            .setLatLng([
              json.lat,
              json.lon,
            ])
            .setContent("<img src='" + img.src + "'><br>scattata qui")
            .openOn(map);
    map.setView([
      json.lat,
      json.lon,
    ]);
    $('#modal').modal('hide');
  };

  xhr.send();
}
