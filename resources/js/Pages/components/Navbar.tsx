import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { User } from '@/types';
import {
    ArrowLeftEndOnRectangleIcon,
    ArrowRightEndOnRectangleIcon,
    ChevronDownIcon,
    ClipboardDocumentCheckIcon,
    Cog8ToothIcon,
    UserCircleIcon,
    WrenchScrewdriverIcon,
} from '@heroicons/react/16/solid';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Navbar({ user }: { user: User }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm shadow-gray-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-24 justify-between">
                    <div className="flex">
                        <div className="flex shrink-0 items-center">
                            <Link href="/">
                                <ApplicationLogo className="block h-20 w-auto fill-current text-gray-800" />
                            </Link>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            <>
                                <NavLink href={route('main')} active={route().current('main')}>
                                    Sākums
                                </NavLink>
                                <NavLink href={route('history')} active={route().current('history')}>
                                    Notikumu vēsture
                                </NavLink>
                                <NavLink href={route('about')} active={route().current('about')}>
                                    Par lietotni
                                </NavLink>
                                <NavLink href={route('rules')} active={route().current('rules')}>
                                    Noteikumi
                                </NavLink>
                            </>
                        </div>
                    </div>

                    <div className="hidden sm:ms-6 sm:flex sm:items-center">
                        {user && (
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

                                                <ChevronDownIcon className="-me-0.5 ms-2 size-6" />
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
                        )}
                        {!user && (
                            <div className="relative ms-3">
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center px-1 pt-1 leading-5 text-gray-900 transition duration-150 ease-in-out focus:outline-none"
                                    >
                                        <ArrowLeftEndOnRectangleIcon className="size-6" />
                                        Ielogoties
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-1 pt-1 leading-5 text-gray-900 transition duration-150 ease-in-out focus:outline-none"
                                    >
                                        <ClipboardDocumentCheckIcon className="size-6" />
                                        Reģistrēties
                                    </Link>
                                </>
                            </div>
                        )}
                    </div>

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
                <div className="space-y-1 pb-3 pt-2">
                    <ResponsiveNavLink href={route('main')} active={route().current('main')}>
                        Sākums
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('history')} active={route().current('history')}>
                        Notikumu vēsture
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('about')} active={route().current('about')}>
                        Par projektu
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('rules')} active={route().current('rules')}>
                        Noteikumi
                    </ResponsiveNavLink>
                </div>
                {!user && (
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('login')} className="flex items-center gap-2">
                            <ArrowLeftEndOnRectangleIcon className="size-6" />
                            Ielogoties
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('register')} className="flex items-center gap-2">
                            <ClipboardDocumentCheckIcon className="size-6" />
                            Reģistrēties
                        </ResponsiveNavLink>
                    </div>
                )}

                {user && (
                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">{user.username}</div>
                            <div className="text-sm font-medium text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 flex flex-col space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')} className="flex items-center gap-2">
                                <Cog8ToothIcon className="size-4" />
                                Iestatījumi
                            </ResponsiveNavLink>

                            {user.roles.includes('admin') && (
                                <ResponsiveNavLink href={'/admin'} className="flex items-center gap-2">
                                    <WrenchScrewdriverIcon className="size-4" />
                                    Admin
                                </ResponsiveNavLink>
                            )}

                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="flex items-center gap-2"
                            >
                                <ArrowRightEndOnRectangleIcon className="size-4" />
                                Iziet
                            </ResponsiveNavLink>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
