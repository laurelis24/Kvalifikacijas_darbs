import FileInput from '@/Components/FileInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import LocationMarker from '@/Components/LocationMarker';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextEditorInput from '@/Components/TextEditor/TextEditorInput';
import TextInput from '@/Components/TextInput';
import Map from '@/Pages/Map';
import { CategoryProps, CreatePostPage, Translation } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { LatLng } from 'leaflet';
import { useEffect, useMemo, useState } from 'react';
import { createEditor, Editor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';

interface PostData {
    id: number;
    title: string;
    description: string;
    category_id: number;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    media: {
        id: number;
        file_path: string;
        media_type: string;
    }[];
}

export default function EditPostForm({
    create_post_page,
    categories,
    postData,
}: Translation<CreatePostPage> & { categories: CategoryProps[]; postData: PostData }) {
    const MAX_FILES = 3;
    const translate = create_post_page;

    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    const [position, setPosition] = useState<LatLng>(
        new LatLng(postData.coordinates.latitude, postData.coordinates.longitude),
    );
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    //const [postImages, setPostImages] = useState(postData.media);
    const { data, setData, errors, post, reset, processing, progress } = useForm({
        title: postData.title,
        category: postData.category_id,
        description: postData.description,
        coordinates: { latitude: position.lat, longitude: position.lng },
        images: [] as File[],
    });

    useEffect(() => {
        const urls = data.images.map((file) => URL.createObjectURL(file));
        setImagePreviews(urls);
        return () => {
            urls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [data.images]);

    // const resetForm = () => {
    //     Transforms.delete(editor, {
    //         at: {
    //             anchor: Editor.start(editor, []),
    //             focus: Editor.end(editor, []),
    //         },
    //     });
    //     reset();
    // };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (Editor.string(editor, []).length < 50) {
            alert('The description must be at least 50 characters long.');
            return;
        }

        post(route('posts.update', { post: postData.id }), {
            onError: () => {
                console.log(errors);
            },
            onSuccess: () => {
                router.visit(route('posts.show', { post: postData.id }));
            },
        });
    };

    const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const selectedFiles = Array.from(e.target.files);

        if (selectedFiles.length > MAX_FILES) {
            alert(`You can only upload up to ${MAX_FILES} files.`);
            e.target.value = ''; // Reset file input
            setImagePreviews([]);
            return;
        }

        setData('images', selectedFiles);
    };

    const handleSetDescription = (description: string) => {
        setData('description', description);
    };

    const changeLocationMarkerColor = () => {
        const category = categories.find((category) => category.id === data.category);
        return category?.color || '#FFFFFF';
    };

    return (
        <section className="flex flex-col items-center gap-2 border-2 border-red-400">
            <div className="w-1/2 min-w-80">
                <header>
                    <h2 className="text-lg font-medium text-gray-900">{translate?.create_post}</h2>

                    <p className="mt-1 text-sm text-gray-600">Apraksts...</p>
                    {progress && (
                        <progress value={progress.percentage} max={100}>
                            {progress.percentage}
                        </progress>
                    )}
                </header>

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="title" value={translate?.title} />

                        <TextInput
                            id="title"
                            required
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            type="text"
                            className="mt-1 w-full"
                            autoComplete="current-title"
                        />

                        <InputError message={errors.title} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="category" value={translate?.category} />

                        <SelectInput
                            required
                            id="category"
                            value={data.category}
                            onChange={(e) => {
                                setData('category', +e.target.value);
                            }}
                            categories={categories}
                        />

                        <InputError message={errors.category} className="mt-2" />
                    </div>
                    <div>
                        <TextEditorInput
                            postDescription={postData.description}
                            method="update"
                            setDescription={handleSetDescription}
                            editor={editor}
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="images" value="Change/Upload images" />

                        <FileInput type="file" className="hidden" multiple onChange={handleImageInput} />

                        {imagePreviews.length > 0 ? (
                            <ul className="flex justify-center gap-10">
                                {imagePreviews.map((image, idx) => {
                                    return (
                                        <li key={idx}>
                                            <img src={image} alt={`image${idx + 1}`} className="h-24 w-24" />
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <ul className="flex justify-center gap-10">
                                {postData.media.map((media, idx) => {
                                    return (
                                        <li key={media.id}>
                                            {/* Image link */}
                                            <img
                                                src={`../../storage/${media.file_path}`}
                                                alt={`image${idx + 1}`}
                                                className="h-24 w-24"
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    <div>
                        <InputError message={errors.coordinates} className="mt-2" />

                        <Map className="h-96">
                            <LocationMarker
                                color={changeLocationMarkerColor()}
                                position={position}
                                setPosition={setPosition}
                                setData={setData}
                            />
                        </Map>
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    </div>
                </form>
            </div>
        </section>
    );
}
