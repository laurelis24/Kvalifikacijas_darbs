import Dropdown from "@/Components/Dropdown";
import { User } from "@/types";
import { Head } from "@inertiajs/react";
import { SetStateAction, useEffect, useState } from "react";
import AdminPanel from "./AdminPanel";
import BanUserForm from "./Partials/BanUserForm";
import EditUserForm from "./Partials/UserRolesForm";

export default function Users({ users }: { users: User[] }) {
    return (
        <AdminPanel>
            <UsersList users={users} />
        </AdminPanel>
    );
}

const UsersList = ({ users }: { users: User[] }) => {
    const [showBanUserForm, setShowBanUserForm] = useState(false);
    const [showEditUserForm, setShowEditUserForm] = useState(false);
    const [user, setUser] = useState<User>();
    const [filterInput, setFilterInput] = useState<User[]>(users);

    useEffect(() => {
        setFilterInput(users);
    }, [users]);

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

    const filterUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const escaped = input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape regex special chars
        const regex = new RegExp(escaped, "i"); // Case-insensitive match

        const filtered = users.filter((user) => regex.test(user.username));
        setFilterInput(filtered);
    };

    return (
        <>
            <Head title="Users" />

            <div className="mx-auto max-w-6xl px-4 py-6">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="mb-4 text-2xl font-semibold sm:mb-0">Users</h2>
                        {/* <input type="text" onChange={filterUser} placeholder="Search users..." /> */}
                        <div className="flex">
                            <span className="rounded-e-0 inline-flex items-center rounded-s-md border border-e-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900">
                                <svg
                                    className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                </svg>
                            </span>
                            <input
                                onChange={filterUser}
                                type="text"
                                className="block w-full min-w-0 flex-1 rounded-none rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Search by username..."
                            />
                        </div>
                    </div>
                </div>
                <ul className="grid gap-4 lg:grid-cols-2">
                    {filterInput.map((user) => (
                        <li
                            key={user.id}
                            className="flex flex-col rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div>
                                <p className="text-lg font-medium text-gray-800">{user.username}</p>
                            </div>
                            <div className="relative mt-3 sm:ml-4 sm:mt-0">
                                <button className="rounded-full p-2 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"></button>
                                {/* You can toggle this dropdown with state */}

                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                Settings
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
                                            onBefore={() =>
                                                window.confirm(`Do you want to delete user: ${user.username}?`)
                                            }
                                            href={`users/delete/${user.id}`}
                                            method="delete"
                                            as="button"
                                        >
                                            Delete
                                        </Dropdown.Link>
                                        {(user.is_banned && (
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
                            </div>
                        </li>
                    ))}
                </ul>
                {user && <BanUserForm show={showBanUserForm} onClose={closeBanUserForm} user={user}></BanUserForm>}
                {user && <EditUserForm show={showEditUserForm} onClose={closeEditUserForm} user={user}></EditUserForm>}
            </div>
        </>
    );
};
