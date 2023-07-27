import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelectUser } from "../slices/userSlice";
import BaseLayout from "./BaseLayout";
import Spinner from "../components/Spinner/Spinner";

function AuthLayout({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [firstRender, setFirstRender] = useState(true);
    const isLoggedIn = useSelectUser().isLoggedIn;

    useEffect(() => {
        setFirstRender(false);
    }, []);

    // skip login validation on first render since we don't have the user data yet
    useEffect(() => {
        if (!firstRender && !isLoggedIn) {
            navigate("/login", {
                replace: true,
            });
        }
    }, [isLoggedIn]);

    return (
        <BaseLayout>
            {!isLoggedIn ? (
                <div className="flex h-screen w-screen items-center justify-center">
                    <Spinner width="2rem" height="2rem" />
                </div>
            ) : (
                children
            )}
        </BaseLayout>
    );
}

export default AuthLayout;
