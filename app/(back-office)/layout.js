"use client";

import LoadingSpinner from '@/components/auth/LoadingSpinner';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Layout({ children }) {
    const [showSidebar, setShowSidebar] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <LoadingSpinner />;
    }

    return (
        <div className="flex">
            {/* Header controls the sidebar */}
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <main className="lg:ml-60 ml-0 w-full bg-slate-100 min-h-screen">
                <Header setShowSidebar={setShowSidebar} />
                {children}
            </main>
        </div>
    );
}
