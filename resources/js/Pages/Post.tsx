import PrimaryButton from '@/Components/PrimaryButton';
import { Leaf } from '@/Components/TextEditor/TextEditorInput';
import Everyone from '@/Layouts/EveryoneLayout';
import { convertToLatvianTime } from '@/utils/date';
import { useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FormEventHandler, useState } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate } from 'slate-react';
import {
    UserCircleIcon,
} from '@heroicons/react/16/solid';

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
        comments: {
            id: number;
            comment: string;
            created_at: string;
            username: string;
        }[];
    };
}

export default function PostView({ post }: Props) {
    const editor = createEditor();
    const user = usePage().props.auth.user;
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
        create(route('posts.comment.store', post.id), {
            preserveScroll: true,
            onFinish: () => reset(),
        });
    };

    const mockPost = {
        title: 'Exploring the Mountains of Norway',
        createdAt: 'April 6, 2025',
        content: `
      <h1>Welcome to My Journey</h1>
      <p>I recently traveled to Norway and explored some stunning landscapes. Here's a quick breakdown:</p>
      <ul>
        <li><strong>Fjords</strong> - Absolutely breathtaking.</li>
        <li><strong>Hiking</strong> - Tough but worth it.</li>
        <li><strong>Culture</strong> - Rich and welcoming.</li>
      </ul>
      <p>Highly recommend it to everyone!</p>
    `,
        images: [
            'https://source.unsplash.com/800x600/?mountain',
            'https://source.unsplash.com/800x600/?fjord',
            'https://source.unsplash.com/800x600/?norway',
        ],
    };

    const latestCommentedPosts = [
        { title: 'Exploring the Arctic Circle', id: 1 },
        { title: 'City Life in Tokyo', id: 2 },
        { title: 'Top 10 Backpacking Routes', id: 3 },
        { title: 'Island Hopping in Greece', id: 4 },
        { title: 'Remote Working from Bali', id: 5 },
        { title: 'Road Trip Through Patagonia', id: 6 },
        { title: 'Historical Europe Tour', id: 7 },
        { title: 'Kayaking Adventures in Canada', id: 8 },
        { title: 'Cultural Gems of Morocco', id: 9 },
        { title: 'Food Tour: Southeast Asia', id: 10 },
    ];

    const [comments, setComments] = useState([
        'asdsadsadasasdsaasdasasdasads',
        'asdasdasadsasdass',
        'asdasdas21321',
        'asdas21321321',
    ]);
    const [newComment, setNewComment] = useState('');

    // const handleAddComment = () => {
    //     if (!newComment.trim()) return;
    //     setComments([...comments, newComment]);
    //     setNewComment('');
    // };

    return (
        <Everyone>
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-4">
                {/* Main Content */}
                <div className="space-y-6 md:col-span-3">
                    <div className="rounded-xl bg-white p-6 shadow-xl">
                        <motion.h1 className="text-3xl font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {post.title}
                        </motion.h1>
                        <p className="text-sm text-gray-500">{convertToLatvianTime(post.created_at)}</p>
                        <div className='mt-4 rounded-lg'>
                            <Slate editor={editor} initialValue={JSON.parse(post.description)}>
                                        <Editable renderLeaf={(props) => <Leaf {...props} />} readOnly />
                         </Slate> 
                        </div>
                        
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                            {post.media.map((image, idx) => {
                                return (
                                    <img
                                        key={image.id}
                                        src={`../../storage/${image.file_path}`}
                                        className="h-72 w-full rounded-xl  shadow-lg"
                                        alt={`Bilde-${idx}`}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    <section className="bg-gray-200 py-4 antialiased lg:py-8">
                        <div className="mx-auto max-w-2xl px-4">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-900 lg:text-2xl">Komentāri ({post.comments.length})</h2>
                            </div>
                           
                            {user?.roles?.some((role) => role === 'admin' || role === 'user' || role === 'moderator') && (
                                             <form className="mb-6">
                                             <div className="mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white px-4 py-2">
                                                 <label htmlFor="comment" className="sr-only">
                                                     Rakstīt komentāru...
                                                 </label>
                                                 <textarea
                                                     id="comment"                         
                                                     maxLength={700}
                                                     className="h-12 max-h-52 min-h-12 w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
                                                     placeholder="Rakstīt komentāru..."
                                                     required
                                                 ></textarea>
                                             </div>
                                             <PrimaryButton>Pievienot</PrimaryButton>
                                         </form>
                            )}
                            {post.comments.map(comment => {
                                return <Comment key={comment.id} username={comment.username} comment={comment.comment} date={comment.created_at}  />
                            })}
                            
                            
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Top 10 Latest Commented Posts</h3>
                    <div className="grid gap-4">
                        {latestCommentedPosts.map((item) => (
                            <div
                                key={item.id}
                                className="cursor-pointer rounded-lg bg-white p-4 shadow transition hover:shadow-xl"
                            >
                                <p className="text-sm font-medium">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Everyone>
    );
}



const Comment = ({ username, comment, date }: { username: string; comment: string; date: string }) => {
    return (
        <article className="rounded-lg bg-white p-6 text-base">
                                <footer className="mb-2 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <p className="mr-3 inline-flex items-center text-sm font-semibold text-gray-900">
                                            <UserCircleIcon className='size-6' />
                                            {username}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <time>
                                                {convertToLatvianTime(date)}
                                            </time>
                                        </p>
                                    </div>
                                    <button
                                        id="dropdownComment1Button"
                                        data-dropdown-toggle="dropdownComment1"
                                        class="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                        type="button"
                                    >
                                        <svg
                                            class="h-4 w-4"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 16 3"
                                        >
                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                        </svg>
                                        <span class="sr-only">Comment settings</span>
                                    </button>

                                    <div
                                        id="dropdownComment1"
                                        class="z-10 hidden w-36 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
                                    >
                                        <ul
                                            class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby="dropdownMenuIconHorizontalButton"
                                        >
                                            <li>
                                                <a
                                                    href="#"
                                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Edit
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Remove
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Report
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </footer>
                                <p class="text-gray-500 dark:text-gray-400">
                                    Very straight-to-point article. Really worth time reading. Thank you! But tools are
                                    just the instruments for the UX designers. The knowledge of the design tools are as
                                    important as the creation of the design strategy.
                                </p>
                                <div class="mt-4 flex items-center space-x-4">
                                    <button
                                        type="button"
                                        class="flex items-center text-sm font-medium text-gray-500 hover:underline dark:text-gray-400"
                                    >
                                        <svg
                                            class="mr-1.5 h-3.5 w-3.5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 18"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                            />
                                        </svg>
                                        Reply
                                    </button>
                                </div>
                            </article>
    );
};