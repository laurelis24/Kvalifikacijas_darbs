import { InertiaLinkProps, Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    main = true,
    className = "",
    children,
    ...props
}: InertiaLinkProps & { active: boolean; main?: boolean }) {
    let style = main
        ? "inline-flex items-center border-b px-1 pt-1 text-md font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
          (active
              ? "border-gray-900 text-gray-900 focus:border-indigo-700"
              : "border-transparent text-gray-500 hover:border-gray-400 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700")
        : "flex w-full items-center rounded-lg p-3 text-start leading-tight outline-none transition-all hover:bg-blue-50 hover:bg-opacity-80 hover:text-blue-900 focus:bg-blue-50 focus:bg-opacity-80 focus:text-blue-900 active:bg-gray-50 active:bg-opacity-80 active:text-blue-900" +
          (active ? " shadow-sm shadow-indigo-300 text-gray-900 focus:border-indigo-700" : "");
    return (
        <Link {...props} className={style + className}>
            {children}
        </Link>
    );
}
