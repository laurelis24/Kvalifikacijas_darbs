import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { User } from '@/types';
import {
    ArrowRightEndOnRectangleIcon,
    Cog8ToothIcon,
    UserCircleIcon,
    WrenchScrewdriverIcon,
} from '@heroicons/react/16/solid';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Navbar({ user }: { user: User }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="flex shrink-0 items-center">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                            </Link>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            {user ? (
                                /*  <NavLink href={route('dashboard')} active={route().current('dashboard')}></NavLink> */

                                <p>s</p>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-md inline-flex items-center border-b-2 px-1 pt-1 font-medium leading-5 transition duration-150 ease-in-out focus:outline-none"
                                    >
                                        Ielogoties
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="text-md inline-flex items-center border-b-2 px-1 pt-1 font-medium leading-5 transition duration-150 ease-in-out focus:outline-none"
                                    >
                                        Reģistrēties
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {user && (
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                <UserCircleIcon className="mr-2 size-6" />
                                                {user.username}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link className="flex items-center gap-2" href={route('profile.edit')}>
                                            <Cog8ToothIcon className="size-5" />
                                            Iestatījumi
                                        </Dropdown.Link>
                                        {user.roles.includes('admin') && (
                                            <Dropdown.Link className="flex items-center gap-2" href={'/admin'}>
                                                <WrenchScrewdriverIcon className="size-5" />
                                                Admin
                                            </Dropdown.Link>
                                        )}
                                        <Dropdown.Link
                                            className="flex items-center gap-2"
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            <ArrowRightEndOnRectangleIcon className="size-6" />
                                            Iziet
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    )}

                    <div className="-me-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                {user ? (
                    <div className="space-y-1 pb-3 pt-2">
                        {/* <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink> */}
                    </div>
                ) : (
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('login')}>Ielogoties</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('register')}>Reģistrēties</ResponsiveNavLink>
                    </div>
                )}

                {user && (
                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">{user.username}</div>
                            <div className="text-sm font-medium text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profils</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Izlogoties
                            </ResponsiveNavLink>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
