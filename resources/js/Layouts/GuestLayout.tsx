import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 bg-[url('/assets/saulkrasti.jpg')] bg-cover bg-center">
            <div className="mx-auto w-full">
                <div className="mx-auto flex w-full flex-col p-2 backdrop-blur-[1px] md:max-w-[550px]">
                    <div className="self-center">
                        <Link href="/">
                            <ApplicationLogo className="size-52 fill-current" />
                        </Link>
                    </div>

                    <div className="mt-6 overflow-hidden bg-white px-6 py-4 shadow-md sm:rounded-lg">{children}</div>
                </div>
            </div>
        </div>
    );
}
