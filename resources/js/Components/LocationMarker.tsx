import { LatLng } from 'leaflet';
import { useEffect } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

interface Props {
    position: LatLng | null;
    setPosition: CallableFunction;
    setData: CallableFunction;
}

export default function LocationMarker(props: Props) {
    const map = useMapEvents({
        click(e) {
            props.setPosition(new LatLng(e.latlng.lat, e.latlng.lng));
            props.setData('coordinates', { longitude: e.latlng.lat, latitude: e.latlng.lng });
        },

        locationfound(e) {
            props.setPosition(new LatLng(e.latlng.lat, e.latlng.lng));
            props.setData('coordinates', { longitude: e.latlng.lat, latitude: e.latlng.lng });
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    useEffect(() => {
        map.locate();
    }, [map]);

    return props.position === null ? null : (
        <Marker position={props.position}>
            <Popup>You are here</Popup>
        </Marker>
    );
}
