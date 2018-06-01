// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

function initReportMap() {
    var floodMap = new google.maps.Map(
        document.getElementById("flood-report-map"),
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

    cancelButton();

    floodMap.addListener("click", clickReportMap.bind(null, marker, geocoder));
    autocomplete.addListener("place_changed", function() {
        var place = autocomplete.getPlace();
        input.value = "";
        if (place.geometry) {
            if (place.geometry.viewport === undefined) map.setZoom(17);
            fillInput({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                address: place.formatted_address
            });
            floodMap.setCenter(place.geometry.location); // Centers Map on location
            floodMap.fitBounds(place.geometry.viewport);
            marker.setPosition(place.geometry.location); // Moves Marker to Location
        }
    });
}

function fillInput(locationData){
    var wrapper = document.querySelector(".flood-form-wrapper");
    var latitude = document.querySelector("input#flood_latitude");
    var longitude = document.querySelector("input#flood_longitude");
    var address = document.querySelector("input#flood_address");

    if(latitude) {
        latitude.value = locationData.lat;
    }
    
    if(longitude) {
        longitude.value = locationData.lng;
    }

    if(address) {
        address.value = locationData.address;
    }

    wrapper.classList.remove("hidden");
}

function clickReportMap(marker, geocoder, clickEvent) {
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

function cancelButton() {
    const cancel = document.getElementById("cancel");
    const wrapper = document.querySelector(".flood-form-wrapper");

    if(cancel) {
        cancel.addEventListener("click", function(event){
            event.preventDefault();
            wrapper.classList.add("hidden");
        })
    }

}