import FileInput from "@/Components/FileInput";
import Footer from "@/Components/Footer";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import LoadingSpinner from "@/Components/loaders/LoadingSpinner";
import LocationMarker from "@/Components/LocationMarker";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextEditorInput from "@/Components/TextEditor/TextEditorInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Map from "@/Pages/Map";
import { CategoryProps } from "@/types";
import { ArrowUpTrayIcon } from "@heroicons/react/16/solid";
import { router, useForm } from "@inertiajs/react";
import imageCompression from "browser-image-compression";
import { LatLng } from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { createEditor, Editor, Transforms } from "slate";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";

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
    console.log(post?.coordinates);
    const MAX_FILES = 3;
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const [loadingImages, setLoadingImages] = useState(false);

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
        title: post ? post.title : "",
        category: post ? post.category_id : categories?.[0].id || 1,
        description: post ? post.description : "",
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
        if (Editor.string(editor, []).length < 5) {
            alert("Aprakstām ir jāsatur vismaz 10 rakstzīmes.");
            return;
        }

        if (!post) {
            postOrUpdate(route("posts.create"), {
                onSuccess: () => {
                    resetForm();
                },
            });
        } else {
            postOrUpdate(route("posts.update", { post: post.id }), {
                onSuccess: () => {
                    router.visit(route("posts.show", { post: post.id }));
                },
            });
        }
    };

    const handleImageInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > MAX_FILES) {
            alert(`Jūs varat augšupielādēt ne vairāk kā ${MAX_FILES} attēlus."`);
            e.target.value = ""; // Reset file input
            setImagePreviews([]);
            return;
        }

        resizeImages(selectedFiles);
    };

    const resizeImages = async (selectedFiles: File[]) => {
        const resizeOptions = {
            maxSizeMB: 2,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };

        try {
            setLoadingImages(true);
            console.log(true);
            const resizedImages = await Promise.all(selectedFiles.map((file) => imageCompression(file, resizeOptions)));
            setData("images", resizedImages);
        } catch (error) {
            console.error("Image resize failed:", error);
        } finally {
            setLoadingImages(false);
        }
    };

    const handleSetDescription = (description: string) => {
        setData("description", description);
    };

    const changeLocationMarkerColor = () => {
        const category = categories.find((category) => category.id === data.category);
        return category?.color || "#FFFFFF";
    };

    return (
        <AuthenticatedLayout>
            <section className="flex flex-col items-center gap-2">
                <div className="mt-10 w-full min-w-80 p-6 md:w-3/4 lg:w-1/2">
                    <header>
                        <h2 className="text-center text-2xl font-medium text-gray-900 lg:text-start">
                            {post ? "Labot notikumu" : "Jauns notikums"}
                        </h2>

                        <p className="mt-1 text-center text-sm text-gray-600 lg:text-start">
                            Ievadiet notikuma nosaukumu, izvēlieties kategoriju, aprakstu, augšupielādējiet līdz 3
                            attēliem un atzīmējiet atrašanās vietu kartē. Lai augšupielādētu vairāk par 1 attēlu,
                            izvēloties attēli jāatzīmē vairāki attēli vienlaicīgi. Atļautie atttēlu formāti: png, jpg,
                            jpeg.
                        </p>

                        {progress && (
                            <progress value={progress.percentage} max={100}>
                                {progress.percentage}
                            </progress>
                        )}
                    </header>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                        <div>
                            <InputLabel htmlFor="title" value={"Nosaukums"} />

                            <TextInput
                                id="title"
                                required
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                                type="text"
                                className="mt-1 w-full"
                                autoComplete="current-title"
                            />

                            <InputError message={errors.title} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="category" value={"Kategorija"} />

                            <SelectInput
                                required
                                id="category"
                                value={data.category}
                                onChange={(e) => {
                                    setData("category", +e.target.value);
                                }}
                                categories={categories}
                            />

                            <InputError message={errors.category} className="mt-2" />
                        </div>
                        <div>
                            <TextEditorInput
                                method={post ? "update" : "create"}
                                postDescription={data.description}
                                setDescription={handleSetDescription}
                                editor={editor}
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>
                        <div>
                            <FileInput type="file" className="hidden" multiple onChange={handleImageInput} />

                            {loadingImages ? (
                                <LoadingSpinner className="size-24" />
                            ) : (
                                <ul className="flex justify-center gap-10">
                                    {imagePreviews.length > 0
                                        ? imagePreviews.map((image, idx) => {
                                              return (
                                                  <li key={idx}>
                                                      <PreviewImage src={image} alt={`image${idx + 1}`} />
                                                  </li>
                                              );
                                          })
                                        : post?.media.map((media, idx) => {
                                              return (
                                                  <li key={media.id}>
                                                      <PreviewImage
                                                          src={`../../storage/${media.file_path}`}
                                                          alt={`image${idx + 1}`}
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
                                    method={post ? "update" : "create"}
                                />
                            </Map>
                        </div>

                        <div className="flex justify-end">
                            <PrimaryButton disabled={processing}>{post ? "Labot" : "Saglabāt"}</PrimaryButton>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </AuthenticatedLayout>
    );
}

function PreviewImage({ className, src, alt }: { className?: string; src: string; alt: string }) {
    return <img src={src} alt={alt} className={`w-32 rounded-lg shadow-md shadow-slate-900 lg:w-80 ${className}`} />;
}
