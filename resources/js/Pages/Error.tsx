import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import { Head, Link } from "@inertiajs/react";

export interface ErrorProps {
    message: string;
    code: number;
}

export default function Error(props: ErrorProps) {
    return (
        <div className="grid h-screen place-content-center bg-white px-4">
            <Head title={`${props.code}`} />
            <h1 className="text-center text-lg uppercase tracking-widest text-gray-500 lg:text-2xl">
                {props.code} | {props.message}
            </h1>
            <Link
                href="/"
                className="mt-10 flex items-center justify-center gap-2 rounded-md bg-slate-800 p-6 font-bold text-white"
            >
                <ArrowUturnLeftIcon className="size-6" />
                Doties uz sākumu
            </Link>
        </div>
    );
}
