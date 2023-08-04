import React from "react";
import AuthLayout, { AuthLayoutProps } from "./AuthLayout";
import Navbar from "../components/Navbar/Navbar";

interface NavbarLayoutProps extends AuthLayoutProps {}

function NavbarLayout({ children, ...authLayoutProps }: NavbarLayoutProps) {
    return (
        <AuthLayout {...authLayoutProps}>
            <Navbar />
            <main className="flex h-[calc(100%-48px)] flex-col px-6 py-2">
                {children}
            </main>
        </AuthLayout>
    );
}

export default NavbarLayout;
