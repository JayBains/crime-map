import { Loader } from "@googlemaps/js-api-loader";
import "./App.css";

function App() {
  const loader = new Loader({
    apiKey: "AIzaSyAYLht8MaDW0FVJBZDzeW3g5omFslOBDes",
    version: "weekly",
  });

  loader
    .load()
    .then(async () => {
      const { Map } = await google.maps.importLibrary("maps");
      const { HeatmapLayer } = await google.maps.importLibrary("visualization");

      fetch(
        "https://data.police.uk/api/crimes-street/all-crime?lat=51.509865&lng=-0.118092&date=2024-01"
      )
        .then((response) => response.json())
        .then((data) => {
          const heatmapData = [];
          data.map((item) =>
            heatmapData.push(
              new google.maps.LatLng(
                item.location.latitude,
                item.location.longitude
              )
            )
          );

          const map = new Map(document.getElementById("map"), {
            center: { lat: 51.509865, lng: -0.118092 },
            zoom: 11,
            styles: [
              { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
              {
                elementType: "labels.text.stroke",
                stylers: [{ color: "#242f3e" }],
              },
              {
                elementType: "labels.text.fill",
                stylers: [{ color: "#746855" }],
              },
              {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }],
              },
              {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }],
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }],
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }],
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }],
              },
              {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }],
              },
              {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
              },
            ],
            mapTypeId: "terrain",
          });

          var heatmap = new HeatmapLayer({
            data: heatmapData,
          });
          heatmap.setMap(map);
        });
    })
    .catch((error) => console.error(error));
  return <div id="map"></div>;
}

export default App;
