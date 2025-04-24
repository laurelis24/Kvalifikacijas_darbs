import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef, useState } from "react";

export default function DeleteUserForm({ className = "" }: { className?: string }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Dzēst profilu</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Kad Jūsu konts tiks dzēsts, visi tā resursi un dati tiks neatgriezeniski izdzēsti. Pirms konta
                    dzēšanas, lūdzu, pārskati visus datus vai informāciju, kuru vēlies saglabāt.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>Dzēst profilu</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Vai tiešām vēlaties dzēst šo profilu?</h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Kad Jūsu konts tiks dzēsts, visi tā resursi un dati tiks neatgriezeniski izdzēsti. Lūdzu, ievadi
                        savu paroli, lai apstiprinātu, ka vēlies neatgriezeniski dzēst savu profilu.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Parole..."
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Atcelt</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Dzēst profilu
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
