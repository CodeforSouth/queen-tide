function initCalendarMap() {
    var floodMap = new google.maps.Map(
        document.getElementById("flood-calendar-map"),
        {
            center: { lat: 25.7823072, lng: -80.3010434 },
            disableDefaultUI: true,
            zoom: 12

        }
    );

    var input = document.createElement("input");
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

            floodMap.setCenter(place.geometry.location); // Centers Map on location
            floodMap.fitBounds(place.geometry.viewport);
            marker.setPosition(place.geometry.location); // Moves Marker to Location
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
            }
            fillInput(locationData);
        }
    );

    marker.setPosition({
        lat: lat,
        lng: lng
    });
}
