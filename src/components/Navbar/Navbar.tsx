import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyAxios } from "../../api/use.axios";
import { logout, useSelectUser } from "../../slices/userSlice";
import Button from "../Button/Button";
import Spinner from "../Spinner/Spinner";

function Navbar() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelectUser().isLoggedIn;
    const {
        data: logoutResponse,
        error: logoutResponseError,
        loading: logoutResponseLoading,
        fetchData: logoutRequest,
    } = useLazyAxios({
        url: "/auth/logout",
        method: "GET",
    });

    useEffect(() => {
        if (logoutResponseLoading) return;

        if (logoutResponse && !logoutResponseError) {
            dispatch(logout());
        }
    }, [logoutResponse, logoutResponseError, logoutResponseLoading]);

    return (
        <div
            className={`relative flex px-6 py-2 
                after:absolute after:bottom-0 
                after:left-[50%] after:block 
                after:h-[1px] after:w-5/6 
                after:translate-x-[-50%] after:bg-black-300`}
        >
            <p className="text-2xl font-bold">Notio</p>
            <nav></nav>
            <div className="ml-auto">
                {isLoggedIn && (
                    <Button
                        disabled={logoutResponseLoading}
                        onClick={logoutRequest}
                    >
                        {logoutResponseLoading ? (
                            <Spinner variant="secondary" />
                        ) : (
                            "Logout"
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Navbar;
