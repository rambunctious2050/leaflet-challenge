// Used data from USGS.gov to print out earthquakes recorded in the past 7 days on a map

// Creating map object
var myMap = L.map("map", {
    center: [37.77 , -122.42],
    zoom: 4
  });
// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
    }).addTo(myMap);

// Define a markerSize function that will give each earthquake a different size by magnitude
function markerSize(magnitude) {
  return magnitude / 40;
};

// Define a markerColor function that will give each earthquake a different color by depth
function markerColor(depth){
  return depth
};

// GeoJson, Used the following data "Past 7 days, all earthquakes"
url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// Within d3, get the necessary data and print out a circle for each earthquake
d3.json(url,function(data){
  // Getting all the necessary data from json file
  var x;
  var mag = []; var lng = []; var lat = []; var depth = []; var time = []; var place = [];
  for (x = 0; x < data.features.length; x++){
    mag.push(data.features[x].properties.mag);
    lng.push(data.features[x].geometry.coordinates[0]);
    lat.push(data.features[x].geometry.coordinates[1]);
    depth.push(data.features[x].geometry.coordinates[2]);
    // Get info for tool tip
    time.push(data.features[x].properties.time);
    place.push(data.features[x].properties.place);
  };
  // Get the markerSize and markerColor
  
  // Store all of the data in an object called earthquake

  // Loop through the earthquake array and create one circle for each earthquake object
  for (var i = 0; i < cities.length; i++) {
    L.circle(cities[i].location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: "purple",
      // Setting our circle's radius equal to the output of our markerSize function
      // This will make our marker's size proportionate to its population
      radius: markerSize(cities[i].population)
      }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);
  }
  console.log(place);
});




// EXTRA CODE_______________________________________________________________
//__________________________________________________________________________


// Each city object contains the city's name, location and population
var cities = [
  {
    name: "New York",
    location: [40.7128, -74.0059],
    population: 8550405
  },
  {
    name: "Chicago",
    location: [41.8781, -87.6298],
    population: 2720546
  },
  {
    name: "Houston",
    location: [29.7604, -95.3698],
    population: 2296224
  },
  {
    name: "Los Angeles",
    location: [34.0522, -118.2437],
    population: 3971883
  },
  {
    name: "Omaha",
    location: [41.2524, -95.9980],
    population: 446599
  }
];

// Loop through the cities array and create one marker for each city object
for (var i = 0; i < cities.length; i++) {
  L.circle(cities[i].location, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: "purple",
    // Setting our circle's radius equal to the output of our markerSize function
    // This will make our marker's size proportionate to its population
    radius: markerSize(cities[i].population)
  }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);
}
