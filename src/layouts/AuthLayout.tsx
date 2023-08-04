import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelectUser } from "../slices/userSlice";
import BaseLayout from "./BaseLayout";
import Spinner from "../components/Spinner/Spinner";

interface AuthLayoutProps {
    children: React.ReactNode;
    disableAuthCheck?: boolean;
}

function AuthLayout({ children, disableAuthCheck = false }: AuthLayoutProps) {
    const navigate = useNavigate();
    const [firstRender, setFirstRender] = useState(true);
    const isLoggedIn = useSelectUser().isLoggedIn;

    useEffect(() => {
        setFirstRender(false);
    }, []);

    // skip login validation on first render since we don't have the user data yet
    useEffect(() => {
        if (disableAuthCheck || firstRender) return;

        if (!isLoggedIn) {
            navigate("/login", {
                replace: true,
            });
        }
    }, [disableAuthCheck, firstRender, isLoggedIn]);

    return (
        <BaseLayout>
            {!disableAuthCheck && (firstRender || !isLoggedIn) ? (
                <div className="flex h-screen w-screen items-center justify-center">
                    <Spinner width="2rem" height="2rem" />
                </div>
            ) : (
                children
            )}
        </BaseLayout>
    );
}

export type { AuthLayoutProps };
export default AuthLayout;
