import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Leaf } from '@/Components/TextEditor/TextEditorInput';
import Everyone from '@/Layouts/EveryoneLayout';
import { convertToLatvianTime } from '@/utils/date';
import {
    ArrowPathIcon,
    ChatBubbleBottomCenterTextIcon,
    EllipsisHorizontalCircleIcon,
    TrashIcon,
    UserCircleIcon,
} from '@heroicons/react/16/solid';
import { Link, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { FormEventHandler, useEffect, useState } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate } from 'slate-react';

interface Props {
    post: {
        id: number;
        title: string;
        description: string;
        created_at: string;
        media: {
            id: number;
            file_path: string;
            media_type: string;
        }[];
        category: {
            title: string;
            color: string;
        };
        comment_count: number;
    };
    latest_posts: {
        id: number;
        title: string;
        created_at: string;
        comment_count: number;
        color: string;
    }[];
}

interface Comment {
    id: number;
    comment: string;
    created_at: string;
    username: string;
    owner: boolean;
}

export default function PostView(props: Props) {
    const editor = createEditor();
    return (
        <Everyone>
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-4">
                {/* Main Content */}
                <div className="relative space-y-6 md:col-span-3">
                    <div className="flex min-h-[500px] flex-col justify-between rounded-xl bg-white p-6 shadow-xl">
                        <div className="rounded-lg">
                            <h1 className="text-xl font-bold">{props.post.title}</h1>
                            <p className="text-sm text-gray-500">{convertToLatvianTime(props.post.created_at)}</p>
                            <div className="mt-6">
                                <Slate editor={editor} initialValue={JSON.parse(props.post.description)}>
                                    <Editable renderLeaf={(props) => <Leaf {...props} />} readOnly />
                                </Slate>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                            {props.post.media.map((image, idx) => {
                                return (
                                    <img
                                        key={image.id}
                                        src={`../../storage/${image.file_path}`}
                                        className="h-72 w-full rounded-xl shadow-lg"
                                        alt={`Bilde-${idx}`}
                                    />
                                );
                            })}
                        </div>

                        <LocationMarker
                            title={props.post.category.title}
                            color={props.post.category.color}
                            className={'absolute left-0 top-0 size-8'}
                        />
                    </div>
                    <CommentSection post_id={props.post.id} comments_count={props.post.comment_count} />
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Pēdējie komentētie ieraksti</h3>
                    <div className="grid gap-4">
                        {props.latest_posts.map((post) => (
                            <LatestCommentedPost
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                created_at={post.created_at}
                                comment_count={post.comment_count}
                                color={post.color}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Everyone>
    );
}

function CommentSection({ post_id, comments_count }: { post_id: number; comments_count: number }) {
    const user = usePage().props.auth.user;
    const [comments, setComments] = useState<Comment[]>([]);
    const [pages, setPages] = useState<{ current_page: number; last_page: number }>();
    const {
        data,
        setData,
        post: create,
        processing,
        reset,
        errors,
    } = useForm({
        comment: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        create(route('posts.comment.store', post_id), {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => {
                reset();
                fetchLatestComment();
            },
        });
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const loadMoreComments = () => {
        if (pages?.current_page && pages?.current_page < pages?.last_page) {
            fetchComments(pages?.current_page + 1);
        }
    };

    const fetchComments = async (page: number = 1) => {
        try {
            const response = await axios.get(route('posts.comments', { post: post_id, page }));
            setComments((prevComments) =>
                page === 1 ? response.data.comments : [...prevComments, ...response.data.comments],
            );
            setPages(response.data.comments_meta);
        } catch (error) {
            console.error('Error loading comments:', error);
        }
    };

    const fetchLatestComment = async () => {
        try {
            const response = await axios.get(route('posts.comments.latest', { post: post_id }));
            setComments((prevComments) => [response.data, ...prevComments]);
        } catch (error) {
            console.error('Error loading comments:', error);
        }
    };

    return (
        <section className="h-[1000px] overflow-y-auto border-4 bg-gray-200 py-4 antialiased lg:py-8">
            <div className="mx-auto max-w-2xl px-4">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900 lg:text-2xl">Komentāri ({comments_count})</h2>
                </div>

                {user?.roles?.some((role) => role === 'admin' || role === 'user' || role === 'moderator') && (
                    <form onSubmit={submit} className="mb-6 shadow-sm">
                        <div className="mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white px-4 py-2 shadow-sm shadow-gray-400">
                            <label htmlFor="comment" className="sr-only">
                                Rakstīt komentāru...
                            </label>
                            <textarea
                                id="comment"
                                maxLength={700}
                                minLength={1}
                                className="h-12 max-h-52 min-h-12 w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
                                placeholder="Rakstīt komentāru..."
                                required
                                value={data.comment}
                                onChange={(e) => setData('comment', e.target.value)}
                            ></textarea>
                        </div>
                        <InputError message={errors.comment} className="mt-2" />
                        <PrimaryButton disabled={processing} className="flex gap-5">
                            <ChatBubbleBottomCenterTextIcon className="size-6" />
                            Pievienot
                        </PrimaryButton>
                    </form>
                )}
                <div className="divide-y-2">
                    {comments.map((comment) => {
                        return (
                            <article
                                key={comment.id}
                                className="rounded-lg bg-white p-6 text-base shadow-sm shadow-gray-400"
                            >
                                <footer className="mb-2 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <p className="mr-3 inline-flex items-center text-sm font-semibold text-gray-900">
                                            <UserCircleIcon className="size-6" />
                                            {comment.username}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            <time>{convertToLatvianTime(comment.created_at)}</time>
                                        </p>
                                    </div>
                                    {(comment.owner ||
                                        user?.roles?.some((role) => role === 'admin' || role === 'moderator')) && (
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
                                                <Dropdown.Link
                                                    preserveScroll
                                                    method="delete"
                                                    href={route('posts.comment.delete', { comment: comment.id })}
                                                    onFinish={() => fetchComments(1)}
                                                >
                                                    <TrashIcon className="mr-2 inline-block size-6" />
                                                    Dzēst
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    )}
                                </footer>
                                <p className="text-gray-600">{comment.comment}</p>
                            </article>
                        );
                    })}
                </div>
                <div className="flex justify-center p-2">
                    {pages?.current_page !== pages?.last_page && (
                        <PrimaryButton onClick={loadMoreComments} className="flex gap-5">
                            <ArrowPathIcon className="size-6" />
                            Ielādēt komentārus...
                        </PrimaryButton>
                    )}
                </div>
            </div>
        </section>
    );
}

function LatestCommentedPost({
    id,
    title,
    created_at,
    comment_count,
    color,
}: {
    id: number;
    title: string;
    created_at: string;
    comment_count: number;
    color: string;
}) {
    return (
        <Link
            href={route('posts.show', { post: id })}
            key={id}
            className="relative cursor-pointer rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md"
        >
            <LocationMarker color={color} className={'size-4'} />
            <div className="pl-4">
                <h3 className="font-medium">{title}</h3>
                <p className="text-sm opacity-90">{convertToLatvianTime(created_at)}</p>
            </div>

            <div className="absolute bottom-0 right-0 flex p-2">
                <p className="text-sm">{comment_count}</p>
                <ChatBubbleBottomCenterTextIcon className="size-4 text-gray-500" />
            </div>
        </Link>
    );
}

function LocationMarker({ title, color, className }: { title?: string; color: string; className: string }) {
    return (
        <div className="group absolute left-0 top-0">
            <svg
                className={className}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill={color}
                viewBox="0 0 24 24"
            >
                <path
                    fillRule="evenodd"
                    d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                    clipRule="evenodd"
                />
            </svg>
            {title && (
                <span className="tooltiptext invisible absolute left-full top-1/2 z-20 ml-2 w-52 -translate-y-1/2 transform rounded-md bg-gray-900 p-2 text-center text-white opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100">
                    {title}
                </span>
            )}
        </div>
    );
}
