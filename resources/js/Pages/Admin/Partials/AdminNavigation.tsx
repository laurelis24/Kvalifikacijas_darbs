import { Link } from '@inertiajs/react';

export default function AdminNavigation() {
    return (
        <div className="shadow-blue-gray-900/5 relative mr-16 flex h-[calc(100vh-2rem)] w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl">
            <div className="mb-2 p-4">
                <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-gray-900 antialiased">
                    Admin Panel
                </h5>
            </div>
            <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-gray-700">
                <Link
                    href={'/admin/users'}
                    className="flex w-full items-center rounded-lg p-3 text-start leading-tight outline-none transition-all hover:bg-blue-50 hover:bg-opacity-80 hover:text-blue-900 focus:bg-blue-50 focus:bg-opacity-80 focus:text-blue-900 active:bg-gray-50 active:bg-opacity-80 active:text-blue-900"
                >
                    <div className="mr-4 grid place-items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                            />
                        </svg>
                    </div>
                    Manage users
                </Link>
                <Link
                    href={'/admin/categories'}
                    className="flex w-full items-center rounded-lg p-3 text-start leading-tight outline-none transition-all hover:bg-blue-50 hover:bg-opacity-80 hover:text-blue-900 focus:bg-blue-50 focus:bg-opacity-80 focus:text-blue-900 active:bg-gray-50 active:bg-opacity-80 active:text-blue-900"
                >
                    <div className="mr-4 grid place-items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                            />
                        </svg>
                    </div>
                    Manage Post categories
                </Link>
            </nav>
        </div>
    );
}
