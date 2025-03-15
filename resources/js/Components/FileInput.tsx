import { InputHTMLAttributes } from 'react';

export default function FileInput({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            id="images"
            type="file"
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' + className
            }
        />
    );
}
