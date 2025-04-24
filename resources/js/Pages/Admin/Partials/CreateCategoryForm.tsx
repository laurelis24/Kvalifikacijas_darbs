import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

interface Props {
    show: boolean;
    onClose: CallableFunction;
    method: "post" | "put";
    category?: {
        id: number;
        title: string;
        description: string;
        color: string;
    };
}

export default function CreateOrEditCategoryForm(props: Props) {
    const { data, setData, processing, post, reset, errors, clearErrors } = useForm({
        title: props.method === "put" ? props.category?.title : "",
        description: props.method === "put" ? props.category?.description : "",
        color: props.method === "put" ? props.category?.color : "#FFFFFF",
    });

    const createCategory: FormEventHandler = (e) => {
        e.preventDefault();

        post(
            props.method === "put" && props.category ? `categories/update/${props.category.id}` : `categories/create`,
            {
                preserveScroll: true,
                onSuccess: () => closeModal(),
                onFinish: () => reset(),
            },
        );
    };

    const closeModal = () => {
        props.onClose(false);

        clearErrors();
        reset();
    };
    return (
        <Modal show={props.show} onClose={props.onClose}>
            <form onSubmit={createCategory} className="p-6">
                <h2 className="text-lg font-medium text-gray-900">{props.method === "put" ? "Update" : "Create"}</h2>

                <p className="mt-1 text-sm text-gray-600">Create category for Posts...</p>

                <div className="mt-6">
                    <InputLabel htmlFor="title" value="Title" className="sr-only" />

                    <label htmlFor="title">Title:</label>
                    <TextInput
                        id="title"
                        type="text"
                        name="title"
                        required
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="mt-1 block w-3/4"
                        isFocused
                        placeholder="Title"
                    />
                    <InputError message={errors.title} className="mt-2" />

                    <InputLabel htmlFor="description" value="Description" className="sr-only" />
                    <label htmlFor="description">Description:</label>
                    <TextInput
                        id="description"
                        type="text"
                        name="description"
                        required
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="mt-1 block w-3/4"
                        placeholder="Description"
                    />

                    <InputError message={errors.description} className="mt-2" />

                    <InputLabel htmlFor="color" value="Color" className="sr-only" />
                    <label htmlFor="color">Color:</label>
                    <input
                        type="color"
                        id="color"
                        name="color"
                        required
                        value={data.color}
                        onChange={(e) => setData("color", e.target.value)}
                        className="mt-1 block size-32"
                    />

                    <InputError message={errors.color} className="mt-2" />
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                    <DangerButton className="ms-3" disabled={processing}>
                        Accept
                    </DangerButton>
                </div>
            </form>
        </Modal>
    );
}
