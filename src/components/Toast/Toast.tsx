import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as RadixToast from "@radix-ui/react-toast";
import {
    closeToast,
    resetToast,
    useSelectToast,
} from "../../slices/toastSlice";
import {
    CheckCircledIcon,
    CrossCircledIcon,
    ExclamationTriangleIcon,
    InfoCircledIcon,
} from "@radix-ui/react-icons";

function ToastProvider({ children }: { children: React.ReactNode }) {
    return <RadixToast.Provider>{children}</RadixToast.Provider>;
}

function Toast() {
    const dispatch = useDispatch();
    const toastState: ToastContext = useSelectToast();
    const clearTimerRef = useRef<number | null>(null);

    function handleToastCloseCore() {
        dispatch(closeToast());
        setTimeout(() => {
            dispatch(resetToast());
        }, 500);
    }

    useEffect(() => {
        if (toastState.open) {
            clearTimerRef.current = setTimeout(() => {
                handleToastCloseCore();
            }, 3000);
        }

        return () => {
            if (clearTimerRef.current) {
                clearTimeout(clearTimerRef.current);
            }
        };
    }, [toastState]);

    return (
        <>
            <RadixToast.Root
                className={`flex items-center gap-x-4 
                rounded-md bg-black-900 px-4 py-2.5 shadow-lg shadow-black-400 data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-toastHide 
                data-[state=open]:animate-toastSlideIn data-[swipe=end]:animate-toastSwipeOut 
                data-[swipe=cancel]:transition-[transform_200ms_ease-out]`}
                open={toastState.open}
                onOpenChange={(open) => handleToastCloseCore()}
            >
                <div className="h-[1.5rem] w-[1.5rem]">
                    {toastState.severity === "error" && (
                        <CrossCircledIcon className="h-full w-full text-red-500" />
                    )}
                    {toastState.severity === "warning" && (
                        <ExclamationTriangleIcon className="h-full w-full text-orange-500" />
                    )}
                    {toastState.severity === "info" && (
                        <InfoCircledIcon className="h-full w-full text-blue-500" />
                    )}
                    {toastState.severity === "success" && (
                        <CheckCircledIcon className="h-full w-full text-green-500" />
                    )}
                </div>
                <div className="flex flex-col">
                    <RadixToast.Title className="font-bold capitalize text-white">
                        {toastState.title}
                    </RadixToast.Title>
                    {toastState.message && (
                        <RadixToast.Description className="font-medium text-white">
                            {toastState.message}
                        </RadixToast.Description>
                    )}
                </div>
            </RadixToast.Root>
            <RadixToast.Viewport className="fixed bottom-0 right-0 pb-6 pr-6" />
        </>
    );
}

export { ToastProvider };
export default Toast;
