import FileInput from '@/Components/FileInput';
import Footer from '@/Components/Footer';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import LocationMarker from '@/Components/LocationMarker';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextEditorInput from '@/Components/TextEditor/TextEditorInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Map from '@/Pages/Map';
import { CategoryProps } from '@/types';
import { ArrowUpTrayIcon } from '@heroicons/react/16/solid';
import { router, useForm } from '@inertiajs/react';
import { LatLng } from 'leaflet';
import { useEffect, useMemo, useState } from 'react';
import { createEditor, Editor, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';

interface Post {
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

export default function CreateUpdatePost({ categories, post }: { categories: CategoryProps[]; post?: Post }) {
    const MAX_FILES = 3;
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    const [position, setPosition] = useState<LatLng>(
        post ? new LatLng(post.coordinates.latitude, post.coordinates.longitude) : new LatLng(56.946285, 24.105078),
    );
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const {
        data,
        setData,
        errors,
        post: postOrUpdate,
        reset,
        processing,
        progress,
    } = useForm({
        title: post ? post.title : '',
        category: post ? post.category_id : categories?.[0].id || 1,
        description: post ? post.description : '',
        coordinates: post ? post.coordinates : { latitude: position.lat, longitude: position.lng },
        images: [] as File[],
    });

    useEffect(() => {
        const urls = data.images.map((file) => URL.createObjectURL(file));
        setImagePreviews(urls);
        return () => {
            urls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [data.images]);

    const resetForm = () => {
        Transforms.delete(editor, {
            at: {
                anchor: Editor.start(editor, []),
                focus: Editor.end(editor, []),
            },
        });
        reset();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (Editor.string(editor, []).length < 50) {
            alert('The description must be at least 50 characters long.');
            return;
        }

        if (!post) {
            postOrUpdate(route('posts.create'), {
                onSuccess: () => {
                    resetForm();
                },
            });
        } else {
            postOrUpdate(route('posts.update', { post: post.id }), {
                onSuccess: () => {
                    router.visit(route('posts.show', { post: post.id }));
                },
            });
        }
    };

    const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const selectedFiles = Array.from(e.target.files);

        if (selectedFiles.length > MAX_FILES) {
            alert(`Jūs varat augšupielādēt ne vairāk kā ${MAX_FILES} attēlus."`);
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
        <AuthenticatedLayout>
            <section className="flex flex-col items-center gap-2">
                <div className="mt-10 w-1/2 min-w-80">
                    <header>
                        <h2 className="text-2xl font-medium text-gray-900">
                            {post ? 'Labot notikumu' : 'Jauns notikums'}
                        </h2>

                        {!post && (
                            <p className="mt-1 text-sm text-gray-600">
                                Ievadiet notikuma nosaukumu, izvēlieties kategoriju, aprakstu, augšupielādējiet līdz 3
                                attēliem un atzīmējiet atrašanās vietu kartē. Lai augšupielādētu vairāk par 1 attēlu,
                                izvēloties attēli jāatzīmē vairāki attēli vienlaicīgi. Atļautie atttēlu formāti: png,
                                jpg, jpeg.
                            </p>
                        )}
                        {progress && (
                            <progress value={progress.percentage} max={100}>
                                {progress.percentage}
                            </progress>
                        )}
                    </header>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                        <div>
                            <InputLabel htmlFor="title" value={'Nosaukums'} />

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
                            <InputLabel htmlFor="category" value={'Kategorija'} />

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
                                method={post ? 'update' : 'create'}
                                postDescription={data.description}
                                setDescription={handleSetDescription}
                                editor={editor}
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>
                        <div>
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
                                    {post?.media.map((media, idx) => {
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
                            <div className="flex items-center justify-center p-10">
                                <label
                                    htmlFor="images"
                                    className="inline-flex cursor-pointer items-center rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 transition-colors duration-200 hover:bg-gray-400"
                                >
                                    <ArrowUpTrayIcon className="mr-2 size-6" />
                                    <span>Augšupielādēt attēlus (1-3)</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <InputError message={errors.coordinates} className="mt-2" />

                            <Map className="h-96">
                                <LocationMarker
                                    color={changeLocationMarkerColor()}
                                    position={position}
                                    setPosition={setPosition}
                                    setData={setData}
                                    method={post ? 'update' : 'create'}
                                />
                            </Map>
                        </div>

                        <div className="flex justify-end">
                            <PrimaryButton disabled={processing}>Saglabāt</PrimaryButton>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </AuthenticatedLayout>
    );
}
