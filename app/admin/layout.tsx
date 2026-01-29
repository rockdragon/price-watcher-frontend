"use client";

import React from "react";
import Link from "next/link";
import {redirect} from "next/navigation";

export default function AdminLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    const logout = () => {
      redirect("/auth/login");
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-62 bg-gray-900 text-white p-4 space-y-4">
                <div className="text-xl font-bold">コントロール・パネル</div>
                <nav className="space-y-2 mt-8">
                    <a href="/admin/dashboard" className="block hover:text-blue-400 mt-4">モニタリング・リスト</a>
                    <a href="/admin/add" className="block hover:text-blue-400 mt-4">モニタリング・追加</a>
                    <Link href="#" onClick={() => {logout()}} className="block hover:text-blue-400 mt-4">ログアウト</Link>
                </nav>
            </aside>

            {/* Content */}
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}