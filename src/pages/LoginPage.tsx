import React, { useState, useEffect } from "react";
import { useLazyAxios } from "../api/use.axios";
import { loginAndSetProfile, useSelectUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import TextInput from "../components/TextInput/TextInput";
import Button from "../components/Button/Button";

function FormFieldCtn({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col gap-y-2">{children}</div>;
}

function LoginPage() {
    const isUserLoggedIn = useSelectUser().isLoggedIn;
    const navigate = useNavigate();
    const [loginDetails, setLoginDetails] = useState({
        username: "",
        password: "",
    });
    const {
        data: loginResponse,
        error: loginResponseError,
        loading: loginResponseLoading,
        fetchData: handleLogin,
    } = useLazyAxios<ProfileApi>({
        url: "/auth/login",
        method: "POST",
        body: loginDetails,
    });

    // Redirect to home page if user is already logged in
    useEffect(() => {
        if (isUserLoggedIn) {
            navigate("/", {
                replace: true,
            });
        }
    }, [isUserLoggedIn]);

    // Login response handling
    useEffect(() => {
        if (loginResponseLoading) return;

        if (loginResponse && loginResponseError === null) {
            loginAndSetProfile({
                id: loginResponse.id,
                email: loginResponse.email,
                username: loginResponse.username,
                firstName: loginResponse.first_name,
                lastName: loginResponse.last_name,
            });
        }
    }, [loginResponse, loginResponseError, loginResponseLoading]);

    // Login details change handler
    const handleLoginDetailsChange =
        (field: "username" | "password") =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            // Validations, disallow spaces for usernames
            let value = e.target.value;
            if (field === "username") {
                value = value.trim();
            }

            setLoginDetails((prev) => ({
                ...prev,
                [field]: value,
            }));
        };

    return (
        <BaseLayout>
            <div className="flex h-full w-full flex-col items-center justify-center gap-y-6">
                <h2 className="text-2xl">Log in to Notio</h2>
                <div>
                    <form className="flex flex-col gap-y-3">
                        <FormFieldCtn>
                            <label htmlFor="username">Username</label>
                            <TextInput
                                id="username"
                                value={loginDetails.username}
                                onChange={handleLoginDetailsChange("username")}
                                placeholder="Enter your username..."
                            />
                        </FormFieldCtn>
                        <FormFieldCtn>
                            <label htmlFor="password">Password</label>
                            <TextInput
                                id="password"
                                type="password"
                                value={loginDetails.password}
                                onChange={handleLoginDetailsChange("password")}
                                placeholder="Enter your password..."
                            />
                        </FormFieldCtn>
                        <Button
                            className="self-center"
                            disabled={loginResponseLoading}
                            onClick={handleLogin}
                        >
                            {loginResponseLoading ? "Logging in..." : "Log in"}
                        </Button>
                    </form>
                </div>
            </div>
        </BaseLayout>
    );
}

export default LoginPage;

// {Object.keys(loginDetails).map((key, i) => (
//     <div key={i} className="flex flex-col gap-y-2">
//         <label htmlFor={key} className="capitalize">
//             {key}
//         </label>
//         <TextInput
//             id={key}
//             value={
//                 loginDetails[
//                     key as "username" | "password"
//                 ]
//             }
//             onChange={handleLoginDetailsChange(
//                 key as "username" | "password",
//             )}
//         />
//     </div>
// ))}
