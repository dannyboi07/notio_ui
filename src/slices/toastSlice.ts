import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState: ToastContext = {
    title: "",
    message: "",
    severity: "info",
    open: false,
};

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        setToast: (state, action: { payload: ToastContext; }) => {
            return { ...state, ...action.payload };
        },
        closeToast: (state) => {
            return { ...state, open: false };
        },
        resetToast: (state) => {
            return { ...state, ...initialState };
        }
    }
});

const { setToast, closeToast, resetToast } = toastSlice.actions;

const selectToast = (state: RootState) => state.toast;
const useSelectToast = () => useSelector(selectToast);

export { toastSlice, setToast, closeToast, resetToast, useSelectToast };
export default toastSlice.reducer;
