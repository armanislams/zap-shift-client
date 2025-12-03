import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './UseAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",

});

const useAxiosSecure = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    //intercept request
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization=`Bearer ${user?.accessToken}`
      return config
    })

    ///interceptor response
    const resInterceptor = axiosSecure.interceptors.response.use((response) => {
      return response
    }, (error) => {
      console.log(error);

      const statusCode = error.status;
      if (statusCode == 401 || statusCode == 403) {
        navigate('/401')
      }
        
        return Promise.reject(error);
      
    })

    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    }

  },[user,navigate])
    return axiosSecure;
};

export default useAxiosSecure;