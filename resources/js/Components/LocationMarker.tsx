import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/16/solid';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import L, { LatLng, LatLngBounds } from 'leaflet';
import { useEffect, useState } from 'react';
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
        weather?: {
            temp_c: number;
            icon: string;
        };
        comments_count: number;
    };
    setPosition?: CallableFunction;
    setData?: CallableFunction;
    readOnly?: boolean;
    method?: 'create' | 'update';
    color: string;
}

export default function LocationMarker(props: Props) {
    const latviaBounds = new LatLngBounds([
        [55.68, 20.5],
        [58.1, 28.6],
    ]);

    const map = useMapEvents(
        props.readOnly
            ? {}
            : {
                  click(e) {
                      if (props.setData && props.setPosition) {
                          const coords = new LatLng(e.latlng.lat, e.latlng.lng);

                          if (latviaBounds.contains(coords)) {
                              props.setPosition(coords);
                              props.setData('coordinates', { latitude: coords.lat, longitude: coords.lng });
                          }
                      }
                  },

                  locationfound(e) {
                      if (props.setData && props.setPosition && props.method !== 'update') {
                          props.setPosition(new LatLng(e.latlng.lat, e.latlng.lng));
                          props.setData('coordinates', { latitude: e.latlng.lat, longitude: e.latlng.lng });
                          map.flyTo(e.latlng, map.getZoom());
                      } else if (props.method === 'update' && props.position) {
                          map.flyTo(L.latLng(props.position.lat, props.position.lng), map.getZoom());
                      }
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
            html: `<svg class="aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="${props.color}" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd"/>
            </svg>
            `,
            iconSize: [32, 32],
            popupAnchor: [0, 0],
        });
    };

    return props.position === null ? null : (
        <Marker icon={generateCustomIcon()} position={props.position}>
            <Popup keepInView>
                {props.post?.id ? (
                    <div className="min-w-60 max-w-xs overflow-hidden rounded-md bg-white p-4 shadow-lg md:max-w-sm">
                        <Link href={route('posts.show', { post: props.post?.id })}>
                            <div className="h-full w-full p-2">
                                <h1 className="transition-color w-full text-center text-sm text-gray-600 duration-150 hover:text-gray-900">
                                    {props.post?.title.length > 100
                                        ? `${props.post?.title.slice(0, 100)}...`
                                        : props.post?.title.trim()}
                                </h1>
                                {props?.post?.random_media && (
                                    <img
                                        className="h-32 w-full rounded-md shadow-sm shadow-gray-300"
                                        src={`storage/${props.post?.random_media.file_path}`}
                                        alt="Picture"
                                    />
                                )}
                            </div>
                        </Link>
                        <WeatherComponent postId={props.post.id} comments_count={props.post.comments_count} />
                    </div>
                ) : (
                    props.position.toString()
                )}
            </Popup>
        </Marker>
    );
}

function WeatherComponent({ postId, comments_count }: { postId: number; comments_count: number }) {
    const [weather, setWeather] = useState<{ temp_c: number; icon: string } | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const fetchWeather = async () => {
            setLoading(true);
            try {
                const response = await axios.get(route('weather', { post: postId }), {
                    signal: controller.signal,
                });

                setWeather(response.data);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };

        fetchWeather();

        return () => {
            controller.abort();
        };
    }, [postId]);

    return (
        <>
            <div role="status" className="flex w-full items-center justify-between">
                <span className="sr-only">Ielādē laikapstākļus...</span>
                {loading ? (
                    <svg
                        aria-hidden="true"
                        className="size-4 animate-spin fill-blue-600 text-gray-800"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                ) : (
                    <div className="flex w-full items-center">
                        <img className="size-8" src={weather?.icon} />
                        <span className="text-sm text-gray-600">{weather?.temp_c}°C</span>
                    </div>
                )}

                <div className="flex gap-1 text-gray-500">
                    <span>{comments_count}</span>
                    <ChatBubbleBottomCenterTextIcon className="size-4" />
                </div>
            </div>
        </>
    );
}
