// declare the map variable here to give it a global scope
let myMap;

// we might as well declare our baselayer(s) here too
const CartoDB_Positron = L.tileLayer(
	'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', 
	{
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
	}
)
const OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
//add the basemap style(s) to a JS object, to which you could also add other baselayers. This object is loaded as a basemap selector as seen further down
let baseLayers = {
	"Cartographic Map": CartoDB_Positron,
	"Topographic Map": OpenTopoMap
};

function initialize(){
    loadMap();
};

function loadMap(mapid){
		//now reassign the map variable by actually making it a useful object, this will load your leaflet map
	try {
		myMap.remove()
	} catch(e) {
		console.log(e)
		console.log("no map to delete")
	} finally {
		if(mapid == 'mapa') {
			//now reassign the map variable by actually making it a useful object, this will load your leaflet map
			myMap = L.map('mapdiv', {
				center: [40.64, -98.00]
				,zoom: 4
				,maxZoom: 18
				,minZoom: 2
				,layers: CartoDB_Positron
			})
			fetchData("https://raw.githubusercontent.com/geog-464/geog-464.github.io/main/Amtrak_Stations.geojson")
}
else if (mapid == 'mapb'){
	myMap = L.map('mapdiv', {
				center: [28.40, -13.67]
				,zoom: 1
				,maxZoom: 18
				,minZoom: 1
				,layers: OpenTopoMap
			})
			fetchData("https://raw.githubusercontent.com/geog-464/geog-464.github.io/main/megacities.geojson")
		}}
}
function fetchData(e){
    //load the data
    fetch(e)
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            //create a Leaflet GeoJSON layer using the fetched json and add it to the map object
            L.geoJson(json,{style: styleAll, pointToLayer: generateCircles, onEachFeature: addPopups}).addTo(myMap)
        })
};

function generateCircles(feature, latlng) {
	return L.circleMarker(latlng);
}
function styleAll(feature, latlng) {
	console.log(feature.properties.ZipCode)
	var styles = {dashArray:null, dashOffset:null, lineJoin:null, lineCap:null, stroke:false, color:'#000', opacity:1, weight:1, fillColor:null, fillOpacity:0 };

	if (feature.geometry.type == "Point") {
		styles.fillColor = '#FF69B4'
		,styles.fillOpacity = 0.5
		,styles.stroke=true
		,styles.radius=6
	}
	if (typeof feature.properties.ZipCode == 'string') {
		styles.fillColor = 'cyan'
		,styles.fillOpacity = 0.5
		,styles.stroke=true
		,styles.radius=6
	}
		return styles;
}
function addPopups(feature, layer){
if(mapdropdown.value == 'mapa') {
		layer.bindPopup('Station:' + feature.properties.StationNam);
	}

	else if(mapdropdown.value == 'mapb') {
		layer.bindPopup(feature.properties.city +' '+ 'Pop: ' + feature.properties.pop_2018);
	}};

var mapdropdown = document.getElementById('mapdropdown');
//console.log(mapdropdown)
mapdropdown.addEventListener('change', map_picker);

function map_pciker() {
	loadMap(mapdropdown.value)
};


//window.onload = initialize();