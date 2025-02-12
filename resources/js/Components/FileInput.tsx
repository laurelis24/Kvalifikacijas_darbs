import { forwardRef, InputHTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react';

export default function FileInput(){
    //const localRef = useRef<HTMLInputElement>(null);

    // useImperativeHandle(ref, () => ({
    //     focus: () => localRef.current?.focus(),
    // }));

    // useEffect(() => {
    //     if (isFocused) {
    //         localRef.current?.focus();
    //     }
    // }, [isFocused]);

    return (
        <input
            type='file'
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
            }
        />
    );
};
