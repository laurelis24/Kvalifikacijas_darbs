import Dropdown from '@/Components/Dropdown';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Head } from '@inertiajs/react';
import { SetStateAction, useState } from 'react';
import AdminNavigation from './Partials/AdminNavigation';
import CreateCategoryForm from './Partials/CreateCategoryForm';

interface Props {
    categories: CategoryProps[];
    auth: User;
}
interface CategoryProps {
    id: number;
    title: string;
    description: string;
    color: string;
}

export default function ManageCategories(props: Props) {
    const [createCategoryForm, setCreateCategoryForm] = useState(false);
    const [category, setCategory] = useState<CategoryProps>();

    const confirmForm = (action: React.Dispatch<SetStateAction<boolean>>) => {
        action(true);
    };

    const confirmCategory = (category: CategoryProps) => {
        setCategory(category);
    };

    const closeCreateCategoryForm = () => {
        setCreateCategoryForm(false);
        setCategory(undefined);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Categories" />
            <div className="flex">
                <AdminNavigation />
                <div>
                    <button onClick={() => confirmForm(setCreateCategoryForm)}>+ Category</button>
                    <ul role="list" className="divide-y divide-gray-100">
                        {props.categories.map((category) => (
                            <li key={category.id} className="flex justify-between gap-x-6 py-5">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm/6 font-semibold text-gray-900">{category.title}</p>
                                        <p className="mt-1 truncate text-xs/5 text-gray-500">{category.description}</p>
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
                                                confirmCategory(category);
                                                confirmForm(setCreateCategoryForm);
                                            }}
                                            className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                        >
                                            Edit category
                                        </button>
                                        <Dropdown.Link
                                            onBefore={() =>
                                                window.confirm(
                                                    `Do you want to delete post category: ${category.title}?`,
                                                )
                                            }
                                            href={`categories/delete/${category.id}`}
                                            method="delete"
                                            as="button"
                                        >
                                            Delete
                                        </Dropdown.Link>

                                        {/* {(user.isBanned && (
                                        <Dropdown.Link
                                            onBefore={() =>
                                                window.confirm(`Do you want to unban user: ${user.username}?`)
                                            }
                                            href={route('admin.user-unban', { user: user.id })}
                                            method="delete"
                                            as="button"
                                        >
                                            Unban
                                        </Dropdown.Link>
                                    )) || (
                                        <button
                                            onClick={() => {
                                                confirmUser(user);
                                                confirmForm(setShowBanUserForm)
                                            }}
                                            className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                        >
                                            Ban
                                        </button>
                                    )} */}
                                    </Dropdown.Content>
                                </Dropdown>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {createCategoryForm && (
                <CreateCategoryForm method="post" show={createCategoryForm} onClose={closeCreateCategoryForm} />
            )}
            {category && (
                <CreateCategoryForm
                    category={category}
                    method="put"
                    show={createCategoryForm}
                    onClose={closeCreateCategoryForm}
                />
            )}
        </AuthenticatedLayout>
    );
}
