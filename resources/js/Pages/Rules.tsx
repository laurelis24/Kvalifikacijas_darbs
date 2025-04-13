import Everyone from '@/Layouts/EveryoneLayout';
import { NumberedListIcon } from '@heroicons/react/16/solid';

export default function Rules() {
    const rules = ['Nesniegt nepatiesas ziņas', 'Ievērot cenzūru', 'Neizmantot mājaslapas kartes citiem mērķiem'];
    return (
        <Everyone>
            <div className="flex min-h-screen justify-center bg-gray-100 p-4">
                <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl sm:p-10">
                    <div className="mb-8 flex items-center justify-center gap-2">
                        <NumberedListIcon className="size-6" />
                        <h1 className="text-center text-3xl font-bold text-gray-800">Noteikumi</h1>
                    </div>
                    <ul className="space-y-4">
                        {rules.map((rule, index) => (
                            <li
                                key={index}
                                className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm transition duration-200 hover:shadow-md"
                            >
                                <span className="font-medium text-gray-700">
                                    {index + 1}. {rule}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Everyone>
    );
}
