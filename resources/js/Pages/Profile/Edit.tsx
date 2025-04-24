import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import { Head, usePage } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import EditDeletePosts from "./Partials/EditDeletePosts";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

interface Post {
    id: number;
    title: string;
    created_at: string;
    category: {
        title: string;
        color: string;
    };
}

export default function Edit({
    mustVerifyEmail,
    status,
    posts,
    ban,
}: PageProps<{
    mustVerifyEmail: boolean;
    status?: string;
    posts: Post[];
    ban: { reason: string; banned_until: string } | null;
}>) {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{user.username}</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {user.is_banned && (
                        <div className="flex gap-6 bg-red-100 p-4 shadow sm:rounded-lg sm:p-8">
                            <ExclamationTriangleIcon className="size-6 flex-shrink-0 text-red-600" />
                            <div>
                                <p>Ierobežota pieeja, jo Jūsu profils ir bloķēts līdz {ban?.banned_until}</p>
                                <p>Iemesls: {ban?.reason}</p>
                            </div>
                        </div>
                    )}

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <EditDeletePosts posts={posts} className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
