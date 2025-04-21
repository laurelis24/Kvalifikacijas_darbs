import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AdminNavigation from './Partials/AdminNavigation';

interface Props {
    usersOnline: number;
}

export default function AdminPanel(props: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Admin" />
            <div className="flex">
                <AdminNavigation />

                <div>
                    <h1>Users online: {props.usersOnline}</h1>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
