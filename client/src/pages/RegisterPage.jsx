import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useForm } from '../utils/customHooks';
import { Logo } from '../components';
import { REGISTER_USER } from '../graphql/Mutations/userMutations';
import Loading from '../assets/mui/Loading';
import MuiError from '../assets/mui/Alert';
import { loginUser } from '../features/userSlice';
import image from '../assets/items/sneaker.jpg';
import Captcha from '../components/ReCAPTCHA'; // Import the captcha component

const RegisterPage = () => {
  const initialState = {
    username: '',
    password: '',
    email: '',
    confirmedPassword: '',
  };

  const [errors, setErrors] = useState({});
  const [recaptchaToken, setRecaptchaToken] = useState('');

  const dispatch = useDispatch();

  const { onSubmit, values, onChange } = useForm(
    registerUserCallback,
    initialState
  );

  const [register, { loading, error }] = useMutation(REGISTER_USER, {
    onCompleted({ register }) {
      localStorage.setItem('jwtToken', register.token);
      dispatch(loginUser(register));
      setErrors({});
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: { 
      ...values,
      recaptchaToken
    },
  });

  const isPotentiallyMalicious = (inputValue) => {
    if (typeof inputValue !== 'string' || !inputValue.trim()) return false;

    const value = inputValue.toLowerCase().trim();

    // Biểu thức chính quy kiểm tra từ khóa SQL injection phổ biến và ký tự đặc biệt
    const sqlInjectionPattern = /\b(select|update|delete|insert|drop|alter|create|exec|union|truncate|replace|rename|grant|revoke)\b|('|--|#|;|\/\*|\*\/|=|%27|%23)/i;

    // Biểu thức kiểm tra điều kiện logic nghi ngờ như ' or 1=1
    const logicPattern = /('|")\s*(or|and)\s*[\d\w]+?\s*=\s*[\d\w]+/i;

    // Biểu thức kiểm tra câu lệnh SQL có dấu nháy đóng/mở không hợp lệ
    const unbalancedQuotes = /(^|[^\\])('|")([^'"]*?)('|")/g;

    return (
      sqlInjectionPattern.test(value) ||
      logicPattern.test(value) ||
      unbalancedQuotes.test(value)
    );
  };

  function registerUserCallback() {
    if (!recaptchaToken) {
      setErrors({ ...errors, captcha: 'Please complete the CAPTCHA verification' });
      return;
    }

    const fieldsToValidate = {
      username: values.username,
      email: values.email,
      password: values.password,
      confirmedPassword: values.confirmedPassword,
    };

    let clientSideErrors = {};
    for (const fieldName in fieldsToValidate) {
      const fieldValue = fieldsToValidate[fieldName];
      if (isPotentiallyMalicious(fieldValue)) {
        clientSideErrors[fieldName] = `Input for ${fieldName} contains potentially malicious content.`;
      }
    }

    if (Object.keys(clientSideErrors).length > 0) {
      setErrors(clientSideErrors);
      return;
    }

    setErrors({});
    register();
  }

  const handleCaptchaChange = (token) => {
    setRecaptchaToken(token);
    // Clear captcha error if it exists
    if (errors?.captcha) {
      const { captcha, ...rest } = errors;
      setErrors(rest);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex w-[80%] max-w-6xl h-[650px] shadow-lg rounded-lg overflow-hidden"> {/* Increased height for captcha */}
        <div className="flex-1 p-6 flex flex-col bg-white">
          <div className="flex justify-center mb-2">
            <Logo />
          </div>
          <h1 className="text-2xl font-semibold text-rose-800 text-center tracking-wide mb-4">
            Register
          </h1>
          <form onSubmit={onSubmit} className="flex flex-col w-full space-y-3">
            {loading && <Loading />}
            {error?.message === 'Failed to fetch' && (
              <MuiError
                value={'Something went wrong, Try again later'}
                type='error'
              />
            )}
            <div className="grid grid-cols-1 gap-3">
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  value={values.email || ''}
                  onChange={onChange}
                  className={`w-full px-3 py-1.5 text-sm text-gray-700 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 ${errors?.email ? 'bg-red-50 border-red-200' : ''
                    }`}
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type='text'
                  name='username'
                  value={values.username || ''}
                  onChange={onChange}
                  className={`w-full px-3 py-1.5 text-sm text-gray-700 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 ${errors?.username ? 'bg-red-50 border-red-200' : ''
                    }`}
                  placeholder="Choose a username"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  value={values.password || ''}
                  onChange={onChange}
                  className={`w-full px-3 py-1.5 text-sm text-gray-700 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 ${errors?.password ? 'bg-red-50 border-red-200' : ''
                    }`}
                  placeholder="Create a password"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type='password'
                  name='confirmedPassword'
                  value={values.confirmedPassword || ''}
                  onChange={onChange}
                  className={`w-full px-3 py-1.5 text-sm text-gray-700 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 ${errors?.confirmedPassword ? 'bg-red-50 border-red-200' : ''
                    }`}
                  placeholder="Confirm your password"
                />
              </div>
            </div>
            
            {/* Add CAPTCHA component */}
            <Captcha onChange={handleCaptchaChange} />
            {errors?.captcha && (
              <div className="text-red-500 text-sm">{errors.captcha}</div>
            )}
            
            <button
              type='submit'
              disabled={loading}
              className="w-full py-2 mt-1 bg-rose-800 text-white rounded-md transition-all duration-300 hover:bg-rose-700 text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>
          <div className="mt-3 text-center text-gray-600">
            Already a member?{' '}
            <Link to='/login' className="text-rose-800 font-medium hover:text-rose-700 transition-colors">
              Login
            </Link>
          </div>
          <Link to='/' className="mt-1 text-center">
            <span className="text-rose-800 hover:text-rose-700 transition-colors">
              Back home
            </span>
          </Link>
          {errors &&
            Object.values(errors)?.filter(err => err !== errors.captcha)?.map((err, index) => (
              <MuiError value={err} type='error' key={index} />
            ))}
        </div>
        <div className="flex-1 bg-gray-100 overflow-hidden">
          <img
            src={image}
            alt="Register illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;