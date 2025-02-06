import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { usePage } from '@inertiajs/react';
import AdminNavigation from './Partials/AdminNavigation';

interface Props {
    users: User[];
}

export default function AdminPanel(props: Props) {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout>
            <div className="flex">
                <AdminNavigation />
                <h1>Admin Panel</h1>
            </div>
        </AuthenticatedLayout>
    );
}
