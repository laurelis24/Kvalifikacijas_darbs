import { CategoryProps } from '@/types';
import { InputHTMLAttributes } from 'react';

export default function SelectInput({
    categories,
    ...props
}: InputHTMLAttributes<HTMLSelectElement> & { categories: CategoryProps[] }) {
    return (
        <select {...props} className="w-full text-lg">
            {categories.map((category) => {
                return (
                    <option key={category.data.id} value={category.data.id}>
                        {category.data.title}
                    </option>
                );
            })}
        </select>
    );
}
