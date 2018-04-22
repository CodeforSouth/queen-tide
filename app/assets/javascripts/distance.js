
/**
 * This uses the ‘Haversine’ formula to calculate the great-circle distance
 * between two points – that is, the shortest distance over the
 * earth’s surface – giving an ‘as-the-crow-flies’ distance between
 * the points (ignoring any hills they fly over, of course!).
 *
 * @param {number} lat1 - Latitude of the first coordinate
 * @param {number} lon1 - Longitude of the first coordinate
 * @param {number} lat2 - Latitude of the second coordinate
 * @param {number} lon2 - Longitude of the second coordinate
 *
 * @return {Number} The distance between the to points
 */
function getDistanceFromLatLonInMiles(lat1, lon1, lat2, lon2) {
  const RADIUS_OF_EARTH = 3959;

  function degrees2radians(degrees) {
    return degrees * (Math.PI / 180);
  }; // Degrees to Radians

  const  firstLatRadians = degrees2radians(lat1);
  const secondLatRadians = degrees2radians(lat2);
  const   halfLatRadians = degrees2radians(lat2 - lat1) / 2; // Latitude to Radians Divided by 2
  const   halfLonRadians = degrees2radians(lon2 - lon1) / 2; // Longitude to Radians Divided by 2

  // The square of half the chord length between the points
  const lengthSquared =
    Math.sin(halfLatRadians) * Math.sin(halfLatRadians) +
    Math.cos(firstLatRadians) * Math.cos(secondLatRadians) *
    Math.sin(halfLonRadians) * Math.sin(halfLonRadians);

  // The angular distance in radians
  const angular_distance_in_radians =
    2 * Math.atan2(Math.sqrt(lengthSquared), Math.sqrt(1 - lengthSquared));

  return RADIUS_OF_EARTH * angular_distance_in_radians // Distance in KM
}

/**
 * This calculates the distance to every station and then finds the closest one.
 *
 * @param {Array}  stations  - Array of Stations to search
 * @param {Number} latitude  - Latitude of Location
 * @param {Number} longitude - Longitude of Location
 *
 * @return {{ id: String, distance: Number }} Station
 */
function findClosestStation (stations, latitude, longitude) {
  return stations.map( function(station) {
    const distance = getDistanceFromLatLonInMiles(station[2], station[3], latitude, longitude);
    return {
      id: station[1], name: station[0],
      lat: station[2], lng: station[3],
      distance: Number(distance)
    }
  }).sort(function (station1, station2) {
    return station1.distance - station2.distance;
  })[0];

}

/**
 * Generates the elevation info madlib.
 *
 * @param {number} theElevation - The elevation in a location
 */
function madElevate (theElevation) {
  const lowElevation = theElevation < 3;
  const averageElevation = theElevation < 8;
  const highElevation = theElevation >= 8;

  function elevationLevel() {
    if (lowElevation) return "low";
    if (averageElevation) return "normal";
    if (highElevation) return "high for South Florida";
    return "unknown";
  }

  function floodLevel() {
    if (lowElevation) return "increased";
    if (averageElevation) return "average";
    if (highElevation) return "decreased";
    return "unknown";
  }

  return (
    "Your elevation of " +
    theElevation +
    " is " +
    elevationLevel() +
    "." +
    " The likelihood that you will see flooding during the high tides is " +
    floodLevel() +
    "."
  );
}

/**
 * Generates the distance info madlib.
 *
 * @param {number} distance - The distance in km to a station.
 */
function madDistance (distance) {

  function proximityText (distance) {
    if (distance > 2) return "The farther you are from the station, the longer it will take flooding from high tides, if any, to reach you.";
    return "The closer you are to the station, the more likely you are to see flooding around the time of the high tides."
  }

  return (
    "Your distance to the tide monitoring station is " + distance + " miles."
    + proximityText(distance)
  )

}

function madComposer (elevation, distance) {
  const elevationText = madElevate(elevation);
  const  distanceText = madDistance(distance);
  const      madLibEl = document.getElementById("madlib");

  madLibEl.style.display = "block";
  madLibEl.innerText = distanceText +' '+ elevationText;
}

function getElevation (location, callback) {
  const elevationService = new google.maps.ElevationService();
  elevationService.getElevationForLocations(
    { locations: [location] }, function ( results, status ) {
      if (status === "OK" && results[0]) {
        const elevation = (3.28084 * results[0].elevation).toPrecision(2);
        return callback(elevation)
      }
    }
  );
}

