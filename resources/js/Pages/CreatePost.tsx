import Footer from '@/Components/Footer';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CategoryProps, PageProps } from '../types/index';
import CreatePostForm from './Profile/Partials/CreatePostForm';

export default function CreatePost({ categories }: PageProps & { categories: CategoryProps[] }) {
    return (
        <AuthenticatedLayout>
            <CreatePostForm categories={categories} />
            <Footer />
        </AuthenticatedLayout>
    );
}
