import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import TextInput from '@/Components/TextInput';

export default function AdminPanel(){
     const user = usePage().props.auth.user;
    
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Admin Panel</h2>}>
            <Head title='Admin Panel' />

             <h1 className='text-2xl font-bold'>This is admin panel</h1>
        </AuthenticatedLayout>
    );
}
