import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate } from 'slate-react';

interface Props {
    post: {
        id: number;
        title: string;
        description: string;
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

export default function PostShow({ post }: Props) {
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

    return (
        <div>
            <div>{post.title}</div>
            <Slate editor={editor} initialValue={JSON.parse(post.description)}>
                <Editable renderLeaf={(props) => <Leaf {...props} />} readOnly />
            </Slate>

            <div>
                {post.media.map((image, idx) => {
                    return <img key={image.id} src={`../../storage/${image.file_path}`} alt={`Image-${idx}`} />;
                })}
            </div>

            {user?.roles?.some((role) => role === 'admin' || role === 'user' || role === 'moderator') && (
                <div>
                    <form onSubmit={submit}>
                        <TextInput value={data.comment} onChange={(e) => setData('comment', e.target.value)} />
                        <InputError message={errors.comment} className="mt-2" />

                        <PrimaryButton disabled={processing}>Accept</PrimaryButton>
                    </form>
                </div>
            )}

            <div>
                <h2>Komentāri</h2>
                {post.comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        username={comment.username}
                        comment={comment.comment}
                        date={comment.created_at}
                    />
                ))}
            </div>

            <Link href="/">Main page</Link>
            <Link href={`/posts/edit/${post.id}`}>Edit again</Link>
        </div>
    );
}

/// TODO: Need to change location
interface LeafProps {
    attributes: { [key: string]: any };
    children: React.ReactNode;
    leaf: {
        bold?: boolean;
        italic?: boolean;
        underline?: boolean;
        code?: boolean;
    };
}

const Leaf = ({ attributes, children, leaf }: LeafProps) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};

const Comment = ({ username, comment, date }: { username: string; comment: string; date: string }) => {
    return (
        <div>
            <h1>{username}</h1>
            <h1>{comment}</h1>
            <h1>{date}</h1>
        </div>
    );
};
