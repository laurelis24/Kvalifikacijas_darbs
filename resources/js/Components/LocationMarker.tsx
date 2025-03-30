import { Link } from '@inertiajs/react';
import L, { LatLng } from 'leaflet';
import { useEffect } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

interface Props {
    position: LatLng | null;
    post?: {
        id: number;
        title: string;
        random_media: {
            id: number;
            file_path: string;
            media_type: string;
            post_id: number;
        };
    };
    setPosition?: CallableFunction;
    setData?: CallableFunction;
    readOnly?: boolean;
    color: string;
}

export default function LocationMarker(props: Props) {
    const map = useMapEvents(
        props.readOnly
            ? {}
            : {
                  click(e) {
                      if (props.setData && props.setPosition) {
                          props.setPosition(new LatLng(e.latlng.lat, e.latlng.lng));
                          props.setData('coordinates', { latitude: e.latlng.lat, longitude: e.latlng.lng });
                      }
                  },

                  locationfound(e) {
                      if (props.setData && props.setPosition) {
                          props.setPosition(new LatLng(e.latlng.lat, e.latlng.lng));
                          props.setData('coordinates', { latitude: e.latlng.lat, longitude: e.latlng.lng });
                      }
                      map.flyTo(e.latlng, map.getZoom());
                  },
              },
    );

    useEffect(() => {
        if (!props.readOnly) {
            map.locate();
        }
    }, [map, props.readOnly]);

    const generateCustomIcon = () => {
        return L.divIcon({
            className: 'custom-marker',
            html: `<svg class="aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="${props.color}" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd"/>
            </svg>
            `,
            iconSize: [32, 32],
            popupAnchor: [0, 0],
        });
    };

    return props.position === null ? null : (
        <Marker icon={generateCustomIcon()} position={props.position}>
            <Popup>
                {props.post?.id ? (
                    <>
                        <Link href={route('posts.show', { post: props.post?.id })}>{props.post?.title}</Link>
                        {props?.post?.random_media && (
                            <img
                                className="h-full w-full"
                                src={`storage/${props.post?.random_media.file_path}`}
                                alt="Picture"
                            />
                        )}
                    </>
                ) : (
                    props.position.toString()
                )}
            </Popup>
        </Marker>
    );
}
