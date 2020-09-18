import { useEffect } from 'react';

const useSetHttpAuthHeader = (axiosInstance, token) => {

  
    const requestInterceptor = axiosInstance.interceptors.request.use(req => {
        req.headers.Authorization = `Bearer ${token}`;
        return req;
    });

    useEffect(() => {
        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
        }
    }, [axiosInstance, requestInterceptor]);
};

export default useSetHttpAuthHeader;