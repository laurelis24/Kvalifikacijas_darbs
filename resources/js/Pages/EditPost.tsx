import Footer from '@/Components/Footer';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CategoryProps, PageProps } from '../types/index';
import EditPostForm from './Profile/Partials/EditPostForm';

interface PostData {
    id: number;
    title: string;
    description: string;
    category_id: number;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    media: any;
}

export default function EditPost({
    categories,
    postData,
}: PageProps & { categories: CategoryProps[]; postData: PostData }) {
    return (
        <AuthenticatedLayout>
            <EditPostForm postData={postData} categories={categories} />
            <Footer />
        </AuthenticatedLayout>
    );
}
