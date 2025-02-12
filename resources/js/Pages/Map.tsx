import { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PropsWithChildren, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';



export default function Map({children}: PropsWithChildren) {
    return (
        <div className="flex justify-center">
            <MapContainer
                style={{ width: '400px', height: '300px' }}
                center={[56.946285, 24.105078]}
                zoom={10}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                ></TileLayer>

                 {children};
            </MapContainer>
        </div>
    );
}
