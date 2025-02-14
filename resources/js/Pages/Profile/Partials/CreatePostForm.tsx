import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextEditorInput from '@/Components/TextEditorInput';
import TextInput from '@/Components/TextInput';
import { CategoryProps, CreatePostPage, Translation } from '@/types';
import { useForm } from '@inertiajs/react';
import { LatLng } from 'leaflet';
import { FormEventHandler, useState } from 'react';

export default function CreatePostForm({
    create_post_page,
    categories,
}: Translation<CreatePostPage> & { categories: CategoryProps[] }) {
    const [position, setPosition] = useState<LatLng | null>(null);
    const translate = create_post_page;

    //console.log(categories)

    const {
        data,
        setData,
        errors,
        post: create,
        reset,
        processing,
        //recentlySuccessful,
    } = useForm({
        title: '',
        category: '',
        description: '',
        coordinates: { longitude: null, latitude: null },
        images: null,
    });

    const handleSetPosition = (position: LatLng) => {
        setPosition(position);
    };

    const createPost: FormEventHandler = (e) => {
        e.preventDefault();

        create(route('posts.create'), {
            preserveScroll: true,
            //onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    //const translation = props.translation.create_post_page;
    //console.log(translation)
    //console.log(position);
    return (
        <section className="flex flex-col items-center gap-2 border-2 border-red-400">
            <div className="w-1/2 min-w-80">
                <header>
                    <h2 className="text-lg font-medium text-gray-900">{translate?.create_post}</h2>

                    <p className="mt-1 text-sm text-gray-600">Apraksts...</p>
                </header>

                <form onSubmit={createPost} className="mt-6 space-y-6">
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
                            onChange={(e) => setData('category', e.target.value)}
                            categories={categories}
                        />

                        <InputError message={errors.category} className="mt-2" />
                    </div>
                     <div>

                     <TextEditorInput />
                </div> 

                    <div className="h-60 w-full bg-cyan-700"></div>

                    {/*  <Map>
            <LocationMarker position={position} setData={setData} setPosition={handleSetPosition}/> 
            </Map>  */}

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    </div>
                </form>
            </div>
        </section>
    );
}
