import Dropdown from '@/Components/Dropdown';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { SetStateAction, useState } from 'react';
import AdminNavigation from './Partials/AdminNavigation';
import BanUserForm from './Partials/BanUserForm';
import EditUserForm from './Partials/UserRolesForm';

interface Props {
    users: User[];
}
export default function ManageUsers(props: Props) {
    const [showBanUserForm, setShowBanUserForm] = useState(false);
    const [showEditUserForm, setShowEditUserForm] = useState(false);
    const [user, setUser] = useState<User>();

    const confirmForm = (action: React.Dispatch<SetStateAction<boolean>>) => {
        action(true);
    };

    const closeBanUserForm = () => {
        setShowBanUserForm(false);
        setUser(undefined);
    };
    const closeEditUserForm = () => {
        setShowEditUserForm(false);
        setUser(undefined);
    };

    const confirmUser = (user: User) => {
        setUser(user);
    };
    return (
        <AuthenticatedLayout>
            <div className="flex">
                <AdminNavigation />
                <ul role="list" className="divide-y divide-gray-100">
                    {props.users.map((user) => (
                        <li key={user.email} className="flex justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                                {/* <img
                                    alt=""
                                    src={person.imageUrl}
                                    className="size-12 flex-none rounded-full bg-gray-50"
                                /> */}
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm/6 font-semibold text-gray-900">{user.username}</p>
                                    <p className="mt-1 truncate text-xs/5 text-gray-500">{user.name}</p>
                                </div>
                            </div>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                        >
                                            settings
                                            <svg
                                                className="-me-0.5 ms-2 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    {/* <Dropdown.Link href={route('profile.edit')}>Ban</Dropdown.Link> */}
                                    <button
                                        onClick={() => {
                                            confirmUser(user);
                                            confirmForm(setShowEditUserForm);
                                        }}
                                        className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                    >
                                        Manage roles
                                    </button>
                                    <Dropdown.Link
                                        onBefore={() => window.confirm(`Do you want to delete user: ${user.username}?`)}
                                        href={`users/delete/${user.id}`}
                                        method="delete"
                                        as="button"
                                    >
                                        Delete
                                    </Dropdown.Link>

                                    {(user.isBanned && (
                                        <Dropdown.Link
                                            onBefore={() =>
                                                window.confirm(`Do you want to unban user: ${user.username}?`)
                                            }
                                            href={`users/remove/ban/${user.id}`}
                                            method="delete"
                                            as="button"
                                        >
                                            Unban
                                        </Dropdown.Link>
                                    )) || (
                                        <button
                                            onClick={() => {
                                                confirmUser(user);
                                                confirmForm(setShowBanUserForm);
                                            }}
                                            className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                        >
                                            Ban
                                        </button>
                                    )}
                                </Dropdown.Content>
                            </Dropdown>
                        </li>
                    ))}
                </ul>
            </div>

            {user && <BanUserForm show={showBanUserForm} onClose={closeBanUserForm} user={user}></BanUserForm>}
            {user && <EditUserForm show={showEditUserForm} onClose={closeEditUserForm} user={user}></EditUserForm>}
        </AuthenticatedLayout>
    );
}
