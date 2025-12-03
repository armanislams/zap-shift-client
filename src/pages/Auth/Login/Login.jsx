import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import GoogleLogin from '../SocialLogin/GoogleLogin';
import { toast } from 'react-toastify';

const Login = () => {
    const { register, handleSubmit, formState: {errors}} = useForm()
    const { signIn } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()    
    const handleSignIn = (data) => {
        signIn(data.email, data.password)
            .then(result => {
                console.log(result);
                toast.success('login successful')
              navigate(location?.state || '/')
            })
          .catch(error => {
              toast.error('login failed')
            console.log(error);
            
        })
        
    }
    return (
      <div>
            <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
                <h3 className="text-3xl text-center">Welcome Back</h3>
          <form onSubmit={handleSubmit(handleSignIn)} className="card-body">
            <fieldset className="fieldset">
              {/* email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", {required: true})}
                className="input"
                placeholder="Email"
                        />
                        {
                            errors.email?.type === 'required' && <p className="text-red-500">Email Required</p>
                        }
              {/* password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {required: true, minLength: 6})}
                className="input"
                placeholder="Password"
                        />
                        {
                            errors.password?.type === 'required' && <p className="text-red-500">Password is Required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className="text-red-500">Password Must Be 6 digit</p>
                        }

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                    <p>New Here? <Link state={location?.state} className='link link-hover' to={'/register'}>Register Now!</Link></p>
          </form>
            <GoogleLogin></GoogleLogin>
            </div>
      </div>
    );
};

export default Login;