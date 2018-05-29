function initCalendarMap() {
    var floodMap = new google.maps.Map(
        document.getElementById("flood-calendar-map"),
        {
            center: { lat: 25.7823072, lng: -80.3010434 },
            disableDefaultUI: true,
            zoom: 12,
            backgroundColor: "transparent"
        }
    );

    var input = document.createElement("input");
    input.setAttribute("placeholder", "Please enter location or click on the map.");
    input.classList.add("tides");
    var autocomplete = new google.maps.places.Autocomplete(input);
    floodMap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var geocoder = new google.maps.Geocoder();
    var marker = new google.maps.Marker({
        map: floodMap
    });

    floodMap.addListener("click", clickMap.bind(null, marker, geocoder));
    autocomplete.addListener("place_changed", function() {
        var place = autocomplete.getPlace();
        input.value = "";
        if (place.geometry) {
            if (place.geometry.viewport === undefined) map.setZoom(17);

            var location = place.geometry.location;

            floodMap.setCenter(location); // Centers Map on location
            floodMap.fitBounds(place.geometry.viewport);
            marker.setPosition(location); // Moves Marker to Location
            drawCalendar(location.lat(), location.lng());
        }
    });
}

function clickMap(marker, geocoder, clickEvent) {
    var lat = clickEvent.latLng.lat();
    var lng = clickEvent.latLng.lng();

    geocoder.geocode(
        {
            location: {
                lat: lat,
                lng: lng
            }
        },
        function(data) {
            var locationData = {
                lat: lat,
                lng: lng,
                address: data[0].formatted_address
            };
            //fillInput(locationData);
        }
    );

    drawCalendar(lat, lng);

    marker.setPosition({
        lat: lat,
        lng: lng
    });
}

function drawCalendar(lat, lng) {
    var location = {
        lat: lat,
        lng: lng
    };
    var closestStation = findClosestStation(stations, lat, lng);
    var distance = closestStation.distance.toPrecision(2);

    getElevation(location, function(elevation) {
        //madComposer(elevation, distance);
        //console.log(elevation);
    });
    stationID(closestStation.name);
    loadData(closestStation.id);
}

function stationID(name){
    var station = document.getElementById("station");
    station.textContent = "Your closest tide station is " + name;
}

function loadData (mystation) {
    var xmlhttp = new XMLHttpRequest();
    var span = 12;
    xmlhttp.open("GET", "../tide_predictions?station="+mystation+"&span="+span, true);
    xmlhttp.setRequestHeader("Accept", "application/json");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var response = JSON.parse(this.responseText);
        var months = parseData(response);
        renderCalendar(months);
      }
    };
    xmlhttp.send();
  }
  
