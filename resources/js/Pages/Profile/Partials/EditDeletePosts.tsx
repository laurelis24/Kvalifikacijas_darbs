import Dropdown from '@/Components/Dropdown';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { EllipsisHorizontalCircleIcon, PencilIcon, TrashIcon } from '@heroicons/react/16/solid';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    posts: {
        id: number;
        title: string;
        created_at: string;
        category: {
            title: string;
            color: string;
        };
    }[];
    className?: string;
}

export default function EditDeletePosts({ posts, className = '' }: Props) {
    const [confirmingPostDeletion, setConfirmingPostDeletion] = useState(false);
    const [post, setPost] = useState({ id: -1, title: '' });

    const confirmPostDeletion = (data: { id: number; title: string }) => {
        setConfirmingPostDeletion(true);
        setPost(data);
    };

    const closeModal = () => {
        setConfirmingPostDeletion(false);
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Visi izveidotie raksti</h2>

                <p className="mt-1 text-sm text-gray-600">Labot vai dzēst izveidotus ierakstus.</p>
            </header>

            <div>
                {posts.length ? (
                    <ul className="mt-10 max-w-md divide-y divide-gray-300">
                        {posts.map((post) => {
                            return (
                                <li key={post.id} className="pb-3 sm:pb-4">
                                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                        <div className="shrink-0">
                                            <svg
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill={post.category.color}
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <Link href={route('posts.show', { post: post.id })}>
                                                <p className="truncate text-lg font-medium text-gray-900">
                                                    {post.title}
                                                </p>
                                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                                    {post.category.title}
                                                </p>
                                            </Link>
                                        </div>

                                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <span className="inline-flex rounded-md">
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                                        >
                                                            <EllipsisHorizontalCircleIcon className="size-6" />
                                                        </button>
                                                    </span>
                                                </Dropdown.Trigger>

                                                <Dropdown.Content>
                                                    <Dropdown.Link href={route('posts.edit', { post: post.id })}>
                                                        <PencilIcon className="mr-2 inline-block size-6" />
                                                        Labot
                                                    </Dropdown.Link>
                                                    <button
                                                        onClick={() =>
                                                            confirmPostDeletion({ id: post.id, title: post.title })
                                                        }
                                                        className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                                    >
                                                        <TrashIcon className="mr-2 inline-block size-6" />
                                                        Dzēst
                                                    </button>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <h1>Ierakstu saraksts tukšs</h1>
                )}
                <Modal show={confirmingPostDeletion} onClose={closeModal}>
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Vai tiešām vēlaties dzēst ierakstu: {post.title}?
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Kad ieraksts tiks dzēsts, visi tā resursi un dati tiks neatgriezeniski izdzēsti. Lūdzu
                            apstipriniet, ka vēlies neatgriezeniski dzēst savu ierakstu.
                        </p>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal}>Atcelt</SecondaryButton>

                            <Link
                                method="delete"
                                href={route('posts.delete', { post: post.id })}
                                className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700"
                            >
                                Dzēst ierakstu
                            </Link>
                        </div>
                    </div>
                </Modal>
            </div>
        </section>
    );
}
