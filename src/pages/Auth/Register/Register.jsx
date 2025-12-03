import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import GoogleLogin from '../SocialLogin/GoogleLogin';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
  } = useForm()
   const location = useLocation()
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
  
  const {register: registerUser, updateUser}= useAuth()
  const handleRegister = (data) => {
    const profileImage = data.photo[0];    
      registerUser(data.email, data.password)
        .then(result => {
          /// store the img
          const fromData = new FormData()
          fromData.append('image', profileImage)
          
          const imageAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;

          axios.post(imageAPI, fromData)
            .then(res => {            
              const photoURL = res.data.data.display_url;

              //create user in db
              const userInfo = {
                email: data.email,
                displayName: data.name,
                photoURL: photoURL

              }
              axiosSecure.post('/users', userInfo)
                .then(res => {
                  if(res.data.insertedId)
                    console.log('user created');
                
              })


            ///update user
            const userProfile = {
              displayName : data.name,
              photoURL : photoURL
              }
              updateUser(userProfile)
                .then(result => {
                  navigate(location?.state || '/')
                
              })
                .catch(err => {
                console.log(err);
                
              })
            
            })
          
        
      })
        
    }
    return (
      <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
        <h3 className="text-3xl text-center">Welcome To ZapShift</h3>
        <form onSubmit={handleSubmit(handleRegister)} className="card-body">
          <fieldset className="fieldset">
            {/* name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input"
              placeholder="Your Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}
            {/* photo */}
            <label className="label">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input"
              placeholder="Your Photo"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Photo is required</p>
            )}
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
            {/* password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/~`]).+$/,
              })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">Password need minimum 6 digit</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Must Have 1 uppercase 1 lowercase 1 digit 1 special character
              </p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
          <p>
            Have an account?{" "}
            <Link state={location.state} className="link link-hover" to={"/login"}>
              Login Now!
            </Link>
          </p>
        </form>
        <GoogleLogin></GoogleLogin>
      </div>
    );
};

export default Register;