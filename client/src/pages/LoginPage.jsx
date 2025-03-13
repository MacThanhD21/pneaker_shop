import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
    console.log(values)
    login();
  }

  return (
    <>
      <Wrapper>
        <Container>
          <FormSection>
            <div className='logo'>
              <Logo />
            </div>
            <Title>Login</Title>
            <Form onSubmit={onSubmit}>
              {loading && <Loading />}

              {error?.message === 'Failed to fetch' && (
                <MuiError
                  value={'Something went wrong, Try again later'}
                  type='error'
                />
              )}
              <Label>Username</Label>
              <Input
                type='text'
                name='username'
                value={values.username || ''}
                onChange={onChange}
                className={errors?.username ? 'error' : ''}
              />
              <Label>Password</Label>
              <Input
                type='password'
                name='password'
                value={values.password || ''}
                onChange={onChange}
                className={errors?.password ? 'error' : ''}
              />
              <Button disabled={loading} type='submit'>
                Submit
              </Button>
            </Form>
            <Member>
              Not a member yet?
              <Link to='/register'>
                <span> Register</span>
              </Link>
            </Member>
            <Link to='/'>
              <BackHome>Back home</BackHome>
            </Link>
            {errors &&
              Object.values(errors)?.map((err, index) => (
                <MuiError value={err} key={index} type='error' />
              ))}
          </FormSection>
          <ImageSection>
            {/* Your image goes here */}
            <img src={image}  alt="Login illustration" />
          </ImageSection>
        </Container>
      </Wrapper>
    </>
  );
};
export default LoginPage;

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

// CSS styles (using styled-components syntax)
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