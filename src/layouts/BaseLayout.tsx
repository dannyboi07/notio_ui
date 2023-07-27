import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyAxios } from "../api/use.axios";
import {
    setProfile,
    loginAndSetProfile,
    setRefresh,
    logout,
    useSelectUser,
} from "../slices/userSlice";

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
        useToast: false,
    });
    const userProfile = useSelectUser();
    const toRefreshProfile = useSelectUser().refresh;

    useEffect(() => {
        if (toRefreshProfile) {
            fetchProfile();
        }
    }, [toRefreshProfile]);

    useEffect(() => {
        if (loading) return;

        if (data && error === null) {
            const dispatchFunction = userProfile.isLoggedIn
                ? setProfile
                : loginAndSetProfile;
            dispatch(
                dispatchFunction({
                    id: data.id,
                    email: data.email,
                    username: data.username,
                    firstName: data.first_name,
                    lastName: data.last_name,
                }),
            );
            if (toRefreshProfile) dispatch(setRefresh(false));
        } else if (error) {
            dispatch(logout());
        }
    }, [data, error, loading]);

    return (
        <div className="h-screen w-screen font-sans">
            {!loading && children}
        </div>
    );
}

export default BaseLayout;
