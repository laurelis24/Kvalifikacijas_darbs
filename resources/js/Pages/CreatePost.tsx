import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CategoryProps, PageProps } from '../types/index';
import CreatePostForm from './Profile/Partials/CreatePostForm';

export default function CreatePost({ categories, translations }: PageProps & { categories: CategoryProps[] }) {
    // console.log(categories);
    return (
        <AuthenticatedLayout>
            <CreatePostForm categories={categories} create_post_page={translations.create_post_page} />
        </AuthenticatedLayout>
    );
}
