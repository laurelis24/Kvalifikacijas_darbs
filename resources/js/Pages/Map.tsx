import L from "leaflet";
import "leaflet.fullscreen";
import "leaflet.fullscreen/Control.FullScreen.css";
import "leaflet.locatecontrol";
import { LocateControl } from "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";
import "leaflet/dist/leaflet.css";
import { PropsWithChildren, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

interface Props {
    className?: string;
}

export default function Map({ children, className }: PropsWithChildren<Props>) {
    return (
        <div className="overflow-hidden rounded-lg shadow-lg shadow-gray-500">
            <MapContainer
                minZoom={7}
                className={`${className} z-0`}
                center={[56.946285, 24.105078]}
                zoom={7}
                maxZoom={17}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    noWrap={true}
                ></TileLayer>
                {children};
                <FullscreenControl />
                <LocateControlButton />
            </MapContainer>
        </div>
    );
}

const FullscreenControl = () => {
    const map = useMap();

    useEffect(() => {
        const fullscreenControl = (L as any).control.fullscreen({
            position: "topleft",
        });

        map.addControl(fullscreenControl);
    }, [map]);

    return null;
};

const LocateControlButton = () => {
    const map = useMap();

    useEffect(() => {
        const locateControler = new LocateControl({
            strings: {
                title: "My location",
            },
            drawCircle: false,
            flyTo: true,
            showPopup: false,
            keepCurrentZoomLevel: true,
            locateOptions: {
                enableHighAccuracy: true,
            },
        });
        locateControler.addTo(map);
    }, [map]);

    return null;
};
