import LocationMarker from '@/Components/LocationMarker';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { LatLng } from 'leaflet';
import Navbar from './components/Navbar';
import Map from './Map';

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Reports', href: '#', current: false },
];
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
];

interface Props extends PageProps {
    posts: {
        id: number;
        title: string;
        random_media: {
            id: number;
            file_path: string;
            media_type: string;
            post_id: number;
        };
        coordinates: {
            latitude: number;
            longitude: number;
        };
        category_id: number;
        created_at: string;
    }[];
    categories: {
        id: number;
        title: string;
        description: string;
        color: string;
    }[];
    canLogin: boolean;
    canRegister: boolean;
}

export default function WelcomeTest({ auth, posts, categories, canLogin, canRegister }: Props) {
    const locationMarkerColor = (categoryId: number) => {
        const foundColor = categories.find((category) => category.id === categoryId);
        return foundColor?.color || '#ffffff';
    };

    return (
        <>
            <Head title="Sākums" />
            <Navbar user={auth.user} />

            <header className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"></div>
            </header>
            <main className="w-full">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <Map className="h-screen w-full">
                        {posts.map((post) => {
                            return (
                                <LocationMarker
                                    key={post.id}
                                    post={post}
                                    color={locationMarkerColor(post.category_id)}
                                    position={new LatLng(post.coordinates.latitude, post.coordinates.longitude)}
                                    readOnly={true}
                                />
                            );
                        })}
                    </Map>
                </div>

                <div>
                    <ul className="space-y-4">
                        {categories.map((category) => {
                            return (
                                <li
                                    key={category.id}
                                    className="flex items-start space-x-3 rounded-lg border bg-white p-4 shadow-sm"
                                >
                                    {/* Icon Container */}
                                    <div className="h-8 w-8 text-blue-500">
                                        <svg
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill={category.color} // Fixed color injection
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>

                                    {/* Text Container */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">{category.title}</h3>
                                        <p className="text-sm text-gray-600">{category.description}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </main>
        </>
    );
}
