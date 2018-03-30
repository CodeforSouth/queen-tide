function initMap () {
  window.king = 2.5;
  let     selector = document.querySelector("#kingme");
  let        input = document.getElementById("pac-input");
  let          map = new google.maps.Map(
                       document.getElementById("map"), {
                         center: { lat: 25.7823072, lng: -80.3010434 },
                         zoom: 12
                     });
  let autocomplete = new google.maps.places.Autocomplete(input);
  let       marker = new google.maps.Marker({ map: map });

  // Adds Places auto complete to Map
  autocomplete.bindTo("bounds", map);

  // Positions Places auto complete to top left of map
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Adds a Marker and Centers Map on Auto completed location
  autocomplete.addListener("place_changed", function () {
    let place = this.getPlace();

    if (!place.geometry) return;
    if (place.geometry.viewport === undefined) map.setZoom(17);

    map.setCenter( place.geometry.location ); // Centers Map on location
    map.fitBounds(place.geometry.viewport);
    marker.setPosition( place.geometry.location ); // Moves Marker to Location
  });

  // Runs Draw Calender on Auto Complete
  autocomplete.addListener("place_changed", function () {
    drawCalendar(map, this.getPlace())
  });

  // Refreshes Calender on Tide Level Limit Change
  selector.addEventListener("change", function(event) {
    let value = event.target.value;
    window.king = Number(value);
    drawCalendar(map);
  });
}

function drawCalendar(map, place) {
  if (!place.geometry) return;

  let       latitude = place.geometry.location.lat();
  let      longitude = place.geometry.location.lng();
  let       location = place.geometry.location;
  let closestStation = findClosestStation(lats, latitude, longitude);
  let       distance = closestStation.distance.toPrecision(2);

  getElevation(location, function (elevation) {
    madComposer(elevation, distance)
  });

  loadXMLDoc(closestStation.id);
}
