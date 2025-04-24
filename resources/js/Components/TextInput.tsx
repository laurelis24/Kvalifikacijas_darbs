import { InputHTMLAttributes, Ref, useEffect, useImperativeHandle, useRef } from "react";

type TextInputRefType = {
    focus: () => void | undefined;
};

export default function TextInput({
    type = "text",
    className = "",
    isFocused = false,
    ref,
    ...props
}: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean; ref?: Ref<TextInputRefType> }) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={"rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" + className}
            ref={localRef}
        />
    );
}
