import { CategoryProps } from '@/types';
import { InputHTMLAttributes } from 'react';
//import { select } from 'slate';

export default function SelectInput({
    categories,
    ...props
}: InputHTMLAttributes<HTMLSelectElement> & { categories: CategoryProps[] }) {
    //console.log(categories)
    return (
        <select defaultValue={categories.length === 1 ? categories[0].id : ''} {...props} className="w-full text-lg">
            {categories.length === 0 && (
                <option value="" disabled hidden>
                    Izvēlēties kategoriju
                </option>
            )}
            {categories.map((category) => {
                return (
                    <option key={category.id} value={category.id}>
                        {category.title}
                    </option>
                );
            })}
        </select>
    );
}
