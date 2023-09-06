import { useState, useEffect, useRef } from 'react';
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
    successToastSeverity?: "success" | "info";
    errorToastSeverity?: "error" | "warning";
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
    useMessageAsTitle = true,
    successToastSeverity = "success",
    errorToastSeverity = "error"
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
                if (useToast && response?.data?.message) {
                    dispatch(setToast({
                        open: true,
                        severity: successToastSeverity,
                        ...(useMessageAsTitle ? { title: response?.data?.message } : {
                            title: response?.data?.status ?? "Success",
                            message: response?.data?.message ?? ""
                        })
                    }));
                }

            }).catch((error: AxiosError) => {

                const apiError = error.response?.data as ApiError;
                setError(apiError);
                if (data) setData(null);
                if (useToast) dispatch(setToast({
                    open: true,
                    severity: errorToastSeverity,
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

interface useLazyAxiosProps extends baseAxiosProps { }

/**
 * API Hook for Axios, to make API calls in a component that needs data on demand, whenever it needs it
 */
function useLazyAxios<T>({
    url,
    method = "GET",
    withCredentials = true,
    body = {},
    headers = {},
    params = {},
    useToast = true,
    useMessageAsTitle = true,
    successToastSeverity = "success",
    errorToastSeverity = "error"
}: useLazyAxiosProps) {

    const dispatch = useDispatch();
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    function fetchData() {
        if (abortControllerRef.current) abortControllerRef.current.abort();
        abortControllerRef.current = new AbortController();

        setLoading(true);
        axiosInstance
            .request({
                url,
                method,
                data: body,
                headers,
                params,
                withCredentials,
                signal: abortControllerRef.current.signal
            }).then((response) => {

                setData(response.data?.data ?? response?.data);
                if (error) setError(null);
                if (useToast && response?.data?.message) {
                    dispatch(setToast({
                        open: true,
                        severity: successToastSeverity,
                        ...(useMessageAsTitle ? { title: response?.data?.message } : {
                            title: response?.data?.status ?? "Success",
                            message: response?.data?.message ?? ""
                        })
                    }));
                }

            }).catch((error: AxiosError) => {

                const apiError = error.response?.data as ApiError;
                setError(apiError);
                if (data) setData(null);
                if (useToast) dispatch(setToast({
                    open: true,
                    severity: errorToastSeverity,
                    ...(useMessageAsTitle ? { title: apiError?.message } : {
                        title: apiError?.status ?? "Something went wrong",
                        message: apiError?.message ?? "Please try again"
                    })
                }));

            }).finally(() => {
                setLoading(false);

                // Reset abort controller
                abortControllerRef.current = null;
            });
    }

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) abortControllerRef.current.abort();
        };
    }, []);

    return { data, loading, error, fetchData };
}

export { useAxios, useLazyAxios };