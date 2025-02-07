import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

interface Props {
    show: boolean;
    onClose: CallableFunction;
    user: User;
}

export default function BanUserForm(props: Props) {
    const {
        data,
        setData,
        post: ban,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        duration: '',
        reason: '',
    });

    // const confirmUserBanForm = () => {
    //     props.onClose(true);
    // };

    const banUser: FormEventHandler = (e) => {
        e.preventDefault();

        ban(route('admin.user-ban', { user: props.user.id }), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        props.onClose(false);

        clearErrors();
        reset();
    };
    return (
        <Modal show={props.show} onClose={props.onClose}>
            <form onSubmit={banUser} className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Are you sure you want to ban user {props.user.username}?
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Once this user's account is deleted, all of their resources and data will be permanently deleted.
                    Please enter ban duration and reason. Max duration is about 1 year which is 525000 minutes.
                </p>

                <div className="mt-6">
                    <InputLabel htmlFor="duration" value="Duration" className="sr-only" />

                    <p>Insert minutes (1-525000): </p>
                    <TextInput
                        id="duration"
                        type="number"
                        name="duration"
                        min={1}
                        max={525000}
                        required
                        value={data.duration}
                        onChange={(e) => setData('duration', e.target.value)}
                        className="mt-1 block w-3/4"
                        isFocused
                        placeholder="Duration"
                    />
                     <InputError message={errors.duration} className="mt-2" />

                    <InputLabel htmlFor="reason" value="Reason" className="sr-only" />
                    <p>Insert reason: </p>
                    <TextInput
                        id="reason"
                        type="text"
                        name="reason"
                        required
                        value={data.reason}
                        onChange={(e) => setData('reason', e.target.value)}
                        className="mt-1 block w-3/4"
                        placeholder="Reason"
                    />

                    <InputError message={errors.reason} className="mt-2" />
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                    <DangerButton className="ms-3" disabled={processing}>
                        Ban User
                    </DangerButton>
                </div>
            </form>
        </Modal>
    );
}
