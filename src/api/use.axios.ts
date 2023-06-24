import { useState, useEffect } from 'react';
import axiosInstance from "./axios";
import type { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setToast } from "../slices/toastSlice";

interface baseAxiosProps {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    withCredentials?: boolean;
    body?: {};
    headers?: {};
    params?: {};
    useToast?: boolean;
    useMessageAsTitle?: boolean;
}

interface useAxiosProps extends baseAxiosProps { }

/**
 * API Hook for Axios, to make API calls in a component that needs data on mount
 */
function useAxios<T>({
    url,
    method = "GET",
    withCredentials = true,
    body = {},
    headers = {},
    params = {},
    useToast = true,
    useMessageAsTitle = true
}: useAxiosProps) {

    const dispatch = useDispatch();
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ApiError | null>(null);

    useEffect(() => {
        setLoading(true);
        axiosInstance
            .request({
                url,
                method,
                data: body,
                headers,
                params,
                withCredentials
            }).then((response) => {

                setData(response.data?.data);
                if (error) setError(null);

            }).catch((error: AxiosError) => {

                const apiError = error.response?.data as ApiError;
                setError(apiError);
                if (data) setData(null);
                if (useToast) dispatch(setToast({
                    open: true,
                    severity: "error",
                    ...(useMessageAsTitle ? { title: apiError?.message } : {
                        title: apiError?.status ?? "Something went wrong",
                        message: apiError?.message ?? "Please try again"
                    })
                }));

            }).finally(() => {
                setLoading(false);
            });
    }, []);

    return { data, loading, error };
}

/**
 * API Hook for Axios, to make API calls in a component that needs data on demand, whenever it needs it
 */
interface useLazyAxiosProps extends baseAxiosProps { }

function useLazyAxios<T>({
    url,
    method = "GET",
    withCredentials = true,
    body = {},
    headers = {},
    params = {},
    useToast = true,
    useMessageAsTitle = true
}: useLazyAxiosProps) {

    const dispatch = useDispatch();
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    function fetchData() {
        setLoading(true);
        axiosInstance
            .request({
                url,
                method,
                data: body,
                headers,
                params,
                withCredentials
            }).then((response) => {

                setData(response.data?.data ?? response?.data);
                if (error) setError(null);

            }).catch((error: AxiosError) => {

                const apiError = error.response?.data as ApiError;
                setError(apiError);
                if (data) setData(null);
                if (useToast) dispatch(setToast({
                    open: true,
                    severity: "error",
                    ...(useMessageAsTitle ? { title: apiError?.message } : {
                        title: apiError?.status ?? "Something went wrong",
                        message: apiError?.message ?? "Please try again"
                    })
                }));

            }).finally(() => {
                setLoading(false);
            });
    }

    return { data, loading, error, fetchData };
}

export { useAxios, useLazyAxios };