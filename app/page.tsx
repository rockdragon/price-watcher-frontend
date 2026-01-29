"use client"

import {useEffect} from "react";
import {redirect} from "next/navigation";

export default function Home() {
    useEffect(() => {
        redirect("/auth/login");
    }, []);

    return (
        <div className="flex flex-col items-center justify-between min-h-screen bg-gray-50">
            <main>
            </main>
        </div>
    );
}
