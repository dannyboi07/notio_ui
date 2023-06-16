import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelectUser } from "../slices/userSlice";
import BaseLayout from "./BaseLayout";

function AuthLayout({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const isLoggedIn = useSelectUser().isLoggedIn;

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login", {
                replace: true,
            });
        }
    }, [isLoggedIn]);

    return <BaseLayout>{isLoggedIn ? children : <></>}</BaseLayout>;
}

export default AuthLayout;
