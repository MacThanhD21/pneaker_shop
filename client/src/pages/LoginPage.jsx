import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components';
import image from '../assets/items/sneaker.jpg'
import { LOGIN_USER } from '../graphql/Mutations/userMutations';
import { useForm } from '../utils/customHooks';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/userSlice';
import Loading from '../assets/mui/Loading';
import MuiError from '../assets/mui/Alert';

const LoginPage = () => {
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const { values, onChange, onSubmit } = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      dispatch(loginUser(login));
      setErrors('');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0]?.extensions.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    login();
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex w-[80%] max-w-6xl h-[600px] shadow-lg rounded-lg overflow-hidden">
        <div className="flex-1 p-10 flex flex-col bg-white">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h1 className="text-3xl font-semibold text-rose-800 text-center tracking-wide mb-8">
            Login
          </h1>
          <form onSubmit={onSubmit} className="flex flex-col w-full space-y-4">
            {loading && <Loading />}

            {error?.message === 'Failed to fetch' && (
              <MuiError
                value={'Something went wrong, Try again later'}
                type='error'
              />
            )}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700 tracking-wide">
                Username
              </label>
              <input
                type='text'
                name='username'
                value={values.username || ''}
                onChange={onChange}
                className={`w-full px-4 py-2.5 text-base text-gray-700 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 ${
                  errors?.username ? 'bg-red-50 border-red-200' : ''
                }`}
                placeholder="Enter your username"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700 tracking-wide">
                Password
              </label>
              <input
                type='password'
                name='password'
                value={values.password || ''}
                onChange={onChange}
                className={`w-full px-4 py-2.5 text-base text-gray-700 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 ${
                  errors?.password ? 'bg-red-50 border-red-200' : ''
                }`}
                placeholder="Enter your password"
              />
            </div>
            <button 
              disabled={loading}
              type='submit'
              className="w-full py-3 mt-6 bg-rose-800 text-white rounded-md transition-all duration-300 hover:bg-rose-700 text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="mt-6 text-center text-gray-600">
            Not a member yet?{' '}
            <Link to='/register' className="text-rose-800 font-medium hover:text-rose-700 transition-colors">
              Register
            </Link>
          </div>
          <Link to='/' className="mt-4 text-center">
            <span className="text-rose-800 hover:text-rose-700 transition-colors">
              Back home
            </span>
          </Link>
          {errors &&
            Object.values(errors)?.map((err, index) => (
              <MuiError value={err} key={index} type='error' />
            ))}
        </div>
        <div className="flex-1 bg-gray-100 overflow-hidden">
          <img 
            src={image} 
            alt="Login illustration" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;