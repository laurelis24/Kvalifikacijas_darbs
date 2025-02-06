import { Head, Link } from '@inertiajs/react';

export interface ErrorProps {
    message: string;
    code: number;
    back: string;
}

export default function Error(props: ErrorProps) {
    return (
        <div className="grid h-screen place-content-center bg-white px-4">
            <Head title={`${props.code}`} />
            <h1 className="uppercase tracking-widest text-gray-500">
                {props.code} | {props.message}
            </h1>
            <Link href="/">{props.back}</Link>
        </div>
    );
}
