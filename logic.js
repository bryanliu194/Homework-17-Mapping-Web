var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";
var faultUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

d3.json(queryUrl, function(data) {
  var earthquakedata = data.features 
  d3.json(faultUrl, function(data) {
    var faultdata = data.features
    createFeatures(earthquakedata, faultdata)
  })
});

function createMap(earthquakes, faultlines) {

 var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/rofo/cjidw3poi1ny72qo0zzop167e/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9mbyIsImEiOiJjamlob3dxYmIxYjVuM3RvY3o0aXZ6a3RzIn0.PuNwTdfKhIk5LvB-5vHDpw")
 var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/rofo/cjiq94r1y3sr72so4mtmr7ygt/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9mbyIsImEiOiJjamlob3dxYmIxYjVuM3RvY3o0aXZ6a3RzIn0.PuNwTdfKhIk5LvB-5vHDpw")
 
  var baseMaps = {
    "Day Map": streetmap,
    "Dark Map": darkmap
  };

  var overlayMaps = {
    "Faultlines": faultlines,
    "Earthquakes (last 7 days)": earthquakes,
  };

  var myMap = L.map("map", {
    center: [
      34.0522, -118.2437
    ],
    zoom: 7,
    layers: [streetmap, earthquakes]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

function createFeatures(earthquakeData, faultdata) {

  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });
  var faultlines =L.geoJSON(faultdata, {
      onEachFeature: onEachFeature
  })

  createMap(earthquakes, faultlines);
}

function onEachFeature(feature, layer) {
  layer.bindPopup("<h3>" + feature.properties.place +
    "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
}

function FaultFeature(feature, layer) {
  layer.bindPopup("<h3>" + feature.properties.place +
    "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
}