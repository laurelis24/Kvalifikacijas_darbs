import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard(props: any) {
    const user = usePage().props.auth.user;

    console.log(props);
    // const [statistics, setStatistics] = useState<{totalPosts:number, totalComments:number}>();
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<ErrorProps>();

    // useEffect(() => {

    //     if (user && isAdmin()) {
    //       axios.get('/dashboard/statistics')
    //         .then((response) => {
    //           setStatistics(response.data.statistics);
    //           setLoading(false);
    //         })
    //         .catch((err) => {
    //           if (err.response && err.response.data) {
    //             const {message, code} = err.response.data;
    //             setError({message: message, code:code});
    //           }
    //           setLoading(false);
    //         });
    //     }

    //   }, [user]);

    const isAdmin = () => {
        return user.roles.includes('admin');
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}>
            <Head title="Dashboard" />

            {/* <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
            </div> */}
        </AuthenticatedLayout>
    );
}
