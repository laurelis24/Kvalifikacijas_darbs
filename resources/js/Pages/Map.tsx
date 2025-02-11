import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { latLng, LatLng } from 'leaflet';


export default function Map() {
   

    function LocationMarker() {
        const [position, setPosition] = useState<LatLng | null>(null);
        const map = useMapEvents({
          click(e){
            //console.log(e.latlng.lat, e.latlng.lng);
            setPosition(new LatLng(e.latlng.lat, e.latlng.lng));
           
          }
         
        })
      
        return position === null ? null : (
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
        )
      }

    return (
        <div className='flex justify-center'>
        <MapContainer style={{width: '400px', height:'300px'}} center={[56.946285, 24.105078]} zoom={10} scrollWheelZoom={true}>
  <TileLayer 
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    >

        
    </TileLayer>
  

    <LocationMarker />
</MapContainer>
</div>
    );
}
