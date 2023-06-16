import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyAxios } from "../../api/use.axios";
import {
    loginAndSetProfile,
    logout,
    useSelectUser,
} from "../../slices/userSlice";

interface BaseLayoutProps {
    children?: React.ReactNode;
}

function BaseLayout({ children }: BaseLayoutProps) {
    const dispatch = useDispatch();
    const {
        data,
        error,
        loading,
        fetchData: fetchProfile,
    } = useLazyAxios<ProfileApi>({
        url: "/auth/me",
    });
    const toRefreshProfile = useSelectUser().refresh;

    useEffect(() => {
        if (toRefreshProfile) {
            fetchProfile();
        }
    }, [toRefreshProfile]);

    useEffect(() => {
        if (loading) return;

        if (data && error === null) {
            dispatch(
                loginAndSetProfile({
                    id: data.id,
                    email: data.email,
                    username: data.username,
                    firstName: data.first_name,
                    lastName: data.last_name,
                }),
            );
        } else if (error) {
            dispatch(logout());
        }
    }, [data, error, loading]);

    return (
        <main className="h-screen w-screen font-sans">
            {!loading && children}
        </main>
    );
}

export default BaseLayout;
