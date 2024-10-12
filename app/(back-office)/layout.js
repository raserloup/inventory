"use client"
import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import { useState } from 'react'


export default function layout({ children }) {
    const [showSidebar, setShowSidebar] = useState(false)
    return (
        <div className='flex'>
            {/* Here the Header is the controller of side bar */}
            {/* SIDE BAR*/}
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <main className="lg:ml-60 ml-0 
            w-full  bg-slate-100 min-h-screen">
                {/* HEADER*/}
                <Header setShowSidebar={setShowSidebar} />
                {children
                }
            </main>
        </div>
    )
}
