import React from "react";
import AuthLayout from "./AuthLayout";
import Navbar from "../components/Navbar/Navbar";

function NavbarLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthLayout>
            <Navbar />
            <main className="flex h-[calc(100%-48px)] flex-col px-6 py-2">
                {children}
            </main>
        </AuthLayout>
    );
}

export default NavbarLayout;
