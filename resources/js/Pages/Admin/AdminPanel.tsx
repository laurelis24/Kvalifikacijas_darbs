import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ReactNode, useState } from "react";

export default function AdminPanel({ children }: { children?: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <AuthenticatedLayout>
            <Head title="Admin Panel" />
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <div
                    className={`fixed inset-y-20 left-0 z-30 w-64 transform border-r bg-white transition-transform ${
                        sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:static md:inset-0 md:translate-x-0`}
                >
                    <div className="flex items-center justify-between border-b px-4 py-3">
                        <h2 className="text-lg font-semibold">Admin Panel</h2>
                        <button className="text-gray-600 focus:outline-none md:hidden" onClick={toggleSidebar}>
                            ✕
                        </button>
                    </div>
                    <nav className="space-y-2 p-4">
                        <Link href="/admin/dashboard" className="block rounded px-3 py-2 hover:bg-gray-100">
                            Dashboard
                        </Link>

                        <Link href="/admin/categories" className="block rounded px-3 py-2 hover:bg-gray-100">
                            Categories
                        </Link>
                        <Link href="/admin/users" className="block rounded px-3 py-2 hover:bg-gray-100">
                            Users
                        </Link>
                    </nav>
                </div>

                {/* Main content area */}
                <div className="flex flex-1 flex-col">
                    {/* Top bar */}
                    <header className="flex items-center justify-between border-b bg-white px-4 py-3 md:hidden">
                        <button className="text-gray-600 focus:outline-none" onClick={toggleSidebar}>
                            ☰
                        </button>
                        <h1 className="text-lg font-medium"></h1>
                    </header>

                    {/* Page content */}
                    <main className="flex-1 p-6">
                        {/* <h2 className="text-2xl font-semibold mb-4">Welcome, Admin</h2>
          <p className="text-gray-600">This is your dashboard. Customize it as you like.</p> */}
                        {children}
                    </main>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
