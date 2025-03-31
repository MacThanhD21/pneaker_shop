import { Link } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useForm } from '../utils/customHooks';
import { Logo } from '../components';
import { REGISTER_USER } from '../graphql/Mutations/userMutations';
import Loading from '../assets/mui/Loading';
import MuiError from '../assets/mui/Alert';
import { loginUser } from '../features/userSlice';
import image from '../assets/items/sneaker.jpg';

const RegisterPage = () => {
  const initialState = {
    username: '',
    password: '',
    email: '',
    confirmedPassword: '',
  };

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const { onSubmit, values, onChange } = useForm(
    registerUserCallback,
    initialState
  );

  const [register, { loading, error }] = useMutation(REGISTER_USER, {
    onCompleted({ register }) {
      localStorage.setItem('jwtToken', register.token);
      dispatch(loginUser(register));
      setErrors('');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerUserCallback() {
    register();
  }
  return (
    <Wrapper>
      <Container>
        <FormSection>
          <div className='logo'>
            <Logo />
          </div>
          <Title>Register</Title>
          <Form onSubmit={onSubmit}>
            {loading && <Loading />}
            {error?.message === 'Failed to fetch' && (
              <MuiError
                value={'Something went wrong, Try again later'}
                type='error'
              />
            )}
            <Label>Email</Label>
            <Input
              type='email'
              name='email'
              value={values.email || ''}
              onChange={onChange}
            />
            <Label>Username</Label>
            <Input
              type='text'
              name='username'
              value={values.username || ''}
              onChange={onChange}
            />
            <Label>Password</Label>
            <Input
              type='password'
              name='password'
              value={values.password || ''}
              onChange={onChange}
            />
            <Label>Confirmed Password</Label>
            <Input
              type='password'
              name='confirmedPassword'
              value={values.confirmedPassword || ''}
              onChange={onChange}
            />
            <Button type='submit'>Submit</Button>
          </Form>

          <Member>
            Already a member?
            <Link to='/login'>
              <span> Login</span>
            </Link>
          </Member>
          <Link to='/'>
            <BackHome>Back home</BackHome>
          </Link>
          {errors &&
            Object.values(errors)?.map((err, index) => (
              <MuiError value={err} type='error' key={index} />
            ))}
        </FormSection>
        <ImageSection>
          <img src={image} alt="Register illustration" />
        </ImageSection>
      </Container>
    </Wrapper>
  );
};
export default RegisterPage;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Container = styled.div`
  display: flex;
  width: 80%;
  max-width: 1200px;
  height: 600px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const FormSection = styled.div`
  flex: 0 0 40%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const ImageSection = styled.div`
  flex: 0 0 60%;
  background-color: #f0f0f0;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled.h1`
  letter-spacing: 1px;
  color: var(--clr-primary-2);
  margin-top: -0rem;
  margin-bottom: 2rem;
  font-weight: 600;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  .error {
    background-color: rgb(253, 237, 237);
  }
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
  color: var(--clr-gray-2);
`;

const Input = styled.input`
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  padding: 0.357rem 0.75rem;
  border: 1px solid var(--clr-gray);
  background-color: var(--clr-mocha-hover);
  font-size: 100%;
  line-height: 1.15;
  font-weight: 500;
`;

const Button = styled.button`
  background-color: var(--clr-mocha-3);
  border: transparent;
  cursor: pointer;
  padding: 0.375rem 0.75rem;
  text-transform: capitalize;
  border-radius: 0.25rem;
  line-height: 1.2;
  letter-spacing: 0.5px;
  font-size: 16px;
  color: #fff;
  margin-top: 1rem;
  transition: all 0.3s;
  &:hover {
    background-color: var(--clr-mocha-2);
  }
`;

const Member = styled.p`
  span {
    color: var(--clr-mocha-2);
    cursor: pointer;
    font-weight: 500;
    letter-spacing: 0.5px;
  }
`;

const BackHome = styled.span`
  color: var(--clr-primary-2);
  cursor: pointer;
`;
