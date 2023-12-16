import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import Map from './Map';
const tollGuruApiKey = 'npnjRRm2RFJqdMN3BqJm3N7JJPr7fJDP';
const overpassApiKey = 'YOUR_OVERPASS_API_KEY';
const osrmApiKey = 'YOUR_OSRM_API_KEY';



const App = () => {
  const [pois, setPois] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://overpass-api.de/api/interpreter',
          {
            data: '[out:json][timeout:25];(nwr["amenity"="restaurant"](around:1000,18.461035448394245, 73.88782575576548);)->.results;.results out center;',
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              'Accept': '*/*',
            },
          }
        );
        const poisData = response.data?.elements.map((element) => ({
          id: element.id,
          name: element.tags.name || 'Unnamed Place',
          coordinates: [element.lat, element.lon],
        }));
        setPois(poisData);
      } catch (error) {
        console.error('Error fetching POIs:', error);
      }
    };

    fetchData();
    handleMarkerClick();
  }, []);

  const handleMarkerClick = async () => {
    console.log("first")
    try {
      // Placeholder: Make a request to TollGuru API for trip cost calculation
      const tollGuruResponse = await axios.post(
        'https://apis.tollguru.com/toll/v2/origin-destination-waypoints',
        {
          "from": {
            "lat": 39.95209,
            "lng": -75.16219
          },
          "to": {
            "lat": 40.71455,
            "lng": -74.00715
          },
        },
        {
          withCredentials: true, // If needed for CORS
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': 'Access-Control-Allow-Origin',
            'Authorization': `Bearer ${tollGuruApiKey}`
          },
        }
      );

      console.log('TollGuru Response:', tollGuruResponse.data);
    } catch (error) {
      console.error('Error fetching TollGuru data:', error);
    }
  };

  return (
    <div>
      <h1>Trip Cost Calculator</h1>
      {/* <Map pois={pois} onMarkerClick={handleMarkerClick} /> */}
    </div>
  );
};

export default App;
