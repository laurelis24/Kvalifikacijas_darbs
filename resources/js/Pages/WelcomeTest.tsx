import Dropdown from '@/Components/Dropdown';
import Footer from '@/Components/Footer';
import LocationMarker from '@/Components/LocationMarker';
import { PageProps } from '@/types';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/16/solid';
import { Head, Link } from '@inertiajs/react';
import { LatLng } from 'leaflet';
import Navbar from './components/Navbar';
import Map from './Map';

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
        weather?: {
            temp_c: number;
            icon: string;
        };
        comments_count: number;
        category_id: number;
        created_at: string;
    }[];
    categories: {
        id: number;
        title: string;
        description: string;
        color: string;
    }[];
    filter: {
        sort: string;
        per_page: number;
    };
    canLogin: boolean;
    canRegister: boolean;
}

export default function WelcomeTest({ auth, posts, categories, filter, canLogin, canRegister }: Props) {
    const user = auth.user;

    console.log(posts);

    const locationMarkerColor = (categoryId: number) => {
        const foundColor = categories.find((category) => category.id === categoryId);
        return foundColor?.color || '#ffffff';
    };

    const sortBy = [
        { type: 'newest', text: 'Pēc jaunākā' },
        { type: 'oldest', text: 'Pēc vecākā' },
        { type: 'most_commented', text: 'Visvairāk komentāru' },
    ];
    const postCount = [5, 20, 30, 50, 100];

    return (
        <>
            <Head title="Sākums" />
            <Navbar user={auth.user} />

            <main className="mt-6 w-full pl-10 pr-10">
                <div className="mx-auto flex justify-between sm:px-6 lg:px-8">
                    <div className="flex gap-2">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                    >
                                        Kārtot
                                        <ChevronDownIcon className="-me-0.5 ms-2 h-4 w-4" />
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content align="left">
                                {sortBy.map((sort) => {
                                    return (
                                        <Dropdown.Link
                                            key={sort.type}
                                            className="flex items-center gap-2"
                                            href={route('main', { sort: sort.type, per_page: filter.per_page })}
                                            cacheFor={'1m'}
                                        >
                                            {sort.text}
                                        </Dropdown.Link>
                                    );
                                })}
                            </Dropdown.Content>
                        </Dropdown>

                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                    >
                                        Skaits
                                        <ChevronDownIcon className="-me-0.5 ms-2 h-4 w-4" />
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content align="left">
                                {postCount.map((count) => {
                                    return (
                                        <Dropdown.Link
                                            key={count}
                                            className="flex items-center gap-2"
                                            href={route('main', { sort: filter.sort, per_page: count })}
                                            cacheFor={'1m'}
                                        >
                                            {count}
                                        </Dropdown.Link>
                                    );
                                })}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>

                    <ul>
                        <li className="flex">
                            {user && !user.is_banned && (
                                <Link
                                    href={route('posts.create')}
                                    className={`mb-2 inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:outline-none active:bg-gray-900`}
                                >
                                    <PlusIcon className="inline-block size-6" />
                                    Izveidot notikumu
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <Map className="h-[600px] w-full">
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

                <div className="mt-10">
                    <h1 className="text-center text-lg font-bold">Kategoriju apraksts</h1>
                    <ul className="m-auto w-4/5 space-y-1">
                        {categories.map((category) => {
                            return (
                                <li
                                    key={category.id}
                                    className="flex items-start space-x-3 rounded-lg border bg-white p-4 shadow-sm"
                                >
                                    <div className="h-8 w-8 text-blue-500">
                                        <svg
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill={category.color}
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>

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

            <Footer />
        </>
    );
}
