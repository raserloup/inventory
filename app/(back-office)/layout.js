import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import React from 'react'

export default function layout({ children }) {
    return (
        <div className='flex'>
            {/* SIDE BAR*/}
            <Sidebar />
            <main className='ml-60 w-full
             bg-slate-100 min-h-screen'>
                {/* HEADER*/}
                <Header />
                {children
                }
            </main>
        </div>
    )
}
