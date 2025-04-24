import Dropdown from "@/Components/Dropdown";
import { User } from "@/types";
import { Head } from "@inertiajs/react";
import { SetStateAction, useState } from "react";
import AdminPanel from "./AdminPanel";
import CreateCategoryForm from "./Partials/CreateCategoryForm";

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

export default function Categories(props: Props) {
    return (
        <AdminPanel>
            <CategoriesList categories={props.categories} />
        </AdminPanel>
    );
}

const CategoriesList = ({ categories }: { categories: CategoryProps[] }) => {
    const [createCategoryForm, setCreateCategoryForm] = useState(false);
    const [category, setCategory] = useState<CategoryProps>();

    console.log(categories)

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
        <>
            <Head title="Categories" />
            <div className="mx-auto max-w-3xl px-4 py-6">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="mb-4 text-2xl font-semibold sm:mb-0">Categories</h2>
                    <button
                        onClick={() => confirmForm(setCreateCategoryForm)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
                    >
                        Add Category
                    </button>
                </div>

                <ul className="space-y-4">
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className="flex flex-col relative rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                        >
                            <svg
                                            className="size-5 absolute left-0 top-0"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill={category.color}
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                            <div>
                                <p className="text-lg font-medium text-gray-800">{category.title}</p>
                                <p className="text-sm text-gray-500">{category.description}</p>
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
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </li>
                    ))}
                </ul>
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
            </div>
        </>
    );
};
