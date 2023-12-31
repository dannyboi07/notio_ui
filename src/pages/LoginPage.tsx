import React, { useState, useEffect } from "react";
import { loginAndSetProfile, useSelectUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLazyAxios } from "../api/use.axios";
import TextInput from "../components/TextInput/TextInput";
import Button from "../components/Button/Button";
import NavbarLayout from "../layouts/NavbarLayout";
import Spinner from "../components/Spinner/Spinner";

function FormFieldCtn({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col gap-y-2">{children}</div>;
}

function LoginPage() {
    const isUserLoggedIn = useSelectUser().isLoggedIn;
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        useMessageAsTitle: true,
        successToastSeverity: "info",
    });

    // Redirect to home page if user is already logged in
    useEffect(() => {
        if (isUserLoggedIn) {
            navigate("/boards", {
                replace: true,
            });
        }
    }, [isUserLoggedIn]);

    // Login response handling
    useEffect(() => {
        if (loginResponseLoading) return;

        if (loginResponse && loginResponseError === null) {
            dispatch(
                loginAndSetProfile({
                    id: loginResponse.id,
                    email: loginResponse.email,
                    username: loginResponse.username,
                    firstName: loginResponse.first_name,
                    lastName: loginResponse.last_name,
                }),
            );
            // setToast({
            //     open: true,

            // })
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
        <NavbarLayout disableAuthCheck>
            <div className="flex h-full w-full flex-col items-center justify-center gap-y-6">
                <h2 className="text-3xl font-semibold">Log in to Notio</h2>
                <div className="h-[1px] w-48 bg-black-300" />
                <div>
                    <form className="flex flex-col gap-y-3">
                        <FormFieldCtn>
                            <label htmlFor="username" className="text-sm">
                                Username
                            </label>
                            <TextInput
                                id="username"
                                value={loginDetails.username}
                                onChange={handleLoginDetailsChange("username")}
                                placeholder="Enter your username..."
                            />
                        </FormFieldCtn>
                        <FormFieldCtn>
                            <label htmlFor="password" className="text-sm">
                                Password
                            </label>
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
                            {loginResponseLoading ? (
                                <Spinner variant="secondary" />
                            ) : (
                                "Log in"
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </NavbarLayout>
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
