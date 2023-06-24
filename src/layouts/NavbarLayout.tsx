import React from "react";
import AuthLayout from "./AuthLayout";
import Navbar from "../components/Navbar/Navbar";

function NavbarLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthLayout>
            <Navbar />
            <main className="h-[calc(100%-48px)]">{children}</main>
        </AuthLayout>
    );
}

export default NavbarLayout;
