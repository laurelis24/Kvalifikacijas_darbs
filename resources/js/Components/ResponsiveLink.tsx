import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ className = '', children, ...props }: InertiaLinkProps) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 border-transparent py-2 pe-4 ps-3 text-base font-medium text-gray-600 transition duration-150 ease-in-out hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800 focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
