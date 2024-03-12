import { Loader } from "@googlemaps/js-api-loader";
import "./App.css";

function App() {
  const loader = new Loader({
    apiKey: "AIzaSyAYLht8MaDW0FVJBZDzeW3g5omFslOBDes",
    version: "weekly",
  });

  loader.load().then(async () => {
    const { Map } = await google.maps.importLibrary("maps");
    const { HeatmapLayer } = await google.maps.importLibrary("visualization");
    let coordinates;

    /*     try{ 
      fetch(
      "https://data.police.uk/api/crimes-at-location?lat=51.513103&lng=-0.124563"
    )
      .then((response) => response.json())
      .then((data) => {
        coordinates = data.map((item) => ({
          latitude: item.location.latitude,
          longitude: item.location.longitude,
        }));
        var heatmapData = [coordinates];
      })
      .catch((error) => console.error(error));
    } */

    var heatmapData = [
      new google.maps.LatLng(51.509865, -0.118092),
      new google.maps.LatLng(51.509865, -0.118094),
    ];

    const map = new Map(document.getElementById("map"), {
      center: { lat: 51.509865, lng: -0.118092 },
      zoom: 11,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
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

  return <div id="map"></div>;
}

export default App;
