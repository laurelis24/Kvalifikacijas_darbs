import { convertToLatvianTime } from "@/utils/date";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/16/solid";
import { Link } from "@inertiajs/react";
import axios from "axios";
import L, { LatLng, LatLngBounds } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import LoadingSpinner from "./loaders/LoadingSpinner";

interface Props {
    position: LatLng | null;
    post?: {
        id: number;
        title: string;
        created_at: string;
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
    method?: "create" | "update";
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
                              props.setData("coordinates", { latitude: coords.lat, longitude: coords.lng });
                          }
                      }
                  },

                  locationfound(e) {
                      if (props.setData && props.setPosition && props.method !== "update") {
                          props.setPosition(new LatLng(e.latlng.lat, e.latlng.lng));
                          props.setData("coordinates", { latitude: e.latlng.lat, longitude: e.latlng.lng });
                          map.flyTo(e.latlng, map.getZoom());
                      } else if (props.method === "update" && props.position) {
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
            className: "custom-marker",
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
                        <Link href={route("posts.show", { post: props.post?.id })}>
                            <div className="h-full w-full p-2">
                                <h1 className="transition-color w-full text-center text-sm text-gray-600 duration-150 hover:text-gray-900">
                                    {props.post?.title.length > 100
                                        ? `${props.post?.title.slice(0, 100)}...`
                                        : props.post?.title.trim()}
                                </h1>
                                <p className="text-center text-gray-600">
                                    {convertToLatvianTime(props.post?.created_at)}
                                </p>
                                {props?.post?.random_media && (
                                    <img
                                        className="h-32 w-full rounded-md shadow-sm shadow-gray-300"
                                        src={`/storage/images/${props.post?.random_media.file_path}`}
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
                const response = await axios.get(route("weather", { post: postId }), {
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
                    <LoadingSpinner className="size-4" />
                ) : (
                    <div className="w-full">
                        <small>Laikapstākļi šobrīd:</small>
                        <div className="flex items-center">
                            <img className="size-8" src={weather?.icon} />
                            <span className="text-sm text-gray-600">{weather?.temp_c}°C</span>
                        </div>
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
