import { LatLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PropsWithChildren } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

interface Props {
    className?: string;
}

export default function Map({ children, className }: PropsWithChildren<Props>) {
    const latviaBounds = new LatLngBounds([
        [55.68, 20.5],
        [58.1, 28.6],
    ]);

    return (
        <div>
            <MapContainer
                minZoom={7}
                maxBounds={latviaBounds}
                className={className}
                center={[56.946285, 24.105078]}
                zoom={8}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    noWrap={true}
                ></TileLayer>
                {children};
            </MapContainer>
        </div>
    );
}
