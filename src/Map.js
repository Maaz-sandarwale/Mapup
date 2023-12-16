import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({ pois, onMarkerClick }) => {
    return (
      <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {pois.map((poi) => (
          <Marker
            key={poi.id}
            position={poi.coordinates}
            onClick={() => onMarkerClick(poi)}
          >
            <Popup>{poi.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  };
  export default Map